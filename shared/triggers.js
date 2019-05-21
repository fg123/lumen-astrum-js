const { map, Tiles, findTarget, replenishShield } = require('./map');
const Constants = require('./constants');
const { units, structures } = require('./data');
const { getSurrounding } = require('./coordinates');

const triggers = {
    'Harvester': {
        onTurnStart(state) {
            // Gain Extra Gold
            const tile = map.data[this.position.y][
                this.position.x];
            let gain = 0;
            if (tile.displayType === Tiles.MINERAL) {
                gain += 100;
            }
            else if (tile.displayType === Tiles.BIG_MINERAL) {
                gain += 200;
            }

            if (this.side === Constants.RED_SIDE) {
                state.redGold += gain;
            }
            else {
                state.blueGold += gain;
            }
        }
    },
    'Maintenance Drone': {
        onTurnStart(state) {
            // Range 3, double shield regeneration
            const range = getSurrounding(this.position, 3);
            for (let i = 0; i < range.length; i++) {
                const target = findTarget(state, range[i]);
                if (target && target.side === this.side) {
                    replenishShield(target);
                }
            }
        }
    },
    'Barracks': {
        onTurnStart(state) {
            console.log('Barracks Turn Start');
        },
        onTurnEnd(state) {
            console.log('Barracks Turn End');
        }
    },
    'Recon Team': {
        onTurnStart(state) {
            console.log('Recon Team Turn Start');
        },
        onTurnEnd(state) {
            console.log('Recon Team Turn End');
        }
    }
};

Object.keys(triggers).forEach(key => {
    if (!(key in units) && !(key in structures)) {
        console.error(key + ' in trigger list is not a unit or structure');
    }
});

module.exports = triggers;