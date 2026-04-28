/* ═══════════════════════════════════════════════════
   S A N A M — For You, Always
   Interactive Script
   
   ✏️ CONFIGURATION: Scroll down to the CONFIG section
   to add your songs, photos, and dates!
   ═══════════════════════════════════════════════════ */

// ──────────────────────────────────────────────────
// ✏️ CONFIG — Edit these to personalize!
// ──────────────────────────────────────────────────

const CONFIG = {
  // When did you two start? (YYYY, M-1, D) — Month is 0-indexed!
  // Example: October 28, 2025 → new Date(2025, 9, 28)
  anniversaryStart: new Date(2025, 9, 28),

  // Your playlist — add your songs here!
  // Put your .mp3 files in the assets/music/ folder
  playlist: [
    {
      title: "A Golden Tether",
      artist: "Sajal & Maneef",
      src: "assets/music/A_Golden_Tether.mp3",
      colors: ["#c97d94", "#a898c0"]
    },
    {
      title: "Barish Ki Rooh",
      artist: "Sajal & Maneef",
      src: "assets/music/Barish_Ki_Rooh.mp3",
      colors: ["#c2a07a", "#c97d94"]
    },
    {
      title: "Bas Tum Aur Ye Pal",
      artist: "Sajal & Maneef",
      src: "assets/music/Bas_Tum_Aur_Ye_Pal.mp3",
      colors: ["#a898c0", "#c2a07a"]
    },
    {
      title: "Caught in Friction",
      artist: "Sajal & Maneef",
      src: "assets/music/Caught_in_Friction.mp3",
      colors: ["#eec4d2", "#a898c0"]
    },
    {
      title: "Deep In The Bone",
      artist: "Sajal & Maneef",
      src: "assets/music/Deep_In_The_Bone.mp3",
      colors: ["#c97d94", "#d8c0a0"]
    },
    {
      title: "Marrow and Bone",
      artist: "Sajal & Maneef",
      src: "assets/music/Marrow_and_Bone.mp3",
      colors: ["#c2a07a", "#eec4d2"]
    },
    {
      title: "Sunehri Dor",
      artist: "Sajal & Maneef",
      src: "assets/music/Sunehri_Dor.mp3",
      colors: ["#a898c0", "#c97d94"]
    }
  ],
};

// ──────────────────────────────────────────────────
// DOM ELEMENTS
// ──────────────────────────────────────────────────

const DOM = {
  entrance: document.getElementById('entrance'),
  openGift: document.getElementById('open-gift'),
  transitionFlash: document.getElementById('transition-flash'),
  mainContent: document.getElementById('main-content'),
  particles: document.getElementById('particles'),
  playerBar: document.getElementById('player-bar'),
  audio: document.getElementById('audio-element'),
  playBtn: document.getElementById('play-btn'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  playerTitle: document.getElementById('player-song-title'),
  playerArtist: document.getElementById('player-song-artist'),
  playerArt: document.getElementById('player-art'),
  playerProgress: document.getElementById('player-progress'),
  playerProgressFill: document.getElementById('player-progress-fill'),
  playerTime: document.getElementById('player-time'),
  songsList: document.getElementById('songs-list'),
  lightbox: document.getElementById('lightbox'),
  lightboxImg: document.getElementById('lightbox-img'),
};

// ──────────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────────

let state = {
  isOpen: false,
  currentSongIndex: -1,
  isPlaying: false,
  lightboxIndex: -1,
  galleryImages: [],
};

// ──────────────────────────────────────────────────
// ENTRANCE — Gift Opening
// ──────────────────────────────────────────────────

function openGift() {
  if (state.isOpen) return;
  state.isOpen = true;

  // Trigger transition
  DOM.transitionFlash.classList.add('active');

  setTimeout(() => {
    DOM.entrance.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    DOM.mainContent.classList.add('visible');

    // Start revealing elements
    initScrollReveal();

    setTimeout(() => {
      DOM.transitionFlash.classList.remove('active');
    }, 600);
  }, 1000);

  // Show player bar after a delay
  setTimeout(() => {
    DOM.playerBar.classList.add('visible');
  }, 2500);
}

// ──────────────────────────────────────────────────
// FLOATING PARTICLES
// ──────────────────────────────────────────────────

function createParticles() {
  const count = window.innerWidth < 768 ? 20 : 35;
  const colors = [
    'rgba(201, 125, 148, VAR)',  // rose
    'rgba(194, 160, 122, VAR)',  // gold
    'rgba(168, 152, 192, VAR)',  // lavender
    'rgba(236, 224, 212, VAR)',  // cream
  ];

  const driftAnimations = ['drift1', 'drift2', 'drift3'];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const isHeart = Math.random() < 0.15;
    const size = isHeart ? 0 : 2 + Math.random() * 4;
    const opacity = 0.12 + Math.random() * 0.25;
    const color = colors[Math.floor(Math.random() * colors.length)].replace('VAR', opacity.toFixed(2));
    const anim = driftAnimations[Math.floor(Math.random() * driftAnimations.length)];
    const duration = 18 + Math.random() * 30;
    const delay = -(Math.random() * duration);

    if (isHeart) {
      particle.className = 'particle particle--heart';
      particle.textContent = '♥';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        color: rgba(201, 125, 148, ${(0.1 + Math.random() * 0.15).toFixed(2)});
        font-size: ${8 + Math.random() * 6}px;
        animation: ${anim} ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
      `;
    } else {
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        animation: ${anim} ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
      `;
    }

    DOM.particles.appendChild(particle);
  }
}

