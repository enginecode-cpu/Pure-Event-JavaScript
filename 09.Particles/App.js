const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.width / 80) * (canvas.height / 80)
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Particles 만들기
class Particles {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  // 그리기
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#8c5523";
    ctx.fill();
  }
  update() {
    // Particle의 위치를 체크
    // mouse의 위치를 체크
    // Particle을 움직이고 그린다.
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // 충돌하는지 체크
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx ** 2 + dy ** 2);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }
    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 9000;
  for (let i = 0; i < numberOfParticles * 2; i++) {
    let size = Math.random() * 5 + 1;
    let x =
      Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2;
    let y =
      Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "#8c5523";

    particlesArray.push(
      new Particles(x, y, directionX, directionY, size, color)
    );
  }
}

function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

function connect() {
  let opacityValue = 1;

  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dist =
        (particlesArray[a].x - particlesArray[b].x) ** 2 +
        (particlesArray[a].y - particlesArray[b].y) ** 2;
      if (dist < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - dist / 20000;
        ctx.stokeStyle = `rgba(140, 85, 31, ${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = (canvas.width / 80) * (canvas.height / 80);
  init();
});

// mouse out
window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

init();
animation();
