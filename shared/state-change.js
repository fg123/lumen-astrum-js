class StateChange {
    constructor(stateChange) {
        this.type = stateChange.type;
        this.from = stateChange.from;
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
const { getSurrounding } = require('./coordinates');
const { withinMap, map, Tiles } = require('./map');
const Constants = require('./constants');
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

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        let baseObj = getBaseObject(this.data.structureName);
        let surrounding = getSurrounding(this.data.position, baseObj.width);
        for (let i = 0; i < surrounding.length; i++) {
            if (!withinMap(surrounding[i]) ||
                state.occupied[surrounding[i].y][surrounding[i].x] ||
                map[surrounding[i].y][surrounding[i].x].displayType === Tiles.BRUSH) {
                return false;
            }
            else if (this.data.builtBy === undefined &&
                state.isAllowedBuilding(surrounding[i].x, surrounding[i].x, this.from)) {
                return false;
            }
            else if (this.data.structureName === 'Harvester') {
                if (map[surrounding[i].y][surrounding[i].x].displayType != Tiles.MINERAL &&
                    map[surrounding[i].y][surrounding[i].x].displayType != Tiles.BIG_MINERAL) {
                    // Harvester must be on mineral
                    return false;
                }
            }
            else {
                if (map[surrounding[i].y][surrounding[i].x].displayType === Tiles.MINERAL ||
                    map[surrounding[i].y][surrounding[i].x].displayType === Tiles.BIG_MINERAL) {
                    // Nothing else can be on mineral
                    return false;
                }
            }
        }
        if (this.data.builtBy) {
            // Check if building place is near a builder!
            const builder = state.mapObjects[this.data.builtBy.y][this.data.builtBy.x];
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

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        let surrounding = getSurrounding(
            this.data.fromBuilding.position,
            this.data.fromBuilding.width + 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (withinMap(surrounding[i]) &&
                !state.occupied[surrounding[i].y][surrounding[i].x] &&
                map[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH) {
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
        /* Client Side will want to implement animations here, or we can store
         * the path onto the map object for the client to interpolate */
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

    _simulateStateChange(state) {
        if (this.from === Constants.RED_SIDE) {
            state.currentTurn = Constants.BLUE_SIDE;
            state.blueTurnCount++;
        }
        else {
            state.currentTurn = Constants.RED_SIDE;
            state.redTurnCount++;
        }
        state.turnEndTime = Date.now() +
            state.calculateNextTurnAvailableTime(state.currentTurn);

        // Turn End Procedures
        for (let i = 0; i < state.structures.length; i++) {
            if (state.structures[i].side === this.from &&
				state.structures[i].turnsUntilBuilt != 0) {
                state.structures[i].turnsUntilBuilt -= 1;
            }
        }
        for (let i = 0; i < state.units.length; i++) {
            if (state.units[i].side === this.from &&
				state.units[i].turnsUntilBuilt != 0) {
                state.units[i].turnsUntilBuilt -= 1;
            }
            /* Reset move range at the end of the turn */
            state.units[i].moveRange = Data.units[state.units[i].name].moverange;
        }
    }
}
StateChange.registerSubClass(TurnPassoverStateChange);

module.exports = {
    StateChange,
    BuildStructureStateChange,
    SpawnUnitStateChange,
    TurnPassoverStateChange,
    MoveUnitStateChange
};
