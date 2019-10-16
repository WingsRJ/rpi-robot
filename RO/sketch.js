let videoPlayer;
let audioPlayer;
let cvs;
let tag;
let adress = "192.168.2.7"

var socket;

function preload() {
    audioPlayer = createAudio("../data/S_here_1.mp3");
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
        if (_actionName.match("here") == "here") {
            let r=random(0,2);
            if(r<1){
                audioPlayer.attribute("src", "../data/S_here_1.mp3");
                console.log("RO_action: " + _actionName+"1");
            }else{
                audioPlayer.attribute("src", "../data/S_here_2.mp3");
                console.log("RO_action: " + _actionName+"2");
            }
            audioPlayer.play();
        }else if (_actionName.match("OK") == "OK") {
            let r=random(0,2);
            if(r<1){
                audioPlayer.attribute("src", "../data/S_OK_1.mp3");
            }else{
                audioPlayer.attribute("src", "../data/S_OK_2.mp3");
            }
            audioPlayer.play();
        }
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