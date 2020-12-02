const { Tuple } = require('../coordinates');
const { HauntedApplierModifier, BarracksBuffGiver } = require('../modifier');

module.exports = {
    name: "Anchor",
    image: "/resources/maps/2p-anchor.png",
    data: [
        "0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 3 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0",
        "0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0",
        "0 0 0 1 1 1 1 1 1 1 3 1 1 1 1 1 1 1 1 1 3 1 1 1 1 1 1 1 0 0 0",
        "0 1 1 1 1 1 1 1 1 1 1 1 1 0 1 0 1 0 1 1 1 1 1 1 1 1 1 1 1 1 0",
        "0 1 1 7 7 7 1 1 1 1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 7 7 7 1 1 0",
        "0 1 1 7 7 7 1 1 1 1 1 1 0 0 0 0 0 0 0 1 1 1 1 1 1 7 7 7 1 1 0",
        "0 1 1 1 7 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 7 1 1 1 0",
        "0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0",
        "0 0 0 0 1 1 1 1 1 1 3 1 1 1 1 1 1 1 1 1 3 1 1 1 1 1 1 0 0 0 0",
        "0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 6 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 1 1 1 1 1 1 6 4 6 1 1 1 1 1 1 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 1 1 1 1 1 1 6 6 6 1 1 1 1 1 1 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 1 1 1 3 1 1 1 1 1 1 1 3 1 1 1 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0"
    ],
    commandCenterLocations: [new Tuple(4, 7), new Tuple(26, 7)],
    movement: [new Tuple(500, 500)],
    movementIndex: 0,
    percentageClaimToWin: 0.7,
    teams: [1, 2],
    onActionStart(state) {
        // Add modifier to all constructors
        const barracks = state.structures.filter((s) => { return s.name === 'Barracks' });
        barracks.forEach(b => {
            b.addModifier(state, this, new BarracksBuffGiver(() => {
                return new HauntedApplierModifier();
            }), {
                onlyOne: true
            });
        });
    },
};
