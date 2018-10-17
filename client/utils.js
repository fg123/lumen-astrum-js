module.exports = {
    toRadians(angle) {
        return angle * (Math.PI / 180);
    },

    toDegrees(angle) {
        return angle * (180 / Math.PI);
    },

    distance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    }
};
