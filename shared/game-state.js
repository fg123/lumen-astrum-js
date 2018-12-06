const Constants = require('./constants');
const {
    map,
    withinMap,
    Tiles,
    getVisible
} = require('./map');
const { Structure, Unit } = require('../shared/map-objects');
const { getSurrounding, getReachable  } = require('./coordinates');
const Data = require('./data');

module.exports = class GameState {
    constructor(gameStartTime, redPlayer, bluePlayer) {
        this.redPlayer = redPlayer;
        this.bluePlayer = bluePlayer;
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
        this.chatMessages = [];

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

    addVisibility(x, y, side) {
        const arr = this.getVisibilityMap(side);
        if (arr[y][x]) {
            arr[y][x] += 1;
        } else {
            arr[y][x] = 1;
        }
    }

    removeVisibility(x, y, side) {
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
                const surrounding = getSurrounding(location, structure.width + Constants.BUILD_RANGE);
                for (let i = 0; i < surrounding.length; i++) {
                    if (withinMap(surrounding[i])) {
                        if (map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                            map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK) {
                            this.setAllowedBuilding(surrounding[i].x, surrounding[i].y, side);
                        }
                    }
                }
            }

            surrounding = getVisible(location, structure.width + Constants.BUILDING_VISION_RANGE);
            surrounding.forEach(pos => {
                this.addVisibility(pos.x, pos.y, side);
            });
        }
        else if (name in Data.units) {
            const unit = new Unit(name, side, location);
            this.mapObjects[location.y][location.x] = unit;
            this.units.push(unit);
            this.occupied[location.y][location.x] = location;

            let surrounding = getVisible(location, unit.sightRange);
            for (let i = 0; i < surrounding.length; i++) {
                if (withinMap(surrounding[i])) {
                    this.addVisibility(surrounding[i].x, surrounding[i].y, side);
                }
            }
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
                const surrounding = getSurrounding(location, mapObject.width + Constants.BUILD_RANGE);
                for (let i = 0; i < surrounding.length; i++) {
                    if (withinMap(surrounding[i])) {
                        if (map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                            map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK) {
                            this.revokeAllowedBuilding(surrounding[i].x, surrounding[i].y, mapObject.side);
                        }
                    }
                }
            }

            surrounding = getVisible(location, mapObject.width + Constants.BUILDING_VISION_RANGE);
            surrounding.forEach(pos => {
                this.removeVisibility(pos.x, pos.y, mapObject.side);
            });
        }
        else if (mapObject.name in Data.units) {
            for (let i = 0; i < this.units.length; i++) {
                if (this.units[i].position.x === location.x &&
                    this.units[i].position.y === location.y) {
                    this.units.splice(i, 1);
                    break;
                }
            }
            let surrounding = getVisible(location, mapObject.sightRange);
            for (let i = 0; i < surrounding.length; i++) {
                this.removeVisibility(surrounding[i].x, surrounding[i].y, mapObject.side);
            }
        }
    }

    isTierSatisfied(name, side) {
        /* Are tier requirements for *name* satisfied? */
        const object = Data.getBaseObject(name);
        const tier = object.tier || 0;
        if (tier < 2) {
            return true;
        }
        /*******************0, 1, 2, 3, 4*/
        const hasSupport = [1, 1, 0, 0, 0];
        this.structures.forEach(structure => {
            if (structure.side === side && structure.turnsUntilBuilt === 0) {
                if (structure.name === 'Armory') {
                    hasSupport[2] = 1;
                }
                else if (structure.name === 'Tech Lab') {
                    hasSupport[3] = 1;
                }
                else if (structure.name === 'Military Academy') {
                    hasSupport[4] = 1;
                }
            }
        });
        /* Every index from 0->tier in hasSupport must be 1 */
        for (let i = 0; i <= tier; i++) {
            if (hasSupport[i] === 0) return false;
        }
        return true;
    }

    arePrereqsSatisfied(option, side) {
        return option.prereq.every(name =>
            this.structures.some(structure =>
                structure.side === side &&
                structure.name === name &&
                structure.turnsUntilBuilt === 0
            )
        );
    }

    moveUnit(from, to) {
        /* Assumes the coordinates are verified. */
        const unit = this.mapObjects[from.y][from.x];
        unit.position = to;

        this.mapObjects[to.y][to.x] = unit;
        this.mapObjects[from.y][from.x] = undefined;

        this.occupied[from.y][from.x] = false;
        this.occupied[to.y][to.x] = to;

        /* Change visibility from previous position to new position */
        let surrounding = getVisible(from, unit.sightRange);
        for (let i = 0; i < surrounding.length; i++) {
            this.removeVisibility(surrounding[i].x, surrounding[i].y, unit.side);
        }

        surrounding = getVisible(to, unit.sightRange);
        for (let i = 0; i < surrounding.length; i++) {
            this.addVisibility(surrounding[i].x, surrounding[i].y, unit.side);
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

    getUnitMovementTiles(unitPos) {
        if (!withinMap(unitPos)) {
            return [];
        }
        const object = this.mapObjects[unitPos.y][unitPos.x];
        if (!object) {
            return [];
        }
        if (!object.isUnit) {
            return [];
        }
        return getReachable(object.position,
            object.moveRange,
            (pos) => {
                // It's blocked if it's not in the map, occupied, or out of vision range
                return !withinMap(pos) || this.occupied[pos.y][pos.x] ||
                    !this.isVisible(pos.x, pos.y, object.side);
            });
    }

    getUnitAttackTiles(unitPos) {
        if (!withinMap(unitPos)) {
            return [];
        }
        const object = this.mapObjects[unitPos.y][unitPos.x];
        if (!object) {
            return [];
        }
        if (!object.isUnit) {
            return [];
        }
        return getSurrounding(object.position, object.attackRange).filter(
            pos => withinMap(pos) && this.isVisible(pos.x, pos.y, object.side));
    }

    getWinner() {
        const redCommandBase = this.mapObjects[map.redCommandCenterLocation.y][
            map.redCommandCenterLocation.x];
        const blueCommandBase = this.mapObjects[map.blueCommandCenterLocation.y][
            map.blueCommandCenterLocation.x];
        if (!redCommandBase) {
            return Constants.BLUE_SIDE;
        }
        if (!blueCommandBase) {
            return Constants.RED_SIDE;
        }
        return Constants.NONE_SIDE;
    }
};
