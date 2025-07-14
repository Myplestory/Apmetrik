export function updateTrackInfo({ title, artist, albumArt }) {
  const textEl = document.getElementById('scrollText');
  const albumEl = document.querySelector('.album-art-small');

  if (textEl) textEl.textContent = `${title} - ${artist}`;
  if (albumEl) albumEl.src = albumArt;
}
