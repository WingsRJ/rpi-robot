const express = require("express");
const app = express();
const omx = require('omxdirector');

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
            playVideo(_actionName);
            //servo
        } else if (_actionName == "RO_here") {
            playVideo(_actionName);
        } else if (_actionName == "RO_turn_to_user") {
            console.log("turn to User");
            if (User_position < Robot_position) {
                playVideo("RO_turn_left",{loop: false});
            } else if (User_position > Robot_position) {
                playVideo("RO_turn_right",{loop: false});
            }
            //servo
        } else if (_actionName == "RO_turn_to_TV") {
            console.log("turn  to TV");
            if (TV_position < Robot_position) {
                playVideo("RO_turn_left",{loop: false});
            } else if (TV_position > Robot_position) {
                playVideo("RO_turn_right",{loop: false});
            }
            //servo
        } else if (_actionName == "RO_wait") {
            omx.play("data/RO_wait.mp4",{loop: true});
        } else if (_actionName == "RO_OK") {
            playVideo(_actionName);
        } else if (_actionName == "RO_sleep") {
            playVideo(_actionName);
            //servo
        } else if (_actionName == "RO_move_out") {
            playVideo(_actionName);
        } else if (_actionName == "RO_move_in") {
            playVideo(_actionName);
        } else if (_actionName == "RO_play(RE)") {
            playVideo(_actionName);
        } else if (_actionName == "RO_superpower") {
            playVideo(_actionName);
        } else if (_actionName == "RO_play(CT)") {
            playVideo(_actionName);
        } else if (_actionName == "RO_communicate") {
            playVideo(_actionName);
        } else if (_actionName == "RO_play(R)") {
            playVideo(_actionName);
        } else if (_actionName == "RO_play(CVST)") {
            playVideo(_actionName);
        } else if (_actionName == "RO_reset") {
            console.log("reset")
            //servo
            playVideo("RO_sleep");
            setTimeout(() => {
                //servo
                playVideo("black");
            }, 3000);
        } else {
           // console.log("Error !");
        }
    }
}

function playVideo(_name, wait, delay) {
    console.log(_name);
    if(omx.isPlaying()){
        omx.stop();
    }
    omx.play("data/" + _name + ".mp4",{loop: false});
    if (wait == "w") {
        setTimeout(() => {
            if(omx.isPlaying()){
                omx.stop();
            }
            omx.play("data/RO_wait.mp4",{loop: true});
        }, delay * 1000);
    }
}