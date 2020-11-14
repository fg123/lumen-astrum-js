// Handles Players Queueing and Matchmaking

const { queue } = require("../node_modules/rxjs/index");

/**
 * Shuffles array in place, FisherYates algorithm
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports.Queue = class Queue {
    constructor (partySize) {
        this.queue = [];
        this.partySize = partySize;
    }

    joinQueue(username, socket, elo) {
        this.queue.push({ username, socket, elo });
        if (this.queue.length >= this.partySize) {
            // Matchmaking Later
            const players = [];
            for (let i = 0; i < this.partySize; i++) {
                players.push(this.queue[i]);
            }
            this.queue.splice(0, this.partySize);
            return shuffle(players);
        }
        return undefined;
    }

    leaveQueue(username) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].username === username) {
                this.queue.splice(i, 1);
                return;
            }
        }
    }
};