// ──────────────────────────────────────────────────
// SCROLL REVEAL (IntersectionObserver)
// ──────────────────────────────────────────────────

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the animation slightly
        const delay = Array.from(entry.target.parentElement.children)
          .filter(el => el.classList.contains('reveal'))
          .indexOf(entry.target) * 100;

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, Math.min(delay, 400));

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
  });

  reveals.forEach(el => observer.observe(el));
}

// ──────────────────────────────────────────────────
// MUSIC PLAYER
// ──────────────────────────────────────────────────

function buildSongsList() {
  DOM.songsList.innerHTML = '';

  CONFIG.playlist.forEach((song, index) => {
    const card = document.createElement('div');
    card.className = 'song-card reveal';
    card.dataset.index = index;

    card.innerHTML = `
      <div class="song-art" style="--art-color-1: ${song.colors[0]}; --art-color-2: ${song.colors[1]}"></div>
      <div class="song-info">
        <span class="song-title">${song.title}</span>
        <span class="song-artist">${song.artist}</span>
      </div>
      <div class="song-play-icon">
        <span class="play-symbol">▶</span>
      </div>
    `;

    card.addEventListener('click', () => playSong(index));
    DOM.songsList.appendChild(card);
  });
}

function playSong(index) {
  if (index < 0 || index >= CONFIG.playlist.length) return;

  const song = CONFIG.playlist[index];
  const wasSameSong = (index === state.currentSongIndex);

  state.currentSongIndex = index;

  // Update audio source
  if (!wasSameSong) {
    DOM.audio.src = song.src;
    DOM.audio.load();
  }

  // Play
  DOM.audio.play().then(() => {
    state.isPlaying = true;
    updatePlayerUI();
  }).catch(err => {
    console.log('Playback failed:', err.message);
  });
}

function togglePlay() {
  if (state.currentSongIndex === -1) {
    // No song selected, play the first one
    if (CONFIG.playlist.length > 0) {
      playSong(0);
    }
    return;
  }

  if (state.isPlaying) {
    DOM.audio.pause();
    state.isPlaying = false;
  } else {
    DOM.audio.play().then(() => {
      state.isPlaying = true;
    }).catch(() => {});
  }
  updatePlayerUI();
}

function playNext() {
  if (CONFIG.playlist.length === 0) return;
  const next = (state.currentSongIndex + 1) % CONFIG.playlist.length;
  playSong(next);
}

function playPrev() {
  if (CONFIG.playlist.length === 0) return;
  // If more than 3 seconds in, restart; otherwise go prev
  if (DOM.audio.currentTime > 3) {
    DOM.audio.currentTime = 0;
    return;
  }
  const prev = (state.currentSongIndex - 1 + CONFIG.playlist.length) % CONFIG.playlist.length;
  playSong(prev);
}

