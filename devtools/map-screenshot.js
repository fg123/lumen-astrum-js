// Creates a image of the map
// usage: node map-screenshot.js map.js map.png
const { tiles } = require('../client/resources');
const { toDrawCoord } = require("../client/utils");
const { setupMap } = require("../shared/map");
const path = require('path');
const fs = require('fs');
const { createCanvas, loadImage } = require("canvas");

if (process.argv.length !== 4) {
    console.log('usage: node map-screenshot.js [map.js] [map.png]');
    process.exit(1);
}

const mapJs = process.argv[2];
const mapPng = process.argv[3];
const images = [];
const waiting = [];
tiles.forEach((t, index) => {
    waiting.push(new Promise((resolve, reject) => {
        loadImage('client/' + t).then((image) => {
            images[index] = image;
            resolve();
        });
    }));
});

Promise.all(waiting).then(() => {
    const map = setupMap(require(path.join(process.cwd(), mapJs)));

    const max = toDrawCoord(map.data[0].length, map.data.length);
    const min = toDrawCoord(0, 0);
    console.log(min, max);
    const canvas = createCanvas(max.x + 32, max.y);
    const context = canvas.getContext('2d');
    context.fillStyle = "#000";
    context.fillRect(0, 0, max.x + 32, max.y);
    for (let y = 0; y < map.data.length; y++) {
        for (let x = 0; x < map.data[0].length; x++) {
            const drawCoord = toDrawCoord(x, y);
            let displayType = map.data[y][x].tileType;
            
            if (displayType !== 0) {
                context.drawImage(images[displayType - 1], drawCoord.x, drawCoord.y);
            }
        }
    }
    
    const stream = fs.createWriteStream(mapPng);
    canvas.createPNGStream().pipe(stream);    
});
