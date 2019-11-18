//resources:
//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Paddle_and_keyboard_controls
//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls
//https://www.codemahal.com/javascript-and-html5-canvas-game-tutorial-code/
//https://www.w3schools.com/jsref/dom_obj_canvas.asp
//stackoverlfow.com

//create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
document.body.appendChild(canvas);

//paddle movement
//right paddle
var upPressed = false;
var downPressed = false;
//left paddle
var f1Pressed = false;
var f2Pressed = false;

function keyDownHandler(e) {
  if(e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  }
  else if(e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }
  if(e.key == "z") {
    f1Pressed = true;
  }
  else if(e.key == "s") {
    f2Pressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  }
  else if(e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
  if(e.key == "z") {
    f1Pressed = false;
  }
  else if(e.key == "s") {
    f2Pressed = false;
  }
}

//create ball
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//ball collision
var ballRadius = 10;

//create right paddle
var rightpaddleHeight = 100;
var rightpaddleWidth = 10;
var rightpaddleY = (canvas.height-rightpaddleHeight) / 2;

function drawRightPaddle() {
  ctx.beginPath();
  ctx.rect(canvas.width-rightpaddleWidth, rightpaddleY, rightpaddleWidth, rightpaddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//create left paddle
var leftpaddleHeight = 100;
var leftpaddleWidth = 10;
var leftpaddleY = (canvas.height-leftpaddleHeight) / 2;

function drawLeftPaddle() {
  ctx.beginPath();
  ctx.rect(0, leftpaddleY, leftpaddleWidth, leftpaddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//draw function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawLeftPaddle();
  drawRightPaddle();
  drawBall();

  //bounce top and bot
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  else if(x + dx > canvas.width-ballRadius || x + dx == 0) {
    alert("Game over!");
    document.location.reload();
    clearInterval(interval);
  }


  //bounce right paddle
  if((y > rightpaddleY && y < rightpaddleY + 100) && x > canvas.width-ballRadius-rightpaddleWidth) {
    dx = -dx;
  }

  //bounce left paddle
  if((y > leftpaddleY && y < leftpaddleY + 100) && x < 0 + ballRadius + leftpaddleWidth) {
    dx = 2;
  }

  x += dx;
  y += dy;

  if(upPressed && rightpaddleY >= 0) {
    rightpaddleY -= 5;
  }
  else if(downPressed && rightpaddleY + 100 <= canvas.height) {
    rightpaddleY += 5;
  }

  if(f1Pressed && leftpaddleY >= 0) {
    leftpaddleY -= 5;
  }
  else if(f2Pressed && leftpaddleY + 100 <= canvas.height) {
    leftpaddleY += 5;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var interval = setInterval(draw, 10);
