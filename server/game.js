const GameState = require('../shared/game-state');
const Constants = require('../shared/constants');
const { StateChange, TurnPassoverStateChange, GuardianLockdownStateChange } = require('../shared/state-change');

module.exports = class Game {
    static fromJson(json) {
        const game = new Game(json.redPlayer, json.bluePlayer, undefined,
            undefined, json.gameStartTime);
        clearTimeout(game.initialTurnPassover);
        for (let i = 0; i < json.stateChanges.length; i++) {
            game.processStateChange(StateChange.deserialize(json.stateChanges[i]));
        }
        return game;
    }
    constructor(redPlayer, bluePlayer, redSocket, blueSocket, gameStartTime) {
        this.redPlayer = redPlayer;
        this.bluePlayer = bluePlayer;
        this.redSocket = redSocket;
        this.blueSocket = blueSocket;
        this.state = new GameState(gameStartTime, redPlayer, bluePlayer);
        this.stateChanges = [];

        this.nextTurnTimer = undefined;

        // Initial Turn Passover
        this.initialTurnPassover = setTimeout(() => {
            // Pretend Blue Side to Trigger Red to be the First
            this.processStateChange(
                TurnPassoverStateChange.create(
                    Constants.BLUE_SIDE, false));
        }, Constants.TIME_IN_SECONDS_BEFORE_GAME_START * 1000);
    }

    verifyStateChange(stateChange) {
        console.log('Verifying State Change');
        console.log(stateChange);
        return stateChange &&
            stateChange.verifyStateChange(this.state);
    }

    processStateChange(stateChange) {
        console.log('Processing State Change');
        stateChange.simulateStateChange(this.state);
        if (stateChange instanceof TurnPassoverStateChange) {
            const nextSide = stateChange.from === Constants.RED_SIDE ?
                Constants.BLUE_SIDE : Constants.RED_SIDE;
            if (this.nextTurnTimer) {
                clearTimeout(this.nextTurnTimer);
            }

            console.log('Seconds for turn: ' + this.state.calculateNextTurnAvailableTime(nextSide) / 1000);
            this.nextTurnTimer = setTimeout(() => {
                this.processStateChange(
                    TurnPassoverStateChange.create(nextSide, false));
            }, this.state.calculateNextTurnAvailableTime(nextSide));
        }
        let shouldPush = true;
        if (stateChange instanceof GuardianLockdownStateChange) {
            let lastStateChange = this.stateChanges[this.stateChanges.length - 1];
            if (lastStateChange instanceof GuardianLockdownStateChange) {
                if (stateChange.data.posFrom.x === lastStateChange.data.posFrom.x &&
                    stateChange.data.posFrom.y === lastStateChange.data.posFrom.y) {
                    // Remove Last One
                    this.stateChanges.pop();
                    shouldPush = false;
                }
            }
        }
        if (shouldPush) {
            this.stateChanges.push(stateChange);
        }
        // TODO: Advanced processing here.
        if (this.redSocket) {
            this.redSocket.emit('state-change', stateChange);
        }
        if (this.blueSocket) {
            this.blueSocket.emit('state-change', stateChange);
        }
        return this.state.getWinner();
    }

    updateSocket(username, socket) {
        if (username === this.redPlayer) {
            this.redSocket = socket;
            return;
        }
        if (username === this.bluePlayer) {
            this.blueSocket = socket;
            return;
        }
    }

    removeSocket(socket) {
        if (this.redSocket === socket) {
            this.redSocket = undefined;
        }
        if (this.blueSocket === socket) {
            this.blueSocket = undefined;
        }
    }

    getSide(username) {
        if (this.redPlayer === username) return Constants.RED_SIDE;
        return Constants.BLUE_SIDE;
    }
};
