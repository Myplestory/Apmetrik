const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, 'data', 'state.json');

contextBridge.exposeInMainWorld('apmetrik', {
  getSettings: () => {
    try {
      return JSON.parse(fs.readFileSync(settingsPath));
    } catch {
      return {};
    }
  },
  saveSettings: (data) => {
    fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
  }
});