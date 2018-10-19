class Tuple {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    toCubeCoordinates() {
        const cubex = this.x;
        const cubez = this.y - (this.x - this.x % 2) / 2;
        const cubey = - cubex - cubez;
        return new Triple(cubex, cubey, cubez);
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    hash() {
        return JSON.stringify(this);
    }

    toTileCoord() {
        const XYVertex = false;
        const s = 64;
        const t = 32;
        const r = 55;
        const h = 111;
        let mx = parseInt(this.x) + 64;
        const my = parseInt(this.y) + 55;

        //correction for BORDERS and XYVertex
        if (XYVertex) mx += t;

        let x = parseInt(mx / (s + t)); //this gives a quick value for x. It works only on odd cols and doesn't handle the triangle sections. It assumes that the hexagon is a rectangle with width s+t (=1.5*s).
        let y = parseInt((my - (x % 2) * r) / h); //this gives the row easily. It needs to be offset by h/2 (=r)if it is in an even column

        /******FIX for clicking in the triangle spaces (on the left side only)*******/
        //dx,dy are the number of pixels from the hex boundary. (ie. relative to the hex clicked in)
        const dx = mx - x * (s + t);
        const dy = my - y * h;
        let result = Tuple.NEG_ONE;
        if (my - (x % 2) * r > 0) { //prevent clicking half empty
            if (x % 2 === 0) {
                if (dy > r) {	//bottom half of hexes
                    if (dx * r / t < dy - r) {
                        x--;
                    }
                }
                if (dy < r) {	//top half of hexes
                    if ((t - dx) * r / t > dy) {
                        x--;
                        y--;
                    }
                }
            }
            else {  // odd columns
                if (dy > h) {	//bottom half of hexes
                    if (dx * r / t < dy - h) {
                        x--;
                        y++;
                    }
                }
                if (dy < h) {	//top half of hexes
                    if ((t - dx) * r / t > dy - r) {
                        x--;
                    }
                }
            }
            result = new Tuple(x, y);
        }
        return result;
    }
}

Tuple.ZERO = new Tuple(0, 0);
Tuple.NEG_ONE = new Tuple(-1, -1);

module.exports.Tuple = Tuple;

class Triple {
    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toOffsetCoordinates() {
        const cubex = this.x;
        const cubey = this.z + (this.x - this.x % 2) / 2;
        return new Tuple(cubex, cubey);
    }

    getNeighbours() {
        return surroundingTriple(this, 1);
    }

    equals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    hash() {
        return JSON.stringify(this);
    }
}

module.exports.Triple = Triple;

function surroundingTriple(a, width) {
    const results = [];
    for (let dx = -width; dx <= width; dx++) {
        for (let dy = Math.max(-width, -dx - width);
            dy <= Math.min(width, -dx + width); dy++) {
            const dz = -dx - dy;
            results.push(new Triple(a.x + dx, a.y + dy, a.z + dz));
        }
    }
    return results;
}
module.exports.getSurrounding = (a, width) => {
    a = new Tuple(a.x, a.y).toCubeCoordinates();
    return surroundingTriple(a, width).map(n => n.toOffsetCoordinates());
};

module.exports.getReachable = (start, max, isBlock) => {
    start = new Tuple(start.x, start.y).toCubeCoordinates();
    /* Distance limited flood fill */
    const visited = new Set();
    const result = [];
    visited.add(JSON.stringify(start));
    result.push(start.toOffsetCoordinates());
    const fringes = [];
    fringes.push([start]);

    for (let i = 0; i < max; i++) {
        fringes.push([]);
        fringes[i].forEach((hex) => {
            hex.getNeighbours().forEach((neighbour) => {
                const neighbourString = JSON.stringify(neighbour);
                if (!visited.has(neighbourString) &&
                    !isBlock(neighbour.toOffsetCoordinates())) {
                    visited.add(neighbourString);
                    result.push(neighbour.toOffsetCoordinates());
                    fringes[i + 1].push(neighbour);
                }
            });
        });
    }
    return result;
};
