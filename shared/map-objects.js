const Data = require('./data');
const AnimationManager = require('./animation-manager');

module.exports.Structure = class {
    constructor(name, side, position) {
        this.name = name;
        this.side = side;
        this.position = position;
        this.turnsUntilBuilt = Data.structures[name].turnsToBuild;
        this.width = Data.structures[name].width;
        this.currentHealth = Data.structures[name].health;
        this.currentShield = Data.structures[name].shield;
        this.isStructure = true;
        this.isUnit = false;

        this.animationManager = new AnimationManager();
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
        this.turnsUntilBuilt = Data.units[name].turnsToBuild;
        this.width = 0;
        this.currentHealth = Data.units[name].health;
        this.currentShield = Data.units[name].shield;
        this.attackRange = Data.units[name].attackrange;
        this.attackDamage = Data.units[name].damage;
        this.isStructure = false;
        this.isUnit = true;

        this.animationManager = new AnimationManager();

        /* This is a local copy that changes based on state */
        this.moveRange = Data.units[name].moverange;
        this.attacksThisTurn = 0;
    }
};
