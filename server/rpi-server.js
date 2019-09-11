const express = require("express");
const omx = require("node-omxplayer");

const app = express();
app.get("/reset", (req, res) => {
    var player = omx("../data/reset.mp4");
    res.send("turn right");
    player.on("close", () => {
        player.newSource("../data/wake_up.mp4");
    }) 
});
app.get("/wake_up", (req, res) => {
    res.send("turn right");
});
app.get("/sleep", (req, res) => {
    res.send("turn right");
});
app.get("/talk", (req, res) => {
    res.send("turn right");
});
app.get("/wait", (req, res) => {
    res.send("turn right");
});
app.get("/move_out", (req, res) => {
    res.send("turn right");
});
app.get("/move_in", (req, res) => {
    res.send("turn right");
});
app.get("/superpower", (req, res) => {
    res.send("turn right");
});
app.get("/communicate", (req, res) => {
    res.send("turn right");
});
app.get("/turn_right", (req, res) => {
    res.send("turn right");
});
app.get("/turn_left", (req, res) => {
    res.send("turn right");
});
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});