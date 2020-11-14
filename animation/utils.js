async function loadLayers(layers, destination, baseDirectory, loadImage) {
    let frameWidth = 0;
    let frameHeight = 0;

    const keys = Object.keys(layers);
    destination.layerImages = {};
    destination.layerProperties = {};

    for (let i = 0; i < keys.length; i++) {
        const obj = layers[keys[i]];
        if (!baseDirectory.endsWith('/')) {
            baseDirectory += '/';
        }
        const image = await loadImage(baseDirectory + obj.resource);
        if (obj.x === undefined) {
            obj.x = 0;
        }
        if (obj.y === undefined) {
            obj.y = 0;
        }
        const layer = {
            'image': keys[i],
            'z': obj.z,
            'x': obj.x,
            'y': obj.y,
            'ax': obj.ax || image.width / 2,
            'ay': obj.ay || image.height / 2,
            'rotation': obj.rotation || 0,
            'opacity': obj.opacity || 100
        };
        frameWidth = Math.max(frameWidth, image.width);
        frameHeight = Math.max(frameHeight, image.height);
        destination.layerImages[keys[i]] = image;
        destination.layerProperties[keys[i]] = layer;
    }
    return { width: frameWidth, height: frameHeight };
}

module.exports.loadLayers = loadLayers;

function makeFrame(animationState, context, frameWidth, frameHeight, shiftOver = true) {
    // Sort by z order
    const currentLayers = Object.values(animationState.layerProperties);

    currentLayers.sort((a, b) => a.z - b.z);

    for (let i = 0; i < currentLayers.length; i++) {
        const layer = currentLayers[i];
        context.globalAlpha = layer.opacity / 100;
        context.translate(layer.x + frameWidth / 2, layer.y + frameHeight / 2);
        context.rotate(layer.rotation * Math.PI / 180);
        context.drawImage(animationState.layerImages[layer.image], -layer.ax, -layer.ay);
        context.rotate(-layer.rotation * Math.PI / 180);
        context.translate(-(layer.x + frameWidth / 2), -(layer.y + frameHeight / 2));
    }
    if (shiftOver) {
        context.translate(frameWidth, 0);
    }
}

module.exports.makeFrame = makeFrame;

function simulateFrames(startingState, animation) {
    const animationState = JSON.parse(JSON.stringify(startingState.layerProperties));
    const frames = [];
    
    const numFrames = animation.duration;
    let time = 0;
    let nextKeyframe = 0;
    const keyframes = animation.frames;
    for (let frame = 0; frame < numFrames; frame++) {
        frames.push(JSON.parse(JSON.stringify(animationState)));

        time += 1;

        // Update Animation State
        const keyframe = keyframes[nextKeyframe];
        const layersWithChanges = Object.keys(keyframe.delta);
        for (let i = 0; i < layersWithChanges.length; i++) {
            const layerKey = layersWithChanges[i];
            const layerToChange = animationState[layerKey];
            const propertiesToLerp = Object.keys(keyframe.delta[layerKey]);
            for (let j = 0; j < propertiesToLerp.length; j++) {
                const prop = propertiesToLerp[j];
                const curr = layerToChange[prop];
                const dest = keyframe.delta[layerKey][prop];
                if (dest === undefined) continue;
                let deltaTime = keyframe.time - time;

                let newValue = deltaTime !== 0 ? curr + ((((dest - curr)) / (deltaTime))) : dest;

                if (Math.abs(newValue) <= 10e-10) {
                    newValue = 0;
                }

                // console.log(`[${time}] Changing`,  layerKey, prop, 'from', curr, 'to', dest, ':', newValue);
                layerToChange[prop] = newValue;
            }
        }
        
        if (time >= keyframe.time) {
            nextKeyframe += 1;
            if (nextKeyframe >= keyframes.length) {
                nextKeyframe = keyframes.length - 1;
            }
        }
    }
    
    frames.push(JSON.parse(JSON.stringify(animationState)));
    return frames;
}

module.exports.simulateFrames = simulateFrames;
