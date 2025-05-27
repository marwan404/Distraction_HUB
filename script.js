let timeWasted = 0, clickCount = 0, hoversCount = 0;
setInterval(() => {
  timeWasted++;
  document.getElementById('timeWasted').textContent = timeWasted.toLocaleString();
}, 1000);

let currentJoke = '', jokeTimeout, isTyping = false, typingInterval;

function typeText(element, text, speed = 50) {
  if (typingInterval) clearInterval(typingInterval);
  if (jokeTimeout) clearTimeout(jokeTimeout);
  isTyping = true;
  element.classList.add('typing');
  element.textContent = '';
  let i = 0;
  typingInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
    } else {
      clearInterval(typingInterval);
      isTyping = false;
      setTimeout(() => element.classList.remove('typing'), 1000);
    }
  }, speed);
}

function updateJoke(text) {
  hoversCount++;
  document.getElementById('hoversCount').textContent = hoversCount.toLocaleString();
  if (currentJoke === text && !isTyping) return;
  currentJoke = text;
  const jokeElement = document.getElementById('jokeText');
  typeText(jokeElement, text, 30);
  jokeTimeout = setTimeout(() => {
    if (!isTyping) {
      typeText(jokeElement, 'Hover over a button to unlock a new level of productivity destruction', 25);
      currentJoke = '';
    }
  }, 5000);
}

function incrementClicks() {
  clickCount++;
  document.getElementById('clickCount').textContent = clickCount.toLocaleString();
}

function toggleMode() {
  document.body.classList.toggle('light');
  const icon = document.getElementById('modeIcon');
  icon.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
}

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 20 + 's';
  particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
  const colors = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)'];
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById('particles').appendChild(particle);
  setTimeout(() => particle.remove(), 25000);
}

setInterval(createParticle, 3000);
for (let i = 0; i < 5; i++) setTimeout(createParticle, i * 1000);

// Konami code easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
document.addEventListener('keydown', e => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) konamiCode.shift();
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => { document.body.style.animation = ''; }, 5000);
  }
});

// Rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Confetti Easter Egg: type "awsome"
let confettiBuffer = '';
document.addEventListener('keydown', e => {
  if (e.key.length === 1) {
    confettiBuffer += e.key.toLowerCase();
    if (confettiBuffer.length > 6) confettiBuffer = confettiBuffer.slice(-6);
    if (confettiBuffer === 'awsome') showConfetti();
  }
});

function showConfetti() {
  const colors = ['#00ff88', '#ff0080', '#0080ff', '#fff700', '#ff6f00', '#ffffff'];
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = (Math.random() * -20) + 'vh';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    confetti.appendChild(piece);
  }
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 1500);
}

function activatePanic() {
  document.querySelector('.container').style.display = 'none';
  document.getElementById('panicScreen').style.display = 'flex';
  document.querySelector('.bg-particles').style.display = 'none';
  document.querySelector('.mode-toggle').style.display = 'none';
  document.querySelector('.panic-btn').style.display = 'none';
}

// Escape key returns to normal
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('panicScreen').style.display === 'flex') {
    document.querySelector('.container').style.display = '';
    document.getElementById('panicScreen').style.display = 'none';
    document.querySelector('.bg-particles').style.display = '';
    document.querySelector('.mode-toggle').style.display = '';
    document.querySelector('.panic-btn').style.display = '';
  }
});