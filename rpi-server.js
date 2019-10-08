const express = require("express");
const app = express();
const omx = require('omx-player-wrapper');

const TV_position = 60;
const User_position = -60;
var Robot_position = 0;

var socket = require("socket.io");
var server = app.listen(3000);
var io = socket(server);

console.log("Server listening on port 3000");

app.use("/Control_Center", express.static("Control_Center"));
app.use("/TV", express.static("TV"));
app.use("/libraries", express.static("libraries"));
app.use("/data", express.static("data"));

io.sockets.on("connection", newConnection);

function newConnection(socket) {
    console.log("new connection: " + socket.id);

    socket.on("TV_action", TV_action);

    function TV_action(_actionName) {
        socket.broadcast.emit("TV_action", _actionName);
        console.log("TV_action: " + _actionName);
    }

    socket.on("RO_action", RO_action);

    function RO_action(_actionName) {
        if (_actionName == "RO_wake_up") {
            console.log("Wake up");
            playVideo(_actionName, "p", 2);
            //servo
        } else if (_actionName == "RO_here") {
            console.log("here");
            playVideo(_actionName, "p", 1);
        } else if (_actionName == "RO_turn_to_user") {
            console.log("turn to User");
            if (User_position < Robot_position) {
                playVideo("RO_turn_left", "p", 1);
            } else if (User_position > Robot_position) {
                playVideo("RO_turn_right", "p", 1);
            }
            //servo
        } else if (_actionName == "RO_turn_to_TV") {
            console.log("turn  to TV");
            if (TV_position < Robot_position) {
                playVideo("RO_turn_left", "p", 1);
            } else if (TV_position > Robot_position) {
                playVideo("RO_turn_right", "p", 1);
            }
            //servo
        } else if (_actionName == "RO_wait") {
            console.log("wait");
            var player = new omx("data/RO_wait.mp4");
            player.start();
        } else if (_actionName == "RO_OK") {
            console.log("OK");
            playVideo(_actionName, "p", 1);
        } else if (_actionName == "RO_sleep") {
            console.log("sleep");
            playVideo(_actionName, "p", 2);
            //servo
        } else if (_actionName == "RO_move_out") {
            console.log("move out");
            playVideo(_actionName, "p", 3);
        } else if (_actionName == "RO_move_in") {
            console.log("move in");
            playVideo(_actionName, "p", 3);
        } else if (_actionName == "RO_play(RE)") {
            console.log("play(RE)")
            playVideo(_actionName, "p", 3);
        } else if (_actionName == "RO_superpower") {
            console.log("superpower")
            playVideo(_actionName, "p", 3);
        } else if (_actionName == "RO_play(CT)") {
            console.log("play(CT)")
            playVideo(_actionName, "p", 3);
        } else if (_actionName == "RO_communicate") {
            console.log("communicate")
            playVideo(_actionName, "p", 3);
        } else if (_actionName == "RO_play(R)") {
            console.log("play(R)")
            playVideo(_actionName, "p", 3);
        } else if (_actionName == "RO_play(CVST)") {
            console.log("play(CVST)")
            playVideo(_actionName, "p", 3);
        } else if (_actionName == "RO_reset") {
            console.log("reset")
            //servo
            playVideo("RO_sleep", "p", 3);
            setTimeout(() => {
                //servo
                playVideo("black", "p", 3);
            }, 3000);
        } else {
            console.log("Error !");
        }
    }
}

function playVideo(_name, wait, delay) {
    var player = new omx("data/" + _name + ".mp4");
    player.start();
    if (wait == "p") {
        setTimeout(() => {
            if (player.getStatus() == "inProgress") {
                player.pause();
            }
        }, delay * 1000);
    } else if (wait == "w") {
        setTimeout(() => {
            var player = new omx("data/RO_wait.mp4");
            player.start();
        }, delay * 1000);
    }

}

function endByWait() {
    var player = new omx("data/RO_wait.mp4");
    player.start();
}