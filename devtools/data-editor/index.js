const axios = require('axios');
const $ = require('jquery-browserify');
const jsonDiff = require('json-diff');
const { loadLayers, makeFrame, simulateFrames } = require('../../animation/utils');

const storage = window.localStorage;

const AH = require('ansi-to-html');
const AnsiConvert = new AH({
    fg: '#000',
    bg: '#FFF',
    newline: true
});

let currentObject = undefined;
let currentType = "";
let resources = [];
let animations = [];

const OptionSchema = {
    'title': 'string',
    'cost': 'number',
    'prereq': ['string'],
    'type': '<Structure|Unit>',
    'description': 'string',
    'icon': 'resource',
    'command': 'string'
};

const StructureSchema = {
    'description': 'longString',
    'health': 'number',
    'shield': 'number',
    'width': 'number',
    'turnsToBuild': 'number',
    'targetable': 'bool',
    'sightRange': 'number',
    'icon': 'resource',
    'texture': 'resource',
    'options': [OptionSchema],
    'custom': 'object'
};

const TupleSchema = {
    'x': 'number',
    'y': 'number'
};

const AnimationLayerSchema = {
    'x': 'number?',
    'y': 'number?',
    'z': 'number?',
    'ax': 'number?',
    'ay': 'number?',
    'rotation': 'number?'
};

const MapSchema = {
    // 'data': 'map',
    'commandCenterLocations': [TupleSchema],
    'movement': [TupleSchema],
    'movementIndex': 'number',
    'percentageClaimToWin': 'number',
    'teams': ['number']
};

const AnimationSchema = {
    'baseLayer': 'animation',
    'attackAnimation': 'animation',
    'deathAnimation': 'animation'
};

const UnitSchema = {
    'attackRange': 'number',
    'attackSpeed': 'number',
    'damage': 'number',
    'description': 'longString',
    'health': 'number',
    'moveRange': 'number',
    'shield': 'number',
    'sightRange': 'number',
    'icon': 'resource',
    'texture': 'resource',
    'animation': AnimationSchema,
    'tier': 'number',
    'turnsToBuild': 'number',
    'options': [OptionSchema],
    'custom': 'object'
};

let BaseStructures = {};
let BaseUnits = {};
let BaseMaps = {};
let Structures = undefined;
let Units = undefined;
let Maps = undefined;

const localChangesStructures = storage.getItem('localStructures');
const localChangesUnits = storage.getItem('localUnits');
const localChangesMaps = storage.getItem('localMaps');

if (localChangesStructures) {
    try {
        Structures = JSON.parse(localChangesStructures);
    } catch {}
}

if (localChangesUnits) {
    try {
        Units = JSON.parse(localChangesUnits);
    } catch {}
}

if (localChangesMaps) {
    try {
        Maps = JSON.parse(localChangesMaps);
    } catch {}
}

function makeObject(schema) {
    const type = schema;
    if (type === 'number') {
        return 0;
    }
    else if (type === 'number?') {
        return undefined;
    }
    else if (type === 'string' || type === 'longString' || type === 'resource' || type === 'animation') {
        return "";
    }
    else if (Array.isArray(type)) {
        return [];
    }
    else if (type[0] === '<' && type[type.length - 1] === '>') {
        const options = type.substring(1, type.length - 1).split('|');
        return options[0];
    }
    else if (type === 'bool') {
        return false;
    }
    else if (type === 'object') {
        return {};
    }
    else if (typeof type === 'object') {
        const obj = {};
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; i++) {
            const type = schema[keys[i]];
            obj[keys[i]] = makeObject(type);
        }
        return obj;
    }
    else {
        console.error('Invalid schema', type);
    }
}

function toReadableString(camelCase) {
    return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./,
        function(str) { return str.toUpperCase(); })
}

