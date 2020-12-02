class Tile {
    constructor(item) {
        this.tileType = parseInt(item);
        this.displayType = this.tileType;
        this.isHighGround = false;
        this.highGroundGroup = -1;
        this.jungleDist = -1;
    }
}

const { Tuple, getSurrounding } = require('./coordinates');

const Tiles = {
    NONE: 0,
    DEFAULT: 1,
    BRUSH: 2,
    MINERAL: 3,
    BIG_MINERAL: 4,
    ROCK: 5,
    HIGH: 6,
    LOW: 7,
    TELEPORT_IN: 8,
    TELEPORT_OUT: 9
};

const setupMap = (map) => {
    console.log('Setting up map...');
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

        if (!map.teleporters) {
            map.teleporters = [];
        }
        
        let nextGroup = 0;
        for (let y = 0; y < map.data.length; y++) {
            for (let x = 0; x < map.data[0].length; x++) {
                const type = map.data[y][x].displayType;
                if (type === Tiles.HIGH && map.data[y][x].highGroundGroup <= 0) {
                    applyHighGroundGroup(map, new Tuple(x, y), nextGroup);
                    nextGroup += 1;
                }
                // Unclaimable Tiles
                if (type !== Tiles.BRUSH &&
                    type !== Tiles.ROCK &&
                    type !== Tiles.NONE &&
                    type !== Tiles.BIG_MINERAL &&
                    type !== Tiles.HIGH) {
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

/* Recursively applies the group to any high ground surrounding */
const applyHighGroundGroup = (map, start, group) => {
    const nodes = [start];
    while (nodes.length !== 0) {
        const current = nodes[0];
        nodes.splice(0, 1);
        const tile = map.data[current.y][current.x];
        if (tile.displayType === Tiles.NONE || tile.displayType === Tiles.ROCK ||
            tile.displayType === Tiles.LOW || 
            tile.displayType === Tiles.MINERAL ||
            tile.highGroundGroup >= 0) {
            continue;
        }
        Array.prototype.push.apply(nodes, getSurrounding(current, 1).filter(map.withinMap));
        if (tile.displayType !== Tiles.DEFAULT) {
            tile.isHighGround = true;
        }
        tile.highGroundGroup = group;
    }
};

const replenishShield = (mapObject) => {
    const shieldToReplenish = Math.ceil(mapObject.maxShield / 10);
    mapObject.currentShield += shieldToReplenish;
    if (mapObject.currentShield > mapObject.maxShield) {
        mapObject.currentShield = mapObject.maxShield;
    }
};

const maps = {
    '4p': require('./maps/redesign.js'),
    '3p': require('./maps/raidboss.js'),
    '2p-anchor': require('./maps/2p-anchor.js'),
    '2p-duel': require('./maps/2p-duel.js'),
    '2p-anchor-ghost': require('./maps/2p-anchor-ghost.js'),
    '2p-cornucopia': require('./maps/2p-cornucopia.js'),
    '2p-coliseum': require('./maps/2p-coliseum.js'),
    '2v2': require('./maps/2v2.js'),
    'testMap': require('./maps/testMap.js'),
    'pve': require('./maps/pve.js')
};

module.exports = {
    Tiles,
    replenishShield,
    setupMap,
    Tile,
    maps
};
