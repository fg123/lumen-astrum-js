// Modifiers are applied to game objects that can modify their behaviours and
//   also hook into triggers of events.
const { PopupTextAnimation } = require('../client/animation');
const Constants = require('./constants');

class BaseModifier {
    attackDamage(inAttackDamage) {
        if (this._attackDamage) {
            return this._attackDamage(inAttackDamage);
        }
        return inAttackDamage;
    }

    attackSpeed(inAttackSpeed) {
        if (this._attackSpeed) {
            return this._attackSpeed(inAttackSpeed);
        }
        return inAttackSpeed;
    }

    moveRange(inMoveRange) {
        if (this._moveRange) {
            return this._moveRange(inMoveRange);
        }
        return inMoveRange;
    }

    health(inHealth) {
        if (this._health) {
            return this._health(inHealth);
        }
        return inHealth;
    }

    onAttach(target) {
        if (this._onAttach) {
            this._onAttach(target);
        }
    }

    // after the modifier is removed from the target
    onDetach(target) {
        if (this._onDetach) {
            this._onDetach(target);
        }
    }

    onLaunchAttack(state, attacker, target, damage) {
        if (this._onLaunchAttack) {
            this._onLaunchAttack(state, attacker, target, damage);
        }
    }

    getName() {
        if (!this._getName) {
            throw "Every modifier needs to override _getName()!";
        }
        return this._getName();
    }

    getIconIndex() {
        if (!this._getIconIndex) {
            throw "Every modifier needs to override _getIconIndex()!";
        }
        return this._getIconIndex();
    }

    getDisplayName() {
        if (!this._getDisplayName) {
            return this.getName();
        }
        return this._getDisplayName();
    }

    getDescription() {
        if (!this._getDescription) {
            return "";
        }
        return this._getDescription();
    }
};

class StimModifier extends BaseModifier {
    constructor(attackSpeedRatio) {
        super();
        this.attackSpeedRatio = attackSpeedRatio;
    }

    _getName() {
        return "StimModifier";
    }

    _getDisplayName() {
        return "Stim!";
    }

    _getIconIndex() { return 0; }

    _getDescription() {
        return `Unit attacks ${this.attackSpeedRatio}x faster!`
    }

    _attackSpeed(inAttackSpeed) {
        return inAttackSpeed * this.attackSpeedRatio;
    }
};

class ThievesModifier extends BaseModifier {
    constructor(damageModifierForGold) {
        super();
        this.damageModifierForGold = damageModifierForGold;
    }

    _getName() {
        return "ThievesModifier";
    }

    _getDisplayName() {
        return "You're a thief!";
    }

    _getIconIndex() { return 1; }

    _getDescription() {
        return `Unit generates extra gold equal to ${this.damageModifierForGold}x damage dealt!`
    }

    _onLaunchAttack(state, attacker, target, damage) {
        const goldGain = Math.ceil(damage * this.damageModifierForGold);
        state.players[attacker.owner].gold += goldGain;
        if (state.clientState) {
            state.clientState.globalAnimationManager.addAnimation(
                new PopupTextAnimation(`+${goldGain}`, Constants.YELLOW_CHAT_COLOR,
                    target.position)
            );
        }
    }
};

class ArtilleryModifier extends BaseModifier {
    constructor(attackDamageRatio) {
        super();
        this.attackDamageRatio = attackDamageRatio;
    }

    _getName() {
        return "ArtilleryModifier";
    }

    _getDisplayName() {
        return "BOOM BOOM BOOM!";
    }

    _getIconIndex() { return 2; }

    _getDescription() {
        return `Unit deals ${this.attackDamageRatio}x damage!`
    }

    _attackDamage(inAttackDamage) {
        return inAttackDamage * this.attackDamageRatio;
    }
};

class CloudModifier extends BaseModifier {
    constructor(moveDelta) {
        super();
        this.moveDelta = moveDelta;
    }

    _getName() {
        return "CloudModifier";
    }

    _getDisplayName() {
        return "Speedy Boi";
    }

    _getIconIndex() { return 3; }

    _getDescription() {
        return `Unit has +${this.moveDelta} move range!`
    }

    _moveRange(inMoveRange) {
        return inMoveRange + this.moveDelta;
    }

    _onAttach(unit) {
        unit.moveRange += this.moveDelta;
    }

    _onDetach(unit) {
        if (unit.moveRange > unit.maxMoveRange) {
            unit.moveRange = unit.maxMoveRange;
        }
    }
};

class VitalityModifier extends BaseModifier {
    constructor(healthMultiplier) {
        super();
        this.healthMultiplier = healthMultiplier;
    }

    _getName() {
        return "VitalityModifier";
    }

    _getDisplayName() {
        return "Brawler";
    }

    _getIconIndex() { return 4; }

    _getDescription() {
        return `Unit has ${this.healthMultiplier}x health!`
    }

    _health(inHealth) {
        return inHealth * this.healthMultiplier;
    }

    _onAttach(unit) {
        unit.currentHealth *= this.healthMultiplier;
    }

    _onDetach(unit) {
        if (unit.currentHealth > unit.maxHealth) {
            unit.currentHealth = unit.maxHealth;
        }
    }
};

module.exports = {
    BaseModifier,
    StimModifier,
    ThievesModifier,
    ArtilleryModifier,
    CloudModifier,
    VitalityModifier
};
