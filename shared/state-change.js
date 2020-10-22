const Constants = require('./constants');
const { findTarget, replenishShield } = require('./map');

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
const { Tuple, getSurrounding, tupleDistance } = require('./coordinates');
const { map, Tiles } = require('./map');
const PathFinder = require('./path-finder');
const Data = require('./data');
const { default: GameState } = require('./game-state');
const { StunnedModifier } = require('./modifier');

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
        if (state.phase !== Constants.PHASE_PLANNING) return false;
        if (state.hasPlayerForfeited(this.from)) return false;
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

        if (this.data.builtBy.turnsUntilBuilt !== 0) {
            return false;
        }
        
        let baseObj = getBaseObject(this.data.structureName);
        // if (this.data.structureName === 'Deployment Outpost') {
        //     // Deployment outpost, make sure new territory claim doesn't
        //     //    intersect another player's territory        
        //     let surrounding = getSurrounding(this.data.position, baseObj.width + Constants.BUILD_RANGE);  
        //     for (let i = 0; i < surrounding.length; i++) {
        //         if (map.withinMap(surrounding[i]) && state.isEnemyBuildingRange(surrounding[i].x, surrounding[i].y, this.from)) {
        //             return false;
        //         }
        //     }
        // }

        let surrounding = getSurrounding(this.data.position, baseObj.width);
        for (let i = 0; i < surrounding.length; i++) {
            if (!map.withinMap(surrounding[i]) ||
                state.occupied[surrounding[i].y][surrounding[i].x] ||
                map.data[surrounding[i].y][surrounding[i].x].displayType === Tiles.BRUSH) {
                return false;
            }
            else if (/*!this.data.builtBy.isUnit &&*/
                !state.isAllowedBuilding(surrounding[i].x, surrounding[i].y, this.from)) {
                return false;
            }
            // Redesign: removed Harvester
            // else if (this.data.structureName === 'Harvester') {
            //     if (map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.MINERAL &&
            //         map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BIG_MINERAL) {
            //         // Harvester must be on mineral
            //         return false;
            //     }
            // }
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
            if (builder.name !== 'Engineer') {
                return false;
            }
            if (tupleDistance(builder.position, this.data.position) !== 1) {
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
        if (state.phase !== Constants.PHASE_PLANNING) return false;
        if (state.hasPlayerForfeited(this.from)) return false;
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

        if (this.data.fromBuilding.turnsUntilBuilt !== 0) {
            return false;
        }

        let surrounding = getSurrounding(
            this.data.fromBuilding.position,
            this.data.fromBuilding.width + 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (map.withinMap(surrounding[i]) &&
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

class SetUnitTargetStateChange extends StateChange {
    static create(from, unitPos, posTarget) {
        return new SetUnitTargetStateChange(
            StateChange.create(
                from, 'SetUnitTargetStateChange', {
                    unitPos: unitPos,
                    posTarget: posTarget
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (state.phase !== Constants.PHASE_PLANNING) return false;
        if (state.hasPlayerForfeited(this.from)) return false;
        if (!map.withinMap(this.data.unitPos) || !map.withinMap(this.data.posTarget)) {
            return false;
        }
        /* Is there a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.unitPos.y][this.data.unitPos.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.owner !== this.from) return false;

        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.unitPos.y][this.data.unitPos.x];
        if (unit.maxMoveRange === 0) {
            return;
        }
        if (unit.owner !== this.from) return;
        if (unit.position.x === this.data.posTarget.x &&
            unit.position.y === this.data.posTarget.y) {
            unit.targetPoint = undefined;
            unit.desiredPath = [];
            return;
        }
        unit.targetPoint = this.data.posTarget;
        unit.desiredPath = PathFinder.findPath(state,
            unit.position, unit.targetPoint);
    }
};

StateChange.registerSubClass(SetUnitTargetStateChange);

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
        if (state.phase !== Constants.PHASE_ACTION) return false;
        if (state.hasPlayerForfeited(this.from)) return false;
        if (!map.withinMap(this.data.posFrom) || !map.withinMap(this.data.posTo)) {
            return false;
        }
        /* Is there a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.owner !== this.from) return false;

        /* Is the place to move to in the movement range? */
        const range = state.getUnitMovementTiles(this.data.posFrom);
        if (range.find(pos => pos.equals(this.data.posTo)) === undefined) {
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

        if (unit.targetPoint) {
            if (unit.desiredPath.length > 0) {
                if (unit.desiredPath[0].y === this.data.posTo.y &&
                    unit.desiredPath[0].x === this.data.posTo.x) {
                    unit.desiredPath.shift();
                    if (unit.desiredPath.length === 0) {
                        unit.targetPoint = undefined;
                    }
                }
            }
            // TODO: figure out when to recalculate a path
        }
    }
}
StateChange.registerSubClass(MoveUnitStateChange);

class PhaseChangeStateChange extends StateChange {
    static create(from) {
        return new PhaseChangeStateChange(
            StateChange.create(
                from, 'PhaseChangeStateChange'
            )
        );
    }

    isBuilt(mapObject) {
        return mapObject.turnsUntilBuilt === 0;
    }

    _verifyStateChange(state) {
        return true;
    }

    _simulateStateChange(state) {
        if (state.phase == Constants.PHASE_PLANNING) {
            state.phase = Constants.PHASE_ACTION;
            for (let i = 0; i < state.units.length; i++) {
                const unit = state.units[i];
                if (!this.isBuilt(unit)) {
                    unit.turnsUntilBuilt -= 1;
                    if (this.isBuilt(unit)) {
                        // Stun newly built units for half an action
                        if (unit.onCreate) {
                            unit.onCreate(state);
                        }
                        unit.addModifier(state.getCommandBase(unit.owner),
                            new StunnedModifier("Newly created unit!"), {
                                duration: Constants.ACTION_MAX_TIME * 500
                            });
                    }
                }
                if (this.isBuilt(unit) && unit.onActionStart) {
                    unit.onActionStart(state);
                }
            }
            for (let i = 0; i < state.structures.length; i++) {
                const structure = state.structures[i];
                if (!this.isBuilt(structure)) {
                    structure.turnsUntilBuilt -= 1;
                    if (this.isBuilt(structure) && structure.onCreate) {
                        structure.onCreate(state);
                    }
                } 
                if (this.isBuilt(structure) && structure.onActionStart) {
                    structure.onActionStart(state);
                }
            }
        }
        else {
            state.phase = Constants.PHASE_PLANNING;
            
            // Remove all dead units from this tick
            for (let i = 0; i < state.deadObjects.length; i++) {
                state.removeMapObject(state.deadObjects[i]);
            }
            state.deadObjects = [];

            // Process Structures
            for (let i = 0; i < state.structures.length; i++) {
                const structure = state.structures[i];
                replenishShield(structure);
               
                if (this.isBuilt(structure) && structure.onPlanningStart) {
                    structure.onPlanningStart(state);
                }
            }
    
            // Process Units
            for (let i = 0; i < state.units.length; i++) {
                const unit = state.units[i];
                replenishShield(unit);

                /* Reset move range at the end of the turn */
                unit.moveRange = unit.maxMoveRange;
                /* Reset attack on turn start */
                if (unit.attacksThisTurn < 1) {
                    unit.attacksThisTurn += 1;
                }
                if (this.isBuilt(unit) && unit.onPlanningStart) {
                    unit.onPlanningStart(state);
                }
                const modifiers = Object.keys(unit.modifiers);
                for (let i = 0; i < modifiers.length; i++) {
                    const key = modifiers[i];
                    if (unit.modifiers[key].duration) {
                        // All modifiers that have duration time out after combat!
                        unit.removeModifier(key);
                    }
                }
            }
        }

        state.phaseStartTime = this.timestamp;
    }
}
StateChange.registerSubClass(PhaseChangeStateChange);

class ActionTickStateChange extends StateChange {
    // TickTime from Server
    static create(from, tickTime) {
        return new ActionTickStateChange(
            StateChange.create(
                from, 'ActionTickStateChange', {
                    tickTime: tickTime
                }
            )
        );
    }

    _verifyStateChange(state) {
        return true;
    }

    _simulateStateChange(state) {
        state.didAnyoneTick = false;
        for (let j = 0; j < state.structures.length; j++) {
            const structure = state.structures[j];
            if (structure.currentHealth > 0) {
                if (structure.onActionTick) {
                    if (structure.onActionTick(state)) {
                        // Someone ticked
                        state.didAnyoneTick = true;
                    }
                }
            }
        }
        for (let j = 0; j < state.units.length; j++) {
            const unit = state.units[j];
            if (unit.currentHealth > 0) {
                if (unit.onActionTick) {
                    if (unit.onActionTick(state)) {
                        state.didAnyoneTick = true;
                    }
                }
            }
            const modifiers = Object.keys(unit.modifiers);
            for (let i = 0; i < modifiers.length; i++) {
                const key = modifiers[i];
                if (unit.modifiers[key].duration && this.timestamp > unit.modifiers[key].attachTime + unit.modifiers[key].duration) {
                    // Modifier has Timed Out
                    unit.removeModifier(key);
                }
            }
        }

        // Remove all dead units from this tick
        for (let i = 0; i < state.deadObjects.length; i++) {
            state.removeMapObject(state.deadObjects[i]);
        }
        state.deadObjects = [];
    }
}
StateChange.registerSubClass(ActionTickStateChange);

class UnitAttackStateChange extends StateChange {
    static create(from, posFrom, posTo, allowFriendlyFire = false) {
        return new UnitAttackStateChange(
            StateChange.create(
                from, 'UnitAttackStateChange', {
                    posFrom: posFrom,
                    posTo: posTo,
                    allowFriendlyFire
                }
            )
        );
    }

    distance(a, b) {
        return PathFinder.manhattanDistance(new Tuple(a.x, a.y).toCubeCoordinates(),
            new Tuple(b.x, b.y).toCubeCoordinates());
    }

    _verifyStateChange(state) {
        if (state.hasPlayerForfeited(this.from)) return false;
        if (!map.withinMap(this.data.posFrom) || !map.withinMap(this.data.posTo)) {
            return false;
        }
        /* Is there a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.owner !== this.from) return false;

        /* Does this unit have any attacks left? */
        // if (unit.attacksThisTurn <= 0) {
        //     return false;
        // }

        if (unit.attackDamage === 0) {
            return false;
        }
    
        /* Is the attack destination a mapObject that belongs to the
         * opponent? */
        const target = findTarget(state, this.data.posTo);
        if (target === undefined) {
            return false;
        }
        
        // Can't attack my own unit if no friendlyfire
        if (!this.data.allowFriendlyFire && target.owner === this.from) return false;
        
        /* Is the target in the range (including visibility) */
        const range = state.getUnitAttackTiles(this.data.posFrom);
        if (range.find(pos => pos.equals(this.data.posTo)) === undefined) {
            return false;
        }
        
        /* Is the target stealthed? */
        if (target.isUnit) {
            if (target.isStealthed(this.from, state)) {
                return false;
            }
        }
        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        const target = findTarget(state, this.data.posTo);
        // if (unit.custom && unit.custom.attackCooldown) {
        //     unit.attacksThisTurn -= unit.custom.attackCooldown;
        // }
        // else {
        //     unit.attacksThisTurn -= 1;
        // }
        unit.onLaunchAttack(state, target, unit.attackDamage);
        state.dealDamageToUnit(target, unit.attackDamage);

        if (unit.custom && unit.custom.splashDamage) {
            // Apply damage to surrounding units
            const surrounding = getSurrounding(this.data.posTo, unit.custom.splashRange);
            for (let i = 0; i < surrounding.length; i++) {
                const target = findTarget(state, surrounding[i]);
                if (target !== undefined && target.isUnit && target.owner !== this.from) {
                    state.dealDamageToUnit(target, unit.custom.splashDamage);
                }
            }
        }
    }

    getSplashRange(state) {
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit.custom && unit.custom.splashRange) {
            return unit.custom.splashRange;
        }
        return 0;
    }
}
StateChange.registerSubClass(UnitAttackStateChange);

class ChatMessageStateChange extends StateChange {
    static create(from, message) {
        return new ChatMessageStateChange(
            StateChange.create(
                from, 'ChatMessageStateChange', {
                    message: message
                }
            )
        );
    }

    _verifyStateChange(/* state */) {
        return true;
    }

    _simulateStateChange(state) {
        if (this.data.message === '/ff') {
            state.forfeit(this.from);
            state.chatMessages.push({
                author: undefined,
                content: `${this.from} has forfeited!`
            });
        }
        else {
            state.chatMessages.push({
                author: this.from,
                content: this.data.message
            });
        }
    }
}
StateChange.registerSubClass(ChatMessageStateChange);

class HealUnitStateChange extends StateChange {
    static create(from, posFrom, posTo) {
        return new HealUnitStateChange(
            StateChange.create(
                from, 'HealUnitStateChange', {
                    posFrom,
                    posTo
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        if (!map.withinMap(this.data.posFrom) || !map.withinMap(this.data.posTo)) {
            return false;
        }
        /* Is there a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.owner !== this.from) return false;

        /* Is that a medic? */
        if (unit.name !== 'Medic') return false;

        /* Does this unit have any attacks left?
            (We use attack here to track once a turn activity.) */
        if (unit.attacksThisTurn === 0) {
            return false;
        }

        /* Is the attack destination a mapObject that belongs to me? */
        const target = state.mapObjects[this.data.posTo.y][this.data.posTo.x];
        if (target === undefined) {
            return false;
        }
        if (!target.isUnit) return false;
        if (target.owner !== this.from) return false;

        /* No point healing someone with full health! */
        if (target.currentHealth === target.maxHealth) return false;

        /* Is the target in the range? */
        if (tupleDistance(this.data.posFrom, this.data.posTo) !== 1) {
            return false;
        }
        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        const target = state.mapObjects[this.data.posTo.y][this.data.posTo.x];

        unit.attacksThisTurn -= 1;
        target.currentHealth += unit.custom.healFor;
        if (target.currentHealth > target.maxHealth) {
            target.currentHealth = target.maxHealth;
        }
    }
}
StateChange.registerSubClass(HealUnitStateChange);


class RepairStructureStateChange extends StateChange {
    static create(from, posFrom, posTo) {
        return new RepairStructureStateChange(
            StateChange.create(
                from, 'RepairStructureStateChange', {
                    posFrom,
                    posTo
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        if (!map.withinMap(this.data.posFrom) || !map.withinMap(this.data.posTo)) {
            return false;
        }
        /* Is this from a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.owner !== this.from) return false;

        /* Is that a combat engineer? */
        if (unit.name !== 'Combat Engineer') return false;

        /* Does this unit have any attacks left?
            (We use attack here to track once a turn activity.) */
        if (unit.attacksThisTurn === 0) {
            return false;
        }

        /* Is the attack destination a structure that belongs to me? */
        const target = findTarget(state, this.data.posTo);
        if (target === undefined) {
            return false;
        }
        if (target.isUnit) return false;
        if (target.owner !== this.from) return false;

        /* No point repairing structure with full health */
        if (target.currentHealth === target.maxHealth) return false;

        /* Is the target in the range? */
        if (tupleDistance(this.data.posFrom, this.data.posTo) !== 1) {
            return false;
        }
        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        const target = findTarget(state, this.data.posTo);

        unit.attacksThisTurn -= 1;
        target.currentHealth += unit.custom.repairFor;
        if (target.currentHealth > target.maxHealth) {
            target.currentHealth = target.maxHealth;
        }
    }
}
StateChange.registerSubClass(RepairStructureStateChange);


class ReaverDetonateStateChange extends StateChange {
    static create(from, posFrom) {
        return new ReaverDetonateStateChange(
            StateChange.create(
                from, 'ReaverDetonateStateChange', {
                    posFrom
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        if (!map.withinMap(this.data.posFrom)) {
            return false;
        }
        /* Is this from a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.owner !== this.from) return false;

        /* Is that a reaver? */
        if (unit.name !== 'Reaver') return false;
        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];

        // Apply damage to surrounding units
        const surrounding = getSurrounding(this.data.posFrom, 1);
        for (let i = 0; i < surrounding.length; i++) {
            const target = findTarget(state, surrounding[i]);
            if (target !== undefined && target.isUnit && target.owner !== this.from) {
                state.dealDamageToUnit(target, unit.custom.explodeDamage);
            }
        }

        // Kill the reaver
        state.removeMapObject(this.data.posFrom);
    }
}
StateChange.registerSubClass(ReaverDetonateStateChange);


class GuardianLockdownStateChange extends StateChange {
    static create(from, posFrom) {
        return new GuardianLockdownStateChange(
            StateChange.create(
                from, 'GuardianLockdownStateChange', {
                    posFrom
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        if (!map.withinMap(this.data.posFrom)) {
            return false;
        }
        /* Is this from a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.owner !== this.from) return false;

        /* Is that a guardian? */
        if (unit.name !== 'Guardian') return false;

        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];

        if (unit.lockedDown) {
            unit.lockedDown = false;
            unit.maxMoveRange = Data.units[unit.name].moveRange;
            unit.moveRange = Math.min(unit.maxMoveRange, unit.moveRange);
            unit.attackRange = Data.units[unit.name].attackrange;
        }
        else {
            unit.lockedDown = true;
            unit.maxMoveRange = unit.custom.lockedDownMoveRange;
            unit.moveRange = Math.min(unit.maxMoveRange, unit.moveRange);
            unit.attackRange = unit.custom.lockedDownAttackRange;
        }

        // No more attacking if we lock or unlock.
        unit.attacksThisTurn = 0;
    }
}
StateChange.registerSubClass(GuardianLockdownStateChange);

class LaunchProbeStateChange extends StateChange {
    static create(from, posFrom, posTo) {
        return new LaunchProbeStateChange(
            StateChange.create(
                from, 'LaunchProbeStateChange', {
                    posFrom,
                    posTo
                }
            )
        );
    }

    getOptionToLaunch() {
        let builtBy = getBaseObject('Scouting Tower');
        if (!builtBy) {
            return undefined;
        }
        return builtBy.options.find(option => {
            return option.command === 'custom-launchProbe';
        });
    }

    _verifyStateChange(state) {
        if (state.currentTurn !== this.from) {
            return false;
        }
        if (!map.withinMap(this.data.posFrom) || !map.withinMap(this.data.posTo)) {
            return false;
        }
        /* Is this from a structure that belongs to the player? */
        const structure = state.mapObjects[this.data.posFrom.y][this.data.posFrom.x];
        if (structure === undefined || !structure.isStructure) return false;
        if (structure.owner !== this.from) return false;

        /* Is that a scouting tower? */
        if (structure.name !== 'Scouting Tower') return false;

        /* Do you have enough gold? */
        if (state.getGold(this.from) < this.getOptionToLaunch().cost) {
            return false;
        }

        return true;
    }

    _simulateStateChange(state) {
        const surrounding = getSurrounding(this.data.posTo, Constants.PROBE_RANGE);
        for (let i = 0; i < surrounding.length; i++) {
            if (map.withinMap(surrounding[i])) {
                state.addProbeLocation(surrounding[i].x, surrounding[i].y, this.from);
            }
        }
        state.changeGold(this.from, -(this.getOptionToLaunch().cost));
    }
}
StateChange.registerSubClass(LaunchProbeStateChange);

class DebugCheatStateChange extends StateChange {
    static create(from, stateChange) {
        return new DebugCheatStateChange(
            StateChange.create(
                from, 'DebugCheatStateChange', {
                    stateChange: stateChange
                }
            )
        );
    }

    _verifyStateChange(state) {
        return !Constants.IS_PRODUCTION;
    }

    _simulateStateChange(state) {
        const sc = StateChange.deserialize(this.data.stateChange);
        sc._simulateStateChange(state);
    }
}
StateChange.registerSubClass(DebugCheatStateChange);

class DealDamageStateChange extends StateChange {
    static create(from, posTo, damage) {
        return new DealDamageStateChange(
            StateChange.create(
                from, 'DealDamageStateChange', {
                    posTo,
                    damage
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (!map.withinMap(this.data.posTo)) {
            return false;
        }
        /* Is this from a structure that belongs to the player? */
        const mapObject = state.mapObjects[this.data.posTo.y][this.data.posTo.x];
        if (mapObject === undefined) return false;
        return true;
    }

    _simulateStateChange(state) {
        if (!this._verifyStateChange(state)) return;

        const target = findTarget(state, this.data.posTo);
        state.dealDamageToUnit(target, this.data.damage);
    }
}
StateChange.registerSubClass(DealDamageStateChange);

class SpawnMapObject extends StateChange {
    static create(from, posTo, mapObject, owner) {
        return new SpawnMapObject(
            StateChange.create(
                from, 'SpawnMapObject', {
                    posTo,
                    mapObject,
                    owner
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (!map.withinMap(this.data.posTo)) {
            return false;
        }
        const mapObject = state.occupied[this.data.posTo.y][this.data.posTo.x];
        if (mapObject) {
            return false;
        }
        return true;
    }

    _simulateStateChange(state) {
        if (!this._verifyStateChange(state)) return;
        state.insertMapObject(this.data.posTo, this.data.mapObject, this.data.owner);
    }
}
StateChange.registerSubClass(SpawnMapObject);

module.exports = {
    StateChange,
    BuildStructureStateChange,
    SpawnUnitStateChange,
    PhaseChangeStateChange,
    SetUnitTargetStateChange,
    MoveUnitStateChange,
    UnitAttackStateChange,
    ChatMessageStateChange,
    HealUnitStateChange,
    RepairStructureStateChange,
    ReaverDetonateStateChange,
    GuardianLockdownStateChange,
    LaunchProbeStateChange,
    ActionTickStateChange,
    DealDamageStateChange,
    SpawnMapObject,
    DebugCheatStateChange
};
