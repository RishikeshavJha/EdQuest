const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const themeBtn = document.getElementById('themeBtn');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  formMessage.textContent = `Thanks, ${name}! Your message has been received for this demo.`;
  contactForm.reset();
});
