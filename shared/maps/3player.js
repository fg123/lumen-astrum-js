const { Tuple } = require('../coordinates');

module.exports = {
    data: [
        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 3 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 1 1 1 0 0 0 1 1 1 1 1 1 0 1 1 1 1 1 1 0 0 0 1 1 1 0 0 0",
        "0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0",
        "0 1 1 7 7 7 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 7 7 7 1 1 0",
        "0 1 1 7 7 7 1 1 1 1 1 1 0 0 0 1 0 0 0 1 1 1 1 1 1 7 7 7 1 1 0",
        "0 1 1 1 7 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 7 1 1 1 0",
        "0 0 1 1 1 1 1 1 1 3 1 1 1 1 1 3 1 1 1 1 1 3 1 1 1 1 1 1 1 0 0",
        "0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0",
        "0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 6 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0",
        "0 0 0 0 1 1 1 0 1 1 1 1 1 1 6 4 6 1 1 1 1 1 1 0 1 1 1 0 0 0 0",
        "0 0 0 0 1 1 1 0 0 0 1 1 1 1 6 6 6 1 1 1 1 0 0 0 1 1 1 0 0 0 0",
        "0 0 0 0 1 1 1 0 0 0 1 1 3 1 1 1 1 1 3 1 1 0 0 0 1 1 1 0 0 0 0",
        "0 0 0 0 1 1 1 0 0 0 1 1 1 1 1 1 1 1 1 1 1 0 0 0 1 1 1 0 0 0 0",
        "0 0 0 0 1 1 1 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 1 1 1 0 0 0 0",
        "0 0 0 0 1 3 1 1 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 1 1 3 1 0 0 0 0",
        "0 0 0 0 1 1 1 1 1 1 0 0 1 1 1 3 1 1 1 0 0 1 1 1 1 1 1 0 0 0 0",
        "0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 7 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 1 1 7 7 7 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 1 1 7 7 7 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
    ],
    commandCenterLocations: [new Tuple(4, 6), new Tuple(26, 6), new Tuple(15, 22)],
    movement: [new Tuple(500, 500)],
    movementIndex: 0,
    percentageClaimToWin: 0.5,
    teams: [1, 2, 3]
};
