const axios = require('axios');
const $ = require('jquery-browserify');
const { Unit, Structure } = require('../../shared/map-objects');
const jsonDiff = require('json-diff');
const AH = require('ansi-to-html');
const AnsiConvert = new AH({
    fg: '#000',
    bg: '#FFF',
    newline: true
});

let currentObject = undefined;

const OptionSchema = {
    'title': 'string',
    'cost': 'number',
    'prereq': ['string'],
    'type': '<Structure|Unit>',
    'description': 'string',
    'icon': 'string',
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
    'options': [OptionSchema],
    'custom': 'object'
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
    'tier': 'number',
    'turnsToBuild': 'number',
    'options': [OptionSchema],
    'custom': 'object'
};

let BaseStructures = {};
let BaseUnits = {};
let Structures = {};
let Units = {};

function makeObject(schema) {
    const type = schema;
    if (type === 'number') {
        return 0;
    }
    else if (type === 'string' || type === 'longString') {
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
    if (!structuresDiff) structuresDiff = "No Changes Made";
    if (!unitsDiff) unitsDiff = "No Changes Made";
    
    $('.structuresDiff').html(structuresDiff);
    $('.unitsDiff').html(unitsDiff);
}

function revert() {
    Structures = JSON.parse(JSON.stringify(BaseStructures));
    Units = JSON.parse(JSON.stringify(BaseUnits));
    loadData(currentObject);
}

const colors = ['#EEE', '#CCC', '#AAA'];
function buildUIFromData(data, schema, layer = 0, onChange = (val) => {}) {
    let type = schema;

    if (type === 'number') {
        const input = $(`<input type="number" value="${data}" />`);
        input.change(() => {
            onChange(parseInt(input.val()));
            updateDiff();
        });
        return input;
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
        // Dropdown List
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
            if (!data[keys[i]]) {
                data[keys[i]] = makeObject(schema);
            }
            entry.append(buildUIFromData(data[keys[i]], schema, layer + 1, (val) => {
                data[keys[i]] = val;
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

function loadData(s) {
    currentObject = s;
    if (s in Structures) {
        $('.editor').html(`<div class="name">${s}</div>`);
        $('.editor').append(buildUIFromData(Structures[s], StructureSchema));
    }
    else if (s in Units) {
        $('.editor').html(`<div class="name">${s}</div>`);
        $('.editor').append(buildUIFromData(Units[s], UnitSchema));
    }
}

$('#commit').click(() => {
    axios.post('/tools/set-data', {
        structures: Structures,
        units: Units
    }).then(() => {
        alert("Changes committed, please upload your changes via Git.");
        loadFromServer();
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

function loadFromServer() {
    axios.get('/tools/get-data').then((response) => {
        BaseStructures = response.data.structures;
        BaseUnits = response.data.units;
        revert();

        $('.options').html('');
        (Object.keys(Structures).concat(Object.keys(Units))).forEach(s => {
            const obj = $(`<option>${s}</option>`);
            $('.options').append(obj);
            obj.click(() => {
                loadData(s);
            });
        });
        
        updateDiff();
    }).catch((error) => {
        alert(error);
    });
}