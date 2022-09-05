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
var enemy1Pos = [floor(random() * canvasWidth), floor(random() * canvasHeight)];
var enemy2Pos = [floor(random() * canvasWidth), floor(random() * canvasHeight)];
var enemy1Speed = [constrain(floor(random() * 10), 2, 6),constrain(floor(random() * 10), 2, 6)];
var enemy2Speed = [constrain(floor(random() * 10), 2, 6),constrain(floor(random() * 10), 2, 6)];
var obstaclePos = [-100, -100];

var exitPos = [floor(random() * canvasWidth), floor(random() * canvasHeight)];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    if (floor(random() * 10) >= 5) {
        enemy1Speed[0] *= -1;
    }
    if (floor(random() * 10) >= 5) {
        enemy1Speed[1] *= -1;
    }
    if (floor(random() * 10) <= 5) {
        enemy2Speed[0] *= -1;
    }
    if (floor(random() * 10) <= 5) {
        enemy2Speed[1] *= -1;
    }
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

function drawEnemies() {
    /*  
    *   For the sake of this project, the number of "enemies" is hard-coded. If I wanted more or less enemies, I'd have to rewrite
    *   the entire system to allow each enemy their own variables. Since I only noticed I needed two or more enemies AFTER I had 
    *   written the code for one, I decided instead to simply duplicate the code and number each variable as 1 and 2. Inefficient,
    *   I know, but I've already spent way too much time adding fancy, uneeded mechanics to the project for my own entertainment.
    */
    if (enemy1Pos[0] > (canvasWidth + wallWidth * 2.5)) {
        enemy1Pos[0] = 0 - (wallWidth * 2.5);
    }
    if (enemy1Pos[0] < (0 - (wallWidth * 2.5))) {
        enemy1Pos[0] = canvasWidth + (wallWidth * 2.5);
    }
    if (enemy1Pos[1] > (canvasHeight + (wallWidth * 2.5))) {
        enemy1Pos[1] = 0 - (wallWidth * 2.5);
    }
    if (enemy1Pos[1] < (0 - (wallWidth * 2.5))) {
        enemy1Pos[1] = canvasHeight + (wallWidth * 2.5);
    }
    
    if (enemy2Pos[0] > (canvasWidth + wallWidth * 3.5)) {
        enemy2Pos[0] = 0 - (wallWidth * 3.5);
    }
    if (enemy2Pos[0] < (0 - (wallWidth * 3.5))) {
        enemy2Pos[0] = canvasWidth + (wallWidth * 3.5);
    }
    if (enemy2Pos[1] > (canvasHeight + (wallWidth * 3.5))) {
        enemy2Pos[1] = 0 - (wallWidth * 3.5);
    }
    if (enemy2Pos[1] < (0 - (wallWidth * 3.5))) {
        enemy2Pos[1] = canvasHeight + (wallWidth * 3.5);
    }

    enemy1Pos[0] += enemy1Speed[0];
    enemy2Pos[0] += enemy2Speed[0];
    enemy1Pos[1] += enemy1Speed[1];
    enemy2Pos[1] += enemy2Speed[1];

    strokeWeight(wallWidth / 2);
    fill(255, 10, 10);
    quad(enemy1Pos[0], enemy1Pos[1] - (wallWidth * 2.5), enemy1Pos[0] + (wallWidth * 2.5), enemy1Pos[1], enemy1Pos[0], enemy1Pos[1] + (wallWidth * 2.5), enemy1Pos[0] - (wallWidth * 2.5), enemy1Pos[1])
    fill(200, 150, 10);
    quad(enemy2Pos[0], enemy2Pos[1] - (wallWidth * 3.5), enemy2Pos[0] + (wallWidth * 3.5), enemy2Pos[1], enemy2Pos[0], enemy2Pos[1] + (wallWidth * 3.5), enemy2Pos[0] - (wallWidth * 3.5), enemy2Pos[1])
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