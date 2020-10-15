const { map, Tiles, findTarget, replenishShield } = require('./map');
const Constants = require('./constants');
const { units, structures } = require('./data');
const { getSurrounding } = require('./coordinates');
const { dealDamageToUnit } = require('./state-change');
const { toDrawCoord } = require('../client/utils');
const {
    PopupTextAnimation
} = require('../client/animation');

const {
    StimModifier,
    ThievesModifier,
    ArtilleryModifier,
    CloudModifier,
    VitalityModifier
} = require('./modifier');

// Triggers that are available:
//   onPlanningStart
//   onActionStart
//   onCreate
//   onDestroy
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
                u.addModifier(new StimModifier(this.custom.attackSpeedMultiplier), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.removeModifierByName("StimModifier");
            });
        }
    },
    "Thieves' Cave": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(new ThievesModifier(this.custom.attackGoldGen), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.removeModifierByName("ThievesModifier");
            });
        }
    },
    "Artillery Bay": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(new ArtilleryModifier(this.custom.attackDamageMultiplier), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.removeModifierByName("ArtilleryModifier");
            });
        }
    },
    "Cloud Gate": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(new CloudModifier(this.custom.moveRangeDelta), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.removeModifierByName("CloudModifier");
            });
        }
    },
    "Vitality Fountain": {
        onActionStart(state) {
            // Add modifier to everyone on my team
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.addModifier(new VitalityModifier(this.custom.healthMultiplier), true);
            });
        },
        onDestroy(state) {
            const units = state.getUnitsOnMyTeam(this.owner);
            units.forEach(u => {
                u.removeModifierByName("VitalityModifier");
            });
        }
    }
};



Object.keys(triggers).forEach(key => {
    if (!(key in units) && !(key in structures)) {
        console.error(key + ' in trigger list is not a unit or structure');
    }
});

module.exports = triggers;