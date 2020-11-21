const $ = require('jquery-browserify');
const { Resource } = require('./resources');

const axios = require('axios');
const Data = require('../shared/data.js');
const { simulateFrames, loadLayers } = require('../animation/utils');
const Modifiers = require('../shared/modifier');

// Manages a single instance of all loaded textures, resources, and animations
module.exports = class ResourceManager {
    constructor(onDone) {
        this.resources = {};
        this.deferArr = [];
        this.loadResources(this.deferArr);
        $.when(...this.deferArr).then(() => {
            onDone(this);
        });
    }

    get(key) {
        const resource = this.resources[key];
        if (!resource) {
            console.error('Resource ' + key + ' not found!');
        }
        return resource;
    }

    loadResource(location, key, url, deferArr) {
        const deferred = new $.Deferred();
        location[key] = new Image();
        location[key].onload = () => {
            console.log('Resource loaded: ' + url);
            deferred.resolve();
        };
        location[key].onerror = () => {
            console.error('Couldn\'t load resource: ' + url);
        };
        location[key].src = url;
        deferArr.push(deferred);
    }

    loadAnimations(animationObj, resources, deferArr) {
        // All resources needed by the animation into resources
        // Loading animation JSONs into deferArr
        // We will simulate all the animations on startup so that the game
        //   doesn't need to runtime do the animation. This won't work for
        //   future animations if we want to add randomness / particle systems
        if (animationObj.baseLayer) {
            const baseLayerPath = animationObj.baseLayer;
            const animationBaseDir = baseLayerPath.match(/.*\//)[0];
            const baseLayerDefer = new $.Deferred();
            axios.get('/resources/' + baseLayerPath).then((response) => {
                // Load Base Layer JSON
                const baseLayer = response.data;
                const layerDefers = [];

                // Now we load the images in the layers
                Object.values(baseLayer).forEach((o) => {
                    const imageUrl = animationBaseDir + o.resource;
                    this.loadResource(resources, imageUrl, '/resources/' + imageUrl, layerDefers);
                });

                $.when(...layerDefers).then(() => {
                    // All the layer resources have loaded in, grab an initialized 
                    //   base layer state
                    const baseAnimationState = {};
                    loadLayers(baseLayer, baseAnimationState, animationBaseDir, (resource) => {
                        console.log(resource);
                        return this.resources[resource];
                    }).then((obj) => {
                        baseAnimationState.width = obj.width;
                        baseAnimationState.height = obj.height;
                        // Base Animation State
                        resources[animationObj.baseLayer] = baseAnimationState;
                        console.log('Base Layer Loaded: ', baseLayerPath, baseAnimationState);

                        // Load the rest of the animations
                        Object.keys(animationObj).forEach((key) => {
                            if (key === 'baseLayer') {
                                // Already Handled Above
                                return;
                            }
                            if (!animationObj[key]) return;
                            // Otherwise it references a JSON file for an animation
                            const animationDefer = new $.Deferred();
                            axios.get('/resources/' + animationObj[key]).then((response) => {
                                // Simulate Frames
                                console.log(response.data);
                                const frames = simulateFrames(baseAnimationState, response.data);
                                console.log('Animation Loaded: ', animationObj[key], frames);
                                resources[animationObj[key]] = frames;
                                animationDefer.resolve();
                            }).catch((error) => {
                                console.error('Could not load resource ' + animationObj[key], error);
                            });
                            deferArr.push(animationDefer);
                        });

                        baseLayerDefer.resolve();
                    }).catch(error => {
                        console.error('Could not load layers', error);
                    });
                });
            }).catch((error) => {
                console.error('Could not load resource ' + baseLayerPath, error);
            });
            deferArr.push(baseLayerDefer);
        }
    }

    loadResources(deferArr) {
        const resourcesToLoad = Object.values(Resource);
        for (let i = 0; i < resourcesToLoad.length; i++) {
            this.loadResource(this.resources, resourcesToLoad[i], '/' + resourcesToLoad[i], deferArr);
        }

        // Load in Icons, Textures and Animations for all mapObjects
        const resources = new Set();
        Object.values(Data.structures).forEach(s => {
            if (s.icon) resources.add(s.icon);
            if (s.texture) resources.add(s.texture);
            if (s.animation) this.loadAnimations(s.animation, this.resources, deferArr);
        });

        Object.values(Data.units).forEach(s => {
            if (s.icon) resources.add(s.icon);
            if (s.texture) resources.add(s.texture);
            if (s.animation) this.loadAnimations(s.animation, this.resources, deferArr);
        });
        
        Object.values(Modifiers).forEach(ModConstructor => {
            const mod = new ModConstructor();
            const icon = mod.getIcon();
            if (icon) {
                resources.add(icon);
            }
        });
        
        resources.forEach(key => {
            this.loadResource(this.resources, key, '/resources/' + key, deferArr);
        });
    }
};


