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

// ==========================================================================
// Project detail modal + auto-playing media carousel
// ==========================================================================
//
// HOW TO ADD REAL SCREENSHOTS / SHORT CLIPS LATER:
// Each project's `slides` array below currently uses type:'placeholder'
// (a styled gradient card) so the carousel works out of the box with no
// image assets. To swap in real media, just change an entry to:
//   { type:'image', src:'assets/settleup/1.jpg', caption:'Group dashboard' }
//   { type:'video', src:'assets/settleup/demo.mp4', caption:'Live sync demo' }
// Videos autoplay muted/looped/inline so they behave like short GIFs.
// Keep each project to 3-5 slides.

const PROJECTS = {
  settleup: {
    title: 'SettleUp',
    tag: 'live',
    live: 'https://settle-up-wheat.vercel.app/',
    github: 'https://github.com/Md-IdrisUmaeer/Settle-Up',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'Jest'],
    bullets: [
      'Debt-simplification algorithm reduces group settlements to the minimum number of transactions',
      'Real-time balance & settlement sync across every client via Socket.IO — no manual refresh',
      'Role-based access control for group ownership, including member removal & cascading deletes',
      'JWT auth, bcrypt password hashing & server-side authorization on every state-changing endpoint',
      'Core financial logic covered by a 30+ test Jest suite'
    ],
    slides: [
      { type: 'placeholder', icon: 'settleup', heading: 'Debt simplification', caption: 'Minimum-transaction settlement algorithm' },
      { type: 'placeholder', icon: 'settleup', heading: 'Real-time sync', caption: 'Socket.IO keeps every client in sync' },
      { type: 'placeholder', icon: 'settleup', heading: 'Secured & tested', caption: 'JWT + bcrypt, 30+ Jest tests' }
    ]
  },
  devshelf: {
    title: 'DevShelf',
    tag: 'live',
    live: 'https://dev-shelf-lime.vercel.app/',
    github: 'https://github.com/Md-IdrisUmaeer/Dev-Shelf',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'MUI', 'Axios'],
    bullets: [
      'Browse, search, filter by category & sort community-submitted dev tools, APIs and UI libraries',
      'RESTful Express/Mongoose API with atomic like/unlike counters via MongoDB\'s $inc operator',
      'Input sanitization middleware strips MongoDB operator keys, preventing NoSQL injection',
      'Material UI frontend with client-side URL validation and a submission dialog for new resources',
      'Persistent like state via localStorage'
    ],
    slides: [
      { type: 'placeholder', icon: 'devshelf', heading: 'Browse & filter', caption: 'Search, filter by category, sort results' },
      { type: 'placeholder', icon: 'devshelf', heading: 'Injection-safe API', caption: 'Sanitization middleware blocks NoSQL injection' },
      { type: 'placeholder', icon: 'devshelf', heading: 'Atomic counters', caption: 'Like/unlike via MongoDB $inc' }
    ]
  },
  pokemon: {
    title: 'Who Is That Pokémon?',
    tag: 'live',
    live: 'https://md-idrisumaeer.github.io/whos-that-pokemon/',
    github: 'https://github.com/Md-IdrisUmaeer/whos-that-pokemon',
    stack: ['JavaScript', 'HTML', 'CSS', 'PokeAPI'],
    bullets: [
      'Covers all 151 original Pokémon with live sprites pulled from the public PokeAPI',
      'Silhouette-reveal guessing mechanic checks input on every keystroke, no submit needed',
      'Procedural hint system reveals a random subset of letters in the Pokémon\'s name',
      'Background gradient dynamically recolors based on the Pokémon\'s elemental type(s)'
    ],
    slides: [
      { type: 'placeholder', icon: 'pokemon', heading: 'All 151 Pokémon', caption: 'Sprites pulled live from PokeAPI' },
      { type: 'placeholder', icon: 'pokemon', heading: 'Keystroke matching', caption: 'Guess checked as you type' },
      { type: 'placeholder', icon: 'pokemon', heading: 'Type-based UI', caption: 'Background recolors per elemental type' }
    ]
  }
};

