const actionName = [
    "reset",
    "wake up",
    "answer",
    "Re_embodiement",
    "Control",
    "Representative",
    "Conversation",
    "sleep"
];

const Ro_actionName = [
    "RO_reset",
    "RO_wake_up",
    "RO_here",
    "RO_turn_to_User",
    "RO_turn_to_TV",
    "RO_wait",
    "RO_OK",
    "RO_sleep",
    "RO_move_out",
    "RO_move_in",
    "RO_play(RE)",
    "RO_superpower",
    "RO_play(CT)",
    "RO_communicate",
    "RO_play(R)",
    "RO_play(CVST)"
];

const TV_actionName = [
    "TV_reset",
    "TV_open",
    "TV_close",
    "TV_wake",
    "TV_sleep",
    "TV_move_out",
    "TV_move_in",
    "TV_play(RE)",
    "TV_play(CT)",
    "TV_play(R)",
    "TV_play(CVST)",
    "TV_communicate",
    "TV_talk",
    "TV_News_1"
];

let videoPlayer;
let cvs;
let actionTag = actionName.length + 1;
let buttons = new Array;
let scripts = new Array;
let actions = new Array;
let RO_actions = new Array;
let TV_actions = new Array;
let title = "Robot";
let time;
let socket;

function preload() {
    videoPlayer = createVideo("../data/RO_reset.mp4");
    videoPlayer.position(0, 0);
    videoPlayer.hide();
    //videoPlayer.onended(gotoFirstFrame);
}

function setup() {
    cvs = createCanvas(480, 270);
    time = 0;
    socket = io.connect("http://192.168.43.217:3000");
    background(0);
    noStroke();
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    for (i = 0; i < actionName.length; i++) {
        let nb = createButton(actionName[i]);
        nb.position(width + 20, 12 + 24 * i);
        nb.mousePressed(actions[i]);
        buttons.push(nb);
    }
    for (i = 0; i < Ro_actionName.length; i++) {
        let nb = createButton(Ro_actionName[i]);
        nb.position(width + 160, 12 + 24 * i);
        nb.mousePressed(RO_actions[i]);
        buttons.push(nb);
    }
    for (i = 0; i < TV_actionName.length; i++) {
        let nb = createButton(TV_actionName[i]);
        nb.position(width + 300, 12 + 24 * i);
        //nb.mousePressed(TV_actions[i]);
        nb.mousePressed(function(){
            //console.log(this)
            let label = this.elt.innerText;
            socket.emit("TV_action", label);
            console.log("TV_action: " + label);
            videoPlayer.attribute("src", "../data/" + label + ".mp4");
            videoPlayer.play();
        });
        buttons.push(nb);
    }
}

function draw() {
    image(videoPlayer, 0, 0, width, height);
    fill(255);
    text(title, width / 2, height / 2);
    if (actionTag <= scripts.length) {
        scripts[actionTag];
        time += 1;
    }
}

function gotoFirstFrame() {
    videoPlayer.time(0);
}

scripts[0] = function () {

}
scripts[1] = function () {
    if (time == 0 * 60) {
        RO_actions[1]();
    } else if (time == 2 * 60) {
        RO_actions[3]();
    } else if (time == 3 * 60) {
        RO_actions[2]();
    } else if (time == 4 * 60) {
        RO_actions[4]();
    } else if (time == 5 * 60) {
        RO_actions[5]();
    }
}

scripts[2] = function () {
    if (time == 0 * 60) {
        RO_actions[6]();
    } else if (time == 1 * 60) {
        RO_actions[5]();
        TV_actions[1]();
    }
}
scripts[3] = function () {
    if (time == 0 * 60) {
        RO_actions[8]();
        TV_actions[6]();
    } else if (time == 3 * 60) {
        TV_actions[7]();
    } else if (time == 5 * 60) {
        TV_actions[13]();
    } else if (time == 7 * 60) {
        RO_actions[5]();
    }
}
scripts[4] = function () {
    if (time == 0 * 60) {
        RO_actions[4]();
    } else if (time == 1 * 60) {
        RO_actions[11]();
        TV_actions[1]();
    } else if (time == 3 * 60) {
        RO_actions[12]();
    } else if (time == 5 * 60) {
        RO_actions[11]();
        TV_actions[8]();
    } else if (time == 5 * 60) {
        RO_actions[3]();
    } else if (time == 7 * 60) {
        RO_actions[5]();
    }
}
scripts[5] = function () {
    if (time == 0 * 60) {
        RO_actions[4]();
        TV_actions[3]();
    } else if (time == 1 * 60) {
        RO_actions[13]();
        TV_actions[11]();
    } else if (time == 3 * 60) {
        RO_actions[3]();
    } else if (time == 4 * 60) {
        RO_actions[14]();
        TV_actions[9]();
    } else if (time == 6 * 60) {
        RO_actions[5]();
        TV_actions[13]();
    }
}
scripts[6] = function () {
    if (time == 0 * 60) {
        RO_actions[4]();
        TV_actions[3]();
    } else if (time == 1 * 60) {
        RO_actions[12]();
    } else if (time == 3 * 60) {
        TV_actions[12]();
    } else if (time == 5 * 60) {
        TV_actions[10]();
    } else if (time == 7 * 60) {
        RO_actions[5]();
        TV_actions[13]();
    }
}
scripts[7] = function () {
    if (time == 0 * 60) {
        RO_actions[7]();
    }
}

