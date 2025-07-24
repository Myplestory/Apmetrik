const { contextBridge, ipcRenderer } = require("electron");
const apm = require("./src/modules/apm");
const focus = require("./src/modules/focus");
const spotify = require("./src/modules/spotify");

contextBridge.exposeInMainWorld("apmetrik", {
  getApm: () => apm.getCurrentApm(),
  onApmUpdate: (callback) => ipcRenderer.on("apm-update", (_e, data) => callback(data)),
  playSong: (songId) => spotify.play(songId),
  getFocus: () => focus.getCurrentState(),
});

