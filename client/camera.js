const { Tuple } = require('../shared/coordinates');

/* The camera is realistically actually controlled by the minimap rectangle */
module.exports = class Camera {
    constructor() {
        this.position = new Tuple(500, 500);
        this.delta = new Tuple(0, 0);
        this.scale = 1;
    }

    toCameraCoord(position) {
        return new Tuple(
            (position.x - this.position.x) * this.scale + window.innerWidth / 2,
            (position.y - this.position.y) * this.scale + window.innerHeight / 2
        );
    }

    toWorldCoord(position) {
        return new Tuple(
            (position.x - window.innerWidth / 2) / this.scale + this.position.x,
            (position.y - window.innerHeight / 2) / this.scale + this.position.y
        );
    }
};
