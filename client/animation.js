const { Tuple } = require('../shared/coordinates');
const { toDrawCoord } = require('./utils');

class BaseAnimator {
    constructor(onDone) {
        this.onDone = onDone;
    }

    tick() {
        if (!this._tick()) {
            this.onDone();
            return false;
        }
        return true;
    }
}

class MapObjectAnimation extends BaseAnimator {
    constructor(onDone) {
        super(onDone);
    }
    draw(graphicsManager, position) {
        return this._draw(graphicsManager, position);
    }
    getPosition() {
        return this._getPosition();
    }
}

class MoveUnitAnimation extends MapObjectAnimation {
    /* Speed is time it takes to move from one point to another
     * in terms of ticks */
    constructor(points, speed, onDone = () => {}) {
        super(onDone);
        console.log(points);
        this.points = points.map((x) => toDrawCoord(x));
        console.log(this.points);
        this.speed = speed;
        this.totalTicks = 0;
        this.maxTicks = speed * (points.length - 1);
        this.position = this.points[0] || Tuple.ZERO;
    }

    _tick() {
        this.totalTicks += 1;
        if (this.totalTicks >= this.maxTicks) {
            return false;
        }
        const fromIndex = Math.floor(this.totalTicks / this.speed);
        const fromPoint = this.points[fromIndex];
        const toPoint = this.points[fromIndex + 1];
        const delta = (this.totalTicks - fromIndex * this.speed) / this.speed;
        const newX = fromPoint.x + delta * (toPoint.x - fromPoint.x);
        const newY = fromPoint.y + delta * (toPoint.y - fromPoint.y);
        this.position = new Tuple(newX, newY);
        return true;
    }

    _draw() {
        return false;
    }

    _getPosition() {
        return this.position;
    }
}

class InPlaceSpriteAnimation extends MapObjectAnimation {
    constructor(spriteSheet, frameCount, timeOnEachFrame, onDone = ()=>{}) {
        super(onDone);
        this.spriteSheet = spriteSheet;
        this.timeOnEachFrame = timeOnEachFrame;
        this.frameWidth = spriteSheet.width / frameCount;
        this.currentFrame = 0;
        this.totalTicks = 0;
        this.maxTicks = frameCount * timeOnEachFrame;
    }

    _tick() {
        this.totalTicks += 1;
        if (this.totalTicks >= this.maxTicks) {
            return false;
        }
        this.currentFrame = Math.floor(this.totalTicks / this.timeOnEachFrame);
        return true;
    }

    _draw(graphicsManager, position) {
        graphicsManager.context.drawImage(
            this.spriteSheet,
            this.currentFrame * this.frameWidth,
            0,
            this.frameWidth,
            this.spriteSheet.height,
            position.x - (this.frameWidth / 2),
            position.y - (this.spriteSheet.height / 2),
            this.frameWidth,
            this.spriteSheet.height
        );
        return true;
    }
    _getPosition() {
        /* In place, does not change */
        return undefined;
    }
}

class GenericInPlaceSpriteAnimation extends InPlaceSpriteAnimation {
    constructor(position, spriteSheet, frameCount, timeOnEachFrame, onDone = ()=>{}) {
        super(spriteSheet, frameCount, timeOnEachFrame, onDone);
        this.position = position;
    }

    _getPosition() {
        return this.position;
    }
};

/* This animation happens in two parts, first, the projectile flies
 *   to the desired position, then it explodes.
 * The animation is not attached to an actual unit, but instead is attached to
 *   the graphics manager.
 */
const { Resource } = require('./resources');

class AttackProjectileAnimation extends MapObjectAnimation {
    constructor(resourceManager, from, to, onDone = () => {}) {
        super(onDone);
        this.resourceManager = resourceManager;

        this.from = toDrawCoord(from);
        this.to = toDrawCoord(to);

        this.currentPos = this.from;

        this.totalTicks = 0;
        this.flyingTicks = 20;
        this.hasFlown = false;

        this.explodeAnimation = new InPlaceSpriteAnimation(
            resourceManager.get(Resource.ATTACK_EXPLODING), 25, 1
        );
        this.attackProjectile = resourceManager.get(Resource.ATTACK_PROJECTILE);
    }

    _tick() {
        if (!this.hasFlown) {
            this.totalTicks += 1;
            if (this.totalTicks >= this.flyingTicks) {
                this.hasFlown = true;
            }
            const delta = this.totalTicks / this.flyingTicks;
            const newX = this.from.x + delta * (this.to.x - this.from.x);
            const newY = this.from.y + delta * (this.to.y - this.from.y);
            this.currentPos = new Tuple(newX, newY);
            return true;
        }
        return this.explodeAnimation.tick();
    }

    _draw(graphicsManager, position) {
        if (this.hasFlown) {
            this.explodeAnimation.draw(graphicsManager, this.getPosition());
        }
        else {
            graphicsManager.drawImage(
                this.attackProjectile,
                position.x,
                position.y
            );
        }
        return true;
    }

    _getPosition() {
        return this.currentPos;
    }
}

const Muzzles = [Resource.MUZZLE_1, Resource.MUZZLE_2, Resource.MUZZLE_3, Resource.MUZZLE_4, Resource.MUZZLE_5];
class MuzzleFlashAnimation extends MapObjectAnimation {

    constructor(resourceManager, attacker, onDone = () => {}) {
        super(onDone);
        this.resourceManager = resourceManager;
        this.location = toDrawCoord(attacker.position);
        this.muzzleOffset = attacker.custom.muzzle;
        this.totalTicks = 0;
        this.rotation = attacker.rotation;
        this.framesOn = 4;

        this.shots = Math.floor(attacker.attackDamage / 10);
        // i.e. shots = 4
        this.maxTicks = this.shots * this.framesOn * 2;
    }

    _tick() {
        this.totalTicks += 1;
        if (this.totalTicks >= this.maxTicks) {
            return false;
        }
        return true;
    }

    _draw(graphicsManager, position) {
        // console.log(position);
        if (this.totalTicks % (this.framesOn * 2) >= this.framesOn) {
            return false;
        }
        if (this.totalTicks % (this.framesOn * 2) === 0) {
            this.flash = this.resourceManager.get(Muzzles[Math.floor(Math.random() * Muzzles.length)]);
        }
        console.log(this.muzzleOffset);
        const transformedMuzzle = new Tuple(
            Math.cos(this.rotation) * this.muzzleOffset.x - Math.sin(this.rotation) * this.muzzleOffset.y,
            Math.sin(this.rotation) * this.muzzleOffset.x + Math.cos(this.rotation) * this.muzzleOffset.y
        );
        graphicsManager.context.translate(position.x + transformedMuzzle.x, position.y + transformedMuzzle.y);
        graphicsManager.context.rotate(this.rotation);
        graphicsManager.context.drawImage(this.flash, -this.flash.width / 2, -this.flash.height / 2, this.flash.width, this.flash.height);
        graphicsManager.context.rotate(-this.rotation);
        graphicsManager.context.translate(-position.x - transformedMuzzle.x, -position.y - transformedMuzzle.y);
        return true;
    }

    _getPosition() {
        return this.location;
    }
}

module.exports = {
    InPlaceSpriteAnimation,
    GenericInPlaceSpriteAnimation,
    MoveUnitAnimation,
    AttackProjectileAnimation,
    MuzzleFlashAnimation
};
