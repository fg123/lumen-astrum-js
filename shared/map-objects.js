const Data = require('./data');
const AnimationManager = require('./animation-manager');
const triggers = require('./triggers');
const { BaseAnimation } = require('../client/base-animation');

class ModifierHolder {
    constructor() {
        this.modifiers = {};
    }

    addModifier(state, adder, modifier, options = {
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
        modifier.attachTime = state.getGameTime();
        this.modifiers[modifierKey] = modifier;
        modifier.onAttach(state, this);
        return modifierKey;
    }  
    
    removeModifierByAdder(state, adder) {
        const mods = Object.keys(this.modifiers);
        for (let i = 0; i < mods.length; i++) {
            if (this.modifiers[mods[i]].adder === adder.id) {
                this.removeModifier(state, mods[i]);
            }
        }
    }

    removeModifier(state, modifierKey) {
        if (this.modifiers[modifierKey]) {
            const mod = this.modifiers[modifierKey];
            delete this.modifiers[modifierKey];
            mod.onDetach(state, this);
        }
    }

    /** Following are all events that apply to triggers too */
    onPlanningStart(state) {
        if (this.triggers.onPlanningStart) {
            this.triggers.onPlanningStart.call(this, state);
        }
        const mapObject = this;
        Object.values(this.modifiers).forEach(m => {
            m.onPlanningStart(state, mapObject);
        });
    }

    onActionStart(state) {
        if (this.triggers.onActionStart) {
            this.triggers.onActionStart.call(this, state);
        }
        const mapObject = this;
        Object.values(this.modifiers).forEach(m => {
            m.onActionStart(state, mapObject);
        });
    }
    
    onDestroy(state, attacker) {
        if (this.triggers.onDestroy) {
            this.triggers.onDestroy.call(this, state, attacker);
        }
    }

    onCreate(state) {
        if (this.triggers.onCreate) {
            this.triggers.onCreate.call(this, state);
        }
    }

    onTargetAcquire(targets) {
        if (this.triggers.onTargetAcquire) {
            this.triggers.onTargetAcquire.call(this, targets);
        }
    }

    onActionTick(state) {
        if (this.triggers.onActionTick) {
           return this.triggers.onActionTick.call(this, state);
        }
        return false;
    }
    
    onTakingDamage(state, attacker, damage) {
        if (this.triggers.onTakingDamage) {
            this.triggers.onTakingDamage.call(this);
        }
        let actualDamage = damage;
        Object.values(this.modifiers).forEach(m => {
            const newDamage = m.onTakingDamage(state, attacker, this, actualDamage);
            if (newDamage !== undefined) {
                actualDamage = newDamage;
            }
        });
        return actualDamage;
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
        this.icon = Data.structures[name].icon;
        this.texture = Data.structures[name].texture;
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

        this.triggers = triggers[name] || {};

        this.areaTrigger = undefined;
    }

    static isConstructionBuilding(name) {
        return name === 'Command Base' || name === 'Deployment Outpost';
    }

    // Modifier events that affect both structures and units
    onSpawnedAnotherUnit(state, otherUnit) {
        Object.values(this.modifiers).forEach(m => {
            m.onSpawnedAnotherUnit(state, this, otherUnit);
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
        this.icon = Data.units[name].icon;
        this.texture = Data.units[name].texture;
        this.currentHealth = Data.units[name].health;
        this.currentShield = Data.units[name].shield;
        this.maxBaseHealth = Data.units[name].health;
        this.maxShield = Data.units[name].shield;
        this.attackRange = Data.units[name].attackRange;
        this.baseAttackSpeed = Data.units[name].attackSpeed;
        
        this.outOfCombatTime = 0;

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
        this.animation = Data.units[name].animation;

        this.isStructure = false;
        this.isUnit = true;

        /* true indicates a blocking pipeline, only one animation can play */
        this.animationManager = new AnimationManager(true);
   
        if (this.animation && this.animation.baseLayer) {
            this.baseAnimation = new BaseAnimation(this.animation);
        }

        /* This is a local copy that changes based on state */
        this.moveRange = Data.units[name].moveRange;
        this.maxBaseMoveRange = Data.units[name].moveRange;
        this.attacksThisTurn = 0;

        /* These are client specific usage */
        this.desiredPath = [];
        this.targetPoints = [];

        /* This stores any unit specific custom data */
        this.custom = Data.units[name].custom;

        this.triggers = triggers[name] || {};
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

    getStunnedTime(state) {
        let maxTime = 0;
        Object.values(this.modifiers).forEach(m => {
            if (m.stunned()) {                
                maxTime = Math.max(m.getTimeRemaining(state), maxTime);
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
