const buttons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

export function initSectionRouter() {
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      sections.forEach(section => {
        section.classList.toggle('active', section.id === `${target}-section`);
        section.classList.toggle('hidden', section.id !== `${target}-section`);
      });
    });
  });
}

initSectionRouter();
