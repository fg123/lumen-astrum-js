const Data = require('./data');
const AnimationManager = require('./animation-manager');
const triggers = require('./triggers');
const Constants = require('./constants');

module.exports.Structure = class {
    constructor(name, side, position) {
        this.name = name;
        this.side = side;
        this.position = position;
        this.rotation = 0;
        this.turnsUntilBuilt = Data.structures[name].turnsToBuild;
        this.width = Data.structures[name].width;
        this.currentHealth = Data.structures[name].health;
        this.currentShield = Data.structures[name].shield;
        this.maxHealth = Data.structures[name].health;
        this.maxShield = Data.structures[name].shield;
        this.isStructure = true;
        this.isUnit = false;

        /* true indicates a blocking pipeline, only one animation can play */
        this.animationManager = new AnimationManager(true);

        Object.assign(this, triggers[name]);
    }

    static isConstructionBuilding(name) {
        return name === 'Command Base' || name === 'Deployment Outpost';
    }
};

module.exports.Unit = class {
    constructor(name, side, position) {
        this.name = name;
        this.side = side;
        this.position = position;
        this.rotation = 0;
        this.turnsUntilBuilt = Data.units[name].turnsToBuild;
        this.width = 0;
        this.currentHealth = Data.units[name].health;
        this.currentShield = Data.units[name].shield;
        this.maxHealth = Data.units[name].health;
        this.maxShield = Data.units[name].shield;
        this.attackRange = Data.units[name].attackrange;

        /* Sight range changing is complicated because it affects the cached
         * maps in the game-state. We enforce this to be constant for now */
        this.__sightRange__ = Data.units[name].sightrange;

        this.attackDamage = Data.units[name].damage;
        this.isStructure = false;
        this.isUnit = true;

        /* true indicates a blocking pipeline, only one animation can play */
        this.animationManager = new AnimationManager(true);

        /* This is a local copy that changes based on state */
        this.moveRange = Data.units[name].moverange;
        this.maxMoveRange = Data.units[name].moverange;
        this.attacksThisTurn = 0;

        /* These are client specific usage */
        this.desiredPath = [];

        /* This stores any unit specific custom data */
        this.custom = Data.units[name].custom;

        Object.assign(this, triggers[name]);
    }

    getVisionValue() {
        if (this.custom && this.custom.superVision)
            return this.custom.superVision;
        else return 1;
    }

    isStealthed(side, state) {
        if (this.side === side) {
            // My own unit!
            return false;
        }

        if (this.custom && this.custom.stealth) {
            const visionMap = state.getVisibilityMap(side);
            const visionValue = visionMap[this.position.y][this.position.x];

            /* If not enough vision value, it's stealthed */
            return visionValue < this.custom.stealth;
        }
        return false;
    }

    get sightRange() { return this.__sightRange__; }
    set sightRange(val) { throw new Error('Trying to set readonly property!'); }
};
