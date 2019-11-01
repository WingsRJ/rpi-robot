const express = require("express");
const app = express();

let adress = "192.168.2.7";
var socket = require("socket.io");
var server_io = require('socket.io-client');
var server_socket = server_io.connect("http://" + adress + ":3000", {
    reconnect: true
});
var server = app.listen(3000);
var io = socket(server);

console.log("Server listening on port 3000");

app.use("/Control_Center", express.static("Control_Center"));
app.use("/TV", express.static("TV"));
app.use("/libraries", express.static("libraries"));
app.use("/data", express.static("data"));

server_socket.on("connect",newServerConnection);
function newServerConnection(socket) {
    console.log('rpi-server connection!');
    console.log("rpi-server ID: " + socket.id);
}

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
        console.log("mac_msg: " + _actionName);
        server_socket.broadcast.emit("mac_msg", _actionName);
    }
}