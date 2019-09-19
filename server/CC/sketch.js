let audioPlayer;
let videoPlayer;
let cvs;
let buttons = new Array;
let action;
let actions = new Array;
let shift = new Array;
let Ro_actions = new Array;
let TV_actions = new Array;
let title = "Robot";
let time;

let actionName = new Array;
actionName[0] = "Reset";
actionName[1] = "wakeUp";
actionName[2] = "answer";
actionName[3] = "Re_embodiement";
actionName[4] = "Control";
actionName[5] = "Representative";
actionName[6] = "Conversation";
actionName[7] = "sleep";

let Ro_actionName = new Array;
Ro_actionName[0] = "Ro-reset";
Ro_actionName[1] = "Ro-wake";
Ro_actionName[2] = "Ro-sleep";
Ro_actionName[3] = "Ro-talk";
Ro_actionName[4] = "Ro-wait";
Ro_actionName[5] = "Ro-moveOut";
Ro_actionName[6] = "Ro-moveIn";
Ro_actionName[7] = "Ro-power";
Ro_actionName[8] = "Ro-communicate";
Ro_actionName[9] = "Ro-turnRight";
Ro_actionName[10] = "Ro-turnLeft";

let TV_actionName = new Array;
TV_actionName[0] = "TV_reset";
TV_actionName[1] = "TV_open";
TV_actionName[2] = "TV_close";
TV_actionName[3] = "TV_S_talk";
TV_actionName[4] = "TV_S_wait";
TV_actionName[5] = "TV_S_moveOut";
TV_actionName[6] = "TV_S_moveIn";
TV_actionName[7] = "TV_S_play";
TV_actionName[8] = "TV_play";
TV_actionName[9] = "TV_M_sleep";
TV_actionName[10] = "TV_M_wake";
TV_actionName[11] = "TV_M_talk";
TV_actionName[12] = "TV_M_play";

function preload() {
    audioPlayer = createAudio("data/answer.mp3");
    videoPlayer = createVideo("data/TV_reset.mp4");
    videoPlayer.position(0, 0);
    videoPlayer.hide();
    videoPlayer.onended(gotoFirstFrame);
}

function setup() {
    localStorage.removeItem("Ro_actionID");
    localStorage.removeItem("TV_actionID");
    cvs = createCanvas(480, 270);
    time = 0;
    action = 0;
    background(0);
    noStroke();
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    for (i = 0; i < actionName.length; i++) {
        let nb = createButton(actionName[i]);
        nb.position(width + 20, 12 + 24 * i);
        nb.mousePressed(shift[i]);
        buttons.push(nb);
    }
    for (i = 0; i < Ro_actionName.length; i++) {
        let nb = createButton(Ro_actionName[i]);
        nb.position(width + 160, 12 + 24 * i);
        nb.mousePressed(Ro_actions[i]);
        buttons.push(nb);
    }
    for (i = 0; i < TV_actionName.length; i++) {
        let nb = createButton(TV_actionName[i]);
        nb.position(width + 300, 12 + 24 * i);
        nb.mousePressed(TV_actions[i]);
        buttons.push(nb);
    }
}

function draw() {
    image(videoPlayer, 0, 0, width, height);
    fill(255);
    text(title, width / 2, height / 2);
    time += 1;
    actions[action]();
}

function gotoFirstFrame() {
    videoPlayer.time(0);
}

function keyPressed() {
    if (keyCode === 13) {
        let fs = fullscreen();
        fullscreen(!fs);
    }
}

function readDataFromSerial() {

}

actions[0] = function () {

}
actions[1] = function () {
    if (time == 1) {
        Ro_actions[1]();
    } else if (time == 60) {
        //serial.write();
        Ro_actions[9]();
    }else if (time == 120) {
        Ro_actions[3]();

    }
    else if (time == 180) {
        Ro_actions[4](); 
    }
}

actions[2] = function () {
    if (time == 1) {
        Ro_actions[3]();

    }
}
actions[3] = function () {

}
actions[4] = function () {

}
actions[5] = function () {

}
actions[6] = function () {

}
actions[7] = function () {
    if (time == 1) {
        Ro_actions[4](); 
    } else if (time == 660) {
        //serial.write();
        Ro_actions[10]();
    }else if (time == 720) {
        Ro_actions[2]();
    }
}

