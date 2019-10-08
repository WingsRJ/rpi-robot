var omx = require('omxdirector').enableNativeLoop();;
playVideo("black", "w", 3);

function playVideo(_name, wait, delay) {
    omx.play("data/" + _name + ".mp4");
    if (wait == "p") {
        setTimeout(() => {
            if (player.getStatus() == "inProgress") {
                player.pause();
            }
        }, delay * 1000);
    } else if (wait == "w") {
        setTimeout(() => {
            omx.play("data/RO_wait.mp4", {
                loop: true
            });
        }, delay * 1000);
    }
}