let videoPlayer;
let cvs;
let tag;

var socket;

function preload() {
    videoPlayer = createVideo("../data/black.mp4");
    videoPlayer.position(displayWidth, 0);
    videoPlayer.hide();
    textSize(24);
    //videoPlayer.onended();
}

function setup() {
    cvs = createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(100);
    fill(255);
    socket = io.connect("http://192.168.2.7:3000");
    socket.on("TV_action", newAction);
}

function newAction(actionName) {
    console.log("TV_action: " + actionName);
    tag = actionName;
    videoPlayer.attribute("src", "../data/" + actionName + ".mp4");
    console.log("../data/" + actionName + ".mp4");
    videoPlayer.play();
}

function draw() {
    image(videoPlayer, 0, 0, width, height);
    text("TV_action: " + tag, width / 2, height / 2);
}

function keyPressed() {
    if (keyCode === 13) {
        let fs = fullscreen();
        fullscreen(!fs);
        resizeCanvas(windowWidth, windowHeight);
    }
}