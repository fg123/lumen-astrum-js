// This module manages replays of the game 
// Replays exist fully on client side, as it simply takes the whole game state
//   and can replay it.
// This accomplishes this by resimulating all events based on the game-time

const { setupMap, maps } = require("../shared/map");
const { StateChange } = require("../shared/state-change");

module.exports = class ReplayManager {
    constructor (clientState, gameState, stateChanges) {
        this.isPaused = true;

        this.clientState = clientState;
        this.gameState = gameState;
        this.stateChanges = stateChanges;
        this.currentStateChange = 0;

        this.pauseTimeOffset = 0;
        this.mockStartTime = Date.now();
        this.pausedTime = this.mockStartTime;

        console.log('Deserializing all state-changes');
        for (let i = 0; i < this.stateChanges.length; i++) {
            this.stateChanges[i] = StateChange.deserialize(this.stateChanges[i]);
        }

        this.gameState.getGameTime = () => {
            if (this.isPaused) {
                return this.pausedTime - this.mockStartTime - this.pauseTimeOffset;
            }
            return Date.now() - this.mockStartTime - this.pauseTimeOffset;
        };

        this.interval = setInterval(() => {
            if (this.isPaused) {
                return;
            }
            
            if (this.currentStateChange >= this.stateChanges.length) {
                clearInterval(this.interval);
                return;
            }

            if (this.gameState.getGameTime() >= this.stateChanges[this.currentStateChange].timestamp) {
                this.clientState.processStateChange(this.stateChanges[this.currentStateChange]);
                this.currentStateChange += 1;
            }
        }, 50);
    }

    setPause(paused) {
        console.log('Set Pause', paused);
        this.isPaused = paused;
        if (paused) {
            this.pausedTime = Date.now();
        }
        else {
            // Total time paused
            this.pauseTimeOffset += (Date.now() - this.pausedTime);
        }
    }
    applyNextChange() {
        if (this.currentStateChange < this.stateChanges.length) {
            this.clientState.processStateChange(this.stateChanges[this.currentStateChange]);
            this.currentStateChange += 1;
        }
    }
};