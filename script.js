const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Modal controls
const openLetterBtn = document.getElementById('openLetter');
const closeLetterBtn = document.getElementById('closeLetter');
const letterModal = document.getElementById('letterModal');
const letterText = document.getElementById('letterText');
const confettiBtn = document.getElementById('confettiBtn');
const showFullBtn = document.getElementById('showFullLetter');
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
    if (letterText) {
        letterText.classList.add('fade-reveal');
    }
    typeWriter(loveLetter, letterText, 20);
}

function closeModal() {
    if (!letterModal) return;
    letterModal.setAttribute('aria-hidden', 'true');
}

openLetterBtn?.addEventListener('click', openModal);
closeLetterBtn?.addEventListener('click', closeModal);

function showFullLetter() {
    if (!letterText) return;
    letterText.textContent = loveLetter;
    letterText.classList.remove('fade-reveal');
    letterText.scrollTop = 0;
}
showFullBtn?.addEventListener('click', showFullLetter);

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

// Dreamy night sky layers: (static hearts backdrop kept), stars, moon, clouds, floating hearts, mist, glow particles
const canvas = document.getElementById('hearts');
const ctx = canvas?.getContext?.('2d');
let hearts = [];
let stars = [];
let clouds = [];
let sparkles = [];
// ensure optional layers exist to avoid runtime errors
let bokeh = [];
let petals = [];
let floatingHearts = [];
let mist = { offset: 0 };

function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // regenerate overlays on resize
    initStars();
    initClouds();
    initFloatingHearts();
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

function initStars() {
    if (!canvas) return;
    const count = 120;
    stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.4,
        t: Math.random() * Math.PI * 2,
        s: 0.5 + Math.random() * 0.8
    }));
}
initStars();

function initClouds() {
    if (!canvas) return;
    const bandY = canvas.height * 0.22;
    clouds = [
        { x: canvas.width * 0.15, y: bandY, w: 260, h: 70, speed: 0.02 },
        { x: canvas.width * 0.55, y: bandY + 40, w: 320, h: 90, speed: 0.018 },
    ];
}
initClouds();

function initFloatingHearts() {
    if (!canvas) return;
    const count = 22;
    floatingHearts = Array.from({ length: count }).map((_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7 + canvas.height * 0.1,
        size: 10 + Math.random() * 18,
        alpha: 0.25 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        drift: 0.15 + Math.random() * 0.25,
        color: i % 2 === 0 ? 'rgba(255,255,255,' : 'rgba(255, 182, 193,' // white or soft pink
    }));
}
initFloatingHearts();

function spawnSparkle() {
    if (!canvas) return;
    sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.8,
        life: 40 + Math.random() * 60,
        size: 0.8 + Math.random() * 1.8,
        alpha: 0.9
    });
    if (sparkles.length > 100) sparkles.shift();
}
setInterval(spawnSparkle, 260);

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
// Stop hearts animation to avoid vertical movement of letters/text
// Comment out the animation loop to freeze the background
// animate();

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

// Heart Fireworks (continuous + click bursts)
const fireworksParticles = [];
const heartShowerPieces = [];

function spawnHeartFirework(x, y, particleCount = 60) {
    if (!canvas) return;
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.12;
        const speed = 2.8 + Math.random() * 3.8; // faster, wider
        fireworksParticles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 10 + Math.random() * 14,
            alpha: 1,
            hue: Math.random() * 360 // rainbow
        });
    }
    // Trim to avoid unbounded growth
    if (fireworksParticles.length > 3000) fireworksParticles.splice(0, fireworksParticles.length - 3000);
}

