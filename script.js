// 1. Custom Cursor
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
    dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    setTimeout(() => ring.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`, 80);
});

// 2. Video Intro Flow
const iv = document.getElementById('iv');
const vpf = document.getElementById('vpf');
const intro = document.getElementById('intro');
const enterScreen = document.getElementById('enter-screen');
const skipBtn = document.getElementById('skip-btn');
const vprog = document.getElementById('vprog');
const nav = document.getElementById('nav');

function startVideo() {
    enterScreen.classList.add('hide');
    skipBtn.style.display = 'block';
    vprog.style.display = 'block';
    iv.classList.add('show');
    iv.muted = false;
    const playPromise = iv.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            iv.muted = true;
            iv.play();
        });
    }
}

iv.addEventListener('timeupdate', () => {
    if (iv.duration) {
        vpf.style.width = ((iv.currentTime / iv.duration) * 100) + '%';
    }
});

iv.addEventListener('ended', () => finishIntro());

function finishIntro() {
    nav.classList.add('in');
    intro.classList.add('fade-out');
    setTimeout(() => intro.remove(), 1000);
}

function skipIntro() {
    iv.pause();
    finishIntro();
}

// 3. Nucleus Video Force Play
const nv = document.getElementById('nucleus-vid');
nv.muted = true;
nv.loop = true;
nv.play().catch(() => { });

// 4. Scroll Reveal
const ro = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            e.target.style.transitionDelay = `${(i % 3) * 0.1}s`;
            e.target.classList.add('vs');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => ro.observe(el));

// 5. Scroll Dots
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.scroll-dots .dot');
window.addEventListener('scroll', () => {
    const sy = window.scrollY + window.innerHeight / 2;
    let current = 0;
    sections.forEach((el, i) => {
        if (el && el.offsetTop <= sy) current = i;
    });
    dots.forEach((d, i) => d.classList.toggle('on', i === current));
});

// 6. Name Glitch Effect
const nameBig = document.querySelector('.hname-big');
setInterval(() => {
    if (nameBig) {
        nameBig.style.filter = 'blur(1px)';
        setTimeout(() => nameBig.style.filter = '', 70);
    }
}, 5000);
