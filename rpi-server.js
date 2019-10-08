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

    function TV_action(actionName) {
        socket.broadcast.emit("TV_action", actionName);
        console.log("TV_action: " + actionName);
    }

    socket.on("RO_action", RO_action);

    function RO_action(actionName) {
        if (actionName == "RO_wake_up") {
            console.log("Wake up");
            var player = new omx("data/RO_wake_up.mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 2000);
            //servo
        } else if (actionName == "RO_here") {
            console.log("here");
            var player = new omx("data/RO_here.mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 1000);
        } else if (actionName == "RO_turn_to_user") {
            console.log("turn to User");
            if (User_position < Robot_position) {
                var player = new omx("data/RO_turn_left.mp4");
                player.start();
            } else if (User_position > Robot_position) {
                var player = new omx("data/RO_turn_right.mp4");
                player.start();
            }
            setTimeout(() => {
                //player.pause();
            }, 1000);
            //servo
        } else if (actionName == "RO_turn_to_TV") {
            console.log("turn  to TV");
            if (TV_position < Robot_position) {
                var player = new omx("data/RO_turn_left.mp4");
                player.start();
            } else if (TV_position > Robot_position) {
                var player = new omx("data/RO_turn_right.mp4");
                player.start();
            }
            setTimeout(() => {
                //player.pause();
            }, 1000);
            //servo
        } else if (actionName == "RO_wait") {
            console.log("wait");
            var player = new omx("data/RO_wait.mp4");
            player.start();
        } else if (actionName == "RO_OK") {
            console.log("OK");
            var player = new omx("data/RO_OK.mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 1000);
        } else if (actionName == "RO_sleep") {
            console.log("sleep");
            var player = new omx("data/RO_sleep.mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 2000);
            //servo
        } else if (actionName == "RO_move_out") {
            console.log("move out");
            var player = new omx("data/RO_move_out.mp4");
            player.start();
            setTimeout(() => {
                //servo
                var player = new omx("data/RO_sleep.mp4");
                player.start();
                setTimeout(() => {
                    //player.pause();
                }, 2000);
            }, 3000);
        } else if (actionName == "RO_move_in") {
            console.log("move in");
            var player = new omx("data/RO_wake_up.mp4");
            player.start();
            //servo
            setTimeout(() => {
                var player = new omx("data/RO_move_in.mp4");
                player.start();
                setTimeout(() => {
                    //player.pause();
                }, 3000);
            }, 2000);
        } else if (actionName == "RO_play(RE)") {
            console.log("play(RE)")
            var player = new omx("data/RO_play(RE).mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 3000);
        } else if (actionName == "RO_superpower") {
            console.log("superpower")
            var player = new omx("data/RO_superpower.mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 3000);
        } else if (actionName == "RO_play(CT)") {
            console.log("play(CT)")
            var player = new omx("data/RO_play(CT).mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 3000);
        } else if (actionName == "RO_communicate") {
            console.log("communicate")
            var player = new omx("data/RO_communicate.mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 3000);
        } else if (actionName == "RO_play(R)") {
            console.log("play(R)")
            var player = new omx("data/RO_play(R).mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 3000);
        } else if (actionName == "RO_play(CVST)") {
            console.log("play(CVST)")
            var player = new omx("data/RO_play(CVST).mp4");
            player.start();
            setTimeout(() => {
                //player.pause();
            }, 3000);
        } else if (actionName == "RO_reset") {
            console.log("reset")
            //servo
            var player = new omx("data/RO_sleep.mp4");
            player.start();
            setTimeout(() => {
                player.quit();
                //servo
                var player = new omx("data/black.mp4");
                player.start();
                () => {
                    //player.pause();
                };
            }, 3000);
        } else {
            console.log("Error !");
        }
    }
}