actions[0] = function () {
    actionTag = 0;
    time = 0;
}
actions[1] = function () {
    actionTag = 1;
    time = 0;
}
actions[2] = function () {
    actionTag = 2;
    time = 0;
}
actions[3] = function () {
    actionTag = 3;
    time = 0;
}
actions[4] = function () {
    actionTag = 4;
    time = 0;
}
actions[5] = function () {
    actionTag = 5;
    time = 0;
}
actions[6] = function () {
    actionTag = 6;
    time = 0;
}
actions[7] = function () {
    actionTag = 7;
    time = 0;
}

RO_actions[0] = function () {
    socket.emit("RO_action", "RO_reset");
    console.log("RO_action: " + "RO_reset");
    videoPlayer.attribute("src", "data/RO_reset.mp4");
    videoPlayer.play();
}
RO_actions[1] = function () {
    socket.emit("RO_action", "RO_wake up");
    console.log("RO_action: " + "RO_wake up");
    videoPlayer.attribute("src", "data/RO_wake up.mp4");
    videoPlayer.play();
}
RO_actions[2] = function () {
    socket.emit("RO_action", "RO_here");
    console.log("RO_action: " + "RO_here");
    videoPlayer.attribute("src", "data/RO_here.mp4");
    videoPlayer.play();
}
RO_actions[3] = function () {
    socket.emit("RO_action", "RO_turn to User");
    console.log("RO_action: " + "RO_turn to User");
    videoPlayer.attribute("src", "data/RO_turn_left.mp4");
    videoPlayer.play();
}
RO_actions[4] = function () {
    socket.emit("RO_action", "RO_turn to TV");
    console.log("RO_action: " + "RO_turn to TV");
    videoPlayer.attribute("src", "data/RO_turn_right.mp4");
    videoPlayer.play();
}
RO_actions[5] = function () {
    socket.emit("RO_action", "RO_wait");
    console.log("RO_action: " + "RO_wait");
    videoPlayer.attribute("src", "data/RO_wait.mp4");
    videoPlayer.play();
}
RO_actions[6] = function () {
    socket.emit("RO_action", "RO_OK");
    console.log("RO_action: " + "RO_OK");
    videoPlayer.attribute("src", "data/RO_OK.mp4");
    videoPlayer.play();
}
RO_actions[7] = function () {
    socket.emit("RO_action", "RO_sleep");
    console.log("RO_action: " + "RO_sleep");
    videoPlayer.attribute("src", "data/RO_sleep.mp4");
    videoPlayer.play();
}
RO_actions[8] = function () {
    socket.emit("RO_action", "RO_move_out");
    console.log("RO_action: " + "RO_move_out");
    videoPlayer.attribute("src", "data/RO_move_out.mp4");
    videoPlayer.play();
}
RO_actions[9] = function () {
    socket.emit("RO_action", "RO_move_in");
    console.log("RO_action: " + "RO_move_in");
    videoPlayer.attribute("src", "data/RO_move_in.mp4");
    videoPlayer.play();
}
RO_actions[10] = function () {
    socket.emit("RO_action", "RO_play(RE)");
    console.log("RO_action: " + "RO_play(RE)");
    videoPlayer.attribute("src", "data/RO_play(RE).mp4");
    videoPlayer.play();
}
RO_actions[11] = function () {
    socket.emit("RO_action", "RO_superpower");
    console.log("RO_action: " + "RO_superpower");
    videoPlayer.attribute("src", "data/RO_superpower.mp4");
    videoPlayer.play();
}

RO_actions[12] = function () {
    socket.emit("RO_action", "RO_play(CT)");
    console.log("RO_action: " + "RO_play(CT)");
    videoPlayer.attribute("src", "data/RO_play(CT).mp4");
    videoPlayer.play();
}

