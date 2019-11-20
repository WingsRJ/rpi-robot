const express = require("express");
const app = express();

var socket = require("socket.io");
var server = app.listen(3000);
var io = socket(server);

var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;

console.log("Server listening on port 3000");

app.use("/RO", express.static("RO"));
app.use("/libraries", express.static("libraries"));
app.use("/data", express.static("data"));

const TV_position = 60;
const User_position = -60;
var Robot_position = 0;

io.sockets.on("connection", newConnection);

function newConnection(socket) {
    console.log("new connection: " + socket.id);

    socket.on("mac_msg", RO_action);

    function RO_action(_actionName) {
        console.log("RO_action: " + _actionName);
        if (_actionName.match("RO_wake_up") == "RO_wake_up") {
            socket.broadcast.emit("RO_action", _actionName);
            //servo
        } else if (_actionName.match("RO_here") == "RO_here") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_turn_to_user") == "RO_turn_to_user") {
            if (User_position < Robot_position) {
                socket.broadcast.emit("RO_action","RO_turn_left_1");
            } else if (User_position > Robot_position) {
                socket.broadcast.emit("RO_action","RO_turn_right_1");
            }
            //servo
        } else if (_actionName.match("RO_turn_to_TV") == "RO_turn_to_TV") {
            if (TV_position < Robot_position) {
                socket.broadcast.emit("RO_action","RO_turn_left_1");
            } else if (TV_position > Robot_position) {
                socket.broadcast.emit("RO_action","RO_turn_right_1");
            }
            //servo
        } else if (_actionName.match("RO_wait") == "RO_wait") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_OK") == "RO_OK") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_sleep") == "RO_sleep") {
            socket.broadcast.emit("RO_action", _actionName);
            //servo
        } else if (_actionName.match("RO_move_out") == "RO_move_out") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_move_in") == "RO_move_in") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_play_re_embodiment") == "RO_play_re_embodiment") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_superpower") == "RO_superpower") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_play_control") == "RO_play_control") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_communicate") == "RO_communicate") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_play_representation") == "RO_play_representation") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_play_conversation") == "RO_play_conversation") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName.match("RO_reset") == "RO_reset") {
            socket.broadcast.emit("RO_action", _actionName);
            //servo
        } else {
            //socket.broadcast.emit("RO_action", _actionName);
        }
    }
}