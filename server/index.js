const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const crypto = require('crypto');
const walkSync = require('walk-sync');
const Game = require('./game');
const axios = require('axios');
const path = require('path');
const mkdirp = require('mkdirp');
const serveIndex = require('serve-index')
const Constants = require('../shared/constants');
const { StateChange, ChatMessageStateChange } = require('../shared/state-change');
const clientId = '931239577838-1j1f1jb25jkduhupr3njdqrho1ae85bs.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const oauthClient = new OAuth2Client(clientId);

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { Queue } = require('./queue');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'lumen';
const client = new MongoClient(url);
let db;

let gitChangeLog = [];

console.log("Connecting to MongoDB");
client.connect(function(err) {
    assert.equal(null, err);
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    
    if (Constants.IS_PRODUCTION) {
        console.log('Getting Git Information from GitHub');
        axios.get("https://api.github.com/repos/fg123/lumen-astrum-js/commits")
        .then(function (response) {
            // handle success
            gitChangeLog = response.data.map(commit => {
                return commit["commit"]["message"];
            });
            console.log("Got Git Information");
            startHttpListener();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }
    else {
        startHttpListener();
    }
});

function startHttpListener() {
    const port = process.env.PORT || 5000;
    http.listen(port, function() {
        console.log('Listening on port ' + port);
        startServer();
    });
}

function startServer() {
    const connectedUsers = {};
    const disconnectedMidGame = {};

    const queues = {
        '4p': new Queue(4, ['4p']),
        '2p': new Queue(2, ['2p-duel']),
        '3p': new Queue(3, ['3p']),
        '2v2': new Queue(4, ['2v2']),
        'pve': new Queue(1, ['pve'])
    };

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
        if (Constants.IS_PRODUCTION) {
            mkdirp.sync('dumps');
        }
        const dumpName = Constants.IS_PRODUCTION ? `dumps/dump-${Date.now()}.json` : 'dump.json';
        fs.writeFileSync(dumpName, safeStringify(games.map(g => g.toJson())));
        process.exit(1);
    });

    // Restore from Dump
    if (fs.existsSync('dump.json')) {
        console.log('Restoring from dump!');
        const dumpedGames = JSON.parse(fs.readFileSync('dump.json'));
        for (let i = 0; i < dumpedGames.length; i++) {
            const game = Game.fromJson(dumpedGames[i], handleGameOver);
            if (!game.isGameOver) {
                game.players.forEach(p => {
                    disconnectedMidGame[p] = game;
                });
                games.push(game);
            }
        }
    }

    function handleGameOver(game, winners) {
        if (!game.isGameOver) {
            console.log('Game Over!');

            const gameOver = {
                winners: winners
            };
            Object.values(game.sockets).forEach(s => {
                if (s !== undefined) {
                    s.emit('game-over', gameOver);
                }
            });
            game.isGameOver = true;
            game.players.forEach(p => {
                if (game.sockets[p] !== undefined) {
                    connectedUsers[game.sockets[p].id].game = null;
                }
                if (disconnectedMidGame[p]) {
                    delete disconnectedMidGame[p];
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
    }
    app.use(bodyParser.json());
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
        app.get('/tools/get-data', function (req, res) {
            const data = require('../shared/data');
            const { maps } = require('../shared/map');
            res.send({ 
                structures: data.structures,
                units: data.units,
                maps: maps
            });
        });
        app.get('/tools/list-resources', function (req, res) {
            const resources = walkSync('client/resources', { globs: ['**/*.png'] });
            res.send(resources);
        });
        app.get('/tools/list-animations', function (req, res) {
            const resources = walkSync('client/resources', { globs: ['**/*.json'] });

            res.send(resources);
        });
        app.post('/tools/update-animation', function (req, res) {
            const path = req.body.path;
            const animation = req.body.animation;
            fs.writeFileSync('client/resources/' + path,
                JSON.stringify(animation, null, 4));
            res.send('ok');
        });
        app.post('/tools/set-data', function (req, res) {
            const structures = req.body.structures;
            const units = req.body.units;
            fs.writeFileSync('shared/data-raw.js',
`module.exports.structures = ${JSON.stringify(structures, null, "    ")};
module.exports.units = ${JSON.stringify(units, null, "    ")};`);
            res.send('ok');
        });
        app.get('/tools/list-replays', function (req, res) {
            const resources = walkSync('./', { globs: ['game-*.json'] });
            res.send(resources);
        });
        app.use('/root', express.static(__dirname + '/..'));
    }

    app.use('/dumps', express.static(__dirname + '/../dumps'));
    app.use('/dumps', serveIndex(__dirname + '/../dumps'));

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
            userID: undefined,
            inQueue: false,
            game: null,
            isAdmin: false
        };

        socket.on('ping', function (date) {
            connectedUsers[socket.id].ping = (Date.now() - date) * 2;
            socket.emit('ping', Date.now());
        });

        let authSuccessProcedure = (userObject, callback) => {
            // If no GAuth ID, use MongoID
            const userID = (userObject.id || userObject._id).toString();
            const username = userObject.username;
            const elo = userObject.elo;

            if (!Object.values(connectedUsers).every(c => c.userID !== userID)) {
                // Someone else already logged in as me
                socket.emit('login-failed', 'Already logged in!');
                return;
            }
            console.log(`Auth success [${userID}]: ${username}`);

            connectedUsers[socket.id].username = username;
            connectedUsers[socket.id].elo = elo;
            connectedUsers[socket.id].userID = userID;
            connectedUsers[socket.id].isAdmin = userObject.isAdmin || false;

            socket.emit('login-success', userID);

            let potentialGame = disconnectedMidGame[userID];
            if (potentialGame) {
                console.log('Previously disconnected from a game!');
                delete disconnectedMidGame[userID];
                connectedUsers[socket.id].game = potentialGame;
                potentialGame.updateSocket(userID, socket);
            }
            
            const clientCallback = {
                username: username,
                picture: userObject.picture,
                elo: elo,
                userID: userID
            };
            if (userObject.isAdmin) {
                clientCallback.isAdmin = true;
            }
            callback(clientCallback);

            if (potentialGame) {
                socket.emit('game-start',
                    potentialGame.state.gameStartTime,
                    potentialGame.playerUsernames,
                    potentialGame.mapName);
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
                        socket.emit('login-failed', 'DB Error!');
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
                                    socket.emit('login-failed', 'DB Error!');
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
                                socket.emit('login-failed', 'DB Error!');
                                return;
                            }
                            authSuccessProcedure(newUser, callback);
                        });
                    }
                });
            })
            .catch(err => {
                console.error(err);
                socket.emit('login-failed', 'Uncaught Exception!');
            });
        });

        socket.on('admin/server-status', function(callback) {
            if (connectedUsers[socket.id].isAdmin) {
                callback(Object.values(connectedUsers).map(u => {
                    return {
                        username: u.username,
                        isAdmin: u.isAdmin,
                        socketId: u.socket.id
                    };
                }), games.map(g => {
                    return {
                        players: g.players,
                        mapName: g.mapName,
                        gameStartTime: g.gameStartTime
                    };
                }));
            }
        });

        socket.on('login', function (username, password, callback) {
            db.collection('users').find({ username, password: generateHash(password) }).toArray(function(err, res) {
                if (err) {
                    console.log('DB Error: ' + err);
                    socket.emit('login-failed', 'DB Error!');
                }
                else {
                    if (res.length !== 1) {
                        console.log('Auth failed for: ' + username);
                        socket.emit('login-failed', 'Authentication Failed!');
                    }
                    else {
                        console.log('Auth success for: ' + username);
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
                !connectedUsers[socket.id].inQueue) {
                
                const queue = queues[type];

                let startGame = (queuedPlayers) => {
                    const playerMap = {};
                    const gameStartTime = Date.now();
                    queuedPlayers.forEach(p => {
                        playerMap[p.userID] = {
                            socket: p.socket,
                            username: connectedUsers[p.socket.id].username
                        };
                    });
                    const map = queue.getRandomMap();
                    const game = new Game(playerMap, gameStartTime, handleGameOver, map);

                    queuedPlayers.forEach(p => {
                        connectedUsers[p.socket.id].game = game;
                        connectedUsers[p.socket.id].inQueue = false;
                    });

                    games.push(game);
                    const players = {};
                    queuedPlayers.forEach(p => {
                        players[p.userID] = connectedUsers[p.socket.id].username;
                    });
                    queuedPlayers.forEach(p => {
                        p.socket.emit('game-start',
                            gameStartTime,
                            players,
                            map);
                    });
                };
                
                if (queue !== undefined) {
                    console.log(`Joining ${type} queue for: ${connectedUsers[socket.id].username}`);
                    const result = queue.joinQueue(connectedUsers[socket.id].userID,
                        socket, connectedUsers[socket.id].elo);
                    callback();
                    if (result !== undefined) {
                        // Queue returned a set of players
                        startGame(result);
                    }
                }
            }
        });
        socket.on('state-change', function (stateChange) {
            const change = StateChange.deserialize(stateChange);
            let game = connectedUsers[socket.id].game;
            if (game !== null && !game.isGameOver) {
                if (game.verifyStateChange(change)) {
                    // Process will call simulate and foward as necessary
                    game.processStateChange(change);
                    if (change instanceof ChatMessageStateChange) {
                        if (change.data.message === '/dump') {
                            console.log('Creating dump of game!');
                            fs.writeFileSync(`game-${game.gameStartTime}.json`,
                                safeStringify(game.toJson()));
                        }
                    }
                }
                else {
                    socket.emit('invalid-state-change');
                }
            }
        });
        socket.on('changelog', function(callback) {
            callback(gitChangeLog);
        });
        const leaveQueue = () => {
            Object.values(queues).forEach(q => q.leaveQueue(connectedUsers[socket.id].userID));
            console.log('Leaving queue for', connectedUsers[socket.id].username);
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
                disconnectedMidGame[connectedUsers[socket.id].userID] = potentialGame;
            }
            delete connectedUsers[socket.id];
        });
    });

}