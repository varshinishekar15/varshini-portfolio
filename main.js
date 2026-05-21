// ── Custom Cursor ──
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});
(function animateRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
})();
document.querySelectorAll('a, button, input, textarea, .proj-card, .skill-group, .edu-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

// ── Navbar scroll ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});

// ── Hamburger ──
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');
ham.addEventListener('click', () => mob.classList.toggle('open'));
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mob.classList.remove('open')));

// ── Typed text ──
const roles = [
  'Full Stack Developer',
  'AI & Vision Engineer',
  'UI/UX Designer',
  'IoT Builder',
  'Research Author',
];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function typeLoop() {
  const word = roles[rIdx];
  if (!deleting) {
    cIdx++;
    typedEl.textContent = '> ' + word.slice(0, cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    cIdx--;
    typedEl.textContent = '> ' + word.slice(0, cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; setTimeout(typeLoop, 300); return; }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ── Canvas particle background ──
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 1.8 + 0.4;
    this.alpha = Math.random() * 0.5 + 0.15;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(99,179,237,${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 110; i++) particles.push(new Particle());

function drawConnections() {
  const dist = 130;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < dist) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99,179,237,${0.12 * (1 - d/dist)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.proj-card, .skill-group, .edu-card, .tl-item, .cert-card, .contact-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, border-color 0.25s, box-shadow 0.25s`;
  observer.observe(el);
});

// ── Contact form ──
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  btn.textContent = '✓ Sent! Talk soon.';
  btn.style.background = '#68d391';
  setTimeout(() => { btn.textContent = 'Send Message ↗'; btn.style.background = ''; this.reset(); }, 3000);
});
