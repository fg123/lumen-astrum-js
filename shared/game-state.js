const Constants = require('./constants');
const {
    map,
    withinMap,
    RED_SIDE_COMMAND_CENTER_LOC,
    BLUE_SIDE_COMMAND_CENTER_LOC
} = require('./map');
const { Structure, Unit } = require('../shared/map-objects');
const { getSurrounding  } = require('./coordinates');
const Data = require('./data');

module.exports = class GameState {
    constructor(gameStartTime) {
        this.mapObjects = [];
        this.visibility = [];
        this.occupied = [];
        this.allowedBuilding = [];
        this.structures = [];
        this.units = [];
        this.gameStartTime = gameStartTime;
        this.turnEndTime = 0;
        this.redTurnCount = 0;
        this.blueTurnCount = 0;
        this.redGold = Constants.STARTING_GOLD;
        this.blueGold = Constants.STARTING_GOLD;
        this.currentTurn = Constants.NONE_SIDE;

        /* Setup two dimensional arrays */
        for (let i = 0; i < map.length; i++) {
            this.mapObjects.push([]);
            this.visibility.push([]);
            this.occupied.push([]);
            this.allowedBuilding.push([]);
        }
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[0].length; x++) {
                if (map[y][x].displayType === 0 || map[y][x].displayType === 5) {
                    this.occupied[y][x] = true;
                }
            }
        }

        /* Pre-constructed buildings */
        this.insertMapObject(RED_SIDE_COMMAND_CENTER_LOC, 'Command Base', Constants.RED_SIDE);
        this.insertMapObject(BLUE_SIDE_COMMAND_CENTER_LOC, 'Command Base', Constants.BLUE_SIDE);
    }

    insertMapObject(location, name, side) {
        if (name in Data.structures) {
            const structure = new Structure(name, side, location);
            this.mapObjects[location.y][location.x] = structure;
            this.structures.push(structure);
            let surrounding = getSurrounding(location, Data.structures[name].width);
            for (let i = 0; i < surrounding.length; i++) {
                if (withinMap(surrounding[i])) {
                    this.occupied[surrounding[i].y][surrounding[i].x] = location;
                }
            }
            if (Structure.isConstructionBuilding(name)) {
                let surrounding = getSurrounding(location, Data.structures[name].width + Constants.BUILD_RANGE);
                for (let i = 0; i < surrounding.length; i++) {
                    if (withinMap(surrounding[i])) {
                        this.allowedBuilding[surrounding[i].y][surrounding[i].x] = side;
                    }
                }
            }
        }
        else if (name in Data.units) {
            const unit = new Unit(name, side, location);
            this.mapObjects[location.y][location.x] = unit;
            this.units.push(unit);
            this.occupied[location.y][location.x] = location;
        }
    }

    calculateNextTurnAvailableTime(side) {
        if (side === Constants.RED_SIDE) {
            return 1000 * ((30) + (this.redTurnCount - 1) * 5);
        }
        else {
            return 1000 * ((30) + (this.blueTurnCount - 1) * 5);
        }
    }
};
