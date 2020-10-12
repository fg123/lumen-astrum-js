const TinyQueue = require('tinyqueue');
const { Tuple } = require('./coordinates');
const { map } = require('./map');

class Node {
    constructor(position, costToEnd) {
        this.position = position;
        this.costToEnd = costToEnd;
    }
}

module.exports = class PathFinder {
    /* Does not include start */
    static findPath(gameState, start, end) {
        start = new Tuple(start.x, start.y).toCubeCoordinates();
        end = new Tuple(end.x, end.y).toCubeCoordinates();

        const startNode = new Node(start, this.manhattanDistance(start, end));
        const frontier = new TinyQueue(
            [startNode],
            function (a, b) {
                return a.costToEnd - b.costToEnd;
            }
        );
        const cameFrom = {};
        const costSoFar = {};
        cameFrom[start.hash()] = undefined;
        costSoFar[start.hash()] = 0;

        let endNode = undefined;
        while (frontier.length !== 0) {
            const current = frontier.pop();
            if (current.position.equals(end)) {
                endNode = current;
                break;
            }

            current.position.getNeighbours().filter(node => {
                const offset = node.toOffsetCoordinates();
                return map.withinMap(offset) && !gameState.occupied[offset.y][offset.x];
            }).forEach(next => {
                const newCost = costSoFar[current.position.hash()] + 5;
                if (costSoFar[next.hash()] === undefined || newCost < costSoFar[next.hash()]) {
                    costSoFar[next.hash()] = newCost;
                    const priority = newCost + this.manhattanDistance(current.position, next);
                    frontier.push(new Node(next, priority));
                    cameFrom[next.hash()] = current;
                }
            });
        }

        if (endNode) {
            const result = [];
            while (!endNode.position.equals(start)) {
                result.unshift(endNode.position.toOffsetCoordinates());
                endNode = cameFrom[endNode.position.hash()];
            }
            return result;
        } else {
            return [];
        }
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
        return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y),
            Math.abs(a.z - b.z));
    }
};
