const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const crypto = require('crypto');
const Game = require('./game');
const Constants = require('../shared/constants');
const { StateChange } = require('../shared/state-change');


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'lumen';
const client = new MongoClient(url);
let db;

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = client.db(dbName);

    const port = process.env.PORT || 5000;

    http.listen(port, function() {
        console.log('Listening on port ' + port);
    });
});

const connectedUsers = [];
const queue = [];
const games = [];

function generateHash(string) {
    return crypto.createHash('sha512').update(string).digest('hex');
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
                    callback(undefined, {
                        username: username,
                        elo: res[0].elo
                    });
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
                    socket.emit('game-start', Constants.RED_SIDE, gameStartTime);
                    otherSocket.emit('game-start', Constants.BLUE_SIDE, gameStartTime);
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
                const gameOver = {
                    winner: winner === Constants.RED_SIDE ? game.redPlayer : game.bluePlayer
                };
                socket.emit(game.redSocket, 'game-over', gameOver);
                socket.emit(game.blueSocket, 'game-over', gameOver);
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
        delete connectedUsers[socket.id];
    });
});
