const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const storedTheme = localStorage.getItem('portfolio-theme');

if (storedTheme === 'dark') {
  root.dataset.theme = 'dark';
}

function updateThemeLabel() {
  const isDark = root.dataset.theme === 'dark';
  themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

updateThemeLabel();
themeToggle.addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark';
  if (isDark) {
    delete root.dataset.theme;
    localStorage.setItem('portfolio-theme', 'light');
  } else {
    root.dataset.theme = 'dark';
    localStorage.setItem('portfolio-theme', 'dark');
  }
  updateThemeLabel();
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const portraitImage = document.querySelector('.portrait-image');
portraitImage.addEventListener('load', () => portraitImage.parentElement.classList.add('has-image'));
portraitImage.addEventListener('error', () => portraitImage.remove());

const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(formData.get('subject'));
  const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
  window.location.href = `mailto:keinthambo.tech@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Opening your email app...';
});
