// Modifiers are applied to game objects that can modify their behaviours and
//   also hook into triggers of events.
const { PopupTextAnimation, AttackProjectileAnimation } = require('../client/animation');
const { Resource } = require('../client/resources');
const Constants = require('./constants');
const { tupleDistance } = require('./coordinates');

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
        // Can't make a circular reference here.
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

    draw(context, resourceManager, mapObject, drawnCoord) {
        if (this._draw) {
            this._draw(context, resourceManager, mapObject, drawnCoord);
        }
    }

    onSpawnedAnotherUnit(state, spawner, otherUnit) {
        if (this._onSpawnedAnotherUnit) {
            this._onSpawnedAnotherUnit(state, spawner, otherUnit);
        }
    }

    onLaunchAttack(state, attacker, target, damage) {
        if (this._onLaunchAttack) {
            this._onLaunchAttack(state, attacker, target, damage);
        }
    }

    onActionStart(state, object) {
        if (this._onActionStart) {
            this._onActionStart(state, object);
        }
    }

    onPlanningStart(state, object) {
        if (this._onPlanningStart) {
            this._onPlanningStart(state, object);
        }
    }

    onTakingDamage(state, attacker, target, damage) {
        if (this._onTakeDamage) {
            return this._onTakeDamage(state, attacker, target, damage);
        }
        return damage;
    }

    onPreMove(state, unit, location) {
        if (this._onPreMove) {
            return this._onPreMove(state, unit, location);
        }
        return false;
    }

    onPostMove(state, unit, location) {
        if (this._onPostMove) {
            this._onPostMove(state, unit, location);
        }
    }

    getTimeRemaining(state) {
        if (this.duration && this.attachTime) {
            return ((this.attachTime + this.duration) - state.getGameTime());
        }
        return undefined;
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

    getDescription(state) {
        if (!this._getDescription) {
            return "";
        }
        return this._getDescription(state);
    }

    // returns the time at which you would be unstunned
    stunned() {
        if (this._stunned) {
            return this._stunned();
        }
        return false;
    }
};

class StunnedModifier extends BaseModifier {
    constructor(displayName) {
        super();    
        this.displayName = displayName;    
    }

    _getName() {
        return "Stunned";
    }

    _getDisplayName() {
        return this.displayName;
    }

    _getIconIndex() { return 7; }

    _getDescription() {
        return `Unit is disabled and cannot attack!`;
    }

    _stunned() {
        return true;
    }
};

class RetaliationModifier extends BaseModifier {
    constructor() {
        super();   
        this.target = undefined;  
    }

    _getName() {
        return "RetaliationModifier";
    }

    _getDisplayName() {
        return "Retaliation";
    }

    _getIconIndex() { return 11; }

    _getDescription() {
        return `Unit will confront their attacker and path towards them!`;
    }

    _onAttach(unit) {
        this.me = unit;
    }

    maybeChangeTarget(target) {
        if (this.target && this.target.currentHealth <= 0) {
            this.target = undefined;
        }
        if (this.target === undefined) {
            this.target = target;
        }
    }

    pathTowardsTarget() {
        console.log(this.target);
        if (this.target && this.me) {
            this.me.targetPoints = [this.target.position];
        }
    }

    _onLaunchAttack(state, attacker, target, damage) {
        this.maybeChangeTarget(target);
        this.pathTowardsTarget();
    }

