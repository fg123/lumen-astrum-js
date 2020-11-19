const { Tiles } = require('./map');
const Constants = require('./constants');
const { units, structures } = require('./data');
const { getSurrounding, tupleDistance } = require('./coordinates');
const { UnitAttackStateChange } = require('./state-change');
const { toDrawCoord } = require('../client/utils');
const { Resource } = require('../client/resources');
const {
    PopupTextAnimation, GenericInPlaceSpriteAnimation
} = require('../client/animation');

const {
    StimModifier,
    ThievesModifier,
    ArtilleryModifier,
    CloudModifier,
    VitalityModifier,
    VampiricModifier,
    SilverBulletModifier,
    BarracksBuffGiver,
    StunnedModifier,
    FlashPointModifier,
    ArcticTippedModifier,
    HurricaneModifier,
    ArmoryModifier
} = require('./modifier');

function buffableUnit(u) {
    return u.buffable;
}

function rangeOneUnitNotTurret(deploymentOutpost) {
    return (unit) => {
        return tupleDistance(deploymentOutpost.position, unit.position) === 1 &&
            unit.name !== 'Armed Turret';
    };
}

function rangeOneBarracks(buffBuilding) {
    return (structure) => {
        return structure.name === 'Barracks' &&
            tupleDistance(buffBuilding.position, structure.position) === 1;
    };
}

function allConstructors(buffBuilding) {
    return (structure) => {
        return structure.name === 'Barracks' || structure.name === 'Command Base';
    };
}

