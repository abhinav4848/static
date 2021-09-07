function displayData(randTime, arrow, direction) {
    console.log('Wait: ' + randTime + ', Arrow: ' + arrow + ', Direction: ' + direction);

    document.getElementById("randomArrow").innerHTML = `${arrow}`;
    document.getElementById("timeToChange").innerHTML = `${randTime}`;
}

function audioGuide(direction) {
    var audioGuide = document.getElementById("audioGuide");

    if (audioGuide.checked) {
        var audioElement = new Audio('audio/' + direction + '.mp3');
        audioElement.play();
    }
}

function setNewArrow() {
    var rand = Math.floor((Math.random() * 4 + 1));
    var arrow, direction;

    if (rand == 1) {
        // left
        arrow = '\u2190';
        direction = 'left';
    }
    if (rand == 2) {
        // right
        arrow = '\u2192';
        direction = 'right';
    }
    if (rand == 3) {
        // up
        arrow = '\u2191';
        direction = 'up';
    }
    if (rand == 4) {
        // down
        arrow = '\u2193';
        direction = 'down';
    }

    return [arrow, direction];
}

function timing() {
    var maxtime = document.getElementById("speed").value;
    var mintime = 1;

    var countdownMethod = document.getElementById("countdownMethod");
    if (!countdownMethod.checked) {
        // if static time is off
        if (maxtime > 1) {
            // if maxtime chosen is not 1 second,
            // don't generate random time <2 secs.
            // this is done so that random time of 1 sec is not shown unless explicitly chosen by user.
            mintime = 2;
        }
        var randTime = Math.floor((Math.random() * (maxtime - mintime + 1) + mintime));
    } else {
        var randTime = maxtime;
    }

    return randTime;
}

function main() {
    var randTime = timing();
    var [arrow, direction] = setNewArrow();
    audioGuide(direction);
    displayData(randTime, arrow, direction);

    setTimeout(main, randTime * 1000);
}

main();