    _onTakeDamage(state, attacker, target, damage) {
        this.maybeChangeTarget(attacker);
        this.pathTowardsTarget();
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

    _getDescription(state) {
        return `Unit generates extra gold equal to ${this.damageModifierForGold}x damage dealt!`
    }

    _onLaunchAttack(state, attacker, target, damage) {
        const goldGain = Math.ceil(damage * this.damageModifierForGold);
        state.players[attacker.owner].gold += goldGain;
        state.getPlayerStats(attacker.owner)["ThievesCaveGold"] += goldGain;

        if (state.clientState) {
            state.clientState.globalAnimationManager.addAnimation(
                new PopupTextAnimation(`+${goldGain}`, Constants.YELLOW_CHAT_COLOR,
                    target.position, 320)
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
        return Math.ceil(inAttackDamage * this.attackDamageRatio);
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
        if (inMoveRange === 0) return 0;
        return inMoveRange + this.moveDelta;
    }

    _onAttach(unit) {
        if (unit.moveRange === 0) return;
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
        return Math.ceil(inHealth * this.healthMultiplier);
    }

    _onAttach(unit) {
        unit.currentHealth = Math.ceil(unit.currentHealth * this.healthMultiplier);
    }

    _onDetach(unit) {
        if (unit.currentHealth > unit.maxHealth) {
            unit.currentHealth = unit.maxHealth;
        }
    }
};

class VampiricModifier extends BaseModifier {
    constructor(healMultiplier) {
        super();
        this.healMultiplier = healMultiplier;
    }

    _getName() {
        return "VampiricModifier";
    }

    _getDisplayName() {
        return "Y'all Succ";
    }

    _getIconIndex() { return 5; }

    _getDescription(state) {
        return `Unit heals for ${this.healMultiplier}x damage dealt!`
    }

    _onLaunchAttack(state, attacker, target, damage) {
        let heal = Math.ceil(damage * this.healMultiplier);
        const maxHealth = attacker.maxHealth;
        if (attacker.currentHealth + heal > maxHealth) {
            heal = maxHealth - attacker.currentHealth;
        }
        attacker.currentHealth += heal;
        state.getPlayerStats(attacker.owner)["VampiricHeal"] += heal;
        if (state.clientState && heal > 0) {
            state.clientState.globalAnimationManager.addAnimation(
                new PopupTextAnimation(`+${heal}`, "green",
                    attacker.position, 320)
            );
        }
    }
};

class SilverBulletModifier extends BaseModifier {
    constructor(healthMultiplier) {
        super();
        this.healthMultiplier = healthMultiplier;
    }

    _getName() {
        return "SilverBulletModifier";
    }

    _getDisplayName() {
        return "Silver Bullets";
    }

    _getIconIndex() { return 6; }

    _getDescription(state) {
        return `Unit deals ${this.healthMultiplier}x enemy max health as extra damage!`
    }

    _onLaunchAttack(state, attacker, target, damage) {
        let extraDamage = Math.ceil(target.maxHealth * this.healthMultiplier);
        state.dealDamageToUnit(attacker, target, extraDamage);

        if (state.clientState) {
            state.clientState.globalAnimationManager.addAnimation(
                new PopupTextAnimation(`-${extraDamage}`, "white",
                target.position, 320)
            );
        }
    }
};

class ArcticTippedModifier extends BaseModifier {
    constructor(stunDuration) {
        super();
        this.stunDuration = stunDuration;
    }

    _getName() {
        return "ArcticTippedModifier";
    }

    _getDisplayName() {
        return "Ice Tipped Bullets";
    }

    _getIconIndex() { return 9; }

    _getDescription(state) {
        return `Unit attacks stun enemies for ${this.stunDuration}s!`
    }

    _onLaunchAttack(state, attacker, target, damage) { 
        if (target.isUnit) {
            target.addModifier(state, attacker, new StunnedModifier("Frozen!"), {
                duration: this.stunDuration,
                onlyOne: true
            });
        }
    }
};

class FlashPointModifier extends BaseModifier {
    constructor() {
        super();
    }

    _getName() {
        return "FlashPointModifier";
    }

    _getDisplayName() {
        return "Teleports Behind You";
    }

    _getIconIndex() { return 8; }

    _getDescription(state) {
        return `Unit blinks to target location instead of moving!`;
    }

    _onPreMove(state, unit, location) {
        if (unit.targetPoints.length > 0) {
            // Get first target point
            const target = unit.targetPoints[0];
            const distance = tupleDistance(unit.position, target);
            if (distance <= unit.moveRange) {
                console.log("Flashing from", unit.position, "to", target);
                if (!state.isOccupied(target.x, target.y)) {
                    state.moveUnit(unit.position, target);
                    unit.moveRange -= distance;
                    return true; // override move
                }
                else {
                    console.log('Target is occupied!');
                }
            }
        }
        return false;
    }
    
};

class HurricaneModifier extends BaseModifier {
    constructor(bonusDamageModifier) {
        super();
        this.bonusDamageModifier = bonusDamageModifier;
    }

    _getName() {
        return "HurricaneModifier";
    }

    _getDisplayName() {
        return "Electric Bullets";
    }

    _getIconIndex() { return 10; }

    _getDescription(state) {
        return `Unit fires an additional shot for ${this.bonusDamageModifier}x damage!`
    }

    _onLaunchAttack(state, attacker, target, damage) {
        let extraDamage = Math.ceil(damage * this.bonusDamageModifier);
        
        const potential = state.getUnitsOnMyTeam(target.owner, (unit) => {
            return tupleDistance(target.position, unit.position) === 1 &&
                tupleDistance(attacker.position, unit.position) <= attacker.attackRange;
        });
        if (potential.length === 0) return; 

        state.dealDamageToUnit(attacker, potential[0], extraDamage);
        
        if (state.clientState) {
            // DELAYEXECUTE NOT LIKE THIS
            setTimeout(() => {
                state.clientState.globalAnimationManager.addAnimation(
                    new PopupTextAnimation(`-${extraDamage}`, "dodgerblue",
                    potential[0].position, 320)
                );
                state.clientState.globalAnimationManager.addAnimation(
                    new AttackProjectileAnimation(
                        state.clientState.resourceManager,
                        undefined,
                        target.position,
                        potential[0].position,
                        Resource.LIGHTNING_PROJECTILE
                    )
                );
            }, 320);
        }
    }
};

class ArmoryModifier extends BaseModifier {
    constructor(armorModifier, armorMultiplier) {
        super();
        this.armorModifier = armorModifier;
        this.armorMultiplier = armorMultiplier;
    }

    _getName() {
        return "ArmoryModifier";
    }

    _getDisplayName() {
        return "Armor Plates";
    }

    _getIconIndex() { return 11; }

    _getDescription(state) {
        return `Unit gains armor plates that block (${this.armorModifier}) attacks per turn!`
    }

    // Set plates at start of turn to number of armor plates
    _onActionStart(state) {
        this.turnPlates = this.armorModifier; 
    }

    _onTakeDamage(state, attacker, target, damage) {
        console.log(this.turnPlates);
        if (this.turnPlates >= 1 && damage > 0) {
            this.turnPlates -= 1;
            return (1 - this.armorMultiplier) * damage;
        }
        return damage;
    }

    _draw(context, resourceManager, mapObject, drawnCoord) {
        if (this.turnPlates >= 1) {
            const shieldResource = resourceManager.get(Resource.WHITE_SHIELD);
            context.drawImage(shieldResource,
                drawnCoord.x  - shieldResource.width / 2,
                drawnCoord.y - shieldResource.height / 2);
        }
    }
};

// Applied to buildings, lets the building apply buff to units constructed
class BarracksBuffGiver extends BaseModifier {
    constructor(buffConstructor) {
        super();
        this.buffConstructor = buffConstructor;
        this.buff = buffConstructor();
    }

    _getName() {
        return "BarracksBuffGiver" + this.buff.getName();
    }

    _getDisplayName() {
        return "Giver of " + this.buff.getDisplayName();
    }

    _getIconIndex() { return this.buff.getIconIndex(); }

    _getDescription(state) {
        return `Constructed units will gain ${this.buff.getDisplayName()}!`;
    }

    _onSpawnedAnotherUnit(state, spawner, otherUnit) {
        otherUnit.addModifier(state, spawner, this.buffConstructor());
    }
};

module.exports = {
    BaseModifier,
    StimModifier,
    ThievesModifier,
    ArtilleryModifier,
    CloudModifier,
    VitalityModifier,
    VampiricModifier,
    SilverBulletModifier,
    StunnedModifier,
    BarracksBuffGiver,
    ArcticTippedModifier,
    FlashPointModifier,
    HurricaneModifier,
    RetaliationModifier,
    ArmoryModifier
};
