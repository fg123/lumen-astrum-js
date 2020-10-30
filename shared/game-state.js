const Constants = require('./constants');
const {
    Tiles,
    getVisible
} = require('./map');
const { Structure, Unit } = require('../shared/map-objects');
const { getSurrounding, getReachable, Tuple  } = require('./coordinates');
const Data = require('./data');
const { distance } = require('../client/utils');

class PlayerState {
    constructor(playerName, gameMap) {
        this.playerName = playerName;
        
        this.forfeited = false;

        // Caches what tiles we have visibility of
        this.visibilityCache = [];

        // Caches what tiles we are allowed to build on
        this.allowedBuildingCache = [];

        // Caches what locations we've put a probe on
        this.probeLocationCache = [];

        this.gold = Constants.STARTING_GOLD;
        this.commandBase = undefined;
        
        this.stats = new Proxy({}, {
            get: (target, name) => name in target ? target[name] : 0
        });

        // Setup 2D Maps
        for (let i = 0; i < gameMap.data.length; i++) {
            this.visibilityCache.push([]);
            this.allowedBuildingCache.push([]);
        }
    }

    calculateTerritorySize() {
        const cache = this.allowedBuildingCache;
        let count = 0;
        for (let i = 0; i < cache.length; i++) {
            for (let j = 0; j < cache[i].length; j++) {
                if (cache[i][j] && cache[i][j] !== 0) {
                    count += 1;
                }
            }
        }
        return count;
    }
};

