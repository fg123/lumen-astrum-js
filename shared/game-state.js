const Constants = require('./constants');
const {
    map,
    withinMap,
    Tiles
} = require('./map');
const { Structure, Unit } = require('../shared/map-objects');
const { getSurrounding  } = require('./coordinates');
const Data = require('./data');

module.exports = class GameState {
    constructor(gameStartTime) {
        this.mapObjects = [];
        this.redVisibility = [];
        this.blueVisibility = [];
        this.occupied = [];
        this.redAllowedBuilding = [];
        this.blueAllowedBuilding = [];
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
        for (let i = 0; i < map.data.length; i++) {
            this.mapObjects.push([]);
            this.redVisibility.push([]);
            this.blueVisibility.push([]);
            this.occupied.push([]);
            this.redAllowedBuilding.push([]);
            this.blueAllowedBuilding.push([]);
        }
        for (let y = 0; y < map.data.length; y++) {
            for (let x = 0; x < map.data[0].length; x++) {
                if (map.data[y][x].displayType === 0 || map.data[y][x].displayType === 5) {
                    this.occupied[y][x] = true;
                }
            }
        }

        /* Pre-constructed buildings */
        this.insertMapObject(map.redCommandCenterLocation, 'Command Base', Constants.RED_SIDE);
        this.insertMapObject(map.blueCommandCenterLocation, 'Command Base', Constants.BLUE_SIDE);
    }

    getAllowedBuildingMap(side) {
        return (side === Constants.RED_SIDE ? this.redAllowedBuilding : this.blueAllowedBuilding);
    }

    isAllowedBuilding(x, y, side) {
        const arr = this.getAllowedBuildingMap(side);
        if (arr[y][x]) {
            return arr[y][x] !== 0;
        } else {
            return false;
        }
    }

    setAllowedBuilding(x, y, side) {
        const arr = this.getAllowedBuildingMap(side);
        if (arr[y][x]) {
            arr[y][x] += 1;
        } else {
            arr[y][x] = 1;
        }
    }

    revokeAllowedBuilding(x, y, side) {
        const arr = this.getAllowedBuildingMap(side);
        arr[y][x] -= 1;
    }

    getVisibilityMap(side) {
        return (side === Constants.RED_SIDE ? this.redVisibility : this.blueVisibility);
    }

    isVisible(x, y, side) {
        const arr = this.getVisibilityMap(side);
        if (arr[y][x]) {
            return arr[y][x] !== 0;
        } else {
            return false;
        }
    }

    addVisible(x, y, side) {
        const arr = this.getVisibilityMap(side);
        if (arr[y][x]) {
            arr[y][x] += 1;
        } else {
            arr[y][x] = 1;
        }
    }

    loseVisible(x, y, side) {
        const arr = this.getVisibilityMap(side);
        arr[y][x] -= 1;
    }

    insertMapObject(location, name, side) {
        if (name in Data.structures) {
            const structure = new Structure(name, side, location);
            this.mapObjects[location.y][location.x] = structure;
            this.structures.push(structure);
            let surrounding = getSurrounding(location, structure.width);
            for (let i = 0; i < surrounding.length; i++) {
                if (withinMap(surrounding[i])) {
                    this.occupied[surrounding[i].y][surrounding[i].x] = location;
                }
            }
            if (Structure.isConstructionBuilding(name)) {
                let surrounding = getSurrounding(location, structure.width + Constants.BUILD_RANGE);
                for (let i = 0; i < surrounding.length; i++) {
                    if (withinMap(surrounding[i]) &&
                        map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                        map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK) {
                        this.setAllowedBuilding(surrounding[i].x, surrounding[i].y, side);
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

    removeMapObject(location) {
        const mapObject = this.mapObjects[location.y][location.x];
        if (!mapObject) {
            console.error('Tried to remove map object that didn\'t exist!');
            return;
        }
        this.mapObjects[location.y][location.x] = undefined;
        let surrounding = getSurrounding(location, mapObject.width);
        for (let i = 0; i < surrounding.length; i++) {
            if (withinMap(surrounding[i])) {
                this.occupied[surrounding[i].y][surrounding[i].x] = false;
            }
        }
        if (mapObject.name in Data.structures) {
            for (let i = 0; i < this.structures.length; i++) {
                if (this.structures[i].position.x === location.x &&
                    this.structures[i].position.y === location.y) {
                    this.structures.splice(i, 1);
                    break;
                }
            }
            if (Structure.isConstructionBuilding(mapObject.name)) {
                let surrounding = getSurrounding(location, mapObject.width + Constants.BUILD_RANGE);
                for (let i = 0; i < surrounding.length; i++) {
                    if (withinMap(surrounding[i]) &&
                        map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                        map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK) {
                        this.revokeAllowedBuilding(surrounding[i].x, surrounding[i].y, mapObject.side);
                    }
                }
            }
        }
        else if (mapObject.name in Data.units) {
            for (let i = 0; i < this.units.length; i++) {
                if (this.units[i].position.x === location.x &&
                    this.units[i].position.y === location.y) {
                    this.units.splice(i, 1);
                    break;
                }
            }
        }
    }

    moveUnit(from, to) {
        /* Assumes the coordinates are verified. */
        const unit = this.mapObjects[from.y][from.x];
        unit.position = to;

        this.mapObjects[to.y][to.x] = unit;
        this.mapObjects[from.y][from.x] = undefined;

        this.occupied[from.y][from.x] = false;
        this.occupied[to.y][to.x] = to;
    }

    calculateNextTurnAvailableTime(side) {
        if (side === Constants.RED_SIDE) {
            return 1000 * ((30) + (this.redTurnCount - 1) * 5);
        }
        else {
            return 1000 * ((30) + (this.blueTurnCount - 1) * 5);
        }
    }

    getGold(side) {
        if (side === Constants.RED_SIDE) {
            return this.redGold;
        }
        else {
            return this.blueGold;
        }
    }

    changeGold(side, changeBy) {
        if (side === Constants.RED_SIDE) {
            this.redGold += changeBy;
        }
        else {
            this.blueGold += changeBy;
        }
    }
};
