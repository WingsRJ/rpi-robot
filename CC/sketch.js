let RVP;
let TVVP;
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
            "RO_play_re_embodiment",
            "RO_superpower",
            "RO_play_control",
            "RO_communicate",
            "RO_play_representation",
            "RO_play_conversation"
        ]
        this.TV_actionName = [
            "TV_reset",
            "TV_open",
            "TV_close",
            "TV_wake",
            "TV_sleep",
            "TV_move_out",
            "TV_move_in",
            "TV_play_re_embodiment",
            "TV_play_control",
            "TV_play_representation",
            "TV_play_conversation",
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
                        RVP.attribute("src", "../data/" + this.RO_actionName[n] + ".mp4");
                        RVP.play();
                    }
                }
            }
        } else if (_tpye.match("TV") == "TV") {
            for (let n = 0; n < this.TV_actionName.length; n++) {
                if (_x == n || _tpye == this.TV_actionName[n]) {
                    socket.emit("TV_action", this.TV_actionName[n]);
                    console.log("TV_action: " + this.TV_actionName[n]);
                    TVVP.attribute("src", "../data/" + this.TV_actionName[n] + ".mp4");
                    TVVP.play();
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
            this.action("TV_play_re_embodiment");
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
            this.action("RO_play_control");
        }, 3000);
        setTimeout(() => {
            this.action("RO_superpower");
            this.action("TV_play_control");
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
            this.action("RO_play_representation");
            this.action("TV_play_representation");
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
            this.action("RO_play_conversation");
        }, 1000);
        setTimeout(() => {
            this.action("TV_talk");
        }, 3000);
        setTimeout(() => {
            this.action("TV_play_conversation");
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
    RVP = createVideo("../data/black.mp4");
    RVP.position(0, 0);
    RVP.hide();
    RVP.volume(0);
    TVVP = createVideo("../data/black.mp4");
    TVVP.position(0, 270);
    TVVP.hide();
    TVVP.volume(0);
}

function setup() {
    cvs = createCanvas(480, 540);
    socket = io.connect("http://localhost:3000");
    background(0);
    noStroke();
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    var controller = new Controllers;
    var nb = createButton("All reset");
    nb.position(width + 20, 12);
    nb.mousePressed(function () {
        socket.emit("TV_action", "All reset");
        window.location.reload();
    });
    buttons.push(nb);
    var nb = createButton("New TV");
    nb.position(width + 20, 36);
    nb.mousePressed(function () {
        window.open("http://" + adress + ":3000/TV");
    });
    buttons.push(nb);
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
        nb.position(width + 20, 60 + 24 * i);
        nb.mousePressed(function () {
            controller.groupAction(i);
        });
        buttons.push(nb);
    }
}

function draw() {
    image(RVP, 0, 0, width, height / 2);
    image(TVVP, 0, 270, width, height / 2);
    fill(255);
    text("ROBOT", width / 2, height / 4);
    text("TV", width / 2, height / 4 * 3);
}