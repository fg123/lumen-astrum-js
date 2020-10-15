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

        const structureNames = Object.keys(Data.structures);
        for (let i = 0; i < structureNames.length; i++) {
            const name = structureNames[i];
            const url = '/resources/structures/' + name.toLowerCase().replace(/[ ']/g, '') + '.png';
            this.loadResource(Data.structures[name], 'image', url, deferArr);
        }

        const unitNames = Object.keys(Data.units);
        for (let i = 0; i < unitNames.length; i++) {
            const name = unitNames[i];
            const url = '/resources/units/' + name.toLowerCase().replace(/[ ']/g, '') + '.png';
            this.loadResource(Data.units[name], 'image', url, deferArr);
        }
    }
};


