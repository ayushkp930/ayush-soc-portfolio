const menuButton = document.querySelector('.mobile-toggle');
const menu = document.getElementById('main-nav');
const navLinks = [...menu.querySelectorAll('a')];
function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuButton.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  document.body.classList.toggle('menu-open', open);
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
document.addEventListener('click', event => { if (menu.classList.contains('is-open') && !event.target.closest('.nav-shell')) setMenu(false); });

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('.project-card')];
const filterStatus = document.getElementById('filter-status');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    let visibleCount = 0;
    projectCards.forEach(card => {
      const show = selected === 'all' || card.dataset.category.split(' ').includes(selected);
      card.hidden = !show;
      if (show) visibleCount++;
    });
    filterStatus.textContent = `Showing ${visibleCount} ${selected === 'all' ? '' : selected + ' '}projects`;
  });
});

const toast = document.getElementById('toast');
const copyButton = document.getElementById('copy-email');
const copyLabel = document.getElementById('copy-label');
let toastTimeout;
function showToast(message) { clearTimeout(toastTimeout); toast.textContent = message; toast.classList.add('show'); toastTimeout = setTimeout(() => toast.classList.remove('show'), 2700); }
copyButton.addEventListener('click', async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText('ayushcyberdef@gmail.com');
    else {
      const input = document.createElement('textarea'); input.value = 'ayushcyberdef@gmail.com'; input.style.position = 'fixed'; input.style.opacity = '0'; document.body.append(input); input.select();
      if (!document.execCommand('copy')) throw new Error('Copy failed'); input.remove();
    }
    copyLabel.textContent = 'Email copied!'; showToast('Email copied to clipboard'); setTimeout(() => copyLabel.textContent = 'Copy email', 2600);
  } catch { showToast('Copy unavailable. Email: ayushcyberdef@gmail.com'); }
});

document.getElementById('year').textContent = String(new Date().getFullYear());
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('current', link.getAttribute('href') === '#' + entry.target.id)); });
}, { rootMargin: '-15% 0px -68% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));
