const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Modal controls
const openLetterBtn = document.getElementById('openLetter');
const closeLetterBtn = document.getElementById('closeLetter');
const letterModal = document.getElementById('letterModal');
const letterText = document.getElementById('letterText');
const confettiBtn = document.getElementById('confettiBtn');
const photoLightbox = document.getElementById('photoLightbox');
const closeLightboxBtn = document.getElementById('closeLightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openModal() {
    if (!letterModal) return;
    letterModal.setAttribute('aria-hidden', 'false');
    typeWriter(loveLetter, letterText, 16);
}

function closeModal() {
    if (!letterModal) return;
    letterModal.setAttribute('aria-hidden', 'true');
}

openLetterBtn?.addEventListener('click', openModal);
closeLetterBtn?.addEventListener('click', closeModal);

// Photo lightbox
function openLightbox(src) {
    if (!photoLightbox || !lightboxImg) return;
    lightboxImg.src = src;
    photoLightbox.setAttribute('aria-hidden', 'false');
}
function closeLightbox() {
    if (!photoLightbox) return;
    photoLightbox.setAttribute('aria-hidden', 'true');
}
closeLightboxBtn?.addEventListener('click', closeLightbox);
photoLightbox?.addEventListener('click', (e) => {
    if (e.target === photoLightbox) closeLightbox();
});

// Music toggle
const musicToggle = document.getElementById('musicToggle');
const song = document.getElementById('song');
let isPlaying = false;

musicToggle?.addEventListener('click', async () => {
    if (!song) return;
    try {
        if (!isPlaying) { await song.play(); } else { song.pause(); }
        isPlaying = !isPlaying;
        musicToggle.textContent = isPlaying ? '⏸️' : '🎵';
    } catch (e) {
        console.warn('Autoplay blocked:', e);
    }
});

// Typewriter
const loveLetter = `My dearest Jannat,

On your birthday, I just want you to know something simple and true: you are my favorite person, my safe place, and the most beautiful chapter of my life. Thank you for your love, your patience, your laughter, and your magic that turns ordinary days into memories.

I promise to choose you in every moment — to hold your hand through quiet nights and wild adventures, to hear your heart when words fall short, to love you gently and fiercely in every season.

Happy Birthday, my love. Today and always, I am yours.

— Yours forever`;

function typeWriter(text, el, speed = 20) {
    if (!el) return;
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        el.textContent += text.charAt(i);
        i += 1;
        if (i >= text.length) clearInterval(timer);
    }, speed);
}

// Hearts background animation
const canvas = document.getElementById('hearts');
const ctx = canvas?.getContext?.('2d');
let hearts = [];

function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: 6 + Math.random() * 12,
        speed: 0.5 + Math.random() * 1.5,
        alpha: 0.4 + Math.random() * 0.6
    };
}

for (let i = 0; i < 60; i++) hearts.push(createHeart());

function drawHeart(x, y, size, alpha) {
    if (!ctx) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.fillStyle = `rgba(255, 77, 135, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(0, -6, -12, -6, -12, 4);
    ctx.bezierCurveTo(-12, 12, 0, 18, 0, 22);
    ctx.bezierCurveTo(0, 18, 12, 12, 12, 4);
    ctx.bezierCurveTo(12, -6, 0, -6, 0, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
        h.y -= h.speed;
        drawHeart(h.x, h.y, h.size, h.alpha);
        if (h.y < -30) {
            Object.assign(h, createHeart());
            h.y = canvas.height + 20;
        }
    });
    requestAnimationFrame(animate);
}
animate();

// Simple confetti
function confetti() {
    if (!canvas || !ctx) return;
    const pieces = Array.from({ length: 120 }).map(() => ({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 200,
        r: 2 + Math.random() * 4,
        c: `hsl(${Math.random() * 360}, 90%, 60%)`,
        s: 2 + Math.random() * 4
    }));
    let t = 0;
    const drop = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(h => drawHeart(h.x, h.y, h.size, h.alpha));
        pieces.forEach(p => {
            p.y += p.s;
            p.x += Math.sin((p.y + t) / 20);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.c;
            ctx.fill();
        });
        t += 1;
        if (t < 240) requestAnimationFrame(drop);
    };
    drop();
}

confettiBtn?.addEventListener('click', confetti);

// Wire gallery and hero clicks to lightbox
const gallery = document.querySelector('.photos');
gallery?.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'IMG') openLightbox(target.src);
});
const heroPortrait = document.getElementById('heroPortrait');
heroPortrait?.addEventListener('click', () => openLightbox(heroPortrait.src));

