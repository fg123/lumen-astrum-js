const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const crypto = require('crypto');
const Game = require('./game');
const Constants = require('../shared/constants');
const { StateChange } = require('../shared/state-change');


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'lumen';
const client = new MongoClient(url);
let db;

client.connect(function(err) {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    db = client.db(dbName);

    const port = process.env.PORT || 5000;

    http.listen(port, function() {
        console.log('Listening on port ' + port);
    });
});

const connectedUsers = {};
const disconnectedMidGame = {};
const queue = [];
const games = [];

function generateHash(string) {
    return crypto.createHash('sha512').update(string).digest('hex');
}

console.log(generateHash('test'));

const safeStringify = require('json-stringify-safe');

process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}\n` +
        'Creating dump file of games!'
    );
    fs.writeSync(
        process.stderr.fd,
        err.stack
    );
    for (let i = 0; i < games.length; i++) {
        delete games[i].redSocket;
        delete games[i].blueSocket;
    }
    fs.writeFileSync('dump.json', safeStringify(games));
    process.exit(1);
});

// Restore from Dump
if (fs.existsSync('dump.json')) {
    console.log('Restoring from dump!');
    const dumpedGames = JSON.parse(fs.readFileSync('dump.json'));
    for (let i = 0; i < dumpedGames.length; i++) {
        const game = Game.fromJson(dumpedGames[i]);
        disconnectedMidGame[game.redPlayer] = game;
        disconnectedMidGame[game.bluePlayer] = game;
        games.push(game);
    }
}


app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/resources', express.static(__dirname + '/../client/resources'));

io.on('connection', function (socket) {
    console.log('User connected!');
    connectedUsers[socket.id] = {
        socket: socket,
        status: 'connected',
        username: null,
        ping: 0,
        queueID: -1,
        game: null
    };
    socket.on('ping', function (date) {
        connectedUsers[socket.id].ping = (Date.now() - date) * 2;
        socket.emit('ping', Date.now());
    });
    socket.on('login', function (username, password, callback) {
        db.collection('users').find({ username, password: generateHash(password) }).toArray(function(err, res) {
            if (err) {
                console.log('DB Error: ' + err);
                socket.emit('login-failed');
            }
            else {
                if (res.length !== 1) {
                    console.log('Auth failed for: ' + username);
                    callback('failed', undefined);
                }
                else {
                    console.log('Auth success for: ' + username);
                    console.log(res[0]);
                    connectedUsers[socket.id].username = username;
                    connectedUsers[socket.id].elo = res[0].elo;

                    let potentialGame = disconnectedMidGame[username];
                    if (potentialGame) {
                        console.log('Previously disconnected from a game!');
                        delete disconnectedMidGame[username];
                        connectedUsers[socket.id].game = potentialGame;
                        potentialGame.updateSocket(username, socket);
                    }
                    callback(undefined, {
                        username: username,
                        elo: res[0].elo
                    });

                    if (potentialGame) {
                        socket.emit('game-start',
                            potentialGame.getSide(username),
                            potentialGame.state.gameStartTime,
                            potentialGame.redPlayer,
                            potentialGame.bluePlayer);
                        for (let i = 0; i < potentialGame.stateChanges.length; i++) {
                            socket.emit('state-change', potentialGame.stateChanges[i]);
                        }
                    }
                }
            }
        });
    });
    socket.on('join-queue', function (type, callback) {
        if (connectedUsers[socket.id].username != null &&
			connectedUsers[socket.id].queueID === -1) {
            let gameFound = false;
            for (let i = 0; i < queue.length; i++) {
                if (Math.abs(queue[i].elo - connectedUsers[socket.id].elo) < 300) {
                    // ELO Between 300 difference, start game processes here
                    gameFound = true;
                    const gameStartTime = Date.now();
                    const otherSocket = queue[i].socket;
                    const game = new Game(
                        connectedUsers[socket.id].username,
                        queue[i].requester,
                        socket,
                        otherSocket,
                        gameStartTime);
                    connectedUsers[socket.id].game = game;
                    connectedUsers[otherSocket.id].game = game;
                    games.push(game);
                    socket.emit('game-start',
                        Constants.RED_SIDE,
                        gameStartTime,
                        connectedUsers[socket.id].username,
                        connectedUsers[otherSocket.id].username);
                    otherSocket.emit('game-start',
                        Constants.BLUE_SIDE,
                        gameStartTime,
                        connectedUsers[socket.id].username,
                        connectedUsers[otherSocket.id].username);
                    queue.splice(i, 1);
                    break;
                }
            }
            if (!gameFound) {
                console.log('Joining queue for: ' + connectedUsers[socket.id].username);
                connectedUsers[socket.id].queueID = queue.length;
                queue.push({
                    type: type,
                    requester: connectedUsers[socket.id].username,
                    socket: socket,
                    elo: connectedUsers[socket.id].elo
                });
                callback();
            }
        }
    });
    socket.on('state-change', function (stateChange) {
        const change = StateChange.deserialize(stateChange);
        let game = connectedUsers[socket.id].game;
        if (game.verifyStateChange(change)) {
            // Process will call simulate and foward as necessary
            const winner = game.processStateChange(change);
            if (winner !== Constants.NONE_SIDE) {
                if (game.state.nextPhaseTimer) {
                    clearInterval(game.state.nextPhaseTimer);
                }
                console.log('Game Over!');
                const gameOver = {
                    winner: winner === Constants.RED_SIDE ? game.redPlayer : game.bluePlayer
                };
                game.redSocket.emit('game-over', gameOver);
                game.blueSocket.emit('game-over', gameOver);
                connectedUsers[game.redSocket.id].game = null;
                connectedUsers[game.blueSocket.id].game = null;

                for (let i = 0; i < games.length; i++) {
                    if (games[i].redPlayer === game.redPlayer &&
                        games[i].bluePlayer == game.bluePlayer) {
                        games.splice(i, 1);
                        break;
                    }
                }

                // const eloChange = parseInt(16 +
                //     (connectedUsers[game.redSocket.id].elo - connectedUsers[game.blueSocket.id]) * 0.04);
                // if (eloChange > 31) eloChange = 31;
                // if (eloChange < 1) eloChange = 1;
                // db.collection('users').find({ username, password: generateHash(password) })
            }
        }
        else {
            socket.emit('invalid-state-change');
        }
    });
    socket.on('leave-queue', function (callback) {
        queue.splice(connectedUsers[socket.id].queueID, 1);
        connectedUsers[socket.id].queueID = -1;
        callback();
    });
    socket.on('disconnect', function() {
        console.log('Got disconnect!');
        if (connectedUsers[socket.id].queueID != -1) {
            queue.splice(connectedUsers[socket.id].queueID, 1);
        }
        let potentialGame = connectedUsers[socket.id].game;
        if (potentialGame) {
            console.log('Disconnected mid game! Storing in list!');
            potentialGame.removeSocket(socket);
            disconnectedMidGame[connectedUsers[socket.id].username] = potentialGame;
        }
        delete connectedUsers[socket.id];
    });
});
