const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const nav = document.getElementById('nav');
const menuToggle = document.querySelector('.menu-toggle');
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const moonIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>
  </svg>
`;

const sunIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"/>
  </svg>
`;

const applyTheme = (isDark) => {
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('dark', isDark);
  themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
  applyTheme(!document.documentElement.classList.contains('dark'));
});

if (menuToggle) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

document.querySelectorAll('.nav a').forEach((a) => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill in your name, email and message.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    formMessage.textContent = 'Thanks! Your message has been validated. Connect with me by email to send it.';
    form.reset();
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.project, .timeline-item, .extras');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal-target');
    target.style.transitionDelay = `${(index % 3) * 90}ms`;
    revealObserver.observe(target);
  });
}
