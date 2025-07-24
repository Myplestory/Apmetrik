import { initAPMTracker, onAPMUpdate } from '../modules/apm.js';
import { initFocusMeter } from '../modules/focus.js';
import { updateTrackInfo } from '../modules/trackinfo.js';

async function loadPartial(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadPartial('header', '../public/components/layout-header.html').then(() => {
  // Initialize APM and Focus systems
  initAPMTracker();
  initFocusMeter();

  // Optional: Listen for APM updates elsewhere
  onAPMUpdate((newAPM) => {
    const apmEl = document.getElementById('apm');
    if (apmEl) apmEl.textContent = `APM: ${newAPM}`;
  });

  // Test static track info
  updateTrackInfo({
    title: 'Apocalypse',
    artist: 'Cigarettes After Sex',
    albumArt: '../assets/cover.jpeg'
  });
});
