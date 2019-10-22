let videoPlayer;
let audioPlayer;
let cvs;
let tag;
let adress = "192.168.2.7"

var socket;

function preload() {
    audioPlayer = createAudio("../data/S_here_1.mp4");
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
    socket = io.connect("http://" + adress + ":3000");
    socket.on("RO_action", newAction);
}

function newAction(_actionName) {
    console.log("RO_action: " + _actionName);
    if (_actionName == "All reset") {
        window.location.reload();
    } else {
        tag = _actionName;
        if (_actionName.match("here") == "here") {
            var r = random(0, 2);
            if (r < 1) {
                videoPlayer.attribute("src", "../data/RO_here_1.mp4");
                audioPlayer.attribute("src", "../data/S_here_1.mp4");
            } else {
                videoPlayer.attribute("src", "../data/RO_here_2.mp4");
                audioPlayer.attribute("src", "../data/S_here_2.mp4");
            }
        } else if (_actionName.match("OK") == "OK") {
            var r = random(0, 2);
            if (r < 1) {
                videoPlayer.attribute("src", "../data/RO_OK_1.mp4");
            } else {
                videoPlayer.attribute("src", "../data/RO_OK_2.mp4");
            }
        } else {
            videoPlayer.attribute("src", "../data/" + _actionName + ".mp4");
        }
        videoPlayer.play();
        audioPlayer.play();
    }
}

function draw() {
    background(0);
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