const GameState = require('../shared/game-state');
const Constants = require('../shared/constants');
const { TurnPassoverStateChange } = require('../shared/state-change');

module.exports = class Game {
    constructor(redPlayer, bluePlayer, redSocket, blueSocket, gameStartTime) {
        this.redPlayer = redPlayer;
        this.bluePlayer = bluePlayer;
        this.redSocket = redSocket;
        this.blueSocket = blueSocket;
        this.state = new GameState(gameStartTime);
        this.stateChanges = [];

        this.nextTurnTimer = undefined;

        // Initial Turn Passover
        setTimeout(() => {
            // Pretend Blue Side to Trigger Red to be the First
            this.processStateChange(
                TurnPassoverStateChange.create(
                    Constants.BLUE_SIDE, false));
        }, Constants.TIME_IN_SECONDS_BEFORE_GAME_START * 1000);
    }

    verifyStateChange(stateChange) {
        return stateChange &&
            stateChange.verifyStateChange(this.state);
    }

    processStateChange(stateChange) {
        console.log('Processing State Change');
        console.log(stateChange);
        stateChange.simulateStateChange(this.state);
        if (stateChange instanceof TurnPassoverStateChange) {
            const nextSide = stateChange.from === Constants.RED_SIDE ?
                Constants.BLUE_SIDE : Constants.RED_SIDE;
            if (this.nextTurnTimer) {
                clearTimeout(this.nextTurnTimer);
            }
            this.nextTurnTimer = setTimeout(() => {
                this.processStateChange(
                    TurnPassoverStateChange.create(nextSide, false));
            }, this.state.calculateNextTurnAvailableTime(nextSide));
        }
        this.stateChanges.push(stateChange);
        // TODO: Advanced processing here.
        this.redSocket.emit('state-change', stateChange);
        this.blueSocket.emit('state-change', stateChange);
    }
};
