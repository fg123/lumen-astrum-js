const { Tuple } = require('../shared/coordinates');
const { MAP_TILE_DRAW_X_MULTIPLIER, MAP_TILE_DRAW_Y_MULTIPLIER} = require('../shared/constants');

module.exports = {
    toRadians(angle) {
        return angle * (Math.PI / 180);
    },

    toDegrees(angle) {
        return angle * (180 / Math.PI);
    },

    distance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    },

    toDrawCoord(nodeOrX, maybeY) {
        if (maybeY !== undefined) {
            return new Tuple(nodeOrX * MAP_TILE_DRAW_X_MULTIPLIER,
                (maybeY * MAP_TILE_DRAW_Y_MULTIPLIER) + (nodeOrX % 2) * Math.floor(MAP_TILE_DRAW_Y_MULTIPLIER / 2));
        }
        return new Tuple(nodeOrX.x * MAP_TILE_DRAW_X_MULTIPLIER,
            (nodeOrX.y * MAP_TILE_DRAW_Y_MULTIPLIER) + (nodeOrX.x % 2) * Math.floor(MAP_TILE_DRAW_Y_MULTIPLIER / 2));
    },
    
    roundToNearest(n, roundTo) {
        return Math.round(n / roundTo) * roundTo;
    }
};
