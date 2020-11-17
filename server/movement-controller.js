const PathFinder = require("../shared/path-finder");
const { SetUnitTargetStateChange } = require("../shared/state-change");

// Orders the units based on movement dependencies
module.exports.movementSort = function (game, nonDeadUnits) {
    const immovableUnits = [];
    const noDependencyUnit = new Set();
    const dependentsMap = {};
    for (let i = 0; i < nonDeadUnits.length; i++) {
        const unit = nonDeadUnits[i];
        if (unit.targetPoints.length > 0) {
            // Repath first
            game.processStateChange(SetUnitTargetStateChange.create(game.state, 
                unit.owner,
                unit.position, unit.targetPoints));
            if (unit.targetPoints.length > 0) {
                unit.desiredPath = PathFinder.findPath(game.state,
                    unit.position, unit.targetPoints[0], {
                        ignoreUnits: true
                    });
            }
        }
        let dependent = undefined;
        if (unit.targetPoints.length !== 0 && unit.desiredPath &&
            unit.desiredPath.length !== 0) {
            dependent = game.state.findTarget(unit.desiredPath[0]);
        }

        if (dependent !== undefined) {
            if (!dependentsMap[dependent.id]) {
                dependentsMap[dependent.id] = [];
            }
            if (dependent.isStructure) {
                // I'm trying to path into a structure so I'm immovable
                immovableUnits.push(unit);
            }
            else {
                dependentsMap[dependent.id].push(unit);
            }
        }
        else {
            noDependencyUnit.add(unit);
        }
    }
    const immovableIdSet = new Set();
    // Mark all immovable units DFS
    let i = 0;
    while (i < immovableUnits.length) {
        const front = immovableUnits[i];
        immovableIdSet.add(front.id);
        // Any dependents should also be marked immovable
        if (dependentsMap[front.id]) {
            immovableUnits.push(...dependentsMap[front.id]);
        }
        i += 1;
    }
    
    // Every unit is either in the dependency map or in the noDependencyUnit
    const result = [...noDependencyUnit];
    i = 0;
    while (i < result.length) {
        const front = result[i];
        if (dependentsMap[front.id]) {
            result.push(...dependentsMap[front.id]);
        }
        i += 1;
    }
    return result;
};