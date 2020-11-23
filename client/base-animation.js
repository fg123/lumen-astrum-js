// The base animation for map objects, that controls how they are drawn

const { makeFrame } = require("../animation/utils");

module.exports.BaseAnimation = class BaseAnimation {
    constructor (animationObj) {
        this.animationObj = animationObj;
        this.animationKey = '';
        this.frame = 0;
    }

    isPlayingAnimation() {
        return this.animationKey !== '';
    }

    tick(resourceManager) {
        if (this.animationKey) {
            this.frame += 1;
            const layers = resourceManager.get(this.animationObj[this.animationKey]);
            if (this.frame >= layers.length) {
                // Check looping
                this.frame = 0;
                this.animationKey = '';
                return false;
            }
            return true;
        }
        return false;
    }
    
    draw(resourceManager, context) {
        const baseLayer = resourceManager.get(this.animationObj.baseLayer);
        context.translate(-baseLayer.width / 2, -baseLayer.height / 2);
        if (this.animationKey) {
            const layers = resourceManager.get(this.animationObj[this.animationKey]);
            makeFrame({
                layerImages: baseLayer.layerImages,
                layerProperties: layers[this.frame]
            }, context, baseLayer.width, baseLayer.height, false);
        }
        else {
            makeFrame(baseLayer, context, baseLayer.width, baseLayer.height, false);
        }
        context.translate(baseLayer.width / 2, baseLayer.height / 2);
    }

    startAnimation(animationKey /* add options like looping */) {
        if (this.animationObj[animationKey]) {
            this.animationKey = animationKey;
            this.frame = 0;
        }
    }
};

module.exports.AnimationKeys = {
    BASE: '',
    ATTACK: 'attackAnimation',
    DEATH: 'deathAnimation'
};