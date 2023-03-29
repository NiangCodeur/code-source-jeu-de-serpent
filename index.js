const canvas = document.getElementById("game");
const c = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;
let taileCount = 20;
let taileSeize = canvas.width / taileCount - 2;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let AppleX = 5;
let AppleY = 5;
let score = 0;
let taileLength = 2;
const snakeparts = [];

let sound = new Audio("gulp.mp3");

function jeu() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return false;
  }

  clearScreen();
  drawSnake();
  drawApple();
  checkApple();
  drawScore();
  setTimeout(jeu, 1000 / speed);
}
//---------------------------détecter la collisions-----------------------------
function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if (headX < 0) {
    gameOver = true;
  }
  if (headX === taileCount) {
    gameOver = true;
  }
  if (headY < 0) {
    gameOver = true;
  }
  if (headY === taileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeparts.length; i++) {
    let part = snakeparts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    c.fillStyle = "red";
    c.font = "50px Verdana";
    c.fillText("Fin du jeu", canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}

function clearScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  c.fillStyle = "white";
  c.fillRect(headX * taileCount, headY * taileCount, taileSeize, taileSeize);

  c.fillStyle = "white";
  for (let i = 0; i < snakeparts.length; i++) {
    let part = snakeparts[i];
    c.fillRect(
      part.x * taileCount,
      part.y * taileCount,
      taileSeize,
      taileSeize
    );
  }
  snakeparts.push(new SnakePart(headX, headY));
  while (snakeparts.length > taileLength) {
    snakeparts.shift();
  }
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  c.fillStyle = "green";
  c.fillRect(AppleX * taileCount, AppleY * taileCount, taileSeize, taileSeize);
}

function checkApple() {
  if (AppleX === headX && AppleY === headY) {
    AppleX = Math.floor(Math.random() * taileCount);
    AppleY = Math.floor(Math.random() * taileCount);
    taileLength++;
    score++;
    sound.play();
  }
}

function drawScore() {
  c.fillStyle = "white";
  c.font = "10px Verdana";
  c.fillText("Score " + score, canvas.width - 50, 10);
}

//-----------------------Déplacer notre serpent grace au Clavier----------------------------
document.body.addEventListener("keydown", keyDown);
function keyDown(Event) {
  // En Haut
  if (Event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  // En Bas
  if (Event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  // A gauche
  if (Event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  // A droite
  if (Event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

jeu();
