const axios = require('axios');
const $ = require('jquery-browserify');
const { Unit } = require('../../shared/map-objects');

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

let Structures = {};
let Units = {};

function toReadableString(camelCase) {
    return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./,
        function(str) { return str.toUpperCase(); })
}

const colors = ['#EEE', '#CCC', '#AAA'];
function buildUIFromData(data, schema, layer = 0) {
    let tableString = `<table class="objectEditor" style="background-color: ${colors[layer]}">`;
    const keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i++) {
        tableString += "<tr><td style='text-align: right'>";
        tableString += toReadableString(keys[i]);
        tableString += "</td><td>";
        const type = schema[keys[i]];

        if (type === 'number') {
            tableString += `<input type="number" value="${data[keys[i]]}"/>`
        }
        else if (type === 'string') {
            tableString += `<input type="text" style="width: 300px;" value="${data[keys[i]]}"/>`
        }
        else if (type === 'longString') {
            tableString += `<textarea style="width: 300px; height: 100px">${data[keys[i]]}</textarea>`
        }
        else if (Array.isArray(type)) {
            const internalSchema = type[0];
            tableString += "<button>Add</button>";
            // Array of Something
            data[keys[i]].forEach(elem => {
                tableString += buildUIFromData(elem, internalSchema, layer + 1);
            });
        }
        else if (type[0] === '<' && type[type.length - 1] === '>') {
            const options = type.substring(1, type.length - 1).split('|');
            // Dropdown List
            tableString += '<select>';
            options.forEach(s => {
                tableString += `<option value='${s}'>${s}</option>`;
            })
            tableString += '</select>';
        }
        else if (type === 'object') {
            // Arbitrary Key Value Pair
            tableString += "<button>Add</button>";
            tableString += '<table class="objectEditor">';
            if (data[keys[i]]) {
                Object.keys(data[keys[i]]).forEach(elem => {
                    tableString += '<tr><td>';
                    tableString += `<input type="text" style="width: 300px;" value="${elem}"/>`;
                    tableString += '</td><td>';
                    tableString += `<input type="text" style="width: 300px;" value="${JSON.stringify(data[keys[i]][elem])}"/>`;
                    tableString += '</td></tr>';
                });
            }
            tableString += '</table>';

        }
        tableString += "</tr>";
    }
    tableString += '</table>';
    return tableString;
}

function loadData(s) {
    if (s in Structures) {
        $('.editor').html(`<div class="name">${s}</div>` + buildUIFromData(Structures[s], StructureSchema));
    }
    else if (s in Units) {
        $('.editor').html(`<div class="name">${s}</div>` + buildUIFromData(Units[s], UnitSchema));
    }
}

$('#load').click(() => {
    axios.get('/tools/get-data').then((response) => {
        Structures = response.data.structures;
        Units = response.data.units;
        $('.options').html('');
        (Object.keys(Structures).concat(Object.keys(Units))).forEach(s => {
            const obj = $(`<option>${s}</option>`);
            $('.options').append(obj);
            obj.click(() => {
                loadData(s);
            });
        });
    }).catch((error) => {
        alert(error);
    });
})