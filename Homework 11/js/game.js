new p5();
var canvasHeight = (windowHeight - 20);
var canvasWidth = (windowWidth - 20);
var horzCenter = (canvasWidth / 2);
var vertCenter = (canvasHeight / 2);
var backgroundColor = [0, 150, 0];
var wallWidth = 7;
var snap = '';
var exitPlaced = false;
var exitTextPos = [];

var exitPos = [floor(random() * canvasWidth), floor(random() * canvasHeight)];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function windowResized() {
    canvasHeight = (windowHeight - 20);
    canvasWidth = (windowWidth - 20);
    resizeCanvas(canvasWidth,canvasHeight);
    exitPlaced = false;
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
    rect(wallWidth / 2, wallWidth / 2, (canvasWidth - wallWidth), (canvasHeight - wallWidth));
}

function createExit() {
    if (exitPlaced == false) {
        snapExit();
    }

    strokeWeight(0);
    fill(backgroundColor);
    square(exitPos[0] - (2 * wallWidth), exitPos[1] - (2 * wallWidth), wallWidth * 4)
    
    if (exitPlaced == false) {
        signExit();
    }
    
    strokeWeight(0);
    fill(0)
    text('Exit',exitTextPos[0],exitTextPos[1]);
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
            exitPos[1] = (canvasHeight - (wallWidth / 2))
            snap = 'b';
        }
        //clear corner horizontal
        if (exitPos[0] > (canvasWidth - (4 * wallWidth))) {
            exitPos[0] = (canvasWidth - (4 * wallWidth));
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
            exitPos[0] = (canvasWidth - (wallWidth / 2))
            snap = 'r';
        }
        //clear corner vertical
        if (exitPos[1] > (canvasHeight - (4 * wallWidth))) {
            exitPos[1] = (canvasHeight - (4 * wallWidth));
        } else if (exitPos[1] < (4 * wallWidth)) {
            exitPos[1] = (4 * wallWidth);
        }
    }
    //console.log(snap);
}

function signExit() {
    //label exit according to snap direction
    switch (snap) {
        case 't':
            exitTextPos[0] = (exitPos[0] - (wallWidth * 1.5));
            exitTextPos[1] = (exitPos[1] + (wallWidth * 4));
            break;
        case 'b':
            exitTextPos[0] = (exitPos[0] - (wallWidth * 1.5));
            exitTextPos[1] = (exitPos[1] - (wallWidth * 2));
            break;
        case 'l':
            exitTextPos[0] = (exitPos[0] + (wallWidth * 2));
            exitTextPos[1] = (exitPos[1] + wallWidth);
            break;
        case 'r':
            exitTextPos[0] = (exitPos[0] - (wallWidth * 6));
            exitTextPos[1] = (exitPos[1] + wallWidth);
            break;
        }
    console.log("exitPos: " + exitPos)
    console.log("exitTextPos: " + exitTextPos)
    exitPlaced = true;
}