Ro_actions[0] = function () {
    localStorage.setItem("Ro_actionID", 0);
    videoPlayer.attribute("src", "data/Ro-reset.mp4");
    videoPlayer.play();
}
Ro_actions[1] = function () {
    localStorage.setItem("Ro_actionID", 1);
    videoPlayer.attribute("src", "data/Ro-wake.mp4");
    videoPlayer.play();
}
Ro_actions[2] = function () {
    localStorage.setItem("Ro_actionID", 2);
    videoPlayer.attribute("src", "data/Ro-sleep.mp4");
    videoPlayer.play();
}
Ro_actions[3] = function () {
    localStorage.setItem("Ro_actionID", 3);
    videoPlayer.attribute("src", "data/Ro-talk.mp4");
    videoPlayer.play();
}
Ro_actions[4] = function () {
    localStorage.setItem("Ro_actionID", 4);
    videoPlayer.attribute("src", "data/Ro-wait.mp4");
    videoPlayer.play();
}
Ro_actions[5] = function () {
    localStorage.setItem("Ro_actionID", 5);
    videoPlayer.attribute("src", "data/Ro-moveOut.mp4");
    videoPlayer.play();
}
Ro_actions[6] = function () {
    localStorage.setItem("Ro_actionID", 6);
    videoPlayer.attribute("src", "data/Ro-moveIn.mp4");
    videoPlayer.play();
}
Ro_actions[7] = function () {
    localStorage.setItem("Ro_actionID", 7);
    videoPlayer.attribute("src", "data/Ro-power.mp4");
    videoPlayer.play();
}
Ro_actions[8] = function () {
    localStorage.setItem("Ro_actionID", 8);
    videoPlayer.attribute("src", "data/Ro-communicate.mp4");
    videoPlayer.play();
}
Ro_actions[9] = function () {
    localStorage.setItem("Ro_actionID", 9);
    videoPlayer.attribute("src", "data/Ro-turnRight.mp4");
    videoPlayer.play();
}
Ro_actions[10] = function () {
    localStorage.setItem("Ro_actionID", 10);
    videoPlayer.attribute("src", "data/Ro-turnLeft.mp4");
    videoPlayer.play();
}


TV_actions[0] = function () {
    localStorage.setItem("TV_actionID", 0);
    videoPlayer.attribute("src", "data/TV_reset.mp4");
    videoPlayer.play();
}
TV_actions[1] = function () {
    localStorage.setItem("TV_actionID", 1);
    videoPlayer.attribute("src", "data/TV_open.mp4");
    videoPlayer.play();
}
TV_actions[2] = function () {
    localStorage.setItem("TV_actionID", 2);
    videoPlayer.attribute("src", "data/TV_close.mp4");
    videoPlayer.play();
}
TV_actions[3] = function () {
    localStorage.setItem("TV_actionID", 3);
    videoPlayer.attribute("src", "data/TV_S_talk.mp4");
    videoPlayer.play();
}
TV_actions[4] = function () {
    localStorage.setItem("TV_actionID", 4);
    videoPlayer.attribute("src", "data/TV_S_wait.mp4");
    videoPlayer.play();
}
TV_actions[5] = function () {
    localStorage.setItem("TV_actionID", 5);
    videoPlayer.attribute("src", "data/TV_S_moveOut.mp4");
    videoPlayer.play();
}
TV_actions[6] = function () {
    localStorage.setItem("TV_actionID", 6);
    videoPlayer.attribute("src", "data/TV_S_moveIn.mp4");
    videoPlayer.play();
}
TV_actions[7] = function () {
    localStorage.setItem("TV_actionID", 7);
    videoPlayer.attribute("src", "data/TV_S_play.mp4");
    videoPlayer.play();
}
TV_actions[8] = function () {
    localStorage.setItem("TV_actionID", 8);
    videoPlayer.attribute("src", "data/TV_play.mp4");
    videoPlayer.play();
}
TV_actions[9] = function () {
    localStorage.setItem("TV_actionID", 9);
    videoPlayer.attribute("src", "data/TV_M_sleep.mp4");
    videoPlayer.play();
}
TV_actions[10] = function () {
    localStorage.setItem("TV_actionID", 10);
    videoPlayer.attribute("src", "data/TV_M_wake.mp4");
    videoPlayer.play();
}
TV_actions[11] = function () {
    localStorage.setItem("TV_actionID", 11);
    videoPlayer.attribute("src", "data/TV_M_talk.mp4");
    videoPlayer.play();
}
TV_actions[12] = function () {
    localStorage.setItem("TV_actionID", 0);
    videoPlayer.attribute("src", "data/TV_M_play.mp4");
    videoPlayer.play();
}

shift[0] = function () {
    action = 0;
    time = 0;
    localStorage.removeItem("Ro_actionID");
    localStorage.removeItem("TV_actionID");
}
shift[1] = function () {
    action = 1;
    time = 0;
}
shift[2] = function () {
    action = 2;
    time = 0;
}
shift[3] = function () {
    action = 3;
    time = 0;
}
shift[4] = function () {
    action = 4;
    time = 0;
}
shift[5] = function () {
    action = 5;
    time = 0;
}
shift[6] = function () {
    action = 6;
    time = 0;
}
shift[7] = function () {
    action = 7;
    time = 0;
}