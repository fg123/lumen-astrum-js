const Data = require('./data');
const AnimationManager = require('./animation-manager');
const triggers = require('./triggers');
const Constants = require('./constants');
const { default: modifier } = require('./modifier');

class ModifierHolder {
    constructor() {
        this.modifiers = {};
    }

    addModifier(adder, modifier, options = {
        duration: undefined,
        onlyOne: false
    }) {
        if (options.onlyOne) {
            // See if already exists
            const mods = Object.keys(this.modifiers);
            for (let i = 0; i < mods.length; i++) {
                if (this.modifiers[mods[i]].getName() === modifier.getName() &&
                    this.modifiers[mods[i]].adder === adder.id) {
                    return mods[i];
                }
            }
        }
        const modifierKey = Date.now() + '/' + Object.keys(this.modifiers).length;
        modifier.adder = adder.id;
        modifier.duration = options.duration;
        modifier.attachTime = Date.now();
        this.modifiers[modifierKey] = modifier;
        modifier.onAttach(this);
        return modifierKey;
    }  
    
    removeModifierByAdder(adder) {
        const mods = Object.keys(this.modifiers);
        for (let i = 0; i < mods.length; i++) {
            if (this.modifiers[mods[i]].adder === adder.id) {
                this.removeModifier(mods[i]);
            }
        }
    }

    removeModifierByName(modifierName) {
        const mods = Object.keys(this.modifiers);
        for (let i = 0; i < mods.length; i++) {
            if (this.modifiers[mods[i]].getName() === modifierName) {
                this.removeModifier(mods[i]);
            }
        }
    }

    removeModifier(modifierKey) {
        if (this.modifiers[modifierKey]) {
            const mod = this.modifiers[modifierKey];
            delete this.modifiers[modifierKey];
            mod.onDetach(this);
        }
    }
};

module.exports.Structure = class extends ModifierHolder {
    constructor(name, owner, position) {
        super();
        this.name = name;
        this.owner = owner;
        this.position = position;
        this.rotation = 0;
        this.turnsUntilBuilt = Data.structures[name].turnsToBuild;
        this.width = Data.structures[name].width;
        this.currentHealth = Data.structures[name].health;
        this.currentShield = Data.structures[name].shield;
        this.maxHealth = Data.structures[name].health;
        this.maxBaseHealth = Data.structures[name].health;
        this.maxShield = Data.structures[name].shield;

        this.sightRange = Data.structures[name].sightRange;
        this.isStructure = true;
        this.isUnit = false;

        /* This stores any unit specific custom data */
        this.custom = Data.structures[name].custom;

        /* true indicates a blocking pipeline, only one animation can play */
        this.animationManager = new AnimationManager(true);

        if (Data.structures[name].targetable !== undefined) {
            this.targetable = Data.structures[name].targetable;
        }
        else {
            this.targetable = true;
        }

        Object.assign(this, triggers[name]);
    }

    static isConstructionBuilding(name) {
        return name === 'Command Base' || name === 'Deployment Outpost';
    }

    // Modifier events that affect both structures and units
    onSpawnedAnotherUnit(otherUnit) {
        Object.values(this.modifiers).forEach(m => {
            m.onSpawnedAnotherUnit(this, otherUnit);
        });
    }
};

