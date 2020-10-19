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
    },

    toRectanglePerimeter(rect, theta) {
        const twoPI = Math.PI * 2;
        
        while (theta < -Math.PI) {
            theta += twoPI;
        }
        
        while (theta > Math.PI) {
            theta -= twoPI;
        }
        
        const rectAtan = Math.atan2(rect.height, rect.width);
        const tanTheta = Math.tan(theta);
        let region;
        
        if ((theta > -rectAtan) && (theta <= rectAtan)) {
            region = 1;
        } else if ((theta > rectAtan) && (theta <= (Math.PI - rectAtan))) {
            region = 2;
        } else if ((theta > (Math.PI - rectAtan)) || (theta <= -(Math.PI - rectAtan))) {
            region = 3;
        } else {
            region = 4;
        }
        
        const edgePoint = {x: rect.width/2, y: rect.height/2};
        let xFactor = 1;
        let yFactor = 1;
        
        switch (region) {
            case 1: yFactor = -1; break;
            case 2: yFactor = -1; break;
            case 3: xFactor = -1; break;
            case 4: xFactor = -1; break;
        }
        
        if ((region === 1) || (region === 3)) {
            edgePoint.x += xFactor * (rect.width / 2.);                                     // "Z0"
            edgePoint.y += yFactor * (rect.width / 2.) * tanTheta;
        } else {
            edgePoint.x += xFactor * (rect.height / (2. * tanTheta));                        // "Z1"
            edgePoint.y += yFactor * (rect.height /  2.);
        }
        
        return edgePoint;
    }
};