function updateDiff() {
    let structuresDiff = AnsiConvert.toHtml(jsonDiff.diffString(BaseStructures, Structures));
    let unitsDiff = AnsiConvert.toHtml(jsonDiff.diffString(BaseUnits, Units));
    let mapsDiff = AnsiConvert.toHtml(jsonDiff.diffString(BaseMaps, Maps));

    if (!structuresDiff) {
        structuresDiff = "No Changes Made";
        console.log('Removing localStructures');
        storage.removeItem('localStructures');
    }
    else {
        console.log('Setting localStructures');
        storage.setItem('localStructures', JSON.stringify(Structures));
    }        

    if (!unitsDiff) {
        unitsDiff = "No Changes Made";
        console.log('Removing localUnits');
        storage.removeItem('localUnits');
    }
    else {
        console.log('Setting localUnits');
        storage.setItem('localUnits', JSON.stringify(Units));
    }

    $('.structuresDiff').html(structuresDiff);
    $('.unitsDiff').html(unitsDiff);
}

function revert() {
    Structures = JSON.parse(JSON.stringify(BaseStructures));
    Units = JSON.parse(JSON.stringify(BaseUnits));
    Maps = JSON.parse(JSON.stringify(BaseMaps));
    loadData(currentObject, currentType);
}

const colors = ['#EEE', '#CCC', '#AAA'];
function buildUIFromData(data, schema, layer = 0, onChange = (val) => {}) {
    let type = schema;

    if (type === 'number') {
        const input = $(`<input type="number" value="${data}" />`);
        input.change(() => {
            onChange(parseFloat(input.val()));
            updateDiff();
        });
        return input;
    }
    else if (type === 'number?') {
        const input = $(`<input type="number" />`);
        if (data !== undefined) {
            input.val(data);
        }
        const button = $(`<button>Unset</button>`);
        button.click(() => {
            input.val("");
            onChange(undefined);
            updateDiff();
        });

        input.change(() => {
            if (input.val() !== "") {
                onChange(parseFloat(input.val()));
                updateDiff();
            }
        });

        const wrapper = $(`<div></div>`);
        wrapper.append(input);
        wrapper.append(button);
        return wrapper;
    }
    else if (type === 'string') {
        const input = $(`<input type="text" style="width: 300px;" value="${data}"/>`);
        input.change(() => {
            onChange(input.val());
            updateDiff();
        });
        return input;
    }
    else if (type === 'longString') {
        const input = $(`<textarea style="width: 300px; height: 100px">${data}</textarea>`);
        input.change(() => {
            onChange(input.val());
            updateDiff();
        });
        return input;
    }
    else if (type === 'animation') {
        const wrapper = $('<div></div>');
        const input = $('<input list="animations" />');
        input.val(data);
        input.change(() => {
            if (input.val() && animations.indexOf(input.val()) === -1) {
                alert('Not a valid animations!');
                input.val(data);
            }
            else {
                onChange(input.val());
                updateDiff();
            }
        })
        wrapper.append(input);
        return wrapper;
    }
    else if (type === 'resource') {
        const wrapper = $('<div></div>');
        const input = $('<input list="resources" />');
        const imagePreview = $(`<img src="/resources/${data}" />`);

        input.val(data);
        input.change(() => {
            if (input.val() && resources.indexOf(input.val()) === -1) {
                alert('Not a valid resource!');
                input.val(data);
            }
            else {
                onChange(input.val());
                imagePreview.attr('src', `/resources/${input.val()}`)
                updateDiff();
            }
        })
        wrapper.append(input);
        wrapper.append(`<br>`);
        wrapper.append(imagePreview);
        return wrapper;
    }
    else if (Array.isArray(type)) {
        const wrapper = $(`<div></div>`);
        const internalSchema = type[0];
        const addBtn = $(`<button>Add</button>`);
        const container = $(`<div></div>`);
        const regenerate = () => {
            container.html('');
            makeArrayList(container, data, internalSchema, layer, () => {
                regenerate();
            });
        };
        regenerate();
        addBtn.click(() => {
            data.push(makeObject(internalSchema));
            updateDiff();
            regenerate();
            container.children().last()[0].scrollIntoView({ behavior: 'smooth' });
        });
        wrapper.append(addBtn);
        wrapper.append(container);
        return wrapper;
    }
    else if (type[0] === '<' && type[type.length - 1] === '>') {
        const options = type.substring(1, type.length - 1).split('|');
        // Dropdown List
        const select = $('<select></select>');
        options.forEach(s => {
            select.append(`<option value='${s}'>${s}</option>`);
        });
        select.val(data);
        select.change(() => {
            onChange(select.val());
            updateDiff();
        })
        return select;
    }
    else if (type === 'bool') {
        const checkbox = $('<input type="checkbox" />');
        checkbox.prop("checked", data);
        checkbox.change(() => {
            onChange(checkbox.is(':checked'));
            updateDiff();
        });
        return checkbox;
    }
    else if (type === 'object') {
        // Arbitrary Key Value Pair
        const wrapper = $(`<div></div>`);
        const addBtn = $(`<button>Add</button>`);
        const keyValueTable = $('<table class="objectEditor"></table>');
        const regenerate = () => {
            keyValueTable.html('');
            if (data) {
                Object.keys(data).forEach(elem => {
                    const row = $(`<tr></tr>`);
                    const currentKeyClosure = elem;
                    const keyTextbox = $(`<input type="text" style="width: 150px;" value="${elem}"/>`);
                    keyTextbox.change(() => {
                        data[keyTextbox.val()] = data[currentKeyClosure];
                        delete data[currentKeyClosure];
                        regenerate();
                        updateDiff();
                    });

                    const valueTextbox = $(`<input type="text" style="width: 150px;" value="${data[elem]}"/>`);
                    valueTextbox.change(() => {
                        const val = valueTextbox.val();
                        if (!isNaN(val)) {
                            data[currentKeyClosure] = Number(val);
                        }
                        else {
                            data[currentKeyClosure] = val;
                        }
                        regenerate();
                        updateDiff();
                    });

                    row.append($(`<td></td>`).append(keyTextbox));
                    row.append($(`<td></td>`).append(valueTextbox));
                    
                    const remove = $(`<button>Remove</button>`);
                    remove.click(() => {
                        delete data[currentKeyClosure];
                        regenerate();
                        updateDiff();
                    });
                    
                    row.append($(`<td></td>`).append(remove));
                    keyValueTable.append(row);
                });
            }
        };
        regenerate();
        addBtn.click(() => {
            data['UntitledKey'] = 'Value';
            regenerate();
            updateDiff();
            keyValueTable.children().last()[0].scrollIntoView({ behavior: 'smooth' });
        });
        wrapper.append(addBtn);
        wrapper.append(keyValueTable);
        return wrapper;
    }
    else if (typeof type === 'object') {
        let table = $(`<table class="objectEditor" style="background-color: ${colors[layer]}"></table>`);
        const keys = Object.keys(type);
        for (let i = 0; i < keys.length; i++) {
            const row = $(`<tr></tr>`);
            row.append(`
                <td style='text-align: right'>
                    ${toReadableString(keys[i])}
                </td>`);
            
            const entry = $(`<td></td>`);
            const schema = type[keys[i]];
            if (data[keys[i]] === undefined && !(typeof schema === 'string' && schema.endsWith('?'))) {
                console.log('Making object', schema);
                data[keys[i]] = makeObject(schema);
                updateDiff();
            }
            entry.append(buildUIFromData(data[keys[i]], schema, layer + 1, (val) => {
                console.log(val);
                if (val === undefined) {
                    delete data[keys[i]];
                }
                else {
                    data[keys[i]] = val;
                }
                onChange(data);
            }));
            row.append(entry);
            table.append(row);
        }        
        return table;
    }
    else {
        console.error('Invalid schema', keys[i]);
    }
}

