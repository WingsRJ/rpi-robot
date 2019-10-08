const express = require("express");
const app = express();
const path = require("path");
const omx = require("@augmentality/node-omx");

app.use("/Control_Center", express.static("Control_Center"));
app.use("/TV", express.static("TV"));
app.use("/libraries", express.static("libraries"));
app.use("/data", express.static("data"));

const omx = require('@augmentality/node-omx');
const n = new omx.Player();

n.open('data/black.mp4');
n.play();
setTimeout(() => {
    n.stop();
}, 5000);
setTimeout(() => {
    n.open('data/black.mp4');
    n.play();
}, 6000);