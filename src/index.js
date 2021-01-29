const { app, BrowserWindow } = require('electron');
const path = require('path');
const { cheat } = require('./cheat/index');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.setMenu(null)
  mainWindow.loadFile(path.join(__dirname, './public/index.html'));

  cheat.getProcess();
  mainWindow.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });
  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
