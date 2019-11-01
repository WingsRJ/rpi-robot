let videoPlayer;
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
    socket.on("TV_action", newAction);
}

function newAction(_actionName) {
    background(0);
    console.log("TV_action: " + _actionName);
    if (_actionName == "All reset") {
        window.location.reload();
    } else {
        tag = _actionName;
        if (_actionName.match("News") == "News") {
            videoPlayer.attribute("src", "../data/" + _actionName + ".mp4");
            setTimeout(() => {
                tag = "TV_close"
                videoPlayer.attribute("src", "../data/TV_close.mp4");
                videoPlayer.play();
            }, 20000);
        } else {
            videoPlayer.attribute("src", "../data/" + _actionName + ".mp4");
        }
        videoPlayer.play();
    }
}

function draw() {
    background(0);
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