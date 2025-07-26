const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

let overlayWindow;
let mainAppWindow;

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
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false,
    },
  });

  overlayWindow.setBackgroundColor("#00000000");
  overlayWindow.loadFile("public/overlay.html");
}

function createMainAppWindow() {
  mainAppWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    frame: false,
    transparent: false,
    alwaysOnTop: false,
    focusable: true,
    resizable: true,
    show: false, // start hidden
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    // Vite dev server for hot reload
    mainAppWindow.loadURL("http://localhost:5173");
  } else {
    // React production build (Vite's output)
    mainAppWindow.loadFile(path.join(__dirname, "dist/index.html"));
  }

  mainAppWindow.on("close", (e) => {
    e.preventDefault();
    mainAppWindow.hide();
    overlayWindow.showInactive();
  });
}

app.whenReady().then(() => {
  createOverlayWindow();
  createMainAppWindow();

  globalShortcut.register("CommandOrControl+Shift+A", () => {
    if (mainAppWindow.isVisible()) {
      mainAppWindow.hide();
      overlayWindow.showInactive();
    } else {
      overlayWindow.hide();
      mainAppWindow.show();
      mainAppWindow.focus();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createOverlayWindow();
      createMainAppWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
