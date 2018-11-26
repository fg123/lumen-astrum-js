const Constants = require('./constants');

class StateChange {
    constructor(stateChange) {
        this.type = stateChange.type;
        this.from = stateChange.from;
        this.opponentSide = stateChange.from === Constants.RED_SIDE ? Constants.BLUE_SIDE : Constants.RED_SIDE;
        this.data = stateChange.data;
        this.timestamp = stateChange.timestamp;
    }

    static create(from, type, data) {
        return new StateChange({
            type,
            from,
            data,
            timestamp: Date.now()
        });
    }

    verifyStateChange(state) {
        return this._verifyStateChange(state);
    }

    simulateStateChange(state) {
        return this._simulateStateChange(state);
    }

    static registerSubClass(klass) {
        StateChange.subClasses[klass.name] = klass;
    }

    static deserialize(obj) {
        if (obj.type in StateChange.subClasses) {
            return new StateChange.subClasses[obj.type](obj);
        } else {
            return undefined;
        }
    }
}
StateChange.subClasses = {};

/* Helper Functions */
const { getBaseObject } = require('./data');
const { Tuple, getSurrounding } = require('./coordinates');
const { withinMap, map, Tiles } = require('./map');
const PathFinder = require('./path-finder');
const Data = require('./data');

class BuildStructureStateChange extends StateChange {
    /* Built-by is undefined if from a structure, otherwise the position of the
     * unit that built it */
    static create(from, structureName, position, builtBy) {
        return new BuildStructureStateChange(
            StateChange.create(
                from, 'BuildStructureStateChange', {
                    structureName: structureName,
                    position: position,
                    builtBy: builtBy
                }
            )
        );
    }

    getOptionToBuild() {
        let builtBy = getBaseObject(this.data.builtBy.name);
        if (!builtBy) {
            return undefined;
        }
        return builtBy.options.find(option => {
            return option.command === 'build-' + this.data.structureName;
        });
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }

        const option = this.getOptionToBuild();
        if (!option) {
            return false;
        }
        if (state.getGold(this.from) < option.cost) {
            return false;
        }
        if (!state.arePrereqsSatisfied(option, this.from)) {
            return false;
        }

        let baseObj = getBaseObject(this.data.structureName);
        let surrounding = getSurrounding(this.data.position, baseObj.width);
        for (let i = 0; i < surrounding.length; i++) {
            if (!withinMap(surrounding[i]) ||
                state.occupied[surrounding[i].y][surrounding[i].x] ||
                map.data[surrounding[i].y][surrounding[i].x].displayType === Tiles.BRUSH) {
                return false;
            }
            else if (!this.data.builtBy.isUnit &&
                !state.isAllowedBuilding(surrounding[i].x, surrounding[i].y, this.from)) {
                return false;
            }
            else if (this.data.structureName === 'Harvester') {
                if (map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.MINERAL &&
                    map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BIG_MINERAL) {
                    // Harvester must be on mineral
                    return false;
                }
            }
            else {
                if (map.data[surrounding[i].y][surrounding[i].x].displayType === Tiles.MINERAL ||
                    map.data[surrounding[i].y][surrounding[i].x].displayType === Tiles.BIG_MINERAL) {
                    // Nothing else can be on mineral
                    return false;
                }
            }
        }
        if (this.data.builtBy.isUnit) {
            // Check if building place is near a builder!
            const builder = state.mapObjects[this.data.builtBy.position.y][
                this.data.builtBy.position.x];
            if (!builder) {
                return false;
            }
            if (builder.name !== 'Combat Engineer') {
                return false;
            }
            let surrounding = getSurrounding(builder.position, 1);
            let found = false;
            for (let i = 0; i < surrounding.length; i++) {
                if (surrounding[i].equals(this.data.position)) {
                    found = true;
                }
            }
            if (!found) {
                return false;
            }
        }
        return true;
    }

    _simulateStateChange(state) {
        state.insertMapObject(this.data.position,
            this.data.structureName,
            this.from);
        state.changeGold(this.from, -(this.getOptionToBuild().cost));
    }
}
StateChange.registerSubClass(BuildStructureStateChange);

