const omx = require('@augmentality/node-omx');
const n = new omx.Player();

n.open('data/black.mp4');
n.play();
n.setLoop(true); // Enable seamless looping

setInterval(() => {
    if (state > 0) {
        console.log('Playback position: ' + n.getTime());
    }
}, 1000);

setTimeout(() => {
    n.stop();
}, 5000);
setTimeout(() => {
    n.open('data/black.mp4');
    n.play();
}, 6000);