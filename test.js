const OMX = require('omx-player-wrapper');

var omxPlayer = new OMX('data/black.mp4');

omxPlayer.start();

setTimeout(() => {
    omxPlayer.pause();
}, 3000);

setTimeout(() => {
    var omxPlayer = new OMX('data/RO_wait.mp4');
    omxPlayer.start();
}, 6000);