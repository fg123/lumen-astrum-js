const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const crypto = require('crypto');
const Game = require('./game');
const Constants = require('../shared/constants');
const { StateChange } = require('../shared/state-change');
const clientId = '931239577838-1j1f1jb25jkduhupr3njdqrho1ae85bs.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const oauthClient = new OAuth2Client(clientId);

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
        startServer();
    });
});

function startServer() {
    const connectedUsers = {};
    const disconnectedMidGame = {};
    const twoPlayerQueue = [];
    const fourPlayerQueue = [];
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
            games[i].players.forEach(p => {
                if (games[i].sockets[p] !== undefined) {
                    delete games[i].sockets[p];
                }
            });
        }
        fs.writeFileSync('dump.json', safeStringify(games));
        process.exit(1);
    });

    // Restore from Dump
    if (fs.existsSync('dump.json')) {
        console.log('Restoring from dump!');
        const dumpedGames = JSON.parse(fs.readFileSync('dump.json'));
        for (let i = 0; i < dumpedGames.length; i++) {
            const game = Game.fromJson(dumpedGames[i], handleGameOver);
            game.players.forEach(p => {
                disconnectedMidGame[p] = game;
            })
            games.push(game);
        }
    }

    function handleGameOver(game, winner) {
        console.log('Game Over!');
        const gameOver = {
            winner: winner
        };
        Object.values(game.sockets).forEach(s => {
            s.emit('game-over', gameOver);
        });
        game.isGameOver = true;
        game.players.forEach(p => {
            if (game.sockets[p] !== undefined) {
                connectedUsers[game.sockets[p].id].game = null;
            }
        });

        for (let i = 0; i < games.length; i++) {
            // If the first 2 matches it's probably correct.
            if (games[i].players[0] === game.players[0] &&
                games[i].players[1] === game.players[1]) {
                games.splice(i, 1);
                break;
            }
        }
    }

    app.use('/', express.static(__dirname + '/../client/dist'));
    app.use('/resources', express.static(__dirname + '/../client/resources'));

    if (!Constants.IS_PRODUCTION) {
        app.use('/tools', express.static(__dirname + '/../devtools/dist'));
        app.get('/tools/list-maps', function (_, res) {
            fs.readdir('shared/maps/', (err, files) => {
                res.send(files);
            });
        });
        app.get('/tools/get-map/:mapFile', function (req, res) {
            res.send(require('../shared/maps/' + req.params.mapFile));
        });
    }

    function createNewUser(id, name, email, picture) {
        return {
            username: 'User' + id,
            name: name,
            password: 'notavalidbcrypthash',
            email: email,
            picture: picture,
            created_time: Date.now(),
            id: id,
            elo: 1000
        };
    }

    async function verifyAndGetPayload(idToken) {
        const ticket = await oauthClient.verifyIdToken({
            idToken: idToken,
            audience: clientId
        });
        return ticket.getPayload();
    }

    io.on('connection', function (socket) {
        console.log('User connected!');
        connectedUsers[socket.id] = {
            socket: socket,
            status: 'connected',
            username: null,
            queueID: -1,
            game: null
        };
        socket.on('ping', function (date) {
            connectedUsers[socket.id].ping = (Date.now() - date) * 2;
            socket.emit('ping', Date.now());
        });
        let authSuccessProcedure = (userObject, callback) => {
            const username = userObject.username;
            const elo = userObject.elo;

            connectedUsers[socket.id].username = username;
            connectedUsers[socket.id].elo = elo;

            socket.emit('login-success', username);

            let potentialGame = disconnectedMidGame[username];
            if (potentialGame) {
                console.log('Previously disconnected from a game!');
                delete disconnectedMidGame[username];
                connectedUsers[socket.id].game = potentialGame;
                potentialGame.updateSocket(username, socket);
            }
            
            callback(undefined, {
                username: username,
                picture: userObject.picture,
                elo: elo
            });

            if (potentialGame) {
                socket.emit('game-start',
                    potentialGame.state.gameStartTime,
                    potentialGame.players);
                for (let i = 0; i < potentialGame.stateChanges.length; i++) {
                    socket.emit('state-change', potentialGame.stateChanges[i]);
                }
            }
        };
        socket.on('glogin', function (oauthKey, callback) {
            verifyAndGetPayload(oauthKey).then(payload => {
                db.collection('users').find({ id: payload.sub }).toArray(function(err, user) {
                    if (err) {
                        console.log('DB Error: ' + err);
                        socket.emit('login-failed');
                        return;
                    }
                    if (user.length > 0) {
                        db.collection('users').findOneAndUpdate(
                            {
                                id: payload.sub
                            }, {
                                $set: {
                                    'name': payload.name,
                                    'email': payload.email,
                                    'picture': payload.picture,
                                    'id': payload.sub
                                }
                            }, {
                                returnOriginal: false
                            }, function(err, updatedUser) {
                                if (err) {
                                    console.log('DB Error: ' + err);
                                    socket.emit('login-failed');
                                    return;
                                }
                                authSuccessProcedure(updatedUser.value, callback);
                            }
                        );
                    } else {
                        let newUser = createNewUser(payload.sub, payload.name, payload.email, payload.picture);
                        db.collection('users').insertOne(newUser, function(err) {
                            if (err) {
                                console.log('DB Error: ' + err);
                                socket.emit('login-failed');
                                return;
                            }
                            authSuccessProcedure(newUser, callback);
                        });
                    }
                });
            })
            .catch(err => {
                console.error(err);
                socket.emit('login-failed');
            });
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
                        
                        authSuccessProcedure(res[0], callback);
                    }
                }
            });
        });
        socket.on('change-username', function (newValue) {
            console.log('Trying to change to', newValue);
            newValue = newValue.trim();
            if (newValue.length === 0 || newValue === connectedUsers[socket.id].username) {
                return;
            }
            db.collection('users').find({ username: newValue }).toArray((err, res) => {
                if (err) {
                    console.log('DB Error: ' + err);
                    return;
                }
                if (res.length !== 0) {
                    console.log('Username taken already!');
                    socket.emit('alert-error', 'Username already taken!');
                    return;
                }
                // 0 means no one else has this username so we can change it
                db.collection('users').findOneAndUpdate(
                    {
                        username: connectedUsers[socket.id].username
                    },
                    {
                        $set: {
                            'username': newValue
                        }
                    }, {
                        returnOriginal: false
                    }, (err, updatedUser) => {
                        if (err) {
                            console.log('DB Error: ' + err);
                            errorCallback();
                            return;
                        }
                        connectedUsers[socket.id].username = newValue;
                        console.log('Changed username', newValue);
                        socket.emit('changed-username', newValue);
                    });
            });
        });
        socket.on('join-queue', function (type, callback) {
            if (connectedUsers[socket.id].username != null &&
                connectedUsers[socket.id].queueID === -1) {
                if (type === '2p') {
                    console.log('Joining 2p queue for: ' + connectedUsers[socket.id].username);
                    connectedUsers[socket.id].queueID = twoPlayerQueue.length;
                    twoPlayerQueue.push({
                        type: type,
                        requester: connectedUsers[socket.id].username,
                        socket: socket,
                        elo: connectedUsers[socket.id].elo
                    });
                    callback();
                }
                else if (type === '4p') {
                    console.log('Joining 4p queue for: ' + connectedUsers[socket.id].username);
                    connectedUsers[socket.id].queueID = fourPlayerQueue.length;
                    fourPlayerQueue.push({
                        type: type,
                        requester: connectedUsers[socket.id].username,
                        socket: socket,
                        elo: connectedUsers[socket.id].elo
                    });
                    
                    callback();
                }
                let startGame = (queuedPlayers) => {
                    const socketMap = {};
                    const gameStartTime = Date.now();
                    queuedPlayers.forEach(p => {
                        socketMap[p.requester] = p.socket;
                    });
                    const game = new Game(socketMap, gameStartTime, handleGameOver);

                    queuedPlayers.forEach(p => {
                        connectedUsers[p.socket.id].game = game;
                        connectedUsers[p.socket.id].queueID = -1;
                    });

                    games.push(game);
                    // 2 player for now
                    const players = queuedPlayers.map(p => p.requester);
                    queuedPlayers.forEach(p => {
                        p.socket.emit('game-start',
                            gameStartTime,
                            players);
                    });
                };

                if (twoPlayerQueue.length >= 2) {
                    startGame([twoPlayerQueue[0], twoPlayerQueue[1]]);
                    twoPlayerQueue.splice(0, 2);
                }
                if (fourPlayerQueue.length >= 4) {
                    startGame([fourPlayerQueue[0], fourPlayerQueue[1],
                        fourPlayerQueue[2], fourPlayerQueue[3]]);
                    fourPlayerQueue.splice(0, 4);
                }
            }
        });
        socket.on('state-change', function (stateChange) {
            const change = StateChange.deserialize(stateChange);
            let game = connectedUsers[socket.id].game;
            if (game !== null)
            {
                if (game.verifyStateChange(change)) {
                    // Process will call simulate and foward as necessary
                    const winner = game.processStateChange(change);
                    if (winner !== undefined) {
                        if (game.state.nextPhaseTimer) {
                            clearInterval(game.state.nextPhaseTimer);
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
            }
        });
        const leaveQueue = () => {
            for (let i = 0; i < twoPlayerQueue.length; i++) {
                if (twoPlayerQueue[i].requester === connectedUsers[socket.id].username) {
                    twoPlayerQueue.splice(i, 1);
                    connectedUsers[socket.id].queueID = -1;
                    break;
                }
            }
            for (let i = 0; i < fourPlayerQueue.length; i++) {
                if (fourPlayerQueue[i].requester === connectedUsers[socket.id].username) {
                    fourPlayerQueue.splice(i, 1);
                    connectedUsers[socket.id].queueID = -1;
                    break;
                }
            }
        };

        socket.on('leave-queue', function (callback) {
            leaveQueue();
            callback();
        });
        socket.on('disconnect', function() {
            console.log('Got disconnect!');
            leaveQueue();
            let potentialGame = connectedUsers[socket.id].game;
            if (potentialGame) {
                console.log('Disconnected mid game! Storing in list!');
                potentialGame.removeSocket(socket);
                disconnectedMidGame[connectedUsers[socket.id].username] = potentialGame;
            }
            delete connectedUsers[socket.id];
        });
    });

}