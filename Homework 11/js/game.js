new p5();
var horzCenter = (windowWidth / 2);
var vertCenter = (windowHeight / 2);
var backgroundColor = [0, 150, 0];
var wallWidth = 7;
var snap = '';
var exitPlaced = false;
var exitTextPos = [];

var exitPos = [floor(random() * windowWidth), floor(random() * windowHeight)];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(backgroundColor);
    createWalls();
    createExit();
}

function createWalls() {
    stroke(0);
    strokeWeight(wallWidth);
    fill(backgroundColor);
    rect(wallWidth / 2, wallWidth / 2, (windowWidth - wallWidth), (windowHeight - wallWidth));
}

function createExit() {
    if (exitPlaced == false) {
        snapExit();
    }

    strokeWeight(0);
    fill(backgroundColor);
    square(exitPos[0] - (2 * wallWidth), exitPos[1] - (2 * wallWidth), wallWidth * 4)
    signExit();
}

function snapExit() {
    //snap to closest edge
    if ((vertCenter - exitPos[1]) >= (horzCenter - exitPos[0])) {
        //if closer to top, snap to top
        if (exitPos[1] < vertCenter) {
            exitPos[1] = (wallWidth / 2);
            snap = 't';
        //otherwise, snap to bottom
        } else {
            exitPos[1] = (windowHeight + (wallWidth / 2))
            snap = 'b';
        }
        //clear corner horizontal
        if (exitPos[0] > (windowWidth - (4 * wallWidth))) {
            exitPos[0] = (windowWidth - (4 * wallWidth));
        } else if (exitPos[0] < (4 * wallWidth)) {
            exitPos[0] = (4 * wallWidth);
        }
    } else {
        //if closer to left, snap left
        if (exitPos[0] < horzCenter) {
            exitPos[0] = (wallWidth / 2);
            snap = 'l';
        //otherwise, snap right
        } else {
            exitPos[0] = (windowWidth + (wallWidth / 2))
            snap = 'r';
        }
        //clear corner vertical
        if (exitPos[1] > (windowHeight - (4 * wallWidth))) {
            exitPos[1] = (windowHeight - (4 * wallWidth));
        } else if (exitPos[1] < (4 * wallWidth)) {
            exitPos[1] = (4 * wallWidth);
        }
    }
    //console.log(snap);
    exitPlaced = true;
}

function signExit() {
    //label exit according to snap direction
    switch (snap) {
        case 't':
            exitTextPos = exitPos;
            //exitTextPos[1] = (exitPos[1] + (wallWidth * 4));
            break;
        case 'b':
            exitTextPos = exitPos;
            //exitTextPos[1] = (exitPos[1] - wallWidth);
            break;
        case 'l':
            exitTextPos = exitPos;
            //exitTextPos[0] = (exitPos[0] + (wallWidth * 4));
            //exitTextPos[1] = (exitPos[1] + wallWidth);
            break;
        case 'r':
            exitTextPos = exitPos;
            //exitTextPos[0] = (exitPos[0] - (wallWidth * 8));
            //exitTextPos[1] = (exitPos[1] - wallWidth);
            break;
    }
    strokeWeight(0);
    fill(0)
    text('Exit',exitTextPos[0],exitTextPos[1]);
    console.log("exitPos: " + exitPos)
    console.log("exitTextPos: " + exitTextPos)
}