/*
  app.js
  - Pisahkan logic agar index.html rapi & mudah dibaca.
  - Berisi animasi: fireworks, confetti, floating hearts.
*/

let surpriseOpened = false;

// ===== MODAL SURPRISE =====
export function openSurprise(autoPlay = false) {
  if (surpriseOpened) return;
  surpriseOpened = true;

  document.getElementById('surpriseModal').classList.add('active');

  createFireworks();
  createConfetti();
  createFloatingHearts();

  if (autoPlay) playMusic();
}

export function closeSurprise() {
  // Jangan hentikan/menghapus animasi kembang api yang sedang berjalan
  document.getElementById('surpriseModal').classList.remove('active');
}

// ===== FIREWORKS ANIMATION (Birthday burst) =====
function createFireworks() {
  const colors = ['#ff1493', '#ba68c8', '#ffc0cb', '#e0bbff', '#ffd700', '#40c4ff', '#7c4dff'];

  const rockets = 7;
  const piecesPerBurst = 42;

  // hentikan membuat terlalu banyak DOM
  const existing = document.querySelectorAll('.confetti-piece[data-fw="1"]');
  if (existing.length > 300) existing.forEach((el) => el.remove());

  for (let r = 0; r < rockets; r++) {
    const spawnX = 20 + Math.random() * 60; // %
    const spawnY = 420 + Math.random() * 120; // px
    const peakY = 120 + Math.random() * 90; // px
    const endX = spawnX + (Math.random() - 0.5) * 16; // %

    const rocket = document.createElement('div');
    rocket.classList.add('confetti-piece');
    rocket.setAttribute('data-fw', '1');
    rocket.style.left = spawnX + '%';
    rocket.style.top = spawnY + 'px';
    rocket.style.fontSize = (Math.random() * 10 + 12) + 'px';
    rocket.style.color = colors[Math.floor(Math.random() * colors.length)];
    rocket.textContent = '🎆';
    document.body.appendChild(rocket);

    const durationUp = 500 + Math.random() * 350;
    const delay = r * 120;

    rocket.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 0 },
      {
        transform: `translate(${(endX - spawnX) * 8}px, ${-1 * (spawnY - peakY)}px) scale(1.05)`,
        opacity: 1,
        offset: 0.25,
      },
      {
        transform: `translate(${(endX - spawnX) * 8}px, ${-1 * (spawnY - peakY)}px) scale(0.9)`,
        opacity: 0,
      },
    ], {
      duration: durationUp,
      delay,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      fill: 'forwards',
    });

    setTimeout(() => rocket.remove(), delay + durationUp + 80);

    setTimeout(() => {
      const burstCenterXpx = (spawnX / 100) * window.innerWidth;
      const burstCenterYpx = peakY;

      for (let i = 0; i < piecesPerBurst; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        piece.setAttribute('data-fw', '1');

        const angle = (Math.PI * 2 * i) / piecesPerBurst + (Math.random() - 0.5) * 0.25;
        const radius = 90 + Math.random() * 95;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;

        const hueColor = colors[Math.floor(Math.random() * colors.length)];

        piece.style.left = burstCenterXpx + 'px';
        piece.style.top = burstCenterYpx + 'px';
        piece.style.fontSize = (Math.random() * 14 + 10) + 'px';
        piece.style.color = hueColor;
        piece.textContent = Math.random() > 0.45 ? '✨' : '🎇';

        const life = 750 + Math.random() * 450;
        const endScale = 0.2 + Math.random() * 0.35;

        piece.animate([
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: `translate(${dx * 0.7}px, ${dy * 0.7}px) scale(0.9)`, opacity: 0.95, offset: 0.25 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.7)`, opacity: 0.6, offset: 0.65 },
          { transform: `translate(${dx * 1.05}px, ${dy * 1.05}px) scale(${endScale})`, opacity: 0 },
        ], {
          duration: life,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'forwards',
        });

        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), life + 60);

        if (Math.random() < 0.32) {
          const spark = document.createElement('div');
          spark.classList.add('confetti-piece');
          spark.setAttribute('data-fw', '1');
          spark.style.left = burstCenterXpx + 'px';
          spark.style.top = burstCenterYpx + 'px';
          spark.style.fontSize = (Math.random() * 10 + 7) + 'px';
          spark.style.color = hueColor;
          spark.textContent = '✨';

          const sparkAngle = angle + (Math.random() - 0.5) * 0.9;
          const sparkR = 40 + Math.random() * 70;
          const sdx = Math.cos(sparkAngle) * sparkR;
          const sdy = Math.sin(sparkAngle) * sparkR;

          const sparkLife = 480 + Math.random() * 380;

          spark.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${sdx}px, ${sdy}px) scale(0.6)`, opacity: 0.7, offset: 0.6 },
            { transform: `translate(${sdx * 1.1}px, ${sdy * 1.1}px) scale(0.2)`, opacity: 0 },
          ], {
            duration: sparkLife,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            fill: 'forwards',
          });

          document.body.appendChild(spark);
          setTimeout(() => spark.remove(), sparkLife + 60);
        }
      }
    }, delay + durationUp - 60);
  }

  createConfetti();
}

// ===== CONFETTI ANIMATION =====
function createConfetti() {
  const colors = ['#ff1493', '#ba68c8', '#ffc0cb', '#e0bbff', '#ffd700'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.textContent = Math.random() > 0.5 ? '🎉' : '✨';
    confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
    confetti.style.animation = `heartFloat ${2 + Math.random() * 1}s ease-in forwards`;

    // warna masih bisa menyesuaikan via confetti color
    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// ===== FLOATING HEARTS ON OPEN =====
function createFloatingHearts() {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

// ===== MUSIC =====
function playMusic() {
  if (!window.bgMusic) return;
  window.bgMusic.muted = true;
  window.bgMusic.play().then(() => {
    window.bgMusic.muted = false;
    window.bgMusic.volume = 1;
  }).catch(() => {
    console.log('Auto-play prevented. User interaction required.');
  });
}

function pauseMusic() {
  if (!window.bgMusic) return;
  window.bgMusic.pause();
}

// expose untuk inline onclick di index.html
window.openSurprise = openSurprise;
window.closeSurprise = closeSurprise;
window.playMusic = playMusic;
window.pauseMusic = pauseMusic;

// click anywhere to create hearts (tetap ada di index sebelumnya, tapi dipindah biar rapih)
function bindGlobalClickHearts() {
  document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('.modal-content')) {
      const heart = document.createElement('div');
      heart.classList.add('floating-heart');
      heart.textContent = '💖';
      heart.style.left = e.clientX + 'px';
      heart.style.top = e.clientY + 'px';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }
  });
}

bindGlobalClickHearts();

