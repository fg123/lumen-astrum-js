const { Triple } = require('./coordinates');

module.exports = class PathFinder {
    static findPath(state, a, b) {
        //const openNodes = [a];
        //const visited = [];
        // TODO(fg123): Implement rest of pathfinding system.
        return [a, b];
    }

    static nodeInList(a, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].x === a.x && list[i].y === a.y && list[i].z === a.z) {
                return true;
            }
        }
        return false;
    }

    // A and B are triples!
    static manhattanDistance(a, b) {
        return parseInt(Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y),
            Math.abs(a.z - b.z)));
    }
};
