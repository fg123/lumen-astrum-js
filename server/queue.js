// Handles Players Queueing and Matchmaking

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
    constructor (partySize, maps) {
        this.queue = [];
        this.partySize = partySize;
        this.maps = maps;
    }

    getRandomMap() {
        return this.maps[Math.floor(Math.random() * this.maps.length)];
    }

    joinQueue(userID, socket, elo) {
        this.queue.push({ userID, socket, elo });
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

    leaveQueue(userID) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].userID === userID) {
                this.queue.splice(i, 1);
                return;
            }
        }
    }
};