// Typewriter
const roles = ['Full-Stack Developer', 'Machine Learning Engineer', 'Data Analyst', 'UI/UX Enthusiast'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');
function typewrite() {
    const current = roles[roleIdx];
    typeEl.textContent = deleting ? current.substring(0, charIdx--) : current.substring(0, charIdx++);
    if (!deleting && charIdx > current.length) { setTimeout(() => { deleting = true; typewrite(); }, 1800); return; }
    if (deleting && charIdx < 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typewrite, 400); return; }
    setTimeout(typewrite, deleting ? 40 : 80);
}
typewrite();

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' }); });
});

// Active nav
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const y = scrollY + 200;
    sections.forEach(s => {
        const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
        if (link) link.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
    });
});

// Cursor glow
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

// Stat counters
let counted = false;
function animateCounters() {
    if (counted) return;
    const el = document.querySelector('.hero-stats');
    if (!el) return;
    if (el.getBoundingClientRect().top < innerHeight) {
        counted = true;
        document.querySelectorAll('.h-stat-num').forEach(n => {
            const end = +n.dataset.count; let cur = 0;
            const timer = setInterval(() => { cur += Math.ceil(end / 40); if (cur >= end) { cur = end; clearInterval(timer); } n.textContent = cur; }, 30);
        });
    }
}
window.addEventListener('scroll', animateCounters);
animateCounters();

// Skill bars
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.querySelectorAll('.skill-fill').forEach(f => f.classList.add('animated')); });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-grid').forEach(g => skillObs.observe(g));

// Scroll reveal
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.project-card, .skill-card, .info-card, .c-card, .cert-card, .highlight, .about-text').forEach(el => {
    el.classList.add('reveal'); revealObs.observe(el);
});

// Form
document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<span>✓ Message Sent!</span>'; btn.style.background = '#22c55e';
    setTimeout(() => { btn.innerHTML = '<span>Send Message</span>'; btn.style.background = ''; e.target.reset(); }, 2500);
});

// Mobile menu
document.getElementById('hamburger')?.addEventListener('click', function () {
    const links = document.getElementById('navLinks');
    const open = links.style.display === 'flex';
    Object.assign(links.style, open ? { display: 'none' } : {
        display: 'flex', flexDirection: 'column', position: 'absolute', top: '60px', right: '24px',
        background: 'rgba(8,8,15,.95)', padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,.07)'
    });
});
