const omx = require('omx-player-wrapper');
var player = new omx("data/RO_wake_up.mp4");
player.start();
setTimeout(() => {
    var player = new omx("data/RO_wake_up.mp4");
    player.start();
},3000);