const { Tuple } = require('../coordinates');
const { RetaliationModifier } = require('../modifier');

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
        state.insertMapObject(new Tuple(2, 39), 'Marine', undefined);
        state.insertMapObject(new Tuple(3, 39), 'Marine', undefined);
        state.insertMapObject(new Tuple(3, 40), 'Marine', undefined);
        state.insertMapObject(new Tuple(2, 41), 'Marine', undefined);

        state.insertMapObject(new Tuple(26, 22), 'Marine', undefined);
        state.insertMapObject(new Tuple(25, 22), 'Marine', undefined);
        state.insertMapObject(new Tuple(25, 23), 'Marine', undefined);
        state.insertMapObject(new Tuple(26, 24), 'Marine', undefined);

        
        state.insertMapObject(new Tuple(12, 32), 'Marine', undefined);
        state.insertMapObject(new Tuple(14, 32), 'Marine', undefined);
        state.insertMapObject(new Tuple(13, 32), 'Golem', undefined);

        
        this.retaliate(state, state.insertMapObject(new Tuple(6, 5), 'Praetorian', undefined));
        this.retaliate(state, state.insertMapObject(new Tuple(20, 5), 'Raider', undefined));
    },
    retaliate(state, unit) {
        unit.addModifier(state, unit, new RetaliationModifier());
    }
};
