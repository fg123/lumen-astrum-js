// Generates a sprite sheet based on animation file / data
// usage: node animator.js [directory] [animation.json]

if (process.argv.length !== 4) {
    console.log('usage: node animator.js [directory] [animation.json]');
    process.exit(1);
}

const { loadLayers, makeFrame, simulateFrames } = require('./utils');
const path = require('path');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const directory = process.argv[2];
const animationJson = process.argv[3];

const animation = JSON.parse(fs.readFileSync(path.join(directory, animationJson)));
const layers = JSON.parse(fs.readFileSync(path.join(directory, 'layers.json')));

const animationState = {};
let frameWidth = 0;
let frameHeight = 0;

loadLayers(layers, animationState, directory, loadImage).then((obj) => {
    frameWidth = obj.width;
    frameHeight = obj.height;
    console.log(frameWidth, frameHeight);

    const numFrames = animation.duration;
    
    const staticOne = createCanvas(frameWidth, frameHeight);
    makeFrame(animationState, staticOne.getContext('2d'), frameWidth, frameHeight);
    
    const spriteSheetCanvas = createCanvas(frameWidth * (numFrames + 1), frameHeight);
    const context = spriteSheetCanvas.getContext('2d');

    const frames = simulateFrames(animationState, animation);
    for (let i = 0; i < frames.length; i++) {
        makeFrame({ 
            layerImages: animationState.layerImages,
            layerProperties: frames[i]
        }, context, frameWidth, frameHeight);
    }

    const out = fs.createWriteStream(path.join(directory, `${path.basename(animationJson, '.json')}.png`));
    spriteSheetCanvas.createPNGStream().pipe(out);
    out.on('finish', () => console.log('The PNG file was created.'));

    const oneFrame = fs.createWriteStream(path.join(directory, `base.png`));
    staticOne.createPNGStream().pipe(oneFrame);
    oneFrame.on('finish', () => console.log('The PNG file was created.'));
}).catch((error) => {
    console.error(error);
});
