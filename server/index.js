const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io").listen(http);
const pg = require("pg");
const crypto = require("crypto");
const data = require("./data");
const structures = data.structures;
const units = data.units;
const map = require("./map");
const { createGameState, simulateState, createStateChange } = require("./shared/game");

const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/";
const userRequestQueryString = "SELECT * FROM users WHERE username=$1 AND password=$2";
const dbClient = new pg.Client(connectionString);

dbClient.connect();

var connectedUsers = [];
var queue = [];
var games = [];

function generateHash(string) {
    return crypto.createHash("sha512").update(string).digest("hex");
}

app.use(express.static(__dirname + "/../client"));

var port = process.env.PORT || 5000;
http.listen(port, function() {
    console.log("Listening on port " + port);
});

function createEndTurnStateChange(side) {
    return createStateChange(side, "turn-passover", { isUserInitiated: false });
}

function createGame(redPlayer, bluePlayer, redSocket, blueSocket, gameStartTime) {
    var game = {
        redPlayer: redPlayer,
        bluePlayer: bluePlayer,
        redSocket: redSocket,
        blueSocket: blueSocket,
        state: createGameState(gameStartTime),
        stateChanges: [],
        currentTurn: "start",
        nextTurn: setInterval(function () {
            processStateChange(game, createEndTurnStateChange("server"))
        }, 10000)
    };
    return game;
}

function processStateChange(game, stateChange) {
    if (stateChange.type == "turn-passover") {

    }
    game.stateChanges.push(stateChange);
    // Check whether or not to send stuff here
    game.redPlayer.emit("state-change", stateChange);
    game.bluePlayer.emit("state-change", stateChange);
}

io.on("connection", function (socket) {
    console.log("User connected!");
    connectedUsers[socket.id] = {
        socket: socket,
        status: "connected",
        username: null,
        ping: 0,
        queueID: -1
    };
    socket.on("ping", function (date) {
        connectedUsers[socket.id].ping = (Date.now() - date) * 2;
        socket.emit("ping", Date.now());
    });
    socket.on("login", function (username, password) {
        dbClient.query(userRequestQueryString, [username, generateHash(password)], function (err, res) {
            if (err) {
                console.log("DB Error: " + err);
                socket.emit("login-failed");
            }
            else {
                if (res.rows.length == 0) {
                    console.log("Auth failed for: " + username);
                    socket.emit("login-failed");
                }
                else {
                    console.log("Auth success for: " + username);
                    connectedUsers[socket.id].username = username;
                    connectedUsers[socket.id].elo = res.rows[0].elo;
                    socket.emit("login-success", {
                        username: username,
                        elo: res.rows[0].elo
                    });
                }
            }
        });
    });
    socket.on("join-queue", function (type) {
        if (connectedUsers[socket.id].username != null &&
            connectedUsers[socket.id].queueID == -1) {
            var gameFound = false;
            for (var i = 0; i < queue.length; i++) {
                if (Math.abs(queue[i].elo - connectedUsers[socket.id].elo) < 300) {
                    // ELO Between 300 difference, start game processes here
                    gameFound = true;
                    var gameStartTime = Date.now();
                    var game = createGame(queue[i].requester,
                        connectedUsers[socket.id].username, gameStartTime);
                    games.push(game);
                    var otherSocket = queue[i].socket;
                    socket.emit("game-start", "red", gameStartTime);
                    otherSocket.emit("game-start", "blue", gameStartTime);
                    queue.splice(i, 1);
                    setTimeout(function () {
                        redSocket.emit("turn-passover", "red");
                        blueSocket.emit("turn-passover", "red");
                    }, 10000);
                    break;
                }
            }
            if (!gameFound) {
                console.log("Joining queue for: " + connectedUsers[socket.id].username);
                connectedUsers[socket.id].queueID = queue.length;
                queue.push({
                    type: type,
                    requester: connectedUsers[socket.id].username,
                    socket: socket,
                    elo: connectedUsers[socket.id].elo
                });
                socket.emit("joined-queue");
            }
        }
    });
    socket.on("leave-queue", function (type) {
        queue.splice(connectedUsers[socket.id].queueID, 1);
        connectedUsers[socket.id].queueID = -1;
        socket.emit("left-queue");
    });
    socket.on("disconnect", function() {
        console.log("Got disconnect!");
        if (connectedUsers[socket.id].queueID != -1) {
            queue.splice(connectedUsers[socket.id].queueID, 1);
        }
        delete connectedUsers[socket.id];
    });
});

app.get("/", function (request, response) {
    response.sendFile("../client/index.html", { root : __dirname});
});

app.get("/data.js", function (request, response) {
    response.setHeader("Content-Type", "text/javascript");
    response.send("var structures = " + JSON.stringify(data.structures) + ";" +
                  "var units = " + JSON.stringify(data.units) + ";");
});

app.get("/map.js", function (request, response) {
    response.setHeader("Content-Type", "text/javascript");
    response.send("var map = " + JSON.stringify(map) + ";");
});

app.get("/shared/game.js", function (request, response) {
   response.sendFile("shared/game.js", { root : __dirname});
});