class SpawnUnitStateChange extends StateChange {
    static create(from, unitName, position, fromBuilding) {
        return new SpawnUnitStateChange(
            StateChange.create(
                from, 'SpawnUnitStateChange', {
                    unitName: unitName,
                    position: position,
                    fromBuilding: fromBuilding
                }
            )
        );
    }

    getOptionToBuild() {
        let building = getBaseObject(this.data.fromBuilding.name);
        if (!building) {
            return undefined;
        }
        return building.options.find(option => {
            return option.command === 'spawn-' + this.data.unitName;
        });
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        const option = this.getOptionToBuild();
        if (!option) {
            return false;
        }
        if (state.getGold(this.from) < option.cost) {
            return false;
        }
        if (!state.isTierSatisfied(this.data.unitName, this.from)) {
            return false;
        }
        if (!state.arePrereqsSatisfied(option, this.from)) {
            return false;
        }
        let surrounding = getSurrounding(
            this.data.fromBuilding.position,
            this.data.fromBuilding.width + 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (withinMap(surrounding[i]) &&
                !state.occupied[surrounding[i].y][surrounding[i].x] &&
                map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH) {
                if (this.data.position.x === surrounding[i].x &&
                    this.data.position.y === surrounding[i].y) {
                    return true;
                }
            }
        }
        return false;
    }

    _simulateStateChange(state) {
        state.insertMapObject(this.data.position,
            this.data.unitName,
            this.from);
        state.changeGold(this.from, -(this.getOptionToBuild().cost));
    }
}
StateChange.registerSubClass(SpawnUnitStateChange);

