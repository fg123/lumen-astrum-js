const { Tuple } = require('../coordinates');

module.exports = {
    data: [
        "0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0",
        "0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0",
        "0 0 0 1 1 1 1 1 1 1 1 1 1 5 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0",
        "0 0 0 1 1 1 1 1 1 1 1 5 5 5 5 5 1 1 1 1 1 1 1 1 0 0 0 0 0",
        "0 0 0 1 1 1 7 1 1 1 5 5 5 5 5 5 5 1 1 1 7 1 1 1 0 0 0 0 0",
        "0 0 0 1 1 1 1 1 1 1 5 5 5 5 5 5 5 1 1 1 1 1 1 1 0 0 0 0 0",
        "0 0 0 1 1 1 1 1 1 1 1 1 5 5 5 1 1 1 1 1 1 1 1 1 0 0 0 0 0",
        "0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0",
        "0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 7 7 1 1",
        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 7 4 1 1",
        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 7 1 1",
        "0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1",
        "0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 1 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 1 4 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "1 1 7 7 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "1 1 4 7 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "1 1 7 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 1 1 1 1 1 1 1 1 3 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 1 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 1 1 1 1 7 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 1 1 1 7 7 7 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 1 3 1 7 7 7 1 3 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 3 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
    ],
    commandCenterLocations: [new Tuple(13, 47)],
    movement: [new Tuple(500, 500)],
    movementIndex: 0,
    percentageClaimToWin: 0.9,
    teams: [1],
    onMapStart(state) {
        // PVE Soldiers
        state.insertMapObject(new Tuple(2, 39), 'Armed Turret', undefined);
        state.insertMapObject(new Tuple(3, 39), 'Armed Turret', undefined);
        state.insertMapObject(new Tuple(3, 40), 'Armed Turret', undefined);
        state.insertMapObject(new Tuple(2, 41), 'Armed Turret', undefined);

        state.insertMapObject(new Tuple(26, 22), 'Armed Turret', undefined);
        state.insertMapObject(new Tuple(25, 22), 'Armed Turret', undefined);
        state.insertMapObject(new Tuple(25, 23), 'Armed Turret', undefined);
        state.insertMapObject(new Tuple(26, 24), 'Armed Turret', undefined);

        
        state.insertMapObject(new Tuple(12, 32), 'Marine', undefined);
        state.insertMapObject(new Tuple(14, 32), 'Marine', undefined);
        state.insertMapObject(new Tuple(13, 32), 'Golem', undefined);
    }
};
