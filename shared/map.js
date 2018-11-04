const { Tuple } = require('./coordinates');

class Tile {
    constructor(item) {
        this.tileType = parseInt(item);
        this.displayType = this.tileType;
    }
}

const map = require('./maps/big.js');

console.log('Loading map...');
map.data = map.data.map(row => row.split(' ').map(tile => new Tile(tile)));

module.exports.map = map;
module.exports.Tiles =  {
    DEFAULT: 1,
    BRUSH: 2,
    MINERAL: 3,
    BIG_MINERAL: 4,
    ROCK: 5,
    HIGH: 6,
    LOW: 7
};

module.exports.withinMap = (tile) => {
    return !(tile.x < 0 || tile.y < 0 ||
        tile.x >= map.data[0].length || tile.y >= map.data.length);
};
