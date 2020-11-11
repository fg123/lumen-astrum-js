// Generates a sprite sheet based on animation file / data
// usage: node animator.js [directory] [animation.json]

if (process.argv.length !== 4) {
    console.log('usage: node animator.js [directory] [animation.json]');
    process.exit(1);
}

const path = require('path');
const fs = require('fs');
const canvas = require('canvas');

const directory = process.argv[2];
const animationJson = process.argv[3];

const animation = JSON.parse(fs.readFileSync(path.join(directory, animationJson)));
const layers = JSON.parse(fs.readFileSync(path.join(directory, 'layers.json')));

console.log(animation);
