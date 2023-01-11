const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const jumpSound = document.getElementById('jump-sound');

let x = 0;
let y = 0;
let velocityY = 0;
let isJumping = false;

const marioSprite = new Image();
marioSprite.src = 'mario.png';

const ground = {
  y: canvas.height - 20,
  height: 20,
  color: '#00a800',
};

function update() {
  // Apply gravity
  velocityY += 0.5;
  y += velocityY;

  // Check for collision with ground
  if (y + marioSprite.height > ground.y) {
    y = ground.y - marioSprite.height;
    velocityY = 0;
    isJumping = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  ctx.fillStyle = ground.color;
  ctx.fillRect(0, ground.y, canvas.width, ground.height);

  // Draw Mario
  ctx.drawImage(marioSprite, x, y);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    x -= 5;
  } else if (event.key === 'ArrowRight') {
    x += 5;
  } else if (event.key === 'ArrowUp' && !isJumping) {
    jumpSound.play();
    velocityY = -10;
    isJumping = true;
  }
});

loop();