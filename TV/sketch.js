let videoPlayer;
let audioPlayer;
let cvs;
let tag;
let adress = "192.168.2.7"

var socket;

function preload() {
    audioPlayer = createAudio("../data/我在.mp3");
    videoPlayer = createVideo("../data/black.mp4");
    videoPlayer.position(displayWidth, 0);
    videoPlayer.hide();

}

function setup() {
    cvs = createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    socket = io.connect("http://" + adress + ":3000");
    socket.on("TV_action", newAction);
}

function newAction(_actionName) {
    console.log("TV_action: " + _actionName);
    if (_actionName == "All reset") {
        window.location.reload();
    } else {
        tag = _actionName;
        if (_actionName.match("News") == "News") {
            videoPlayer.attribute("src", "../data/" + _actionName + ".mp4");
            videoPlayer.play();
            setTimeout(() => {
                tag = "TV_close"
                videoPlayer.attribute("src", "../data/TV_close.mp4");
                videoPlayer.play();
            }, 20000);
        }else{
            videoPlayer.attribute("src", "../data/" + _actionName + ".mp4");
            videoPlayer.play();
        }
    }
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