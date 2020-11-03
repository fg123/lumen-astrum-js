const $ = require('jquery-browserify');
const { Resource } = require('./resources');

const Data = require('../shared/data.js');

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

    loadResources(deferArr) {
        const resourcesToLoad = Object.values(Resource);
        for (let i = 0; i < resourcesToLoad.length; i++) {
            this.loadResource(this.resources, resourcesToLoad[i], '/' + resourcesToLoad[i], deferArr);
        }

        // Load in Icons and Textures for all mapObjects
        const resources = new Set();
        Object.values(Data.structures).forEach(s => {
            if (s.icon) resources.add(s.icon);
            if (s.texture) resources.add(s.texture);
        });
        Object.values(Data.units).forEach(s => {
            if (s.icon) resources.add(s.icon);
            if (s.texture) resources.add(s.texture);
        });
        
        resources.forEach(key => {
            this.loadResource(this.resources, key, '/resources/' + key, deferArr);
        });
    }
};


