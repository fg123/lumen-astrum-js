const Constants = require('./constants');
const {
    map,
    Tiles,
    getVisible
} = require('./map');
const { Structure, Unit } = require('../shared/map-objects');
const { getSurrounding, getReachable, Tuple  } = require('./coordinates');
const Data = require('./data');
const { distance } = require('../client/utils');

class PlayerState {
    constructor(playerName) {
        this.playerName = playerName;
        
        // Caches what tiles we have visibility of
        this.visibilityCache = [];

        // Caches what tiles we are allowed to build on
        this.allowedBuildingCache = [];

        // Caches what locations we've put a probe on
        this.probeLocationCache = [];

        this.gold = Constants.STARTING_GOLD;

        // Setup 2D Maps
        for (let i = 0; i < map.data.length; i++) {
            this.visibilityCache.push([]);
            this.allowedBuildingCache.push([]);
        }
    }
};

module.exports = class GameState {
    // All functions that take "player" is the designated player identifier,
    //   right now it is the username of the player, it's whatever keys into
    //   this.players.
    constructor(gameStartTime, playerUsernameList) {
        this.players = {};
        for (let i = 0; i < playerUsernameList.length; i++) {
            const username = playerUsernameList[i];
            this.players[username] = new PlayerState(username);
        }
        
        this.mapObjects = [];
        this.occupied = [];

        this.structures = [];
        this.units = [];
        this.gameStartTime = gameStartTime;

        // Action so we can phase change it to planning at start of game
        this.phase = Constants.PHASE_ACTION;
        this.phaseStartTime = 0;

        this.chatMessages = [];

        this.deadObjects = [];

        /* Setup two dimensional arrays */
        for (let i = 0; i < map.data.length; i++) {
            this.mapObjects.push([]);
            this.occupied.push([]);
        }
        for (let y = 0; y < map.data.length; y++) {
            for (let x = 0; x < map.data[0].length; x++) {
                if (map.data[y][x].displayType === 0 || map.data[y][x].displayType === 5) {
                    this.occupied[y][x] = true;
                }
            }
        }

        /* Pre-constructed buildings */
        console.log(playerUsernameList);
        for (let i = 0; i < playerUsernameList.length; i++) {
            console.log(playerUsernameList[i], map.commandCenterLocations[i]);
            this.insertMapObject(map.commandCenterLocations[i], 'Command Base', playerUsernameList[i]);
        }
    }

    getAllowedBuildingMap(player) {
        return this.players[player].allowedBuildingCache;
    }

    isAllowedBuilding(x, y, player) {
        const arr = this.getAllowedBuildingMap(player);
        if (arr[y][x]) {
            return arr[y][x] !== 0;
        } else {
            return false;
        }
    }

    setAllowedBuilding(x, y, player) {
        const arr = this.getAllowedBuildingMap(player);
        if (arr[y][x]) {
            arr[y][x] += 1;
        } else {
            arr[y][x] = 1;
        }
    }

    revokeAllowedBuilding(x, y, player) {
        const arr = this.getAllowedBuildingMap(player);
        arr[y][x] -= 1;
    }

    getVisibilityMap(player) {
        return this.players[player].visibilityCache;
    }

    isVisible(x, y, player) {
        const arr = this.getVisibilityMap(player);
        if (arr[y][x]) {
            return arr[y][x] !== 0;
        } else {
            return false;
        }
    }

    addVisibility(x, y, player, value = 1) {
        const arr = this.getVisibilityMap(player);
        if (arr[y][x]) {
            arr[y][x] += value;
        } else {
            arr[y][x] = value;
        }
    }

    removeVisibility(x, y, player, value = 1) {
        const arr = this.getVisibilityMap(player);
        arr[y][x] -= value;
    }

    getProbeLocationArr(player) {
        return this.players[player].probeLocationCache;
    }

    addProbeLocation(x, y, player) {
        this.getProbeLocationArr(player).push(new Tuple(x, y));
        this.addVisibility(x, y, player);
    }

    removeAllProbeLocations(player) {
        const arr = this.getProbeLocationArr(player);
        for (let i = 0; i < arr.length; i++) {
            this.removeVisibility(arr[i].x, arr[i].y, player);
        }
        arr.length = 0;
    }

    insertMapObject(location, name, player) {
        if (name in Data.structures) {
            const structure = new Structure(name, player, location);
            this.mapObjects[location.y][location.x] = structure;
            this.structures.push(structure);
            let surrounding = getSurrounding(location, structure.width);
            for (let i = 0; i < surrounding.length; i++) {
                if (map.withinMap(surrounding[i])) {
                    this.occupied[surrounding[i].y][surrounding[i].x] = location;
                }
            }

            if (Structure.isConstructionBuilding(name)) {
                const surrounding = getSurrounding(location, structure.width + Constants.BUILD_RANGE);
                for (let i = 0; i < surrounding.length; i++) {
                    if (map.withinMap(surrounding[i])) {
                        if (map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                            map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK) {
                            this.setAllowedBuilding(surrounding[i].x, surrounding[i].y, player);
                        }
                    }
                }
            }

            surrounding = getVisible(location, structure.width + Constants.BUILDING_VISION_RANGE);
            surrounding.forEach(pos => {
                this.addVisibility(pos.x, pos.y, player);
            });
        }
        else if (name in Data.units) {
            const unit = new Unit(name, player, location);
            this.mapObjects[location.y][location.x] = unit;
            this.units.push(unit);
            this.occupied[location.y][location.x] = location;

            let surrounding = getVisible(location, unit.sightRange);
            for (let i = 0; i < surrounding.length; i++) {
                if (map.withinMap(surrounding[i])) {
                    this.addVisibility(
                        surrounding[i].x, surrounding[i].y, player,
                        unit.getVisionValue());
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
            if (map.withinMap(surrounding[i])) {
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
                    if (map.withinMap(surrounding[i])) {
                        if (map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                            map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK) {
                            this.revokeAllowedBuilding(surrounding[i].x, surrounding[i].y, mapObject.owner);
                        }
                    }
                }
            }

            surrounding = getVisible(location, mapObject.width + Constants.BUILDING_VISION_RANGE);
            surrounding.forEach(pos => {
                this.removeVisibility(pos.x, pos.y, mapObject.owner);
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
                this.removeVisibility(surrounding[i].x, surrounding[i].y, mapObject.owner, mapObject.getVisionValue());
            }
        }
    }

    isTierSatisfied(name, player) {
        /* Are tier requirements for *name* satisfied? */
        let object = null;
        try {
            object = Data.getBaseObject(name);
        }
        catch (e) {
            // name passed isn't even a actual unit / structure
            return true;
        }
        const tier = object.tier || 0;
        if (tier < 2) {
            return true;
        }
        /*******************0, 1, 2, 3, 4*/
        const hasSupport = [1, 1, 0, 0, 0];
        this.structures.forEach(structure => {
            if (structure.owner === player && structure.turnsUntilBuilt === 0) {
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

    arePrereqsSatisfied(option, player) {
        if (!Constants.IS_PRODUCTION) {
            return true;
        }
        return option.prereq.every(name =>
            this.structures.some(structure =>
                structure.owner === player &&
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
            this.removeVisibility(surrounding[i].x, surrounding[i].y, unit.owner, unit.getVisionValue());
        }

        surrounding = getVisible(to, unit.sightRange);
        for (let i = 0; i < surrounding.length; i++) {
            this.addVisibility(surrounding[i].x, surrounding[i].y, unit.owner, unit.getVisionValue());
        }
    }

    getGold(player) {
        return this.players[player].gold;
    }

    changeGold(player, changeBy) {
        this.players[player].gold += changeBy;
    }

    getObjectVisibileTiles(objectPos) {
        if (!map.withinMap(objectPos)) {
            return [];
        }
        const object = this.mapObjects[objectPos.y][objectPos.x];
        if (!object) {
            return [];
        }

    }

    getUnitMovementTiles(unitPos) {
        if (!map.withinMap(unitPos)) {
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
                return !map.withinMap(pos) || this.occupied[pos.y][pos.x] ||
                    !this.isVisible(pos.x, pos.y, object.owner);
            });
    }

    getUnitAttackTiles(unitPos) {
        if (!map.withinMap(unitPos)) {
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
            pos => map.withinMap(pos) && this.isVisible(pos.x, pos.y, object.owner)
            && !pos.equals(unitPos));
    }

    // TODO: pass in priority / sorting function
    getEnemiesInAttackRange(unitPos) {
        if (!map.withinMap(unitPos)) {
            return [];
        }
        const object = this.mapObjects[unitPos.y][unitPos.x];
        if (!object) {
            return [];
        }
        if (!object.isUnit) {
            return [];
        }
        const tiles = this.getUnitAttackTiles(unitPos);
        const result = [];
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const occupied = this.occupied[tile.y][tile.x];
            if (occupied && occupied.x && occupied.y) {
                const obj = this.mapObjects[occupied.y][occupied.x];
                if (obj.owner !== object.owner) {
                    result.push(obj);
                }
            }
        }
        result.sort((a, b) => {
            return distance(unitPos, a.position) -
                distance(unitPos, b.position);
        });
        return result;
    }

    getWinner() {
        // TODO: Check for territory
        return undefined;
    }
};