RO_actions[13] = function () {
    socket.emit("RO_action", "TV_communicate");
    console.log("RO_action: " + "TV_communicate");
    videoPlayer.attribute("src", "data/TV_communicate.mp4");
    videoPlayer.play();
}
RO_actions[14] = function () {
    socket.emit("RO_action", "RO_play(R)");
    console.log("RO_action: " + "RO_play(R)");
    videoPlayer.attribute("src", "data/RO_play(R).mp4");
    videoPlayer.play();
}
RO_actions[15] = function () {
    socket.emit("RO_action", "RO_play(CVST)");
    console.log("RO_action: " + "RO_play(CVST)");
    videoPlayer.attribute("src", "data/RO_play(CVST).mp4");
    videoPlayer.play();
}

// function TV_actions(_actionID) {
//     socket.emit("TV_action", TV_actionName[_actionID]);
//     console.log("TV_action: " + TV_actionName[_actionID]);
//     videoPlayer.attribute("src", "../data/" + TV_actionName[_actionID] + ".mp4");
//     videoPlayer.play();
// }

TV_actions[0] = function () {
    socket.emit("TV_action", "TV_reset");
    console.log("TV_action: " + "TV_reset");
    videoPlayer.attribute("src", "data/TV_reset.mp4");
    videoPlayer.play();
}
TV_actions[1] = function () {
    socket.emit("TV_action", "TV_open");
    console.log("TV_action: " + "TV_open");
    videoPlayer.attribute("src", "data/TV_open.mp4");
    videoPlayer.play();
}
TV_actions[2] = function () {
    socket.emit("TV_action", "TV_close");
    console.log("TV_action: " + "TV_close");
    videoPlayer.attribute("src", "data/TV_close.mp4");
    videoPlayer.play();
}
TV_actions[3] = function () {
    socket.emit("TV_action", "TV_wake");
    console.log("TV_action: " + "TV_wake");
    videoPlayer.attribute("src", "data/TV_wake.mp4");
    videoPlayer.play();
}
TV_actions[4] = function () {
    socket.emit("TV_action", "TV_sleep");
    console.log("TV_action: " + "TV_sleep");
    videoPlayer.attribute("src", "data/TV_sleep.mp4");
    videoPlayer.play();
}
TV_actions[5] = function () {
    socket.emit("TV_action", "TV_move_out");
    console.log("TV_action: " + "TV_move_out");
    videoPlayer.attribute("src", "data/TV_move_out.mp4");
    videoPlayer.play();
}
TV_actions[6] = function () {
    socket.emit("TV_action", "TV_move_in");
    console.log("TV_action: " + "TV_move_in");
    videoPlayer.attribute("src", "data/TV_move_in.mp4");
    videoPlayer.play();
}
TV_actions[7] = function () {
    socket.emit("TV_action", "TV_play(RE)");
    console.log("TV_action: " + "TV_play(RE)");
    videoPlayer.attribute("src", "data/TV_play(RE).mp4");
    videoPlayer.play();
}
TV_actions[8] = function () {
    socket.emit("TV_action", "TV_play(CT)");
    console.log("TV_action: " + "TV_play(CT)");
    videoPlayer.attribute("src", "data/TV_play(CT).mp4");
    videoPlayer.play();
}
TV_actions[9] = function () {
    socket.emit("TV_action", "TV_play(R)");
    console.log("TV_action: " + "TV_play(R)");
    videoPlayer.attribute("src", "data/TV_play(R).mp4");
    videoPlayer.play();
}
TV_actions[10] = function () {
    socket.emit("TV_action", "TV_play(CVST)");
    console.log("TV_action: " + "TV_play(CVST)");
    videoPlayer.attribute("src", "data/TV_play(CVST).mp4");
    videoPlayer.play();
}
TV_actions[11] = function () {
    socket.emit("TV_action", "TV_communicate");
    console.log("TV_action: " + "TV_communicate");
    videoPlayer.attribute("src", "data/TV_communicate.mp4");
    videoPlayer.play();
}
TV_actions[12] = function () {
    socket.emit("TV_action", "TV_talk");
    console.log("TV_action: " + "TV_talk");
    videoPlayer.attribute("src", "data/TV_talk.mp4");
    videoPlayer.play();
}
TV_actions[13] = function () {
    socket.emit("TV_action", "TV_News_1");
    console.log("TV_action: " + "TV_News_1");
    videoPlayer.attribute("src", "data/TV_News_1.mp4");
    videoPlayer.play();
}