function updatePlayerUI() {
  const song = CONFIG.playlist[state.currentSongIndex];
  if (!song) return;

  // Update player bar info
  DOM.playerTitle.textContent = song.title;
  DOM.playerArtist.textContent = song.artist;
  DOM.playerArt.style.background = `linear-gradient(135deg, ${song.colors[0]}, ${song.colors[1]})`;
  DOM.playerArt.style.opacity = '0.8';

  // Update play/pause button icon
  const iconPlay = DOM.playBtn.querySelector('.icon-play');
  const iconPause = DOM.playBtn.querySelector('.icon-pause');
  iconPlay.style.display = state.isPlaying ? 'none' : 'block';
  iconPause.style.display = state.isPlaying ? 'block' : 'none';

  // Update song cards
  document.querySelectorAll('.song-card').forEach((card, i) => {
    const isActive = i === state.currentSongIndex;
    const isPlayingThis = isActive && state.isPlaying;

    card.classList.toggle('active', isActive);
    card.classList.toggle('playing', isPlayingThis);

    const playIcon = card.querySelector('.song-play-icon');
    if (isPlayingThis) {
      playIcon.innerHTML = `
        <div class="song-eq">
          <span></span><span></span><span></span><span></span>
        </div>
      `;
    } else if (isActive) {
      playIcon.innerHTML = '<span class="play-symbol">❚❚</span>';
    } else {
      playIcon.innerHTML = '<span class="play-symbol">▶</span>';
    }
  });
}

function updateProgress() {
  if (!DOM.audio.duration) return;

  const progress = (DOM.audio.currentTime / DOM.audio.duration) * 100;
  DOM.playerProgressFill.style.width = `${progress}%`;

  const current = formatTime(DOM.audio.currentTime);
  const total = formatTime(DOM.audio.duration);
  DOM.playerTime.textContent = `${current} / ${total}`;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function seekTo(e) {
  const rect = DOM.playerProgress.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  if (DOM.audio.duration) {
    DOM.audio.currentTime = percent * DOM.audio.duration;
  }
}

// ──────────────────────────────────────────────────
// GALLERY LIGHTBOX
// ──────────────────────────────────────────────────

function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  state.galleryImages = [];

  items.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img && img.src && !img.style.display) {
      state.galleryImages.push({ src: img.src, el: item });
    }

    item.addEventListener('click', () => {
      if (img && img.style.display !== 'none') {
        openLightbox(index);
      }
    });
  });
}

