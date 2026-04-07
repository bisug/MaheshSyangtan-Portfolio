document.addEventListener('DOMContentLoaded', () => {
  // ── TYPED TEXT ──
  const roles = [
    'Cybersecurity Student',
    'Web Developer',
    'Based in Nepal',
    'Networking Enthusiast',
    'Always Learning...'
  ];
  let ri = 0, ci = 0, deleting = false;
  const typedEl = document.getElementById('typed');

  function type() {
    if (!typedEl) return;
    const cur = roles[ri];
    if (!deleting) {
      typedEl.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = cur.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 45 : 75);
  }
  if (typedEl) setTimeout(type, 1200);

  // blinking cursor
  const cursor = document.getElementById('cursor');
  if (cursor) {
    setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
  }

  // ── SCROLL REVEAL ──
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .section-heading').forEach(el => io.observe(el));

  // ── ACTIVE NAV ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const navIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`nav a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--red)';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navIo.observe(s));

  // ── STICKY NOTE WOBBLE ──
  document.querySelectorAll('.sticky').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      card.style.transform = `rotate(${x * 1.8}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
});
