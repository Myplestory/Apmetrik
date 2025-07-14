const { app, BrowserWindow } = require('electron');
const { globalShortcut } = require('electron');
const path = require('path');


function createOverlayWindow() {
  const PADDING_X = 8;
  const PADDING_Y = 8;
  overlayWindow = new BrowserWindow({
    width: 600,
    height: 36,
    x: PADDING_X,
    y: PADDING_Y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    focusable: false,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: false,
    }
  });

  overlayWindow.setBackgroundColor('#00000000');
  overlayWindow.loadFile('public/overlay.html');
}

function createMainAppWindow() {
  mainAppWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    transparent: false,
    alwaysOnTop: false,
    focusable: true,
    resizable: true,
    show: false, // Start hidden
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  mainAppWindow.loadFile('public/app.html');
  mainAppWindow.on('close', (e) => {
    e.preventDefault();
    mainAppWindow.hide();
    overlayWindow.showInactive();
  });
}


app.whenReady().then(() => {
  createOverlayWindow();
  createMainAppWindow();

  globalShortcut.register('CommandOrControl+Shift+A', () => {
    if (mainAppWindow.isVisible()) {
      mainAppWindow.hide();
      overlayWindow.showInactive();
    } else {
      overlayWindow.hide();
      mainAppWindow.show();
      mainAppWindow.focus();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createOverlayWindow();
      createMainAppWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
