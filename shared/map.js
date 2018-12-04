class Tile {
    constructor(item) {
        this.tileType = parseInt(item);
        this.displayType = this.tileType;
        this.isHighGround = false;
        this.highGroundGroup = -1;
    }
}

const map = require('./maps/big.js');
const { Tuple, getSurrounding } = require('./coordinates');

console.log('Loading map...');
map.data = map.data.map(row => row.split(' ').map(tile => new Tile(tile)));

const Tiles =  {
    DEFAULT: 1,
    BRUSH: 2,
    MINERAL: 3,
    BIG_MINERAL: 4,
    ROCK: 5,
    HIGH: 6,
    LOW: 7
};

const withinMap = (tile) => {
    return !(tile.x < 0 || tile.y < 0 ||
        tile.x >= map.data[0].length || tile.y >= map.data.length);
};

/* Recursively applies the group to any high ground surrounding */
const applyHighGroundGroup = (start, group) => {
    const nodes = [start];
    while (nodes.length !== 0) {
        const current = nodes[0];
        nodes.splice(0, 1);
        const tile = map.data[current.y][current.x];
        if (tile.displayType === Tiles.ROCK || tile.displayType === Tiles.LOW || tile.highGroundGroup >= 0) {
            continue;
        }
        Array.prototype.push.apply(nodes, getSurrounding(current, 1).filter(withinMap));
        if (tile.displayType !== Tiles.DEFAULT) {
            tile.isHighGround = true;
        }
        tile.highGroundGroup = group;
    }
};

/* Initial Setup for Map Data */
let nextGroup = 0;
for (let y = 0; y < map.data.length; y++) {
    for (let x = 0; x < map.data[0].length; x++) {
        const type = map.data[y][x].displayType;
        if (type === Tiles.HIGH && map.data[y][x].highGroundGroup <= 0) {
            applyHighGroundGroup(new Tuple(x, y), nextGroup);
            nextGroup += 1;
        }
    }
}
const getVisible = (point, sightRange) => {
    /* Returns visibility map of a given point */
    // TODO: Implement Brush Mechanics
    let surrounding = getSurrounding(point, sightRange).filter(
        point => withinMap(point)
    );
    /* A unit or structure can only be on high, default, or low */
    if (map.data[point.y][point.x].displayType === Tiles.LOW) {
        surrounding = surrounding.filter(pt => !map.data[pt.y][pt.x].isHighGround);
    }
    else {
        const group = map.data[point.y][point.x].highGroundGroup;
        /* We only keep non-high grounds or high grounds in the same group */
        surrounding = surrounding.filter(pt => {
            const tile = map.data[pt.y][pt.x];
            return !tile.isHighGround || tile.highGroundGroup === group;
        });
    }
    return surrounding;
};

module.exports = {
    map,
    Tiles,
    withinMap,
    getVisible
};