function makeArrayList(container, arrayRef, schema, layer, onRegenerate) {
    arrayRef.forEach((elem, index) => {
        const elementContainer = $(`<div class="arrayElemWrapper"></div>`);
        
        const removeBtn = $(`<button>Remove</button>`);
        const moveUpBtn = $(`<button>Move Up</button>`);
        const moveDownBtn = $(`<button>Move Down</button>`);

        removeBtn.click(() => {
            arrayRef.splice(index, 1);
            updateDiff();
            onRegenerate();
        });
        moveUpBtn.click(() => {
            if (index !== 0) {
                arrayRef[index] = arrayRef[index - 1];
                arrayRef[index - 1] = elem;
                updateDiff();
                onRegenerate();
            }
        });
        moveDownBtn.click(() => {
            if (index !== arrayRef.length - 1) {
                arrayRef[index] = arrayRef[index + 1];
                arrayRef[index + 1] = elem;
                updateDiff();
                onRegenerate();
            }
        });

        elementContainer.append(buildUIFromData(elem, schema, layer + 1));
        elementContainer.append(removeBtn);
        elementContainer.append(moveUpBtn);
        elementContainer.append(moveDownBtn);
        container.append(elementContainer);
    });
}

function loadData(s, type) {
    $('.editor').html('');
    currentObject = s;
    currentType = type;
    if (!currentObject) return;
    let baseList;
    let schema;
    if (type === 'structure') {
        baseList = Structures;
        schema = StructureSchema;
    }
    else if (type === 'unit') {
        baseList = Units;
        schema = UnitSchema;
    }
    else if (type === 'map') {
        baseList = Maps;
        schema = MapSchema;
    }

    const input = $(`<input type="text" value="${s}" class="name"/>`);
    const oldName = s;
    input.change(() => {
        const newName = input.val();
        if (!newName) {
            input.val(oldName);
            return;
        }
        if (baseList[newName]) {
            alert('Name already in use!');
            input.val(oldName);
            return;
        }
        baseList[newName] = baseList[oldName];
        delete baseList[oldName];
        updateDiff();
        updateOptions();
        loadData(newName, type);
    });

    //const name = $(`<div class="name">${s}</div>`);
    const dupBtn = $(`<button>Duplicate</button>`);
    const deleteBtn = $(`<button>Delete</button>`);

    dupBtn.click(() => {
        let i = 1;
        while (baseList[`${s}-${i}`]) {
            i++;
        }
        baseList[`${s}-${i}`] = JSON.parse(JSON.stringify(baseList[s]));
        updateDiff();
        updateOptions();
    });

    deleteBtn.click(() => {
        delete baseList[s];
        updateDiff();
        updateOptions();
        loadData(undefined, undefined);
    });

    $('.editor').append(input);
    $('.editor').append(dupBtn);
    $('.editor').append(deleteBtn);
    $('.editor').append(buildUIFromData(baseList[s], schema));
}