module.exports.Unit = class extends ModifierHolder {
    constructor(name, owner, position) {
        super();
        this.name = name;
        this.owner = owner;
        this.position = position;
        this.rotation = 0;
        this.turnsUntilBuilt = Data.units[name].turnsToBuild;
        this.width = 0;
        this.currentHealth = Data.units[name].health;
        this.currentShield = Data.units[name].shield;
        this.maxBaseHealth = Data.units[name].health;
        this.maxShield = Data.units[name].shield;
        this.attackRange = Data.units[name].attackRange;
        this.baseAttackSpeed = Data.units[name].attackSpeed;
        
        if (Data.units[name].targetable !== undefined) {
            this.targetable = Data.units[name].targetable;
        }
        else {
            this.targetable = true;
        }

        if (Data.units[name].buffable !== undefined) {
            this.buffable = Data.units[name].buffable;
        }
        else {
            this.buffable = true;
        }


        /* Sight range changing is complicated because it affects the cached
         * maps in the game-state. We enforce this to be constant for now */
        this.__sightRange__ = Data.units[name].sightRange;

        this.baseAttackDamage = Data.units[name].damage;

        this.isStructure = false;
        this.isUnit = true;

        /* true indicates a blocking pipeline, only one animation can play */
        this.animationManager = new AnimationManager(true);

        /* This is a local copy that changes based on state */
        this.moveRange = Data.units[name].moveRange;
        this.maxBaseMoveRange = Data.units[name].moveRange;
        this.attacksThisTurn = 0;

        /* These are client specific usage */
        this.desiredPath = [];
        this.targetPoints = [];

        /* This stores any unit specific custom data */
        this.custom = Data.units[name].custom;

        Object.assign(this, triggers[name]);
    }

    onLaunchAttack(state, target, damage) {
        Object.values(this.modifiers).forEach(m => {
            m.onLaunchAttack(state, this, target, damage);
        });
    }

    onPreMove(state, target, moveTo) {
        const modifiers = Object.values(this.modifiers);
        for (let i = 0; i < modifiers.length; i++) {
            if (modifiers[i].onPreMove(state, this, moveTo)) {
                return true;
            }
        }
        return false;
    }

    onPostMove(state, target, moveTo) {
        Object.values(this.modifiers).forEach(m => {
            m.onPostMove(state, this, moveTo);
        });
    }

    getVisionValue() {
        if (this.custom && this.custom.superVision)
            return this.custom.superVision;
        else return 1;
    }

    isStealthed(player, state) {
        if (this.owner === player) {
            // My own unit!
            return false;
        }

        if (this.custom && this.custom.stealth) {
            const visionMap = state.getVisibilityMap(player);
            const visionValue = visionMap[this.position.y][this.position.x];

            /* If not enough vision value, it's stealthed */
            return visionValue < this.custom.stealth;
        }
        return false;
    }

    getStunnedTime() {
        let maxTime = 0;
        Object.values(this.modifiers).forEach(m => {
            if (m.stunned()) {                
                maxTime = Math.max(m.getTimeRemaining(), maxTime);
            }
        });
        return maxTime;
    }

    getStunnedTotalTime() {
        let maxTime = 0;
        Object.values(this.modifiers).forEach(m => {
            if (m.stunned()) {
                maxTime = Math.max(m.duration, maxTime);
            }
        });
        return maxTime;
    }

    get sightRange() { return this.__sightRange__; }
    set sightRange(val) { throw new Error('Trying to set readonly property!'); }
    
    get attackSpeed() {
        let val = this.baseAttackSpeed;
        Object.values(this.modifiers).forEach(m => {
            val = m.attackSpeed(val);
        });
        return val;
    }
    set attackSpeed(val) { this.baseAttackSpeed = val;}
    
    get attackDamage() {
        let val = this.baseAttackDamage;
        Object.values(this.modifiers).forEach(m => {
            val = m.attackDamage(val);
        });
        return val;
    }
    set attackDamage(val) { this.baseAttackDamage = val;}

    get maxMoveRange() {
        let val = this.maxBaseMoveRange;
        Object.values(this.modifiers).forEach(m => {
            val = m.moveRange(val);
        });
        return val;
    }

    set maxMoveRange(val) { this.maxBaseMoveRange = val; }

    get maxHealth() {
        let val = this.maxBaseHealth;
        Object.values(this.modifiers).forEach(m => {
            val = m.health(val);
        });
        return val;
    }
    set maxHealth(val) { this.maxBaseHealth = val;}
};
