let videoPlayer;
//let audioPlayer;
let cvs;
let tag;
let adress = "192.168.2.7"

var socket;

function preload() {
    videoPlayer = createVideo("../data/black.mp4");
    videoPlayer.position(displayWidth, 0);
    videoPlayer.volume(1);
    videoPlayer.hide();
}

function setup() {
    cvs = createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    socket = io.connect("http://localhost:3000");
    socket.on("RO_action", newAction);
}

function newAction(_actionName) {
    console.log("RO_action: " + _actionName);
    if (_actionName == "All reset") {
        window.location.reload();
    } else {
        tag = _actionName;
        videoPlayer.attribute("src", "../data/" + _actionName + ".mp4");
        videoPlayer.play();
    }
}

function draw() {
    image(videoPlayer, 0, 0, width, height);
    text("RO_action: " + tag, width / 2, height / 2);
}

function keyPressed() {
    if (keyCode === 13) {
        let fs = fullscreen();
        fullscreen(!fs);
        resizeCanvas(windowWidth, windowHeight);
    }
}