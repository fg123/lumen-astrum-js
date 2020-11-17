const Constants = require('./constants');

class StateChange {
    constructor(stateChange) {
        this.type = stateChange.type;
        this.from = stateChange.from;
        this.data = stateChange.data;
        this.timestamp = stateChange.timestamp;
    }

    static create(state, from, type, data) {
        return new StateChange({
            type,
            from,
            data,
            timestamp: state.getGameTime()
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
const { replenishShield, Tiles } = require('./map');
const PathFinder = require('./path-finder');
const Data = require('./data');
const { default: GameState } = require('./game-state');
const { StunnedModifier } = require('./modifier');
const { MoveUnitAnimation } = require('../client/animation');
const { AnimationKeys } = require('../client/baseAnimation');

class BuildStructureStateChange extends StateChange {
    /* Built-by is undefined if from a structure, otherwise the position of the
     * unit that built it */
    static create(state, from, structureName, position, builtBy) {
        return new BuildStructureStateChange(
            StateChange.create(
                state, from, 'BuildStructureStateChange', {
                    structureName: structureName,
                    position: position,
                    builtBy: builtBy
                }
            )
        );
    }

    getOptionToBuild(builtByObj) {
        let builtBy = getBaseObject(builtByObj.name);
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
        const builtBy = state.mapObjects[this.data.builtBy.y][this.data.builtBy.x];
        if (!builtBy) return false;

        const option = this.getOptionToBuild(builtBy);
        if (!option) {
            return false;
        }
        if (state.getGold(this.from) < option.cost) {
            return false;
        }
        if (!state.arePrereqsSatisfied(option, this.from)) {
            return false;
        }

        if (builtBy.turnsUntilBuilt !== 0) {
            return false;
        }

        let baseObj = getBaseObject(this.data.structureName);

        let surrounding = getSurrounding(this.data.position, baseObj.width);
        for (let i = 0; i < surrounding.length; i++) {
            if (!state.gameMap.withinMap(surrounding[i]) ||
                state.occupied[surrounding[i].y][surrounding[i].x] ||
                state.gameMap.data[surrounding[i].y][surrounding[i].x].displayType === Tiles.BRUSH) {
                return false;
            }
            else if (/*!this.data.builtBy.isUnit &&*/
                !state.isAllowedBuilding(surrounding[i].x, surrounding[i].y, this.from)) {
                return false;
            }
            else {
                if (state.gameMap.data[surrounding[i].y][surrounding[i].x].displayType === Tiles.MINERAL ||
                    state.gameMap.data[surrounding[i].y][surrounding[i].x].displayType === Tiles.BIG_MINERAL) {
                    // Nothing else can be on mineral
                    return false;
                }
            }
        }
        
        if (!builtBy) {
            return false;
        }
        if (tupleDistance(builtBy.position, this.data.position) !== 1 + builtBy.width) {
            return false;
        }

        return true;
    }

    _simulateStateChange(state) {
        const builtBy = state.mapObjects[this.data.builtBy.y][this.data.builtBy.x];
        state.insertMapObject(this.data.position,
            this.data.structureName,
            this.from);
        const option = this.getOptionToBuild(builtBy);
        // This should really be behind a flag checker for testing mode
        const cost = option ? option.cost : 0;
        state.changeGold(this.from, -cost);
    }
}
StateChange.registerSubClass(BuildStructureStateChange);

class SpawnUnitStateChange extends StateChange {
    static create(state, from, unitName, position, fromBuilding) {
        return new SpawnUnitStateChange(
            StateChange.create(
                state, from, 'SpawnUnitStateChange', {
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
            if (state.gameMap.withinMap(surrounding[i]) &&
                !state.occupied[surrounding[i].y][surrounding[i].x] &&
                state.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH) {
                if (this.data.position.x === surrounding[i].x &&
                    this.data.position.y === surrounding[i].y) {
                    return true;
                }
            }
        }
        return false;
    }

    _simulateStateChange(state) {
        const spawned = state.insertMapObject(this.data.position,
            this.data.unitName,
            this.from);
            
        const fromBuilding = state.mapObjects[this.data.fromBuilding.position.y][this.data.fromBuilding.position.x];
        fromBuilding.onSpawnedAnotherUnit(state, spawned);
        state.changeGold(this.from, -(this.getOptionToBuild().cost));
    }
}
StateChange.registerSubClass(SpawnUnitStateChange);

class SetUnitTargetStateChange extends StateChange {
    static create(state, from, unitPos, targets) {
        return new SetUnitTargetStateChange(
            StateChange.create(
                state, from, 'SetUnitTargetStateChange', {
                    unitPos: unitPos,
                    targets: targets
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (state.phase !== Constants.PHASE_PLANNING) return false;
        if (state.hasPlayerForfeited(this.from)) return false;
        if (!state.gameMap.withinMap(this.data.unitPos)) {
            return false;
        }
        for (let i = 0; i < this.data.targets.length; i++) {
            if (!state.gameMap.withinMap(this.data.targets[i])) {
                return false;
            }
        }
        /* Is there a unit that belongs to the player? */
        const unit = state.mapObjects[this.data.unitPos.y][this.data.unitPos.x];
        if (unit === undefined || !unit.isUnit) return false;
        if (unit.owner !== this.from) return false;

        return true;
    }

    _simulateStateChange(state) {
        const unit = state.mapObjects[this.data.unitPos.y][this.data.unitPos.x];
        if (unit === undefined) return;
        if (unit.maxMoveRange === 0) {
            return;
        }
        if (unit.owner !== this.from) return;

        while (this.data.targets.length > 0 &&
               unit.position.x === this.data.targets[0].x &&
               unit.position.y === this.data.targets[0].y) {
            this.data.targets.splice(0, 1);
        }
        for (let i = 1; i < this.data.targets.length; i++) {
            if (this.data.targets[i].x === this.data.targets[i - 1].x &&
                this.data.targets[i].y === this.data.targets[i - 1].y) {
                this.data.targets.splice(i, 1);
                i -= 1;
            }
        }
        if (this.data.targets.length === 0) {
            unit.targetPoints = [];
        }
        else {
            unit.targetPoints = this.data.targets;
        }
    }
};

StateChange.registerSubClass(SetUnitTargetStateChange);

class MoveUnitStateChange extends StateChange {
    static create(state, from, posFrom, posTo) {
        return new MoveUnitStateChange(
            StateChange.create(
                state, from, 'MoveUnitStateChange', {
                    posFrom: posFrom,
                    posTo: posTo
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (state.phase !== Constants.PHASE_ACTION) return false;
        if (state.hasPlayerForfeited(this.from)) return false;
        if (!state.gameMap.withinMap(this.data.posFrom) || !state.gameMap.withinMap(this.data.posTo)) {
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
        
        if (!unit.onPreMove(state, unit, this.data.posTo)) {
            unit.moveRange -= path.length;
            state.moveUnit(this.data.posFrom, this.data.posTo);
            if (state.clientState) {
                // Movement Animation
                path.unshift(this.data.posFrom);
                const currentlySelected = state.clientState.selectedObject &&
                    state.clientState.selectedObject.position.x === this.data.posFrom.x &&
                    state.clientState.selectedObject.position.y === this.data.posFrom.y;
                unit.animationManager.addAnimation(
                    new MoveUnitAnimation(unit, path, 10, () => {
                        if (currentlySelected && !state.clientState.selectedObject) {
                            state.clientState.selectObject(unit);
                        }
                    })
                );
            }
        }
        unit.onPostMove(state, unit, this.data.posTo);
    }
}
StateChange.registerSubClass(MoveUnitStateChange);

class PhaseChangeStateChange extends StateChange {
    static create(state, from) {
        return new PhaseChangeStateChange(
            StateChange.create(
                state, from, 'PhaseChangeStateChange'
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
            // Units and structures can change the array when they do action
            // start, so we should make a copy of all the objects.
            state.purgeDeadObjects();

            const units = state.units.slice();
            const structures = state.structures.slice();
            for (let i = 0; i < units.length; i++) {
                const unit = units[i];
                if (!this.isBuilt(unit)) {
                    unit.turnsUntilBuilt -= 1;
                    if (this.isBuilt(unit)) {
                        // Stun newly built units for half an action
                        if (unit.onCreate) {
                            unit.onCreate(state);
                        }
                        unit.addModifier(state, unit,
                            new StunnedModifier("Newly created unit!"), {
                                duration: Constants.ACTION_MAX_TIME * 500
                            });
                    }
                }
                if (this.isBuilt(unit) && unit.onActionStart) {
                    unit.onActionStart(state);
                }
            }

            for (let i = 0; i < structures.length; i++) {
                const structure = structures[i];
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
            state.purgeDeadObjects();

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
    static create(state, from, tickTime) {
        return new ActionTickStateChange(
            StateChange.create(
                state, from, 'ActionTickStateChange', {
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
        state.purgeDeadObjects();
    }
}
StateChange.registerSubClass(ActionTickStateChange);

class UnitAttackStateChange extends StateChange {
    static create(state, from, posFrom, posTo, allowFriendlyFire = false) {
        return new UnitAttackStateChange(
            StateChange.create(
                state, from, 'UnitAttackStateChange', {
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
        if (!state.gameMap.withinMap(this.data.posFrom) || !state.gameMap.withinMap(this.data.posTo)) {
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
        const target = state.findTarget(this.data.posTo);
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
        const target = state.findTarget(this.data.posTo);

        unit.onLaunchAttack(state, target, unit.attackDamage);
        state.dealDamageToUnit(unit, target, unit.attackDamage);

        unit.outOfCombatTime = this.timestamp + (Constants.OUT_OF_COMBAT_TIME * 1000);
        target.outOfCombatTime = this.timestamp + (Constants.OUT_OF_COMBAT_TIME * 1000);

        if (state.clientState && unit.baseAnimation) {
            unit.baseAnimation.startAnimation(AnimationKeys.ATTACK);
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
    static create(state, from, message) {
        return new ChatMessageStateChange(
            StateChange.create(
                state, from, 'ChatMessageStateChange', {
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
        else if (this.data.message === '/crash' &&
                (state.getUsername(this.from) === 'Arasseo' || state.getUsername(this.from) === 'test')) {
            throw "Intentional crash!";
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

class DebugCheatStateChange extends StateChange {
    static create(state, from, stateChange) {
        return new DebugCheatStateChange(
            StateChange.create(
                state, from, 'DebugCheatStateChange', {
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
    static create(state, from, posTo, damage) {
        return new DealDamageStateChange(
            StateChange.create(
                state, from, 'DealDamageStateChange', {
                    posTo,
                    damage
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (!state.gameMap.withinMap(this.data.posTo)) {
            return false;
        }
        /* Is this from a structure that belongs to the player? */
        const mapObject = state.mapObjects[this.data.posTo.y][this.data.posTo.x];
        if (mapObject === undefined) return false;
        return true;
    }

    _simulateStateChange(state) {
        if (!this._verifyStateChange(state)) return;

        const target = state.findTarget(this.data.posTo);
        state.dealDamageToUnit(undefined, target, this.data.damage);
    }
}
StateChange.registerSubClass(DealDamageStateChange);

class SpawnMapObject extends StateChange {
    static create(state, from, posTo, mapObject, owner) {
        return new SpawnMapObject(
            StateChange.create(
                state, from, 'SpawnMapObject', {
                    posTo,
                    mapObject,
                    owner
                }
            )
        );
    }

    _verifyStateChange(state) {
        if (!state.gameMap.withinMap(this.data.posTo)) {
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
    ActionTickStateChange,
    DealDamageStateChange,
    SpawnMapObject,
    DebugCheatStateChange
};
