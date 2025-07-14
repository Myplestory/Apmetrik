const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('apmetrik-theme', theme);
  if (themeToggle) themeToggle.checked = theme === 'dark';
}

export function initTheme() {
  const stored = localStorage.getItem('apmetrik-theme') || 'dark';
  applyTheme(stored);

  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      applyTheme(themeToggle.checked ? 'dark' : 'light');
    });
  }
}

initTheme(); // auto-init when script loads
