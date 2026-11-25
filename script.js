// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll progress bar and nav state
const nav = document.getElementById('nav');
const progress = document.querySelector('.progress');
let ticking = false;

function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    progress.style.setProperty('--p', Math.min(Math.max(p, 0), 1));
    nav.classList.toggle('scrolled', window.scrollY > 10);
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
    }
}, { passive: true });
onScroll();

// Reveal on scroll, with a small stagger between neighbours
const revealTargets = [
    '.section-head',
    '.card',
    '.skill',
    '.langs',
    '.award',
    '.cta-block',
    '.stat'
];

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--d', `${(i % 4) * 0.08}s`);
        revealObserver.observe(el);
    });
});

// Count-up numbers
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(el) {
    const to = Number(el.dataset.to);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) {
        el.textContent = to + suffix;
        return;
    }
    const duration = 1200;
    const start = performance.now();
    function frame(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(to * eased) + (t === 1 ? suffix : '');
        if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            countUp(entry.target);
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.count').forEach((el) => {
    el.textContent = '0';
    countObserver.observe(el);
});

// Highlight the nav link of the section in view
const links = document.querySelectorAll('.nav-links a');
const sections = [...links]
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            links.forEach((a) => {
                a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((s) => navObserver.observe(s));
