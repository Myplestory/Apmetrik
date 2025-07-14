let apmCount = 0;
let currentAPM = 0;
const listeners = [];

// Track input events
export function initAPMTracker() {
  document.addEventListener('keydown', () => {
    apmCount++;
  });

  setInterval(() => {
    currentAPM = apmCount * 60;
    apmCount = 0;

    // Update UI
    const apmEl = document.getElementById('apm');
    if (apmEl) apmEl.textContent = `APM: ${currentAPM}`;

    // Notify listeners
    listeners.forEach(cb => cb(currentAPM));
  }, 1000); // every 10s
}

// Allow other modules to listen to APM updates
export function onAPMUpdate(callback) {
  listeners.push(callback);
}

// Get latest APM value
export function getCurrentAPM() {
  return currentAPM;
}
