// ---------- tide progress bar ----------
const tide = document.getElementById('tide');
function updateTide(){
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
  tide.style.transform = 'scaleX(' + Math.min(scrolled, 1) + ')';
}
document.addEventListener('scroll', updateTide);
updateTide();

// ---------- mobile nav toggle ----------
const toggle = document.getElementById('navtoggle');
const links = document.getElementById('navlinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// ---------- active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.navlinks a');
function setActive(){
  let current = sections[0].id;
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
  navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
document.addEventListener('scroll', setActive);
setActive();

// ---------- reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- auto-advancing project highlight carousel (no clicking needed) ----------
document.querySelectorAll('.thumb-carousel').forEach(car => {
  const items = car.querySelectorAll('.cc-item');
  if (items.length < 2) return;
  let idx = 0;
  setInterval(() => {
    items[idx].classList.remove('active');
    idx = (idx + 1) % items.length;
    items[idx].classList.add('active');
  }, 2600);
});
