var fs = require('fs');
var map = [];
var contents = fs.readFileSync("server/maps/map.cfg", "utf8").toString().split("\n");

console.log("Loading map...");
for (var i = 0; i < contents.length; i++) {
    var row = contents[i].split(' ');
    var _row = [];
    for (var j = 0; j < row.length; j++) {
        _row.push(createTile(row[j]));
    }
    map.push(_row);
}

module.exports = map;

function createTile(item) {
    var tileType = parseInt(item);
    var displayType = tileType;
    return { tileType: tileType, displayType: displayType };
}