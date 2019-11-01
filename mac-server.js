const express = require("express");
const app = express();

var socket = require("socket.io");
var server_socket;
var server = app.listen(3000);
var io = socket(server);

let adress = "192.168.2.7"

console.log("Server listening on port 3000");

app.use("/Control_Center", express.static("Control_Center"));
app.use("/TV", express.static("TV"));
app.use("/RO", express.static("RO"));
app.use("/libraries", express.static("libraries"));
app.use("/data", express.static("data"));

server_socket = io.connect("http://" + adress + ":3000");
server_socket.on("TV_action", newAction);

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
        console.log("RO_action: " + _actionName);
        if (_actionName == "RO_wake_up") {
            socket.broadcast.emit("RO_action", _actionName);
            //servo
        } else if (_actionName == "RO_here") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_turn_to_user") {
            if (User_position < Robot_position) {
                socket.broadcast.emit("RO_action","RO_turn_left");
            } else if (User_position > Robot_position) {
                socket.broadcast.emit("RO_action","RO_turn_right");
            }
            //servo
        } else if (_actionName == "RO_turn_to_TV") {
            if (TV_position < Robot_position) {
                socket.broadcast.emit("RO_action","RO_turn_left");
            } else if (TV_position > Robot_position) {
                socket.broadcast.emit("RO_action","RO_turn_right");
            }
            //servo
        } else if (_actionName == "RO_wait") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_OK") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_sleep") {
            socket.broadcast.emit("RO_action", _actionName);
            //servo
        } else if (_actionName == "RO_move_out") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_move_in") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_play_re_embodiment") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_superpower") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_play_control") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_communicate") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_play_representation") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_play_conversation") {
            socket.broadcast.emit("RO_action", _actionName);
        } else if (_actionName == "RO_reset") {
            socket.broadcast.emit("RO_action", _actionName);
            //servo
        } else {
           // console.log("Error !");
        }
    }
}