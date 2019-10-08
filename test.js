const omx = require('@augmentality/node-omx');
const n = new omx.Player();

n.open('data/black.mp4');
n.play();
setTimeout(() => {
    n.stop();
}, 5000);
setTimeout(() => {
    n.open('data/black.mp4');
    n.play();
}, 6000);