function loadResource(s) {
    $('.editor').html(`<img class="resourceDisplay" src="/resources/${s}" />`);
}

async function loadImage(url) {
    const image = new Image();
    return new Promise((resolve, reject) => {
        image.onload = () => {
            console.log('Resource loaded: ' + url);
            resolve(image);
        };
        image.onerror = () => {
            reject('Couldn\'t load resource: ' + url);
        };
        
        image.src = url;
    });
}
function loadAnimation(s) {
    const dirName = ('/resources/' + s).match(/.*\//)[0];
    if (s.endsWith('layers.json')) {
        axios.get('/resources/' + s).then((response) => {
            const layers = response.data;
            const animationState = {};
    
            loadLayers(layers, animationState, dirName, loadImage).then((obj) => {
                const canvas = $(`<canvas></canvas>`);
                const context = canvas[0].getContext('2d');
                canvas[0].width = obj.width;
                canvas[0].height = obj.height;
                canvas[0].style.width = obj.width + 'px';
                canvas[0].style.height = obj.height + 'px';

                makeFrame(animationState, context, obj.width, obj.height);
                $('.editor').html('');
                $('.editor').append(canvas);
            });     
        });
    }
    else {
        axios.get(dirName + '/layers.json').then((response) => {
            const layers = response.data;
            axios.get('/resources/' + s).then((response) => {
                const animationState = {};
                const animationBase = response.data;
                const animation = JSON.parse(JSON.stringify(animationBase));
                const duration = response.data.duration;

                loadLayers(layers, animationState, dirName, loadImage).then((obj) => {
                    console.log(obj);
                    console.log(animationState);

                    // Simulate all the frames first
                    let frames = simulateFrames(animationState, animation);
                    const keyFrameIndexLookup = {};
                    for (let i = 0; i < animation.frames.length; i++) {
                        keyFrameIndexLookup[animation.frames[i].time] = i;
                    }

                    // Canvas 
                    const canvas = $(`<canvas></canvas>`);
                    const context = canvas[0].getContext('2d');
                    canvas[0].width = obj.width;
                    canvas[0].height = obj.height;
                    canvas[0].style.width = obj.width + 'px';
                    canvas[0].style.height = obj.height + 'px';
                    
                    const frameSlider = $(`<input type="range" style="width: 100%" min="0" max="${duration}" value="0" step="1" />`);
                    const frameText = $(`<span style="padding: 3px; border: 1px solid black"></span>`);
                    const diffWrapper = $(`<div class="animationDiffWrapper"></div>`);
                    const commitChangesButton = $(`<button>Commit</button>`);

                    const frameInfoTable = $(`<table></table>`);
                    const playBtn = $(`<button>Play</button>`);

                    function redraw(updateFrameInfos) {
                        context.fillStyle = "white";
                        context.fillRect(0, 0, obj.width, obj.height);
                        const index = parseInt(frameSlider.val());
                        makeFrame({
                            layerImages: animationState.layerImages,
                            layerProperties: frames[index]
                        }, context, obj.width, obj.height, false);

                        frameText.html(parseInt(frameSlider.val()));
                        let animationDiff = AnsiConvert.toHtml(jsonDiff.diffString(animationBase, animation));

                        if (!animationDiff) {
                            animationDiff = "No Changes Made";
                        }
                        diffWrapper.html(animationDiff);

                        if (updateFrameInfos) {
                            frameInfoTable.html('');
                            const layerNames = Object.keys(animationState.layerProperties);
                            const isKeyframe = keyFrameIndexLookup[index] !== undefined;

                            for (let i = 0; i < layerNames.length; i++) {
                                const row = $(`<tr><td>${layerNames[i]}</td></tr>`);
                                const cell = $(`<td></td>`);
                                let data = isKeyframe ? animation.frames[keyFrameIndexLookup[index]].delta[layerNames[i]] : frames[index][layerNames[i]];
                                if (data === undefined) {
                                    // No Layer Data on the keyframe 
                                    data = {};
                                    animation.frames[keyFrameIndexLookup[index]].delta[layerNames[i]] = data;
                                }
                                cell.append(buildUIFromData(data, AnimationLayerSchema, 0, () => {
                                    // Resimulate and redraw when keyframe changes
                                    //animation.frames[keyFrameIndexLookup[index]].delta = JSON.parse(JSON.stringify(frames[index]));
                                    frames = simulateFrames(animationState, animation);
                                    console.log(animation);
                                    redraw(false);
                                }));
                                row.append(cell);
                                frameInfoTable.append(row);
                            }
                            if (!isKeyframe) {
                                frameInfoTable.find("input").prop('disabled', true);
                                frameInfoTable.find("button").prop('disabled', true);
                            }
                        }   
                    }
        
                    redraw(true);
                    
                    let playBackInterval = undefined;
                    playBtn.click(() => {
                        if (playBackInterval) {
                            clearInterval(playBackInterval);
                            playBackInterval = undefined;
                            playBtn.html('Play');
                        }
                        else {
                            playBackInterval = setInterval(() => {
                                const currValue = parseInt(frameSlider.val());
                                if (currValue >= duration) {      
                                    clearInterval(playBackInterval);
                                    playBackInterval = undefined;
                                    playBtn.html('Play');
                                    frameSlider.val(0);
                                }
                                else {
                                    frameSlider.val(currValue + 1);
                                }
                                redraw(true);
                            }, 1000 / 60);
                            playBtn.html('Stop');
                        }
                        
                    });

                    frameSlider.on('input', () => {
                        redraw(true);
                    });
                    commitChangesButton.click(() => {
                        axios.post('/tools/update-animation', {
                            path: s,
                            animation: animation
                        }).then(() => {
                            alert(`Animation written to file: ${s}`);
                            loadAnimation(s);
                        }).catch((error) => {
                            alert(error);
                        });
                    });

                    $('.editor').html('');
                    $('.editor').append(canvas);
                    $('.editor').append(`<br>`);
                    $('.editor').append(frameSlider);
                    $('.editor').append(frameText);
                    $('.editor').append(playBtn);
                    const frameInfoWrapper = $(`<div style="height: 500px; overflow: scroll; border: 1px solid black"></div>`);
                    frameInfoWrapper.append(frameInfoTable);
                    $('.editor').append(frameInfoWrapper);
                    $('.editor').append(commitChangesButton);
                    $('.editor').append(diffWrapper);
                    

                }).catch(error => {
                    console.error(error);
                });
            });
        }).catch(error => console.error(error));
        //loadLayers(layers, destination, baseDirectory)
    }
}

$('#commit').click(() => {
    axios.post('/tools/set-data', {
        structures: Structures,
        units: Units
    }).then(() => {
        setTimeout(() => {
            loadFromServer();
        }, 100);
    }).catch((error) => {
        alert(error);
    });
});

$('#revert').click(() => {
    revert();
    updateDiff();
});

$(document).ready(() => {
    loadFromServer();
});

$('#load').click(() => {
    loadFromServer();
});

$('.options').change(() => {
    const opt = $('.options')[0].options[$('.options')[0].selectedIndex];
    if (opt.dataset['type'] === 'resource') {
        loadResource(opt.value);
    }
    else if (opt.dataset['type'] === 'animationLayer') {
        loadAnimation(opt.value);
    }
    else {
        loadData(opt.value, opt.dataset['type']);
    }
});

$('.optionsFilter').keyup(() => {
    const options = $('.options option');
    const regex = new RegExp($('.optionsFilter').val(), 'gi');

    for (let i = 0; i < options.length; i++) {
        if (options[i].value.match(regex)) {
            $(options[i]).show();
        }
        else {
            $(options[i]).hide();
        }
    }
});

function updateOptions() {
    $('.options').html('');
    if (Structures) {
        const structureGroup = $(`<optgroup label="Structures"></optgroup>`);
        Object.keys(Structures).forEach(s => {
            const obj = $(`<option value="${s}" data-type="structure">${s}</option>`);
            structureGroup.append(obj);
        });
        $('.options').append(structureGroup);
    }
    if (Units) {
        const unitGroup = $(`<optgroup label="Units"></optgroup>`);
        Object.keys(Units).forEach(s => {
            const obj = $(`<option value="${s}" data-type="unit">${s}</option>`);
            unitGroup.append(obj);
        });
        $('.options').append(unitGroup);
    }
    if (Maps) {
        const mapsGroup = $(`<optgroup label="Maps"></optgroup>`);
        Object.keys(Maps).forEach(s => {
            const obj = $(`<option value="${s}" data-type="map">${s}</option>`);
            mapsGroup.append(obj);
        });
        $('.options').append(mapsGroup);
    }
    
    const animationsGroup = $(`<optgroup label="Animations"></optgroup>`);
    const animationsDataList = $(`<datalist id="animations"></datalist>`);
    animations.forEach(s => {
        const obj = $(`<option value="${s}" data-type="animationLayer">${s}</option>`);
        animationsGroup.append(obj);
        animationsDataList.append(obj.clone());
    });
    $('.options').append(animationsGroup);
    $('.options').append(animationsDataList);

    const resourcesGroup = $(`<optgroup label="Resources"></optgroup>`);
    const resourceDataList = $(`<datalist id="resources"></datalist>`);
    resources.forEach(s => {
        const obj = $(`<option value="${s}" data-type="resource">${s}</option>`);
        resourcesGroup.append(obj);
        resourceDataList.append(obj.clone());
    });
    $('.options').append(resourcesGroup);
    $('.options').append(resourceDataList);

}

function loadFromServer() {
    $('.options').html('');
    axios.get('/tools/get-data').then((response) => {
        BaseStructures = response.data.structures;
        BaseUnits = response.data.units;
        BaseMaps = response.data.maps;

        if (Structures === undefined) {
            Structures = JSON.parse(JSON.stringify(BaseStructures));
        }

        if (Units === undefined) {
            Units = JSON.parse(JSON.stringify(BaseUnits));
        }

        if (Maps === undefined) {
            Maps = JSON.parse(JSON.stringify(BaseMaps));
        }

        updateOptions();
        updateDiff();
    }).catch((error) => {
        console.error(error);
        alert(error);
    });

    axios.get('/tools/list-resources').then((response) => {
        resources = response.data;
        updateOptions();
    }).catch(error => {
        console.error(error);
        alert(error);
    });

    axios.get('/tools/list-animations').then((response) => {
        animations = response.data;
        updateOptions();
    }).catch(error => {
        console.error(error);
        alert(error);
    });
}