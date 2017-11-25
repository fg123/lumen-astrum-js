const RED_SIDE = "red";
const BLUE_SIDE = "blue";
const NONE_SIDE = "none";
const BUILD_RANGE = 4;

const RED_SIDE_COMMAND_CENTER_LOC = createTuple(6, 19);
const BLUE_SIDE_COMMAND_CENTER_LOC = createTuple(47, 6);

if (typeof module !== 'undefined') {
    map = require("../map");
    data = require("../data");
    structures = data.structures;
    units = data.units;
    module.exports = {
        createGameState: createGameState,
        simulateState: simulateState,
        createStateChange: createStateChange,
        verifyStateChange: verifyStateChange,
        availableTurnTime: availableTurnTime,
        RED_SIDE,
        BLUE_SIDE,
        NONE_SIDE
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

var tupleCache = new Array(1000 * 900);
var zeroTuple = { x: 0, y: 0 };
var negOneTuple = { x: -1, y: -1 };

function createTuple(x, y) {
    // Cache Tuples
    var index = x * 100 + y;
    if (index > 0 && index < 100) {
        if (!tupleCache[index]) {
            tupleCache[index] = { x: x, y: y };
        }
        return tupleCache[index];
    }
    else {
        return { x: x, y: y };
    }
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

function createStructure(name, side, position) {
    return {
        name: name,
        side: side,
        position: position,
        turnsUntilBuilt: structures[name].turnsToBuild,
        width: structures[name].width,
        currentHealth: structures[name].health,
        currentShield: structures[name].shield
    };
}

function createUnit(name, side, position) {
    return {
        name: name,
        side: side,
        position: position,
        turnsUntilBuilt: units[name].turnsToBuild,
        width: 1,
        currentHealth: units[name].health,
        currentShield: units[name].shield
    };
}

function withinMap(tile) {
    return !(tile.x < 0 || tile.y < 0 &&
        tile.x >= map[0].length || tile.y >= map.length);
}

function isConstructionBuilding(name) {
    return name == "Command Base" || name == "Deployment Outpost";
}

function insertMapObject(state, location, name, side) {
    if (name in structures) {
        var structure = createStructure(name, side, location);
        state.mapObjects[location.y][location.x] = structure;
        state.structures.push(structure);
        let surrounding = getSurrounding(location, structures[name].width);
        for (let i = 0; i < surrounding.length; i++) {
            if (withinMap(surrounding[i])) {
                state.occupied[surrounding[i].y][surrounding[i].x] = location;
            }
        }
        if (isConstructionBuilding(name)) {
            let surrounding = getSurrounding(location, structures[name].width + BUILD_RANGE);
            for (let i = 0; i < surrounding.length; i++) {
                if (withinMap(surrounding[i])) {
                    state.allowedBuilding[surrounding[i].y][surrounding[i].x] = true;
                }
            }
        }
    }
    else if (name in units) {
        var unit = createUnit(name, side, location);
        state.mapObjects[location.y][location.x] = unit;
        state.units.push(unit);
        state.occupied[location.y][location.x] = location;
    }
}

function createGameState(gameStartTime) {
    var gameState = {
        mapObjects: [],
        visibility: [],
        occupied: [],
        allowedBuilding: [],
        structures: [],
        units: [],
        gameStartTime: gameStartTime,
        turnEndTime: 0,
        redTurnCount: 0,
        blueTurnCount: 0,
        redGold: 1000,
        blueGold: 1000,
        currentTurn: NONE_SIDE
    };
    for (var i = 0; i < map.length; i++) {
        gameState.mapObjects.push([]);
        gameState.visibility.push([]);
        gameState.occupied.push([]);
        gameState.allowedBuilding.push([]);
    }
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x].displayType == 0 || map[y][x].displayType == 5) {
                gameState.occupied[y][x] = true;
            }
        }
    }
    insertMapObject(gameState, RED_SIDE_COMMAND_CENTER_LOC, "Command Base", RED_SIDE);
    insertMapObject(gameState, BLUE_SIDE_COMMAND_CENTER_LOC, "Command Base", BLUE_SIDE);
    //var visibilityRed = getNeighbours(convertToCubeCoordinates(RED_SIDE_COMMAND_CENTER_LOC));
    //var visibilityBlue = getNeighbours(convertToCubeCoordinates(BLUE_SIDE_COMMAND_CENTER_LOC));

    return gameState;
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

function getSurrounding(a, width) {
    a = convertToCubeCoordinates(a);
    var results = [];
    for (var dx = -width; dx <= width; dx++) {
        for (var dy = Math.max(-width, -dx - width);
            dy <= Math.min(width, -dx + width); dy++) {
            var dz = -dx - dy;
            results.push(convertToOffsetCoordinates(
                createTriple(a.x + dx, a.y + dy, a.z + dz)));
        }
    }
    return results;
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

function verifyStateChange(state, stateChange) {
    return true;
}

function simulateState(state, stateChange) {
    // State is GameState
    console.log("Simulating State: " + JSON.stringify(stateChange));
    var pos;
    if (stateChange.type == "build-structure") {
        pos = stateChange.data.position;
        insertMapObject(state, pos, stateChange.data.name, stateChange.from);
    }
    else if (stateChange.type == "spawn-unit") {
        pos = stateChange.data.position;
        insertMapObject(state, pos, stateChange.data.name, stateChange.from);
    }
    else if (stateChange.type == "move-unit") {
        pos = stateChange.data.fromPosition;
        var to = stateChange.data.toPosition;
    }
    else if (stateChange.type == "turn-passover") {
        if (stateChange.from == RED_SIDE) {
            state.currentTurn = BLUE_SIDE;
            state.blueTurnCount++;
        }
        else {
            state.currentTurn = RED_SIDE;
            state.redTurnCount++;
        }
        state.turnEndTime = Date.now() + availableTurnTime(state, state.currentTurn);

        // Turn End Procedures, Buildings!
        for (let i = 0; i < state.structures.length; i++) {
            if (state.structures[i].side == stateChange.from &&
                state.structures[i].turnsUntilBuilt != 0) {
                state.structures[i].turnsUntilBuilt -= 1;
            }
        }
        for (let i = 0; i < state.units.length; i++) {
            if (state.units[i].side == stateChange.from &&
                state.units[i].turnsUntilBuilt != 0) {
                state.units[i].turnsUntilBuilt -= 1;
            }
        }
    }
}

function availableTurnTime(state, side) {
    if (side == RED_SIDE) {
        return 1000 * ((30) + (state.redTurnCount - 1) * 5);
    }
    else {
        return 1000 * ((30) + (state.blueTurnCount - 1) * 5);
    }
}