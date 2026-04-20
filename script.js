const canvas = document.getElementById("gravityCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: canvas.width/2, y: canvas.height/2 };

// Track mouse
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Resize fix
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    // Gravity strength
    let force = 0.05;

    this.vx += (dx / dist) * force;
    this.vy += (dy / dist) * force;

    this.x += this.vx;
    this.y += this.vy;

    // friction (smooth movement)
    this.vx *= 0.95;
    this.vy *= 0.95;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 150; i++) {
  particles.push(new Particle());
}

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();