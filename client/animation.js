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

module.exports = {
    InPlaceSpriteAnimation,
    MoveUnitAnimation
};
