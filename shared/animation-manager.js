/* This is only used by the client, but since MapObject has an instance of
 * this, we keep it in the shared folder. It does not have any other
 * strict dependencies */
module.exports = class AnimationManager {
    constructor() {
        this.animations = [];
    }

    addAnimation(animation) {
        this.animations.unshift(animation);
    }

    hasAnimation() {
        return this.animations.length !== 0;
    }

    tick() {
        /* Each animation ticks. If the animation returns false the callback
         * has already been called */
        this.animations = this.animations.filter(animation => animation.tick());
    }

    draw(graphicsManager, defaultPosition) {
        /* If any animation returns, it blocks the rest of the animating
         * pipeline */
        let actualPosition = defaultPosition;
        for (let i = 0; i < this.animations.length; i++) {
            const position = this.animations[i].getPosition();
            if (position) {
                actualPosition = position;
                break;
            }
        }
        if (!this.animations.some(animation =>
            animation.draw(graphicsManager, actualPosition))) {
            return actualPosition;
        } else {
            return undefined;
        }
    }
};
