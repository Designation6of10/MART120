new p5();
var canvasHeight = (windowHeight - 20);
var canvasWidth = (windowWidth - 20);
var horzCenter = (canvasWidth / 2);
var vertCenter = (canvasHeight / 2);
var backgroundColor = [0, 150, 0];
var wallWidth = 7;
var snap = '';
var exitPlaced = false;
var exitTextPos = [0,0];
var playerPos = [horzCenter, vertCenter];
var playerSpeed = 3;
var w = 87;
var s = 83;
var a = 65;
var d = 68;
var playerVisible = true;
var enemyCount = 5;
var enemies = [];
var obstaclePos = [-100, -100];
var exitPos = [floor(random() * canvasWidth), floor(random() * canvasHeight)];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    setEnemyValues();
}

function windowResized() {
    canvasHeight = (windowHeight - 20);
    canvasWidth = (windowWidth - 20);
    resizeCanvas(canvasWidth,canvasHeight);
    exitPlaced = false;
    horzCenter = (canvasWidth / 2);
    vertCenter = (canvasHeight / 2);
    playerWin();
  }

function draw() {
    background(backgroundColor);
    createWalls();
    createExit();
    drawEnemies();
    drawObstacle();

    drawPlayer();
    playerWin();

    //debugText();
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
    textSize((wallWidth * 2));
    textAlign(CENTER);
    text('EXIT',exitTextPos[0],exitTextPos[1]);
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
            exitTextPos[0] = exitPos[0];
            exitTextPos[1] = (exitPos[1] + (wallWidth * 2.5));
            break;
        case 'b':
            exitTextPos[0] = exitPos[0];
            exitTextPos[1] = (exitPos[1] - (wallWidth * 1.5));
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

function drawPlayer() {
    if (playerVisible == true) {
        getPlayerInput();

        strokeWeight(wallWidth / 2);
        fill(abs(backgroundColor[0] - 255), abs(backgroundColor[1] - 255), abs(backgroundColor[2] - 255));
        circle(playerPos[0], playerPos[1], (wallWidth * 3));
    } else {
        return null;
    }
}

function getPlayerInput() {
    if (keyIsDown(w) && (playerPos[1] > (wallWidth * 2.5) || inExit())) {
        playerPos[1] -= playerSpeed;
    }
    if (keyIsDown(s) && (playerPos[1] < (canvasHeight - (wallWidth * 2.5)) || inExit())) {
        playerPos[1] += playerSpeed;
    }
    if (keyIsDown(a) && (playerPos[0] > (wallWidth * 2.5) || inExit())) {
        playerPos[0] -= playerSpeed;
    }
    if (keyIsDown(d) && (playerPos[0] < (canvasWidth - (wallWidth * 2.5)) || inExit())) {
        playerPos[0] += playerSpeed;
    }
    //console.log(inExit());
}

function inExit() {
    if((playerPos[0] >= (exitPos[0] - (wallWidth * 2))) && (playerPos[0] <= (exitPos[0] + (wallWidth * 2))) && (playerPos[1] >= (exitPos[1] - (wallWidth * 2))) && (playerPos[1] <= (exitPos[1] + (wallWidth * 2)))) {
        return true;
    } else {
        return false;
    }
}

function playerWin() {
    if (inExit() && ((playerPos[0] <= 0) || (playerPos[0] >= canvasWidth) || (playerPos[1] <= 0) || (playerPos[1] >= canvasHeight))) {
        playerVisible = false;
        fill(0);
        textSize((canvasHeight - wallWidth) / 6);
        textAlign(CENTER);
        text('You Win', horzCenter, vertCenter + ((canvasHeight - wallWidth) / 20));
    }
}

////Dev Comment (non-essential)
{
/*  Hey, look at that, turns out I had to redo it for HW14 anyway. Each 'enemy' is saved as an array, within a larger
*   array of 'enemies'. Each one has 6 indices, with the final one itself being an array (containing RGB values).
*   It took me a hot minute to figure out how to get it all working, and I learned a thing or two about javascript
*   array nesting in the process. Thank goodness I had to foresight to put an index key in the comments before I wrote
*   all that code, because writing all those numbers would have been a total nightmare without it. As it was, I had
*   to add on the numbers next to each entry, since counting from 0 was getting tiresome.
*/}
function drawEnemies() {
    for (i = 0; i < enemyCount; i++) {
    //array: 'enemies[enemyNumber(i)[speedX(0), speedY(1), posX(2), posY(3), size(4), color(5)[r, g, b]]]'
        enemies[i][2] += enemies[i][0];
        enemies[i][3] += enemies[i][1];

        stroke(0);
        strokeWeight(wallWidth / 2);
        fill(enemies[i][5][0], enemies[i][5][1], enemies[i][5][2]);
        quad(enemies[i][2], (enemies[i][3] - enemies[i][4]), (enemies[i][2] + enemies[i][4]), enemies[i][3], enemies[i][2], (enemies[i][3] + enemies[i][4]), (enemies[i][2] - enemies[i][4]), enemies[i][3]);

        //loop on screen
        if (enemies[i][2] > (canvasWidth + enemies[i][4])) {
            enemies[i][2] = 0 - enemies[i][4];
        }
        if (enemies[i][2] < (0 - enemies[i][4])) {
            enemies[i][2] = canvasWidth + enemies[i][4];
        }
        if (enemies[i][3] > (canvasHeight + enemies[i][4])) {
            enemies[i][3] = 0 - enemies[i][4];
        }
        if (enemies[i][3] < (0 - enemies[i][4])) {
            enemies[i][3] = (canvasHeight + enemies[i][4]);
        }
    }
}

function setEnemyValues() {
    for (i = 0; i < enemyCount; i++) {
    //array: 'enemies[enemyNumber(i)[speedX(0), speedY(1), posX(2), posY(3), size(4), color(5)[r, g, b]]]'
        //define array indices (necessary for nested arrays)
        enemies[i] = Array(0,0,0,0,0,Array(0,0,0));
        //set random speed
        enemies[i][0] = random(2, 6);
        enemies[i][1] = random(2, 6);
        //set random start point
        enemies[i][2] = floor(random() * canvasWidth);
        enemies[i][3] = floor(random() * canvasHeight);
        //set random size
        enemies[i][4] = (wallWidth * random(1, 4));
        //set random color
        for (p = 0; p < 3; p++) {
            enemies[i][5][p] = random(255);
        }

        //randomly reverse direction(s)
        if (floor(random() * 10) >= 5) {
            enemies[i][0] *= -1;
        }
        if (floor(random() * 10) >= 5) {
            enemies[i][1] *= -1;
        }
    }
}

function drawObstacle() {
    fill(0, 100, 150);
    strokeWeight(wallWidth / 2);
    circle(obstaclePos[0], obstaclePos[1], wallWidth * 6.25);
}


function mouseClicked() {
    obstaclePos[0] = mouseX;
    obstaclePos[1] = mouseY;
}



function debugText() {
    textSize(10);
    fill(0);
    strokeWeight(0);
    text('playerPos: ' + playerPos + ' | exitPos: ' + exitPos, 100, 100);
    text('inExit: ' + inExit(), 100, 110);

    strokeWeight(3);
    stroke(255);
    point(playerPos[0], playerPos[1]);
    point(exitPos[0], exitPos[1]);
    point(exitTextPos[0], exitTextPos[1]);
}