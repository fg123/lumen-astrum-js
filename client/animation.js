const { Tuple } = require('../shared/coordinates');
const { toDrawCoord } = require('./utils');

class BaseAnimator {
    constructor(onDone) {
        this.onDone = onDone;
        this.lastTick = 0;
    }

    tick() {
        const tickTime = Date.now();
        if (!this._tick(tickTime)) {
            this.onDone();
            return false;
        }
        this.lastTick = tickTime;
        return true;
    }

    isVisible(clientState) {
        if (this._isVisible) 
            return this._isVisible(clientState);
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
    _getPosition() { return undefined; }

    getPosition() {
        return this._getPosition();
    }
}

class MoveUnitAnimation extends MapObjectAnimation {
    /* Speed is time it takes to move from one point to another
     * in terms of ticks */
    constructor(unit, points, speed, onDone = () => {}) {
        super(onDone);
        this.unit = unit;
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
        
        // Actually modify the unit's rotation
        this.unit.rotation = Math.atan2(toPoint.y - fromPoint.y, toPoint.x - fromPoint.x) + (Math.PI / 2);
        this.position = new Tuple(newX, newY);
        return true;
    }

    _draw() {
        return false;
    }

    _getPosition() {
        return this.position;
    }

    _getRotation() {
        return this.rotation;
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
    constructor(resourceManager, unit, from, to, onDone = () => {}) {
        super(onDone);
        this.resourceManager = resourceManager;

        this.mapCoordFrom = from;
        this.mapCoordTo = to;

        this.from = toDrawCoord(from);
        this.to = toDrawCoord(to);

        this.currentPos = this.from;

        this.totalTicks = 0;
        this.flyingTicks = 20;
        this.hasFlown = false;
        this.unit = unit;

        this.explodeAnimation = new InPlaceSpriteAnimation(
            resourceManager.get(Resource.ATTACK_EXPLODING), 25, 1
        );
        this.attackProjectile = resourceManager.get(Resource.ATTACK_PROJECTILE);

        this.popupTextAnimation = undefined;

        unit.rotation = Math.atan2(to.y - from.y, to.x - from.x) + (Math.PI / 2);
    }

    _isVisible(clientState) {
        return clientState.gameState.isVisible(
            this.mapCoordFrom.x, this.mapCoordFrom.y, clientState.player) ||
                clientState.gameState.isVisible(
                    this.mapCoordTo.x, this.mapCoordTo.y, clientState.player);
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
        const explode = this.explodeAnimation.tick();
        const text = this.popupTextAnimation && this.popupTextAnimation.tick();
        
        return explode || text;
    }

    _draw(graphicsManager, position) {
        if (this.hasFlown) {
            this.explodeAnimation.draw(graphicsManager, this.getPosition());
            if (this.popupTextAnimation === undefined) {
                this.popupTextAnimation = new PopupTextAnimation(`-${this.unit.attackDamage}`, 'red', this.mapCoordTo);
            }

            this.popupTextAnimation.draw(graphicsManager, this.getPosition());
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
        this.attacker = attacker;
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
        if (this.totalTicks % (this.framesOn * 2) >= this.framesOn) {
            return false;
        }
        if (this.totalTicks % (this.framesOn * 2) === 0) {
            this.flash = this.resourceManager.get(Muzzles[Math.floor(Math.random() * Muzzles.length)]);
        }
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
    
    _isVisible(clientState) {
        return clientState.gameState.isVisible(
            this.attacker.position.x, this.attacker.position.y, clientState.player);
    }

    _getPosition() {
        return this.location;
    }
}

// Floating text popup 
class PopupTextAnimation extends MapObjectAnimation {
    constructor(text, color, location, onDone = () => {}) {
        super(onDone);
        this.mapCoordLoc = location;
        this.location = toDrawCoord(location);
        this.text = text;
        this.color = color;

        this.popupDuration = 600;
        this.start = Date.now();
    }

    _tick(tickTime) {
        if (tickTime - this.start > this.popupDuration) {
            return false;
        }
        return true;
    }

    _draw(graphicsManager, position) {
        const duration = (this.lastTick - this.start);
        const yDelta = (duration / this.popupDuration) * 50;

        const oldOpacity = graphicsManager.context.globalAlpha;
        graphicsManager.context.globalAlpha = (1 - Math.max(0, (duration - 100) / (this.popupDuration - 100)));
        graphicsManager.context.textAlign = 'center';
        graphicsManager.context.textBaseline = 'middle';
        
        graphicsManager.context.font = 'bold 25px Prompt';
        graphicsManager.context.fillStyle = "#000";
        graphicsManager.context.fillText(this.text, position.x + 2, position.y - yDelta + 2);
        graphicsManager.context.fillStyle = this.color;
        graphicsManager.context.fillText(this.text, position.x, position.y - yDelta);

        graphicsManager.context.globalAlpha = oldOpacity;
        return true;
    }

    _isVisible(clientState) {
        return clientState.gameState.isVisible(
            this.mapCoordLoc.x, this.mapCoordLoc.y, clientState.player);
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
    MuzzleFlashAnimation,
    PopupTextAnimation
};
