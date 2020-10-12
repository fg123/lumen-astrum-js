const { map, Tiles, findTarget, replenishShield } = require('./map');
const Constants = require('./constants');
const { units, structures } = require('./data');
const { getSurrounding } = require('./coordinates');

const triggers = {

};

Object.keys(triggers).forEach(key => {
    if (!(key in units) && !(key in structures)) {
        console.error(key + ' in trigger list is not a unit or structure');
    }
});

module.exports = triggers;