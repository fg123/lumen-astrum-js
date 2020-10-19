const { map, Tiles, findTarget, replenishShield } = require('./map');
const Constants = require('./constants');
const { units, structures } = require('./data');
const { getSurrounding, tupleDistance } = require('./coordinates');
const { UnitAttackStateChange, GroundClaimStateChange } = require('./state-change');
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
    SilverBulletModifier
} = require('./modifier');

// Triggers that are available:
//   onPlanningStart
//   onActionStart
//   onCreate
//   onDestroy
//   onActionTick - (SERVER ONLY) called every tick of the action phase, return true
//                  if you want to continue the action phase
//                  (more stuff happening)
const triggers = {
    'Command Base': {
        onPlanningStart(state) {
            // Gain Passive Gold Per Turn
            state.players[this.owner].gold += 200;
            if (state.clientState) {
                state.clientState.globalAnimationManager.addAnimation(
                    new PopupTextAnimation("+200", Constants.YELLOW_CHAT_COLOR,
                        this.position)
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
            if (state.clientState) {
                state.clientState.globalAnimationManager.addAnimation(
                    new PopupTextAnimation(`+${this.custom.value}`, Constants.YELLOW_CHAT_COLOR,
                        this.position)
                );
            }
            if (this.currentHealth <= 0) {
                this.currentHealth = 0;
                state.deadObjects.push(this.position);
            }
        }
    },
    'Gem Harvester': {
        onPlanningStart(state) {
            // Gain Extra Gold
            const owner = state.getTileOwner(this.position.x, this.position.y);
            if (owner === undefined) return;
            
            state.players[owner].gold += this.custom.value;
            this.currentHealth -= this.custom.value;
            if (state.clientState) {
                state.clientState.globalAnimationManager.addAnimation(
                    new PopupTextAnimation(`+${this.custom.value}`, Constants.YELLOW_CHAT_COLOR,
                        this.position)
                );
            }
            if (this.currentHealth <= 0) {
                this.currentHealth = 0;
                state.deadObjects.push(this.position);
            }
        }
    },
    'Stim Lab': {
        onActionStart(state) {
            // Add modifier to everyone on my team            
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(this, new StimModifier(this.custom.attackSpeedMultiplier), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            const adder = this;
            units.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Thieves' Cave": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(this, new ThievesModifier(this.custom.attackGoldGen), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            const adder = this;
            units.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Artillery Bay": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(this, new ArtilleryModifier(this.custom.attackDamageMultiplier), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            const adder = this;
            units.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Cloud Gate": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(this, new CloudModifier(this.custom.moveRangeDelta), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            const adder = this;
            units.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Vitality Fountain": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(this, new VitalityModifier(this.custom.healthMultiplier), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            const adder = this;
            units.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Vampiric Lair": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(this, new VampiricModifier(this.custom.healMultiplier), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            const adder = this;
            units.forEach(u => {
                u.removeModifierByAdder(adder);
            });
        }
    },
    "Shauna's Forge": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(this, new SilverBulletModifier(this.custom.healthMultiplier), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            const adder = this;
            units.forEach(u => {
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
            state.insertMapObject(position, 'Armed Turret', owner);
        },
    },
    'Reaver': {
        onDestroy(state) {
            console.log("Reaver dead!");
            const damageArea = getSurrounding(this.position, 2);
            for (let i = 0; i < damageArea.length; i++) {
                const tile = damageArea[i];
                if (tupleDistance(tile, this.position) === 1) {
                    const target = findTarget(state, tile);
                    if (target && target.owner !== undefined && target.targetable) {
                        state.dealDamageToUnit(target, this.custom.explodeDamage1);
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
                    const target = findTarget(state, tile);
                    if (target && target.owner !== undefined && target.targetable) {
                        state.dealDamageToUnit(target, this.custom.explodeDamage2);
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
        },
        onActionTick(game) {
            // Server only, any changes we need to notify client
            const state = game.state;

            let didWeClaim = false;
            const surrounding = getSurrounding(this.position, this.width + this.claimedRange);
            for (let i = 0; i < surrounding.length; i++) {
                if (map.withinMap(surrounding[i])) {
                    if (map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.BRUSH &&
                        map.data[surrounding[i].y][surrounding[i].x].displayType !== Tiles.ROCK) {
                        // Check no one else has this tile
                        if (!state.isEnemyBuildingRange(surrounding[i].x, surrounding[i].y, this.owner)) {
                            // And we didn't claim it
                            if (!this.claimedHash.has(surrounding[i].hash())) {
                                didWeClaim = true;
                                game.processStateChange(
                                    GroundClaimStateChange.create(this.owner, this.position,
                                        surrounding[i]));
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
        onDestroy(state) {
            console.log("Dying", this);
            if (this.claimedTiles) {
                console.log("Unclaiming tiles", this.claimedTiles);
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