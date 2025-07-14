let focus = 100;

export function initFocusMeter() {
  setInterval(() => {
    focus = Math.max(0, focus - Math.random() * 5);
    const el = document.getElementById('focus');
    if (el) el.textContent = `Focus: ${focus.toFixed(1)}%`;
  }, 5000);
}
