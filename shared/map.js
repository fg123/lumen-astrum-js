class Tile {
    constructor(item) {
        this.tileType = parseInt(item);
        this.displayType = this.tileType;
        this.isHighGround = false;
        this.highGroundGroup = -1;
        this.jungleDist = -1;
    }
}

const Constants = require('./constants');
const { Tuple, getSurrounding } = require('./coordinates');

const Tiles = {
    NONE: 0,
    DEFAULT: 1,
    BRUSH: 2,
    MINERAL: 3,
    BIG_MINERAL: 4,
    ROCK: 5,
    HIGH: 6,
    LOW: 7
};

const setupMap = (map) => {
    console.log('Loading map...');
    if (typeof map.data[0] === 'string') {
        map.data = map.data.map(row => row.split(' ').map(tile => new Tile(tile)));
        
        map.withinMap = (tile) => {
            return !(tile.x < 0 || tile.y < 0 ||
                tile.x >= map.data[0].length || tile.y >= map.data.length);
        };

        /* Initial Setup for Map Data */
        map.territorialTiles = 0;
        map.bigMineralLocations = [];
        map.smallMineralLocations = [];

        let nextGroup = 0;
        for (let y = 0; y < map.data.length; y++) {
            for (let x = 0; x < map.data[0].length; x++) {
                const type = map.data[y][x].displayType;
                if (type === Tiles.HIGH && map.data[y][x].highGroundGroup <= 0) {
                    applyHighGroundGroup(map, new Tuple(x, y), nextGroup);
                    nextGroup += 1;
                }
                if (type !== Tiles.BRUSH &&
                    type !== Tiles.ROCK) {
                    map.territorialTiles += 1;
                }
                if (type === Tiles.BIG_MINERAL) {
                    map.bigMineralLocations.push(new Tuple(x, y));
                    map.data[y][x].displayType = Tiles.DEFAULT;
                }
                else if (type === Tiles.MINERAL) {
                    map.smallMineralLocations.push(new Tuple(x, y));
                    map.data[y][x].displayType = Tiles.DEFAULT;
                }
            }
        }
    }
    return map;
}

// let map = setupMap(Constants.IS_PRODUCTION ? require('./maps/big') : require('./maps/small'));
let map = setupMap(require('./maps/redesign'));

/* Recursively applies the group to any high ground surrounding */
const applyHighGroundGroup = (map, start, group) => {
    const nodes = [start];
    while (nodes.length !== 0) {
        const current = nodes[0];
        nodes.splice(0, 1);
        const tile = map.data[current.y][current.x];
        if (tile.displayType === Tiles.NONE || tile.displayType === Tiles.ROCK ||
            tile.displayType === Tiles.LOW || tile.highGroundGroup >= 0) {
            continue;
        }
        Array.prototype.push.apply(nodes, getSurrounding(current, 1).filter(map.withinMap));
        if (tile.displayType !== Tiles.DEFAULT) {
            tile.isHighGround = true;
        }
        tile.highGroundGroup = group;
    }
};


const getVisible = (point, sightRange) => {
    /* Returns visibility map of a given point */
    /* Checks for Brush, High Ground and High Ground Groups */
    if (map.data[point.y][point.x].displayType === Tiles.BRUSH) {
        sightRange = Constants.BRUSH_VISION;
    }
    const start = new Tuple(point.x, point.y).toCubeCoordinates();
    const visited = new Set();
    let result = [];
    const jungDist = {};
    visited.add(JSON.stringify(start));
    result.push(start.toOffsetCoordinates());
    const fringes = [];
    fringes.push([start]);

    for (let i = 0; i < sightRange; i++) {
        fringes.push([]);
        fringes[i].forEach((hex) => {
            const curString = JSON.stringify(hex);
            hex.getNeighbours().forEach((neighbour) => {
                const n_coord = neighbour.toOffsetCoordinates();
                if (!map.withinMap(n_coord) ||
                    map.data[n_coord.y][n_coord.x].displayType === Tiles.NONE) {
                    // Don't explore
                    return;
                }
                const neighbourString = JSON.stringify(neighbour);
                if (!visited.has(neighbourString)) {
                    let keepExplore = true;
                    if (map.data[n_coord.y][n_coord.x].displayType === Tiles.BRUSH) {
                        jungDist[neighbourString] = curString in jungDist ? jungDist[curString] + 1 : 0;
                        if (jungDist[neighbourString] >= Constants.BRUSH_VISION) {
                            keepExplore = false;
                        }
                    }
                    if (map.data[point.y][point.x].displayType === Tiles.LOW &&
                        map.data[n_coord.y][n_coord.x].isHighGround) {
                        // Trying to see high ground from low ground
                        keepExplore = false;
                    }
                    else if (map.data[n_coord.y][n_coord.x].isHighGround &&
                             map.data[n_coord.y][n_coord.x].highGroundGroup !==
                                map.data[point.y][point.x].highGroundGroup) {
                        // Trying to see high ground from different high ground group
                        keepExplore = false;
                    }
                    visited.add(neighbourString);
                    if (keepExplore) {
                        result.push(n_coord);
                        fringes[i + 1].push(neighbour);
                    }
                }
            });
        });
    }
    return result;
};

const findTargetPos = (state, pos) => {
    let target = state.mapObjects[pos.y][pos.x];
    if (target === undefined) {
        /* No direct target, check for occupied mapping */
        const occupiedPoint = state.occupied[pos.y][pos.x];
        if (occupiedPoint && occupiedPoint !== true) {
            return occupiedPoint;
        }
    }
    return pos;
};

const findTarget = (state, pos) => {
    if (!map.withinMap(pos)) {
        return undefined;
    }
    const targetPos = findTargetPos(state, pos);
    let target = state.mapObjects[targetPos.y][targetPos.x];
    return target;
};

const replenishShield = (mapObject) => {
    const shieldToReplenish = Math.ceil(mapObject.maxShield / 10);
    mapObject.currentShield += shieldToReplenish;
    if (mapObject.currentShield > mapObject.maxShield) {
        mapObject.currentShield = mapObject.maxShield;
    }
};

module.exports = {
    map,
    Tiles,
    getVisible,
    findTargetPos,
    findTarget,
    replenishShield,
    setupMap,
    Tile
};