function openLightbox(index) {
  const items = document.querySelectorAll('.gallery-item');
  const img = items[index]?.querySelector('img');
  if (!img || img.style.display === 'none') return;

  state.lightboxIndex = index;
  DOM.lightboxImg.src = img.src;
  DOM.lightbox.classList.add('active');
  DOM.lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  DOM.lightbox.classList.remove('active');
  DOM.lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function lightboxNav(direction) {
  const items = document.querySelectorAll('.gallery-item');
  let newIndex = state.lightboxIndex + direction;
  
  // Find next valid image
  while (newIndex >= 0 && newIndex < items.length) {
    const img = items[newIndex]?.querySelector('img');
    if (img && img.style.display !== 'none') {
      state.lightboxIndex = newIndex;
      DOM.lightboxImg.src = img.src;
      return;
    }
    newIndex += direction;
  }
}

// ──────────────────────────────────────────────────
// LOVE LETTERS
// ──────────────────────────────────────────────────

function initLetters() {
  // Letter content defined here for easy editing
  const letters = [
    {
      greeting: 'My dearest Maneef,',
      paragraphs: [
        'I know I don\'t always say everything perfectly, and sometimes the right words come to me only after the moment has passed. So here they are — the things I carry in my chest every day.',
        'You make the ordinary feel sacred. A random Tuesday with you holds more magic than any grand plan ever could. Your laugh rewires something in me. Your presence is the only place I\'ve ever felt completely still.',
        'Thank you for choosing me — not just once, but every single day. For seeing the messy, unfinished parts of me and deciding to stay anyway. For making "us" the safest word I know.',
        'Happy six months, my love. Here\'s to a lifetime of everything we are.',
      ],
      closing: 'Forever yours,',
      signature: 'Sajal',
    },
    {
      greeting: 'Hey you,',
      paragraphs: [
        'If you\'re reading this, maybe you\'re missing me a little. And that\'s okay — because I promise you, wherever I am, I\'m missing you a little more.',
        'Close your eyes. Think of the last time we laughed until our stomachs hurt. Think of how it feels when I hold your hand and everything else gets quiet. That feeling? It\'s not going anywhere. Neither am I.',
        'Distance is just geography. What we have — that lives in a place no distance can touch.',
        'I\'ll see you soon, my Sanam.',
      ],
      closing: 'Always,',
      signature: 'Your Sajal ♥',
    },
    // ✏️ Add more letters here!
  ];

  const readerEl = document.getElementById('letter-reader');
  const paperEl = document.getElementById('letter-paper-content');
  const closeBtn = document.getElementById('letter-reader-close');

  function openLetter(index) {
    const letter = letters[index];
    if (!letter) return;

    let html = `<p class="letter-greeting">${letter.greeting}</p>`;
    letter.paragraphs.forEach(p => {
      html += `<p>${p}</p>`;
    });
    html += `<p class="letter-closing">${letter.closing}<br><span class="letter-signature">${letter.signature}</span></p>`;

    paperEl.innerHTML = html;
    readerEl.classList.add('active');
    readerEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function closeLetter() {
    readerEl.classList.remove('active');
    readerEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  // Envelope click handlers
  document.querySelectorAll('.letter-envelope').forEach(envelope => {
    const letterIndex = parseInt(envelope.dataset.letter, 10);
    
    envelope.addEventListener('click', () => openLetter(letterIndex));
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLetter(letterIndex);
      }
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeLetter);
  
  // Click backdrop to close
  readerEl.querySelector('.letter-reader-backdrop').addEventListener('click', closeLetter);

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && readerEl.classList.contains('active')) {
      closeLetter();
    }
  });
}

// ──────────────────────────────────────────────────
// LOVE COUNTER
// ──────────────────────────────────────────────────

function updateLoveCounter() {
  const now = new Date();
  const diff = now - CONFIG.anniversaryStart;

  if (diff < 0) return;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const daysEl = document.getElementById('counter-days');
  const hoursEl = document.getElementById('counter-hours');
  const minutesEl = document.getElementById('counter-minutes');
  const secondsEl = document.getElementById('counter-seconds');

  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
  if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
  if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// ──────────────────────────────────────────────────
// EVENT LISTENERS
// ──────────────────────────────────────────────────

function bindEvents() {
  // Entrance
  DOM.openGift.addEventListener('click', openGift);

  // Music player controls
  DOM.playBtn.addEventListener('click', togglePlay);
  DOM.nextBtn.addEventListener('click', playNext);
  DOM.prevBtn.addEventListener('click', playPrev);
  DOM.playerProgress.addEventListener('click', seekTo);

  // Audio events
  DOM.audio.addEventListener('timeupdate', updateProgress);
  DOM.audio.addEventListener('ended', playNext);
  DOM.audio.addEventListener('pause', () => {
    state.isPlaying = false;
    updatePlayerUI();
  });
  DOM.audio.addEventListener('play', () => {
    state.isPlaying = true;
    updatePlayerUI();
  });

  // Lightbox
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', () => lightboxNav(-1));
  document.querySelector('.lightbox-next').addEventListener('click', () => lightboxNav(1));

  DOM.lightbox.addEventListener('click', (e) => {
    if (e.target === DOM.lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (DOM.lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
    }
  });

  // Space to play/pause when not typing
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && e.target === document.body) {
      e.preventDefault();
      togglePlay();
    }
  });
}

// ──────────────────────────────────────────────────
// INITIALIZATION
// ──────────────────────────────────────────────────

function init() {
  // Lock scroll until gift is opened
  document.body.classList.add('no-scroll');

  // Create floating particles
  createParticles();

  // Build songs list
  buildSongsList();

  // Initialize gallery
  initGallery();

  // Initialize letters
  initLetters();

  // Start love counter
  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);

  // Bind all events
  bindEvents();
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