class MoveUnitStateChange extends StateChange {
    static create(from, posFrom, posTo) {
        return new MoveUnitStateChange(
            StateChange.create(
                from, 'MoveUnitStateChange', {
                    posFrom: posFrom,
                    posTo: posTo
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        if (!withinMap(this.data.posFrom) || !withinMap(this.data.posTo)) {
            return false;
        }
        /* Is there a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.side !== this.from) return false;
        /* Find a path from A to B */
        const path = PathFinder.findPath(state, this.data.posFrom, this.data.posTo);
        if (path.length > unit.moveRange) {
            return false;
        }
        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        /* This can probably be cached between verify and simulate */
        const path = PathFinder.findPath(state, this.data.posFrom, this.data.posTo);
        unit.moveRange -= path.length;

        state.moveUnit(this.data.posFrom, this.data.posTo);
    }
}
StateChange.registerSubClass(MoveUnitStateChange);

class TurnPassoverStateChange extends StateChange {
    static create(from, isUserInitiated) {
        return new TurnPassoverStateChange(
            StateChange.create(
                from, 'TurnPassoverStateChange', {
                    isUserInitiated: isUserInitiated
                }
            )
        );
    }

    _verifyStateChange(state) {
        return state.currentTurn === this.from;
    }

    replenishShield(mapObject) {
        const shieldToReplenish = Math.ceil(mapObject.maxShield / 10);
        mapObject.currentShield += shieldToReplenish;
        if (mapObject.currentShield > mapObject.maxShield) {
            mapObject.currentShield = mapObject.maxShield;
        }
    }

    _simulateStateChange(state) {
        state.turnEndTime = Date.now() +
            state.calculateNextTurnAvailableTime(state.currentTurn);

        // Handle Structure End-Turn Procedures
        // This is calculated for the opponent since they gain the $
        let harvestorMoneyGained = 0;
        for (let i = 0; i < state.structures.length; i++) {
            const structure = state.structures[i];
            if (structure.side === this.from &&
				structure.turnsUntilBuilt != 0) {
                structure.turnsUntilBuilt -= 1;
            }
            if (structure.side === this.opponentSide &&
                structure.name === 'Harvester') {
                const tile = map.data[structure.position.y][
                    structure.position.x];
                if (tile.displayType === Tiles.MINERAL) {
                    harvestorMoneyGained += 100;
                }
                else if (tile.displayType === Tiles.BIG_MINERAL) {
                    harvestorMoneyGained += 200;
                }
            }
            /* Shield replenished on the start of the turn */
            if (structure.side === this.opponentSide) {
                this.replenishShield(structure);
            }
        }

        // Handle Units End-Turn Procedures
        for (let i = 0; i < state.units.length; i++) {
            if (state.units[i].side === this.from &&
				state.units[i].turnsUntilBuilt != 0) {
                state.units[i].turnsUntilBuilt -= 1;
            }
            /* Reset move range at the end of the turn */
            state.units[i].moveRange = Data.units[state.units[i].name].moverange;
            /* Reset attack */
            state.units[i].attacksThisTurn = 1;
            if (state.units[i].side === this.opponentSide) {
                this.replenishShield(state.units[i]);
            }
        }

        // Handle General Procedures
        if (this.from === Constants.RED_SIDE) {
            state.currentTurn = Constants.BLUE_SIDE;
            if (state.blueTurnCount !== 0) {
                state.blueGold += 200 + ((state.blueTurnCount - 1) * 50) +
                    harvestorMoneyGained;
            }
            state.blueTurnCount++;
        }
        else {
            state.currentTurn = Constants.RED_SIDE;
            if (state.redTurnCount !== 0) {
                state.redGold += 200 + ((state.redTurnCount - 1) * 50) +
                    harvestorMoneyGained;
            }
            state.redTurnCount++;
        }
    }
}
StateChange.registerSubClass(TurnPassoverStateChange);

class UnitAttackStateChange extends StateChange {
    static create(from, posFrom, posTo) {
        return new UnitAttackStateChange(
            StateChange.create(
                from, 'UnitAttackStateChange', {
                    posFrom: posFrom,
                    posTo: posTo
                }
            )
        );
    }

    distance(a, b) {
        return PathFinder.manhattanDistance(new Tuple(a.x, a.y).toCubeCoordinates(),
            new Tuple(b.x, b.y).toCubeCoordinates());
    }

    findTargetPos(state, pos) {
        let target = state.mapObjects[pos.y][pos.x];
        if (target === undefined) {
            /* No direct target, check for occupied mapping */
            const occupiedPoint = state.occupied[pos.y][pos.x];
            if (occupiedPoint && occupiedPoint !== true) {
                return occupiedPoint;
            }
        }
        return pos;
    }

    findTarget(state, pos) {
        const targetPos = this.findTargetPos(state, pos);
        let target = state.mapObjects[targetPos.y][targetPos.x];
        return target;
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        if (!withinMap(this.data.posFrom) || !withinMap(this.data.posTo)) {
            return false;
        }
        /* Is there a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.side !== this.from) return false;

        /* Does this unit have any attacks left? */
        if (unit.attacksThisTurn === 0) {
            return false;
        }

        /* Is the attack out of range? */
        const distance = this.distance(this.data.posFrom, this.data.posTo);
        if (distance > unit.attackRange) {
            return false;
        }

        /* Is the attack destination a mapObject that belongs to the
         * opponent? */
        const target = this.findTarget(state, this.data.posTo);
        if (target === undefined) {
            return false;
        }
        if (target.side !== this.opponentSide) return false;

        /* Is the target visible to the attacker? */
        if (!state.isVisible(this.data.posTo.x, this.data.posTo.y, this.from)) {
            return false;
        }
        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        const target = this.findTarget(state, this.data.posTo);
        unit.attacksThisTurn -= 1;

        let damageToHealth = unit.attackDamage;
        if (target.currentShield !== 0) {
            target.currentShield -= damageToHealth;
            damageToHealth = 0;
            if (target.currentShield < 0) {
                damageToHealth = -target.currentShield;
                target.currentShield = 0;
            }
        }
        target.currentHealth -= damageToHealth;
        if (target.currentHealth <= 0) {
            /* Kill Unit / Structure */
            const targetPos = this.findTargetPos(state, this.data.posTo);
            state.removeMapObject(targetPos);
        }
    }
}
StateChange.registerSubClass(UnitAttackStateChange);

module.exports = {
    StateChange,
    BuildStructureStateChange,
    SpawnUnitStateChange,
    TurnPassoverStateChange,
    MoveUnitStateChange,
    UnitAttackStateChange
};
