// Nav active state
const navLinks = document.querySelectorAll('.nav a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const y = scrollY + 200;
    sections.forEach(s => {
        const link = document.querySelector(`.nav a[href="#${s.id}"]`);
        if(link && !link.classList.contains('nav-cta'))
            link.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'}); });
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
}, {threshold:.1, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.case-card,.sm-card,.bento-card,.polaroid,.about-text,.contact-box').forEach(el => {
    el.classList.add('reveal'); obs.observe(el);
});