// Triggers that are available:
//   onPlanningStart
//   onActionStart
//   onCreate
//   onDestroy
//   onTargetAcquire - passes in a list of targets from acquiry, we can 
//                     modify as we wish
//   onActionTick - called every tick of the action phase, return true
//                  if you want to continue the action phase
//                  (more stuff happening)
const triggers = {
    'Command Base': {
        onPlanningStart(state) {
            // Gain Passive Gold Per Turn
            state.players[this.owner].gold += 200;
            if (state.clientState && state.clientState.player === this.owner) {
                state.clientState.globalAnimationManager.addAnimation(
                    new PopupTextAnimation("+200", Constants.YELLOW_CHAT_COLOR,
                        this.position, 0, false)
                );
            }
        }
    },
    'Ether Harvester': {
        onPlanningStart(state) {
            // Gain Extra Gold
            const owner = state.getTileOwner(this.position.x, this.position.y);
            if (owner === undefined) return;

            state.players[owner].gold += this.custom.value;
            this.currentHealth -= this.custom.value;
            if (state.clientState && state.clientState.player === owner) {
                state.clientState.globalAnimationManager.addAnimation(
                    new PopupTextAnimation(`+${this.custom.value}`, Constants.YELLOW_CHAT_COLOR,
                        this.position, 0, false)
                );
            }
            if (this.currentHealth <= 0) {
                this.currentHealth = 0;
                state.deadObjects.push(this.position);
            }
        }
    },
    'Gem Harvester': {
        onDestroy(state, attacker) {
            const newOwner = attacker === undefined ? undefined : attacker.owner;
            state.removeMapObject(this.position);
            state.insertMapObject(this.position, 'Gem Harvester', newOwner);
        },
        onPlanningStart(state) {
            // As long as someone captures this we gucci
            const owner = this.owner;
            if (owner === undefined) return;

            state.players[owner].gold += this.custom.value;
            if (state.clientState && state.clientState.player === this.owner) {
                state.clientState.globalAnimationManager.addAnimation(
                    new PopupTextAnimation(`+${this.custom.value}`, Constants.YELLOW_CHAT_COLOR,
                        this.position, 0, false)
                );
            }
        }
    },
    'Stim Lab': {
        onActionStart(state) {
            // Add modifier to all barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, allConstructors(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new StimModifier(this.custom.attackSpeedMultiplier);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, allConstructors(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Artillery Bay": {
        onActionStart(state) {
            // Add modifier to all barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, allConstructors(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new ArtilleryModifier(this.custom.attackDamageMultiplier);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, allConstructors(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Cloud Gate": {
        onActionStart(state) {
            // Add modifier to all barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, allConstructors(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new CloudModifier(this.custom.moveRangeDelta);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, allConstructors(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Vitality Fountain": {
        onActionStart(state) {
            // Add modifier to all barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, allConstructors(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new VitalityModifier(this.custom.healthMultiplier);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, allConstructors(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Vampiric Lair": {
        onActionStart(state) {
            // Add modifier to barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new VampiricModifier(this.custom.healMultiplier);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Static Amplifier": {
        onActionStart(state) {
            // Add modifier to barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new HurricaneModifier(this.custom.bonusDamageModifier);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Armory": {
        onActionStart(state) {
            // Add modifier to barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new ArmoryModifier(this.custom.armourModifier, this.custom.armourMultiplier);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Shauna's Forge": {
        onActionStart(state) {
            // Add modifier to barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new SilverBulletModifier(this.custom.healthMultiplier);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Thieves' Cave": {
        onActionStart(state) {
            // Add modifier to barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new ThievesModifier(this.custom.attackGoldGen);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Flash Point": {
        onActionStart(state) {
            // Add modifier to barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new FlashPointModifier();
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Arctic Tower": {
        onActionStart(state) {
            // Add modifier to barracks next to me
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            barracks.forEach(b => {
                b.addModifier(state, this, new BarracksBuffGiver(() => {
                    return new ArcticTippedModifier(this.custom.stunDuration);
                }), {
                    onlyOne: true
                });
            });
        },
        onDestroy(state) {
            const barracks = state.getStructuresOnMyTeam(this.owner, rangeOneBarracks(this));
            const adder = this;
            barracks.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    'Turret': {
        onActionStart(state) {
            // Convert myself into a turret unit
            const position = this.position;
            const owner = this.owner;
            state.removeMapObject(position);
            const unit = state.insertMapObject(position, 'Armed Turret', owner);
            unit.addModifier(state, state.getCommandBase(unit.owner),
                new StunnedModifier("Newly created unit!"), {
                    duration: Constants.ACTION_MAX_TIME * 500
                });
        }
    },
    'Armed Turret': {
        onTargetAcquire(targets) {
            // Filter out everything that's not a unit; targets here is:
            //  { enemy: , inRangeTile: }
            let j = 0;
            for (let i = 0; i < targets.length; i++) {
                if (targets[i].enemy.isUnit) {
                    targets[j++] = targets[i];
                }
            }
            targets.length = j;
        }
    },
    'Reaver': {
        onDestroy(state) {
            console.log("Reaver dead!");
            const damageArea = getSurrounding(this.position, 2);
            for (let i = 0; i < damageArea.length; i++) {
                const tile = damageArea[i];
                if (tile.equals(this.position)) {
                    // Don't try to destroy myself.
                    continue;
                }
                if (tupleDistance(tile, this.position) === 1) {
                    const target = state.findTarget(tile);
                    if (target && target.owner !== undefined && target.owner !== this.owner && target.targetable) {
                        state.dealDamageToUnit(this, target, this.custom.explodeDamage1);
                        if (state.clientState) {
                            state.clientState.globalAnimationManager.addAnimation(
                                new GenericInPlaceSpriteAnimation(
                                    toDrawCoord(tile),
                                    state.clientState.resourceManager.get(Resource.ATTACK_EXPLODING), 25, 1
                                )
                            );
                        }
                    }
                }
                else if (tupleDistance(tile, this.position) === 2) {
                    const target = state.findTarget(tile);
                    if (target && target.owner !== undefined && target.owner !== this.owner && target.targetable) {
                        state.dealDamageToUnit(this, target, this.custom.explodeDamage2);
                        if (state.clientState) {
                            state.clientState.globalAnimationManager.addAnimation(
                                new GenericInPlaceSpriteAnimation(
                                    toDrawCoord(tile),
                                    state.clientState.resourceManager.get(Resource.ATTACK_EXPLODING), 25, 1
                                )
                            );
                        }
                    }
                }
            }
        }
    },
    'Deployment Outpost': {
        onCreate(state) {
            this.claimedRange = 0;
            this.claimedHash = new Set();
            this.claimedTiles = [];
            this.tickClaimCounter = 0;
            this.tickHealCounter = 0;
        },
        expandTick(state) {
            if (this.tickClaimCounter < 2) {
                this.tickClaimCounter += 1;
                return true;
            }

            this.tickClaimCounter = 0;

            let didWeClaim = false;

            const surrounding = getSurrounding(this.position, this.width + this.claimedRange);
            for (let i = 0; i < surrounding.length; i++) {
                if (state.gameMap.withinMap(surrounding[i])) {
                    if (state.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.NONE &&
                        state.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                        state.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK && 
                        state.gameMap.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.HIGH) {
                        // Check no one else has this tile
                        if (!state.isEnemyBuildingRange(surrounding[i].x, surrounding[i].y, this.owner)) {
                            // And we didn't claim it
                            if (!this.claimedHash.has(surrounding[i].hash())) {
                                didWeClaim = true;
                                this.claimedHash.add(surrounding[i].hash());
                                this.claimedTiles.push(surrounding[i]);
                                state.setAllowedBuilding(surrounding[i].x, surrounding[i].y, this.owner);
                            }
                        }
                    }
                }
            }

            if (this.claimedRange < Constants.BUILD_RANGE) {
                this.claimedRange += 1;
            }
            return didWeClaim;
        },
        healTick(state) {
            if (this.tickHealCounter < 10) {
                this.tickHealCounter += 1;
                return true;
            }
            this.tickHealCounter = 0;

            let didWeHeal = false;
            const units = state.getUnitsOnMyTeam(this.owner, rangeOneUnitNotTurret(this));
            for (let i = 0; i < units.length; i++) {
                const maxHealth = units[i].maxHealth;
                if (units[i].turnsUntilBuilt === 0 &&
                    units[i].currentHealth < maxHealth) {
                    didWeHeal = true;
                    if (state.getGameTime() > units[i].outOfCombatTime && 
                        state.isAllowedBuilding(units[i].position.x, units[i].position.y, units[i].owner)) {
                        let heal = Math.ceil(this.custom.healPercentagePerTick * maxHealth);
                        if (units[i].currentHealth + heal > maxHealth) {
                            heal = maxHealth - units[i].currentHealth;
                        }
                        
                        units[i].currentHealth += heal;

                        if (state.clientState) {
                            state.clientState.globalAnimationManager.addAnimation(
                                new PopupTextAnimation(`+${heal}`, "green",
                                    units[i].position, 0, false)
                            );
                        }
                    }
                }
            }
            
            return didWeHeal;
        },
        onActionTick(state) {
            // Every 2 ticks we expand
            const didWeClaim = this.triggers.expandTick.call(this, state);
            const didWeHeal = this.triggers.healTick.call(this, state);
            
            return didWeClaim || didWeHeal;
        },
        onDestroy(state) {
            if (this.claimedTiles) {
                this.claimedTiles.forEach(t => {
                    state.revokeAllowedBuilding(t.x, t.y, this.owner);
                });
            }
        }
    }
};


Object.keys(triggers).forEach(key => {
    if (!(key in units) && !(key in structures)) {
        console.error(key + ' in trigger list is not a unit or structure');
    }
});

module.exports = triggers;
