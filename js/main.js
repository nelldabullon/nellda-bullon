// ── DARK MODE ────────────────────────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

// Restore saved theme
const savedTheme = localStorage.getItem('nb-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('nb-theme', next);
});

// ── LANGUAGE TOGGLE ──────────────────────────────────────────────────────────
const langToggle = document.getElementById('lang-toggle');
const langLabel  = document.getElementById('lang-label');

let currentLang = localStorage.getItem('nb-lang') || 'es';
html.setAttribute('data-lang', currentLang);
html.setAttribute('lang', currentLang);
langLabel.textContent = currentLang === 'es' ? 'EN' : 'ES';

function applyLanguage(lang) {
  // Text nodes with data-es / data-en
  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.innerHTML = text;
  });

  // Placeholders
  document.querySelectorAll('[data-es-placeholder][data-en-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  // Select options
  document.querySelectorAll('select option[data-es][data-en]').forEach(opt => {
    opt.textContent = opt.getAttribute(`data-${lang}`);
  });

  // html lang attr
  html.setAttribute('lang', lang);
}

// Apply on load
applyLanguage(currentLang);

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  localStorage.setItem('nb-lang', currentLang);
  html.setAttribute('data-lang', currentLang);
  langLabel.textContent = currentLang === 'es' ? 'EN' : 'ES';
  applyLanguage(currentLang);
});

// ── NAV SCROLL ───────────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── MOBILE MENU ──────────────────────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// ── REVEAL ON SCROLL ─────────────────────────────────────────────────────────
const reveals  = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 80);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObs.observe(el));

// ── CONTACT FORM ─────────────────────────────────────────────────────────────
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn  = form.querySelector('button[type="submit"]');
    const name = form.querySelector('#name').value.split(' ')[0];
    btn.textContent = currentLang === 'es'
      ? `¡Gracias, ${name}! Te respondo pronto.`
      : `Thank you, ${name}! I'll be in touch soon.`;
    btn.disabled = true;
  });
}