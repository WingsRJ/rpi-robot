let videoPlayer;
let cvs;
let tag;

var socket;

function preload() {
    videoPlayer = createVideo("../data/black.mp4");
    videoPlayer.position(displayWidth, 0);
    videoPlayer.hide();
    //videoPlayer.onended(gotoFirstFrame);
}

function setup() {
    cvs = createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(100);
    fill(255);
    socket = io.connect("http://192.168.2.7:3000");
    socket.on("TV_action_name", action);
}

function draw() {
    image(videoPlayer, 0, 0, width, height);
    text(tag, width / 2, height / 2);
}

function keyPressed() {
    if (keyCode === 13) {
        let fs = fullscreen();
        fullscreen(!fs);
        resizeCanvas(windowWidth, windowHeight);
    }
}

function gotoFirstFrame() {
    videoPlayer.time(0);
}

function action(Msg) {
    tag = Msg;
    videoPlayer.attribute("src", "../data/" + Msg + ".mp4");
    videoPlayer.play();
}