const THUMB_ICONS = {
  settleup: '<svg class="slide-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" stroke="white" stroke-opacity=".35" stroke-width="2"/><path d="M20 32h24M20 32l7-7M20 32l7 7M44 32l-7-7M44 32l-7 7" stroke="white" stroke-opacity=".85" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  devshelf: '<svg class="slide-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="14" width="15" height="15" rx="2" stroke="white" stroke-opacity=".85" stroke-width="2.2"/><rect x="35" y="14" width="15" height="15" rx="2" stroke="white" stroke-opacity=".5" stroke-width="2.2"/><rect x="14" y="35" width="15" height="15" rx="2" stroke="white" stroke-opacity=".5" stroke-width="2.2"/><rect x="35" y="35" width="15" height="15" rx="2" stroke="white" stroke-opacity=".85" stroke-width="2.2"/></svg>',
  pokemon: '<svg class="slide-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="20" stroke="white" stroke-opacity=".85" stroke-width="2.2"/><path d="M12 32h40" stroke="white" stroke-opacity=".85" stroke-width="2.2"/><circle cx="32" cy="32" r="6" fill="white" fill-opacity=".85"/></svg>'
};

const overlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalTag = document.getElementById('modalTag');
const modalBullets = document.getElementById('modalBullets');
const modalStack = document.getElementById('modalStack');
const modalLinks = document.getElementById('modalLinks');
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let slideIndex = 0;
let slideCount = 0;
let autoplayTimer = null;
let lastFocused = null;

function renderSlide(slide) {
  if (slide.type === 'image') {
    return `<div class="carousel-slide"><img src="${slide.src}" alt="${slide.caption || ''}" loading="lazy"></div>`;
  }
  if (slide.type === 'video') {
    return `<div class="carousel-slide"><video src="${slide.src}" autoplay muted loop playsinline></video></div>`;
  }
  const tint = 'tint-' + (Math.abs(hashIdx(slide.heading)) % 3);
  return `<div class="carousel-slide ${tint}">${THUMB_ICONS[slide.icon] || ''}<h4>${slide.heading}</h4><p class="mono">${slide.caption}</p></div>`;
}
function hashIdx(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return h;
}

function goToSlide(i) {
  slideIndex = (i + slideCount) % slideCount;
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
  dotsWrap.querySelectorAll('button').forEach((d, di) => d.classList.toggle('active', di === slideIndex));
}
function startAutoplay() {
  stopAutoplay();
  if (reduceMotion || slideCount < 2) return;
  autoplayTimer = setInterval(() => goToSlide(slideIndex + 1), 4000);
}
function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function openModal(key) {
  const p = PROJECTS[key];
  if (!p) return;
  lastFocused = document.activeElement;

  modalTitle.textContent = p.title;
  modalTag.textContent = p.tag;
  modalBullets.innerHTML = p.bullets.map(b => `<li>${b}</li>`).join('');
  modalStack.innerHTML = p.stack.map(s => `<span class="chip">${s}</span>`).join('');
  modalLinks.innerHTML = `
    <a href="${p.live}" target="_blank" rel="noopener">Live demo →</a>
    <a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>`;

  track.innerHTML = p.slides.map(renderSlide).join('');
  dotsWrap.innerHTML = p.slides.map((_, i) => `<button aria-label="Go to slide ${i + 1}"></button>`).join('');
  slideCount = p.slides.length;
  slideIndex = 0;
  goToSlide(0);
  startAutoplay();

  dotsWrap.querySelectorAll('button').forEach((d, di) => d.addEventListener('click', () => { goToSlide(di); startAutoplay(); }));

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  stopAutoplay();
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('[data-project]').forEach(card => {
  const key = card.getAttribute('data-project');
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // let live/github links behave normally
    openModal(key);
  });
  card.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
      e.preventDefault();
      openModal(key);
    }
  });
});
document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(btn.getAttribute('data-open'));
  });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
prevBtn.addEventListener('click', () => { goToSlide(slideIndex - 1); startAutoplay(); });
nextBtn.addEventListener('click', () => { goToSlide(slideIndex + 1); startAutoplay(); });
document.addEventListener('keydown', (e) => {
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') { goToSlide(slideIndex - 1); startAutoplay(); }
  if (e.key === 'ArrowRight') { goToSlide(slideIndex + 1); startAutoplay(); }
});
document.querySelector('.modal-media').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.modal-media').addEventListener('mouseleave', startAutoplay);
