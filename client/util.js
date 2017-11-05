const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

function toCameraCoord(position) {
    return {
        x: (position.x - state.camera.position.x) * state.camera.scale + screenWidth / 2,
        y: (position.y - state.camera.position.y) * state.camera.scale + screenHeight / 2
    };
}

function toWorldCoord(position) {
    return {
        x: (position.x - screenWidth / 2) / state.camera.scale + state.camera.position.x,
        y: (position.y - screenHeight / 2) / state.camera.scale + state.camera.position.y
    };
}

function toTileCoord(position) {
    var XYVertex = false;
    var s = 64;
    var t = 32;
    var r = 55;
    var h = 111;
    var mx = parseInt(position.x) + 64;
    var my = parseInt(position.y) + 55;

    //correction for BORDERS and XYVertex
    if (XYVertex) mx += t;

    var x = parseInt(mx / (s + t)); //this gives a quick value for x. It works only on odd cols and doesn't handle the triangle sections. It assumes that the hexagon is a rectangle with width s+t (=1.5*s).
    var y = parseInt((my - (x % 2) * r) / h); //this gives the row easily. It needs to be offset by h/2 (=r)if it is in an even column

    /******FIX for clicking in the triangle spaces (on the left side only)*******/
    //dx,dy are the number of pixels from the hex boundary. (ie. relative to the hex clicked in)
    var dx = mx - x * (s + t);
    var dy = my - y * h;
    var result = createTuple(-1, -1);
    if (my - (x % 2) * r > 0) { //prevent clicking half empty
        if (x % 2 == 0) {
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
        result = createTuple(x, y);
    }
    return result;
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function distance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}