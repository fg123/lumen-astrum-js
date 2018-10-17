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

    equals(otherTuple) {
        return this.x === otherTuple.x && this.y === otherTuple.y;
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
}

module.exports.Triple = Triple;

module.exports.getSurrounding = (a, width) => {
    a = new Tuple(a.x, a.y).toCubeCoordinates();
    const results = [];
    for (let dx = -width; dx <= width; dx++) {
        for (let dy = Math.max(-width, -dx - width);
            dy <= Math.min(width, -dx + width); dy++) {
            const dz = -dx - dy;
            results.push(new Triple(a.x + dx, a.y + dy, a.z + dz).toOffsetCoordinates());
        }
    }
    return results;
};
