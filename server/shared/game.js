
if (typeof module !== 'undefined') {
    map = require("../map");
    data = require("../data");
    structures = data.structures;
    units = data.units;
    module.exports = {
        createGameState: createGameState,
        simulateState: simulateState,
        createStateChange: createStateChange
    };
}

function createStateChange(from, type, data) {
    return {
        type: type,
        data: data,
        timestamp: Date.now(),
        from: from
    };
}

function createTuple(x, y) {
    return { x: x, y: y };
}

function createTriple(x, y, z) {
    return { x: x, y: y, z: z };
}

function convertToCubeCoordinates(p) {
    var cubex, cubey, cubez;
    cubex = p.x;
    cubez = p.y - (p.x - p.x % 2) / 2;
    cubey = -cubex - cubez;
    return createTriple(cubex, cubey, cubez);
}

function convertToOffsetCoordinates(p) {
    var cubex, cubey;
    cubex = p.x;
    cubey = p.z + (p.x - p.x % 2) / 2;
    return createTuple(cubex, cubey);
}

function createStructure(name, side) {
    return {
        name: name,
        side: side,
        currentHealth: structures[name].health,
        currentShield: structures[name].shield
    };
}

function createUnit(name, side) {
    return {
        name: name,
        side: side,
        currentHealth: units[name].health,
        currentShield: units[name].shield
    };
}

function createGameState(gameStartTime) {
    var state = {
        mapObjects: [],
        visibility: [],
        gameStartTime: gameStartTime
    };
    for (var i = 0; i < map.length; i++) {
        state.mapObjects.push([]);
        state.visibility.push([]);
    }
    state.mapObjects[19][6] = createStructure("Command Base", "red");
    state.mapObjects[6][47] = createStructure("Command Base", "blue");
    var visibilityRed = getNeighbours(convertToCubeCoordinates(createTuple(6, 19)));
    var visibilityBlue = getNeighbours(convertToCubeCoordinates(createTuple(47, 6)));

    return state;
}

// A and B are triples!
function manhattanDistance(a, b) {
    return parseInt(Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y),
        Math.abs(a.z - b.z)));
}

// a is a triple!
function getNeighbours(a) {
    var neighbours = [];
    neighbours.push(createTriple(a.x + 1, a.y, a.z));
    neighbours.push(createTriple(a.x - 1, a.y, a.z));
    neighbours.push(createTriple(a.x, a.y + 1, a.z));
    neighbours.push(createTriple(a.x, a.y - 1, a.z));
    neighbours.push(createTriple(a.x, a.y, a.z + 1));
    neighbours.push(createTriple(a.x, a.y, a.z - 1));
    return neighbours;
}

function nodeInList(a, list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].x == a.x && list[i].y == a.y && list[i].z == a.z) {
            return true;
        }
    }
    return false;
}
// Returns a list of points starting at a and ending at b
function pathFind(a, b, state) {
    var openNodes = [a];
    var visited = [];

}

function simulateState(state, stateChange) {
    if (stateChange.type == "build-structure") {
        var pos = stateChange.data.position;
        state.mapObjects[pos.y][pos.x] =
            createStructure(stateChange.data.name, stateChange.from);
    }
    else if (stateChange.type == "spawn-unit") {
        var pos = stateChange.data.position;
        state.mapObjects[pos.y][pos.x] =
            createUnit(stateChange.data.name, stateChange.from);
    }
    else if (stateChange.type == "move-unit") {
        var pos = stateChange.data.fromPosition;
        var to = stateChange.data.toPosition;
    }
    else if (stateChange.type == "turn-passover") {

    }
}