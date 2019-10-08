const OMX = require('omx-player-wrapper');

var omxPlayer = new OMX('data/black.mp4');

omxPlayer.start();
setTimeout(() => {
    omxPlayer.pause();
}, 3000);
setTimeout(() => {
    var omxPlayer1 = new OMX('data/RO_wait.mp4');
    omxPlayer1.start();
}, 6000);