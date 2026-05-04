// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior:'smooth' }); });
});

// Active nav
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const y = scrollY + 200;
    sections.forEach(s => {
        const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
        if(link) link.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
    });
});

// Stat counters
let counted = false;
function animateCounters(){
    if(counted) return;
    const el = document.querySelector('.stats-row');
    if(!el) return;
    if(el.getBoundingClientRect().top < innerHeight){
        counted = true;
        document.querySelectorAll('.stat-num').forEach(n => {
            const end = +n.dataset.count; let cur = 0;
            const timer = setInterval(() => { cur += Math.ceil(end/30); if(cur>=end){cur=end;clearInterval(timer)} n.textContent=cur; }, 50);
        });
    }
}
window.addEventListener('scroll', animateCounters);

// Scroll reveal
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
}, { threshold:0.1 });
document.querySelectorAll('.proj-card,.proj-featured,.stat-box,.skill-item,.about-grid,.contact-wrapper').forEach(el => { el.classList.add('reveal'); obs.observe(el); });

// Form
document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = '✓ Message Sent!'; btn.style.background = '#0d7377'; btn.style.color = '#fff';
    setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; btn.style.color = ''; e.target.reset(); }, 2500);
});
