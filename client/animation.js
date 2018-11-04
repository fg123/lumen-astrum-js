const { Tuple } = require('../shared/coordinates');

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
        this.points = points.map(point => new Tuple(
            point.x * 96,
            (point.y * 111) + (point.x % 2) * 55
        ));
        this.speed = speed;
        this.totalTicks = 0;
        this.maxTicks = speed * (points.length - 1);
        this.position = points[0] || Tuple.ZERO;
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

        this.from = new Tuple(
            from.x * 96,
            (from.y * 111) + (from.x % 2) * 55
        );
        this.to = new Tuple(
            to.x * 96,
            (to.y * 111) + (to.x % 2) * 55
        );

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

module.exports = {
    InPlaceSpriteAnimation,
    MoveUnitAnimation,
    AttackProjectileAnimation
};