module.exports = class GameState {
    // All functions that take "player" is the designated player identifier,
    //   right now it is the username of the player, it's whatever keys into
    //   this.players.
    constructor(gameStartTime, playerUsernameList, gameMap) {
        this.gameMap = gameMap;
        this.nextObjectId = 0;

        this.players = {};
        for (let i = 0; i < playerUsernameList.length; i++) {
            const username = playerUsernameList[i];
            this.players[username] = new PlayerState(username, gameMap);
        }
        
        this.mapObjects = [];
        this.occupied = [];

        this.structures = [];
        this.units = [];
        this.gameStartTime = gameStartTime;

        // Action so we can phase change it to planning at start of game
        this.phase = Constants.PHASE_ACTION;
        this.phaseStartTime = 0;
        this.didAnyoneTick = false;

        this.chatMessages = [];

        this.deadObjects = [];

        // Undefined on server, defined on client, useful for shared code to
        //   trigger client animations for example
        this.clientState = undefined;

        /* Setup two dimensional arrays */
        for (let i = 0; i < gameMap.data.length; i++) {
            this.mapObjects.push([]);
            this.occupied.push([]);
        }

        for (let y = 0; y < gameMap.data.length; y++) {
            for (let x = 0; x < gameMap.data[0].length; x++) {
                if (gameMap.data[y][x].displayType === 0 || gameMap.data[y][x].displayType === 5) {
                    this.occupied[y][x] = true;
                }
            }
        }

        /* Pre-constructed buildings */
        console.log(playerUsernameList);
        for (let i = 0; i < playerUsernameList.length; i++) {
            this.players[playerUsernameList[i]].commandBase =
                this.insertMapObject(gameMap.commandCenterLocations[i], 'Command Base', playerUsernameList[i]);
            if (!Constants.IS_PRODUCTION && i < 2) {
                const barracksLocation = new Tuple(0, 0);
                if (i === 0) {
                    barracksLocation.x = 5;
                    barracksLocation.y = 4;
                }
                else {
                    barracksLocation.x = 25;
                    barracksLocation.y = 14;
                }
                this.insertMapObject(barracksLocation, 'Barracks', playerUsernameList[i]);
            }
        }

        /* Setup Harvesters on Minerals */
        for (let i = 0; i < gameMap.bigMineralLocations.length; i++) {
            this.insertMapObject(gameMap.bigMineralLocations[i], 'Gem Harvester', undefined);
        }

        for (let i = 0; i < gameMap.smallMineralLocations.length; i++) {
            this.insertMapObject(gameMap.smallMineralLocations[i], 'Ether Harvester', undefined);
        }

        if (gameMap.onMapStart) {
            gameMap.onMapStart(this);
        }
    }

    forfeit(player) {
        this.players[player].forfeited = true;
        // Remove Fog Of War

        for (let i = 0; i < this.gameMap.data.length; i++) {
            for (let j = 0; j < this.gameMap.data[i].length; j++) {
                this.addVisibility(j, i, player);
            }
        }
    }

    hasPlayerForfeited(player) {
        return this.players[player].forfeited;
    }

    getCommandBase(player) {
        return this.players[player].commandBase;
    }

    getStructuresOnMyTeam(player, filter = () => true) {
        const results = [];
        this.structures.forEach(u => {
            if (u.owner === player) {
                if (filter(u)) {
                    results.push(u);
                }
            }
        });
        return results;
    }

    getUnitsOnMyTeam(player, filter = () => true) {
        const results = [];
        this.units.forEach(u => {
            if (u.owner === player) {
                if (filter(u)) {
                    results.push(u);
                }
            }
        });
        return results;
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
    
    isEnemyBuildingRange(x, y, player) {
        const players = Object.keys(this.players);

        for (let i = 0; i < players.length; i++) {
            if (players[i] !== player) {
                if (this.isAllowedBuilding(x, y, players[i])) {
                    return players[i];
                }
            }
        }
        return false;        
    }

    // returns player name who has the tile in their territory,
    //   or undefined if it's not claimed / owned
    getTileOwner(x, y) {
        const players = Object.keys(this.players);

        for (let i = 0; i < players.length; i++) {
            if (this.isAllowedBuilding(x, y, players[i])) {
                return players[i];
            }
        }
        return undefined;     
    }

    setAllowedBuilding(x, y, player) {
        const arr = this.getAllowedBuildingMap(player);
        if (arr[y][x]) {
            arr[y][x] += 1;
        } else {
            arr[y][x] = 1;
        }
    }

    getPlayerStats(player) {
        return this.players[player].stats;
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
            structure.id = this.nextObjectId;
            this.nextObjectId += 1;
            this.mapObjects[location.y][location.x] = structure;
            this.structures.push(structure);
            let surrounding = getSurrounding(location, structure.width);
            for (let i = 0; i < surrounding.length; i++) {
                if (this.gameMap.withinMap(surrounding[i])) {
                    this.occupied[surrounding[i].y][surrounding[i].x] = location;
                }
            }
            
            // Neutral buildings are owned by undefined
            if (player !== undefined) {
                // Structure.isConstructionBuilding(name), allowed building now
                //   expands out from deployment outposts
                if (name === 'Command Base') {
                    const surrounding = getSurrounding(location, structure.width + Constants.BUILD_RANGE);
                    for (let i = 0; i < surrounding.length; i++) {
                        if (this.gameMap.withinMap(surrounding[i])) {
                            if (this.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                                this.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK && 
                                this.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.NONE) {
                                this.setAllowedBuilding(surrounding[i].x, surrounding[i].y, player);
                            }
                        }
                    }
                }

                surrounding = this.getVisible(location, structure.width + Constants.BUILDING_VISION_RANGE);
                surrounding.forEach(pos => {
                    this.addVisibility(pos.x, pos.y, player);
                });
            }
            return structure;
        }
        else if (name in Data.units) {
            const unit = new Unit(name, player, location);
            unit.id = this.nextObjectId;
            this.nextObjectId += 1;
            this.mapObjects[location.y][location.x] = unit;
            this.units.push(unit);
            this.occupied[location.y][location.x] = location;

            let surrounding = this.getVisible(location, unit.sightRange);
            for (let i = 0; i < surrounding.length; i++) {
                if (this.gameMap.withinMap(surrounding[i])) {
                    this.addVisibility(
                        surrounding[i].x, surrounding[i].y, player,
                        unit.getVisionValue());
                }
            }
            return unit;
        }
    }

    dealDamageToUnit(attacker, target, damage) {
        if (target.currentShield !== 0) {
            target.currentShield -= damage;
            damage = 0;
            if (target.currentShield < 0) {
                damage = -target.currentShield;
                target.currentShield = 0;
            }
        }
        const damageToDeal = Math.min(damage, target.currentHealth);
        target.currentHealth -= damageToDeal;

        if (target.currentHealth <= 0) {
            if (target.currentHealth < 0) {
                console.error('Should not happen! damage', damage, 'damage to deal', damageToDeal);
                target.currentHealth = 0;
            }
            /* Kill Unit / Structure */
            this.deadObjects.push(target.position);
            if (target.onDestroy) {
                target.onDestroy(this, attacker);
            }
        }
        return damageToDeal;
    }

    purgeDeadObjects() {
        for (let i = 0; i < this.deadObjects.length; i++) {
            const mapObject = this.mapObjects[this.deadObjects[i].y][this.deadObjects[i].x];
            if (mapObject && mapObject.currentHealth <= 0) {
                this.removeMapObject(this.deadObjects[i]);
            }
        }
        this.deadObjects = [];
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
            if (this.gameMap.withinMap(surrounding[i])) {
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
            // Neutral buildings are owned by undefined
            if (mapObject.owner !== undefined) {
                // Structure.isConstructionBuilding(name), allowed building now
                //   expands out from deployment outposts
                if (mapObject.name === 'Command Base') {
                    const surrounding = getSurrounding(location, mapObject.width + Constants.BUILD_RANGE);
                    for (let i = 0; i < surrounding.length; i++) {
                        if (this.gameMap.withinMap(surrounding[i])) {
                            if (this.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                                this.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK) {
                                this.revokeAllowedBuilding(surrounding[i].x, surrounding[i].y, mapObject.owner);
                            }
                        }
                    }
                }

                surrounding = this.getVisible(location, mapObject.width + Constants.BUILDING_VISION_RANGE);
                surrounding.forEach(pos => {
                    this.removeVisibility(pos.x, pos.y, mapObject.owner);
                });
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
            let surrounding = this.getVisible(location, mapObject.sightRange);
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
        let surrounding = this.getVisible(from, unit.sightRange);
        for (let i = 0; i < surrounding.length; i++) {
            this.removeVisibility(surrounding[i].x, surrounding[i].y, unit.owner, unit.getVisionValue());
        }

        surrounding = this.getVisible(to, unit.sightRange);
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
        if (!this.gameMap.withinMap(objectPos)) {
            return [];
        }
        const object = this.mapObjects[objectPos.y][objectPos.x];
        if (!object) {
            return [];
        }

    }

    getUnitMovementTiles(unitPos) {
        if (!this.gameMap.withinMap(unitPos)) {
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
                return !this.gameMap.withinMap(pos) || this.occupied[pos.y][pos.x] ||
                    !this.isVisible(pos.x, pos.y, object.owner);
            });
    }

    getUnitAttackTiles(unitPos) {
        if (!this.gameMap.withinMap(unitPos)) {
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
            pos => this.gameMap.withinMap(pos) && this.isVisible(pos.x, pos.y, object.owner)
            && !pos.equals(unitPos));
    }

    // TODO: pass in priority / sorting function
    getEnemiesInAttackRange(unitPos) {
        if (!this.gameMap.withinMap(unitPos)) {
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
                if (obj.owner !== object.owner && obj.currentHealth > 0 && obj.targetable) {
                    // The obj might be out of attack range, but the tile is not
                    result.push({
                        enemy: obj, 
                        inRangeTile: tile
                    });
                }
            }
        }
        result.sort((ao, bo) => {
            const difference = distance(unitPos, ao.inRangeTile) - distance(unitPos, bo.inRangeTile);
            // Prioritize units over structures
            if (difference === 0) {
                if (ao.enemy.isStructure && bo.enemy.isUnit) return 1;
                else if (bo.enemy.isStructure && ao.enemy.isUnit) return -1;
            }
            return difference;
        });
        return result;
    }

    getWinner() {
        const playerNames = Object.keys(this.players);
        const nonForfeitedPlayers = [];
        for (let i = 0; i < playerNames.length; i++) {
            if (this.hasPlayerForfeited(playerNames[i])) {
                // Cannot be a winner if you've forfeited
                continue;
            }
            nonForfeitedPlayers.push(playerNames[i]);

            const size = this.players[playerNames[i]].calculateTerritorySize();
            if ((size / this.gameMap.territorialTiles) > this.gameMap.percentageClaimToWin) {
                return playerNames[i];
            }
        }
        if (nonForfeitedPlayers.length === 1) {
            // One player left 
            return nonForfeitedPlayers[0];
        }
        return undefined;
    }
    
    getVisible (point, sightRange) {
        /* Returns visibility map of a given point */
        /* Checks for Brush, High Ground and High Ground Groups */
        if (this.gameMap.data[point.y][point.x].displayType === Tiles.BRUSH) {
            sightRange = Constants.BRUSH_VISION;
        }
        const start = new Tuple(point.x, point.y).toCubeCoordinates();
        const visited = new Set();
        let result = [];
        const jungDist = {};
        visited.add(JSON.stringify(start));
        result.push(start.toOffsetCoordinates());
        const fringes = [];
        fringes.push([start]);
    
        for (let i = 0; i < sightRange; i++) {
            fringes.push([]);
            fringes[i].forEach((hex) => {
                const curString = JSON.stringify(hex);
                hex.getNeighbours().forEach((neighbour) => {
                    const n_coord = neighbour.toOffsetCoordinates();
                    if (!this.gameMap.withinMap(n_coord) ||
                        this.gameMap.data[n_coord.y][n_coord.x].displayType === Tiles.NONE) {
                        // Don't explore
                        return;
                    }
                    const neighbourString = JSON.stringify(neighbour);
                    if (!visited.has(neighbourString)) {
                        let keepExplore = true;
                        if (this.gameMap.data[n_coord.y][n_coord.x].displayType === Tiles.BRUSH) {
                            jungDist[neighbourString] = curString in jungDist ? jungDist[curString] + 1 : 0;
                            if (jungDist[neighbourString] >= Constants.BRUSH_VISION) {
                                keepExplore = false;
                            }
                        }
                        if (this.gameMap.data[point.y][point.x].displayType === Tiles.LOW &&
                            this.gameMap.data[n_coord.y][n_coord.x].isHighGround) {
                            // Trying to see high ground from low ground
                            keepExplore = false;
                        }
                        else if (this.gameMap.data[n_coord.y][n_coord.x].isHighGround &&
                                this.gameMap.data[n_coord.y][n_coord.x].highGroundGroup !==
                                this.gameMap.data[point.y][point.x].highGroundGroup) {
                            // Trying to see high ground from different high ground group
                            keepExplore = false;
                        }
                        visited.add(neighbourString);
                        if (keepExplore) {
                            result.push(n_coord);
                            fringes[i + 1].push(neighbour);
                        }
                    }
                });
            });
        }
        return result;
    }
    
    findTargetPos(pos) {
        let target = this.mapObjects[pos.y][pos.x];
        if (target === undefined) {
            /* No direct target, check for occupied mapping */
            const occupiedPoint = this.occupied[pos.y][pos.x];
            if (occupiedPoint && occupiedPoint !== true) {
                return occupiedPoint;
            }
        }
        return pos;
    };
    
    findTarget(pos) {
        if (!this.gameMap.withinMap(pos)) {
            return undefined;
        }
        const targetPos = this.findTargetPos(pos);
        let target = this.mapObjects[targetPos.y][targetPos.x];
        return target;
    };
};
