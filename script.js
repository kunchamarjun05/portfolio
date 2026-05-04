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
    const el = document.querySelector('.hero-metrics');
    if(!el) return;
    if(el.getBoundingClientRect().top < innerHeight){
        counted = true;
        document.querySelectorAll('.metric-num').forEach(n => {
            const end = +n.dataset.count; let cur = 0;
            const timer = setInterval(() => { cur += Math.ceil(end/30); if(cur>=end){cur=end;clearInterval(timer)} n.textContent=cur; }, 40);
        });
    }
}
window.addEventListener('scroll', animateCounters);
animateCounters();

// Scroll reveal
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
}, { threshold:0.1, rootMargin:'0px 0px -40px 0px' });
document.querySelectorAll('.proj-card,.proj-hero,.sk,.cl,.about-grid,.contact-box').forEach(el => { el.classList.add('reveal'); obs.observe(el); });

// Form
document.getElementById('cForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<span>✓ Sent!</span>'; btn.style.background = '#22c55e';
    setTimeout(() => { btn.innerHTML = '<span>Send Message</span>'; btn.style.background = ''; e.target.reset(); }, 2500);
});

// Mobile menu
document.getElementById('menuBtn')?.addEventListener('click', () => {
    const l = document.getElementById('navLinks');
    const open = l.style.display === 'flex';
    Object.assign(l.style, open ? {display:'none'} : {display:'flex',flexDirection:'column',position:'absolute',top:'56px',right:'24px',background:'rgba(5,5,8,.95)',padding:'16px 24px',borderRadius:'12px',border:'1px solid rgba(255,255,255,.06)',backdropFilter:'blur(20px)'});
});
