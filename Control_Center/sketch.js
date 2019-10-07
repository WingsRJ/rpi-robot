let videoPlayer;
let cvs;
let buttons = new Array;
let title = "Robot";

let socket;

class Controllers {
    constructor() {
        this.actionName = [
            "Reset",
            "Wake_up",
            "Answer",
            "Re_embodiement",
            "Control",
            "Representative",
            "Conversation",
            "Sleep"
        ];
        this.RO_actionName = [
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
        ]
        this.TV_actionName = [
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
        ]
    }

    action(_tpye, _x) {
        if (_tpye.match("RO") == "RO") {
            for (let n = 0; n < this.RO_actionName.length; n++) {
                if (_x == n || _tpye == this.RO_actionName[n]) {
                    socket.emit("RO_action", this.RO_actionName[n]);
                    console.log("RO_action: " + this.RO_actionName[n]);
                    if (n != 3 && n != 4) {
                        videoPlayer.attribute("src", "../data/" + this.RO_actionName[n] + ".mp4");
                        videoPlayer.play();
                    }
                }
            }
        } else if (_tpye.match("TV") == "TV") {
            for (let n = 0; n < this.TV_actionName.length; n++) {
                if (_x == n || _tpye == this.TV_actionName[n]) {
                    socket.emit("TV_action", this.TV_actionName[n]);
                    console.log("TV_action: " + this.TV_actionName[n]);
                    videoPlayer.attribute("src", "../data/" + this.TV_actionName[n] + ".mp4");
                    videoPlayer.play();
                }
            }
        }
    }

    groupAction(_x) {
        if (_x == 0 || _x == this.actionName[0]) {
            console.log("Script: " + this.actionName[0]);
            this.Reset();
        } else if (_x == 1 || _x == this.actionName[1]) {
            console.log("Script: " + this.actionName[1]);
            this.Wake_up();
        } else if (_x == 2 || _x == this.actionName[2]) {
            console.log("Script: " + this.actionName[2]);
            this.Answer();
        } else if (_x == 3 || _x == this.actionName[3]) {
            console.log("Script: " + this.actionName[3]);
            this.Re_embodiement();
        } else if (_x == 4 || _x == this.actionName[4]) {
            console.log("Script: " + this.actionName[4]);
            this.Control()
        } else if (_x == 5 || _x == this.actionName[5]) {
            console.log("Script: " + this.actionName[5]);
            this.Representative();
        } else if (_x == 6 || _x == this.actionName[6]) {
            console.log("Script: " + this.actionName[6]);
            this.Conversation();
        } else if (_x == 7 || _x == this.actionName[7]) {
            console.log("Script: " + this.actionName[7]);
            this.Sleep();
        }
    }
    Reset() {
        this.action("RO_sleep");
        this.action("TV_close");
        setTimeout(() => {
            console.log("Script END!");
        }, 3000);
    }
    Wake_up() {
        this.action("RO_wake_up");
        setTimeout(() => {
            this.action("RO_turn_to_User");
        }, 2000);
        setTimeout(() => {
            this.action("RO_here");
        }, 3000);
        setTimeout(() => {
            this.action("RO_wait");
            setTimeout(() => {
                console.log("Script END!");
            }, 3000);
        }, 6000);
    }
    Answer() {
        this.action("RO_OK", 6);
        setTimeout(() => {
            this.action("RO_wait");
            this.action("TV_open");
            setTimeout(() => {
                console.log("Script END!");
            }, 3000);
        }, 1000);
    }
    Re_embodiement() {
        this.action("RO_move_out");
        this.action("TV_move_in");
        setTimeout(() => {
            this.action("TV_play(RE)");
        }, 3000);
        setTimeout(() => {
            this.action("TV_News_1");
        }, 5000);
        setTimeout(() => {
            this.action("RO_move_in");
        }, 7000);
        setTimeout(() => {
            this.action("RO_wait");
            setTimeout(() => {
                console.log("Script END!");
            }, 3000);
        }, 9000);
    }
    Control() {
        this.action("RO_turn_to_TV");
        setTimeout(() => {
            this.action("RO_superpower");
            this.action("TV_open");
        }, 1000);
        setTimeout(() => {
            this.action("RO_play(CT)");
        }, 3000);
        setTimeout(() => {
            this.action("RO_superpower");
            this.action("TV_play(CT)");
        }, 5000);
        setTimeout(() => {
            this.action("RO_turn_to_User");
        }, 5000);
        setTimeout(() => {
            this.action("RO_wait");
            setTimeout(() => {
                console.log("Script END!");
            }, 3000);
        }, 7000);
    }
    Representative() {
        this.action("RO_turn_to_User");
        this.action("TV_wake");
        setTimeout(() => {
            this.action("RO_communicate");
            this.action("TV_communicate");
        }, 1000);
        setTimeout(() => {
            this.action("RO_turn_to_User");
        }, 3000);
        setTimeout(() => {
            this.action("RO_play(R)");
            this.action("TV_play(R)");
        }, 4000);
        setTimeout(() => {
            this.action("RO_wait");
            this.action("TV_News_1");
            setTimeout(() => {
                console.log("Script END!");
            }, 3000);
        }, 6000);
    }
    Conversation() {
        this.action("RO_turn_to_User");
        this.action("TV_wake");
        setTimeout(() => {
            this.action("RO_play(CT)");
        }, 1000);
        setTimeout(() => {
            this.action("TV_talk");
        }, 3000);
        setTimeout(() => {
            this.action("TV_play(CVST)");
        }, 5000);
        setTimeout(() => {
            this.action("RO_wait");
            this.action("TV_News_1");
            setTimeout(() => {
                console.log("Script END!");
            }, 3000);
        }, 7000);
    }
    Sleep() {
        this.action("RO_sleep");
        setTimeout(() => {
            console.log("Script END!");
        }, 3000);
    }
}

function preload() {
    videoPlayer = createVideo("../data/black.mp4");
    videoPlayer.position(0, 0);
    videoPlayer.hide();
    //videoPlayer.onended(gotoFirstFrame);
}

function setup() {
    cvs = createCanvas(480, 270);
    socket = io.connect("http://192.168.2.7:3000");
    background(0);
    noStroke();
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    var controller = new Controllers;
    for (let i = 0; i < controller.RO_actionName.length; i++) {
        let nb = createButton(controller.RO_actionName[i]);
        nb.position(width + 160, 12 + 24 * i);
        nb.mousePressed(function () {
            controller.action("RO", i);
        });
        buttons.push(nb);
    }
    for (let i = 0; i < controller.TV_actionName.length; i++) {
        let nb = createButton(controller.TV_actionName[i]);
        nb.position(width + 300, 12 + 24 * i);
        nb.mousePressed(function () {
            controller.action("TV", i);
        });
        buttons.push(nb);
    }
    for (let i = 0; i < controller.actionName.length; i++) {
        let nb = createButton(controller.actionName[i]);
        nb.position(width + 20, 12 + 24 * i);
        nb.mousePressed(function () {
            controller.groupAction(i);
        });
        buttons.push(nb);
    }
}

function draw() {
    image(videoPlayer, 0, 0, width, height);
    fill(255);
    text(title, width / 2, height / 2);
}