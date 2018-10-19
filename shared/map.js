const { Tuple } = require('./coordinates');
const fs = require('fs');

class Tile {
    constructor(item) {
        this.tileType = parseInt(item);
        this.displayType = this.tileType;
    }
}

const map = [];
const contents = fs.readFileSync('server/maps/map.cfg', 'utf8').toString().split('\n');

console.log('Loading map...');
for (let i = 0; i < contents.length; i++) {
    const row = contents[i].split(' ');
    const _row = [];
    for (let j = 0; j < row.length; j++) {
        _row.push(new Tile(row[j]));
    }
    map.push(_row);
}
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
        tile.x >= map[0].length || tile.y >= map.length);
};

module.exports.RED_SIDE_COMMAND_CENTER_LOC = new Tuple(6, 19);
module.exports.BLUE_SIDE_COMMAND_CENTER_LOC = new Tuple(47, 6);
