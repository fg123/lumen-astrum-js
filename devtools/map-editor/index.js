const axios = require('axios');
const $ = require('jquery-browserify');
const { Tuple } = require('../../shared/coordinates');
const { setupMap, Tile } = require('../../shared/map');
const { tiles, Resource } = require('../../client/resources');
const { toDrawCoord } = require('../../client/utils');
const ResourceManager = require('../../client/resource-manager');
const Constants = require('../../shared/constants');

const resourceManager = new ResourceManager(mapTick);


const canvas = $('#map')[0];
const context = canvas.getContext('2d');

let map = undefined;

$('#map-option').change(function (data) {
    changeMap($('#map-option').val());
    $('#map-option').blur();
});

const inputState = {
    w: false,
    a: false,
    s: false,
    d: false,
    delta: 0
};

const mouseState = {
    position: new Tuple(0, 0),
    tile: new Tuple(0, 0)
};

let activeBrush = 0;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const DIGIT_KEYS = [49, 50, 51, 52, 53, 54, 55, 56];

const CAMERA_SPEED = 20;

$(document).keydown((e) => {
    if (e.which === KEY_W) inputState.w = true;
    if (e.which === KEY_A) inputState.a = true;
    if (e.which === KEY_S) inputState.s = true;
    if (e.which === KEY_D) inputState.d = true;
    if (DIGIT_KEYS.includes(e.which)) {
        activeBrush = DIGIT_KEYS.indexOf(e.which);
    }
});

$(document).keyup((e) => {
    if (e.which === KEY_W) inputState.w = false;
    if (e.which === KEY_A) inputState.a = false;
    if (e.which === KEY_S) inputState.s = false;
    if (e.which === KEY_D) inputState.d = false;
});

$(document).mousemove((e) => {
    const rect = canvas.getBoundingClientRect();
    mouseState.position.x = e.clientX - rect.left;
    mouseState.position.y = e.clientY - rect.top;
    
    mouseState.tile = new Tuple(
        (mouseState.position.x - width / 2) / cameraZoom + camera.x,
        (mouseState.position.y - height / 2) / cameraZoom + camera.y
    ).toTileCoord();
});

$(document).mousedown((e) => {
    mouseState.down = true;
});

$(document).mouseup((e) => {
    mouseState.down = false;
});

$('#reset').click(function() {
    changeMap($('#map-option').val());
});

window.addEventListener("wheel", (event) => {
    console.log(event.deltaY);
    inputState.delta = event.deltaY;
});

const camera = new Tuple(0, 0);
let cameraZoom = 1.0;

axios.get('/tools/list-maps').then(function(result) {
    console.log(result.data);
    let options = '';
    result.data.forEach(function(option) {
        options += `<option value="${option}">${option}</option>`
    });
    $('#map-option').html(options);
    changeMap($('#map-option').val());
}).catch(function (error) {
    console.error(error);
});

function changeMap(mapName) {
    axios.get('/tools/get-map/' + mapName).then(function(result) {
        map = setupMap(result.data);
        const newCam = toDrawCoord(map.redCommandCenterLocation);
        
        camera.x = newCam.x;
        camera.y = newCam.y;

        $('#unsaved-changes').text('');
        updateMapData();
        console.log(map);
    }).catch(function (error) {
        console.error(error);
    });
}

let width;
let height;

function onResize() {
    width = window.innerWidth;
    height = window.innerHeight - 200;
    canvas.width = width;
    canvas.height = height;
    context.width = width;
    context.height = height;
}

window.addEventListener('resize', onResize);
onResize();

function updateMapData() {
    $('#mapData').text(map.data.map(row => {
        return '"' + row.map(tile => tile.tileType).join(' ') + '"';
    }).join(',\n'));
}

function drawImage(img, x, y, width = -1, height = -1, angle = 0) {
    if (width === -1) width = img.width;
    if (height === -1) height = img.height;
    if (angle === 0) {
        context.drawImage(img, x - width / 2, y - height / 2);
    }
    else {
        context.translate(x, y);
        context.rotate(angle);
        context.drawImage(img, -width / 2, -height / 2, width, height);
        context.rotate(-angle);
        context.translate(-x, -y);
    }
}

function mapTick() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);
    if (inputState.w) camera.y -= CAMERA_SPEED;
    if (inputState.a) camera.x -= CAMERA_SPEED;
    if (inputState.s) camera.y += CAMERA_SPEED;
    if (inputState.d) camera.x += CAMERA_SPEED;
    if (mouseState.down) {
        if (map && map.data) {
            if (mouseState.tile.x >= 0 && mouseState.tile.y >= 0 &&
                mouseState.tile.x < map.data[0].length && mouseState.tile.y < map.data.length) {
                map.data[mouseState.tile.y][mouseState.tile.x] = new Tile(activeBrush);
                $('#unsaved-changes').text('You have unsaved changes!');
                updateMapData();
            }
        }
    }

    const factor = 1 / cameraZoom;
    const offsetX = ((width / 2) * factor);
    const offsetY = ((height / 2) * factor);
    context.save();
    context.scale(cameraZoom, cameraZoom);
    context.translate(-(camera.x - offsetX), -(camera.y - offsetY));
    cameraZoom -= inputState.delta / 5000;
    if (cameraZoom < 0.3) cameraZoom = 0.3;
    if (cameraZoom > 1) cameraZoom = 1;
    inputState.delta *= 0.9;
    if (map !== undefined) {
        for (let y = 0; y < map.data.length; y++) {
            for (let x = 0; x < map.data[0].length; x++) {
                const drawCoord = toDrawCoord(x, y);
                let displayType = map.data[y][x].displayType;
                if (mouseState.tile.equals(new Tuple(x, y))) {
                    displayType = activeBrush;
                }

                if (displayType !== 0) {
                    drawImage(resourceManager.get(
                        tiles[displayType - 1]
                    ), drawCoord.x, drawCoord.y);
                }
                
                if (mouseState.tile.equals(new Tuple(x, y))) {
                    drawImage(resourceManager.get(Resource.DEBUG_RING),
                        drawCoord.x, drawCoord.y);
                }
                context.font = "16px Consolas";
                context.fillText(`${x}, ${y}`, drawCoord.x - 30, drawCoord.y);
            }
        }
    }
    context.restore();
    requestAnimationFrame(mapTick);
}