function drawHeartParticle(p) {
    if (!ctx) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.translate(p.x, p.y);
    ctx.scale(p.size / 18, p.size / 18);
    ctx.fillStyle = `hsl(${p.hue}, 90%, 60%)`;
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

// Throttle to ~30 FPS to reduce CPU/GPU usage
let lastFrameTime = 0;
const targetFpsInterval = 1000 / 30;
function fireworksLoop(now = 0) {
    if (!ctx || !canvas) return;
    const elapsed = now - lastFrameTime;
    if (elapsed < targetFpsInterval) {
        requestAnimationFrame(fireworksLoop);
        return;
    }
    lastFrameTime = now - (elapsed % targetFpsInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw static hearts background (no motion)
    hearts.forEach(h => drawHeart(h.x, h.y, h.size, h.alpha));

    // Gentle mist overlay (moving gradient noise-like veil)
    mist.offset += 0.0015 * (elapsed / targetFpsInterval);
    const mistGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    mistGrad.addColorStop(0, `rgba(255,255,255,${0.02 + 0.02 * (0.5 + Math.sin(mist.offset) * 0.5)})`);
    mistGrad.addColorStop(1, 'rgba(255,255,255,0.00)');
    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Moon
    const moonX = canvas.width * 0.8;
    const moonY = canvas.height * 0.22;
    const moonR = 60;
    const moonGrad = ctx.createRadialGradient(moonX - 20, moonY - 20, 10, moonX, moonY, moonR);
    moonGrad.addColorStop(0, 'rgba(255,255,255,0.95)');
    moonGrad.addColorStop(1, 'rgba(255,255,255,0.1)');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
    ctx.fill();

    // Stars twinkle
    stars.forEach(st => {
        st.t += 0.02 * st.s;
        const tw = (Math.sin(st.t) + 1) * 0.5; // 0..1
        ctx.globalAlpha = 0.4 + tw * 0.6;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    // Clouds drift
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    clouds.forEach(c => {
        c.x += c.speed * (targetFpsInterval / 33);
        if (c.x - c.w > canvas.width) c.x = -c.w;
        // simple puffy cloud using arcs
        ctx.beginPath();
        const x = c.x, y = c.y, w = c.w, h = c.h;
        ctx.arc(x, y, h * 0.6, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(x + w * 0.25, y - h * 0.4, h * 0.7, Math.PI, Math.PI * 2);
        ctx.arc(x + w * 0.5, y - h * 0.2, h * 0.8, Math.PI, Math.PI * 2);
        ctx.arc(x + w * 0.75, y - h * 0.35, h * 0.6, Math.PI, Math.PI * 2);
        ctx.arc(x + w, y, h * 0.6, Math.PI * 1.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();
    });

    // Floating transparent hearts
    floatingHearts.forEach(fh => {
        fh.phase += 0.01;
        const dx = Math.sin(fh.phase) * 0.6;
        const dy = Math.cos(fh.phase * 0.7) * fh.drift;
        fh.x += dx * 0.2;
        fh.y += dy * 0.2;
        if (fh.x < -20) fh.x = canvas.width + 20; if (fh.x > canvas.width + 20) fh.x = -20;
        if (fh.y < canvas.height * 0.05) fh.y = canvas.height * 0.75;
        if (fh.y > canvas.height * 0.85) fh.y = canvas.height * 0.15;
        ctx.save();
        ctx.globalAlpha = fh.alpha;
        ctx.translate(fh.x, fh.y);
        ctx.scale(fh.size / 18, fh.size / 18);
        ctx.fillStyle = `${fh.color}${Math.min(1, fh.alpha)})`;
        ctx.beginPath();
        ctx.moveTo(0, 6);
        ctx.bezierCurveTo(0, -6, -12, -6, -12, 4);
        ctx.bezierCurveTo(-12, 12, 0, 18, 0, 22);
        ctx.bezierCurveTo(0, 18, 12, 12, 12, 4);
        ctx.bezierCurveTo(12, -6, 0, -6, 0, 6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    });

    // Bokeh lights (soft circles)
    bokeh.forEach(b => {
        const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grd.addColorStop(0, `hsla(${b.hue}, 80%, 85%, ${b.a})`);
        grd.addColorStop(1, `hsla(${b.hue}, 80%, 85%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
    });

    // Petals (falling rose petals)
    petals.forEach(p => {
        p.vy += 0.002;
        p.y += p.vy;
        p.x += Math.sin((p.y + p.wobble) / 26) * 0.8;
        p.rot += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(p.size / 20, p.size / 20);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = 'rgba(255, 182, 193, 0.9)'; // light pink
        ctx.beginPath();
        // petal shape (teardrop)
        ctx.moveTo(0, -10);
        ctx.quadraticCurveTo(8, -6, 10, 0);
        ctx.quadraticCurveTo(8, 10, 0, 12);
        ctx.quadraticCurveTo(-10, 6, -6, 0);
        ctx.quadraticCurveTo(-4, -8, 0, -10);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    });
    // Remove off-screen petals
    for (let i = petals.length - 1; i >= 0; i--) if (petals[i].y > canvas.height + 40) petals.splice(i, 1);

    // Gentle glow sparkles
    sparkles.forEach(s => {
        s.life -= 1;
        s.alpha *= 0.98;
        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
    for (let i = sparkles.length - 1; i >= 0; i--) if (sparkles[i].life <= 0) sparkles.splice(i, 1);

    // Update particles
    for (let i = fireworksParticles.length - 1; i >= 0; i--) {
        const p = fireworksParticles[i];
        p.vy += 0.07; // gravity
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.982;
        drawHeartParticle(p);
        if (p.alpha < 0.04 || p.y > canvas.height + 40) {
            fireworksParticles.splice(i, 1);
        }
    }

    // Update heart shower pieces
    for (let i = heartShowerPieces.length - 1; i >= 0; i--) {
        const s = heartShowerPieces[i];
        s.vy += 0.01;
        s.x += Math.sin((s.y + s.wobble) / 24) * 0.6;
        s.y += s.vy;
        s.alpha *= 0.995;
        // draw
        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.translate(s.x, s.y);
        ctx.scale(s.size / 16, s.size / 16);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(0, 6);
        ctx.bezierCurveTo(0, -6, -12, -6, -12, 4);
        ctx.bezierCurveTo(-12, 12, 0, 18, 0, 22);
        ctx.bezierCurveTo(0, 18, 12, 12, 12, 4);
        ctx.bezierCurveTo(12, -6, 0, -6, 0, 6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        if (s.y > canvas.height + 30 || s.alpha < 0.05) heartShowerPieces.splice(i, 1);
    }
    requestAnimationFrame(fireworksLoop);
}
requestAnimationFrame(fireworksLoop);

// Disable continuous/click fireworks by default; run once on first load
function openingFireworksOnce() {
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height * 0.35;
    spawnHeartFirework(cx, cy, 100);
    setTimeout(() => spawnHeartFirework(cx - 120, cy + 30, 80), 150);
    setTimeout(() => spawnHeartFirework(cx + 120, cy + 30, 80), 300);
}

// Opening banner + one-time fireworks on initial load
const openingBanner = document.getElementById('openingBanner');
const cakeEmoji = document.getElementById('cakeEmoji');
const openingText = document.getElementById('openingText');
window.addEventListener('load', () => {
    // Show cake, then trigger fireworks, then fade out
    setTimeout(() => {
        openingBanner?.classList.add('show-cake');
        // bring canvas above banner so fireworks are visible
        canvas?.classList.add('on-top');
        openingFireworksOnce();
        setTimeout(() => {
            openingBanner?.classList.add('hide');
            canvas?.classList.remove('on-top');
            // Start the song exactly when the opening banner disappears
            if (song) {
                try {
                    song.muted = false;
                    song.volume = 0.7;
                    const playPromise = song.play();
                    if (playPromise && typeof playPromise.then === 'function') {
                        playPromise.catch(() => {
                            // Fallback: wait for first user interaction
                            document.addEventListener('click', async () => {
                                try { song.muted = false; await song.play(); } catch (_) {}
                            }, { once: true });
                        });
                    }
                } catch (_) {
                    // ignore
                }
            }
        }, 1800);
    }, 250);
    // Fallback: force-remove banner after 6s in case transitions fail
    setTimeout(() => {
        if (openingBanner && openingBanner.style && !openingBanner.classList.contains('hide')) {
            openingBanner.classList.add('hide');
        }
    }, 6000);
});

// Shower with Love: trigger fireworks + falling heart shower
function startHeartShower(durationMs = 3500) {
    if (!canvas) return;
    const start = performance.now();
    function addBatch() {
        if (!canvas) return;
        const now = performance.now();
        if (now - start > durationMs) return;
        for (let i = 0; i < 60; i++) {
            heartShowerPieces.push({
                x: Math.random() * canvas.width,
                y: -10 - Math.random() * 80,
                vy: 1 + Math.random() * 1.6,
                size: 8 + Math.random() * 10,
                alpha: 0.9,
                wobble: Math.random() * 100,
                color: `hsl(${Math.random() * 360}, 90%, 65%)`
            });
        }
        setTimeout(addBatch, 160);
    }
    addBatch();
}

confettiBtn?.addEventListener('click', () => {
    confetti();
    // central fireworks fan-out
    if (canvas) {
        const cx = canvas.width / 2;
        const cy = canvas.height * 0.35;
        for (let i = 0; i < 3; i++) {
            spawnHeartFirework(cx + (i - 1) * 80, cy + (i - 1) * 20, 90);
        }
    }
    startHeartShower(4500);
});

// Wire gallery and hero clicks to lightbox
const gallery = document.querySelector('.photos');
gallery?.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'IMG') openLightbox(target.src);
});
const heroPortrait = document.getElementById('heroPortrait');
heroPortrait?.addEventListener('click', () => openLightbox(heroPortrait.src));

