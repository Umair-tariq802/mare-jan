const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Modal controls
const openLetterBtn = document.getElementById('openLetter');
const closeLetterBtn = document.getElementById('closeLetter');
const letterModal = document.getElementById('letterModal');
const letterText = document.getElementById('letterText');
const confettiBtn = document.getElementById('confettiBtn');
const openWishesBtn = document.getElementById('openWishes');
const closeWishesBtn = document.getElementById('closeWishes');
const wishesModal = document.getElementById('wishesModal');
const wishesText = document.getElementById('wishesText');
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

function openWishesModal() {
    if (!wishesModal) return;
    wishesModal.setAttribute('aria-hidden', 'false');
    typeWriter(bestWishes, wishesText, 18);
}
function closeWishesModal() {
    if (!wishesModal) return;
    wishesModal.setAttribute('aria-hidden', 'true');
}
openWishesBtn?.addEventListener('click', openWishesModal);
closeWishesBtn?.addEventListener('click', closeWishesModal);

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

// Auto-play music immediately when page loads - no pause option
const song = document.getElementById('song');

// Auto-play music immediately when page loads
document.addEventListener('DOMContentLoaded', async () => {
    if (!song) return;
    try {
        song.muted = false; // Unmute the audio
        song.volume = 0.7; // Set volume to 70%
        await song.play();
    } catch (e) {
        console.warn('Autoplay blocked:', e);
        // Try again after user interaction
        document.addEventListener('click', async () => {
            try {
                song.muted = false;
                await song.play();
            } catch (err) {
                console.warn('Still blocked:', err);
            }
        }, { once: true });
    }
});

// Also try on window load as backup
window.addEventListener('load', async () => {
    if (!song) return;
    try {
        song.muted = false;
        song.volume = 0.7;
        await song.play();
    } catch (e) {
        console.warn('Autoplay blocked on load:', e);
    }
});

// Typewriter
const loveLetter = `My Dearest Jannat,

On this special day, I just want to tell you how deeply you mean to me. You are not only my love, but my calm in the storms, my joy in the silence, and the most beautiful blessing life has ever given me.

Your smile is my sunrise, your voice is my favorite song,. With you, even the simplest moments feel like treasures, and every day becomes a memory worth keeping.

I promise to stand by you in every season — to hold your hand through every joy and every trial, to listen when your heart whispers, and to love you endlessly with both gentleness and passion.

Happy Birthday, my love. May today be as radiant as your soul, and may you always know that wherever life takes us, I am — and will forever be — yours.

With all my love,
Yours, always ❤️`;

const bestWishes = `🌙 Alhamdulillah for your life 🖤 May Allah grant you barakah in your years & noor in your heart.

✨ Another year, another blessing 🪴 May Allah guide you closer to Jannah every step.

🌸 Bismillah for this new age 🤲 May Allah protect you from every harm & grant you peace.

🌹 May your life always be filled with Rahmah, Barakah & Noor 🌌.

🤍 May Allah write only goodness, ease & happiness in your destiny ahead.

🌺 Hayaatun tayyibah (a pure life) 🌿 is what I pray for you today & always.

☀️ May every year bring you closer to Allah and farther from dunya worries.

🍯 BaarakAllahu laka in your life, health, and rizq ✨.`;

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

