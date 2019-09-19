let videoPlayer;
let cvs;
let actions = new Array;
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
    videoPlayer = createVideo("data/TV_reset.mp4");
    videoPlayer.position(displayWidth, 0);
    videoPlayer.hide();
    videoPlayer.onended(reset_TV);
}

function setup() {
    cvs = createCanvas(windowWidth, windowHeight);
    window.addEventListener("storage", function (event) {
        let actionID = localStorage.getItem("TV_actionID")
        if (actionID) {
            action(actionID);
            localStorage.removeItem("TV_actionID");
        }
    }, false);
}

function draw() {
    image(videoPlayer, 0, 0, width, height);
}

function reset_TV() {
    videoPlayer.time(0);
}

function keyPressed() {
    if (keyCode === 13) {
        let fs = fullscreen();
        fullscreen(!fs);
    }
}

function action(_actionID) {
    videoPlayer.attribute("src", "data/" + TV_actionName[_actionID] + ".mp4");
    videoPlayer.play();
}