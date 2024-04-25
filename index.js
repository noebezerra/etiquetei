const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('node:path');
const Database = require('./infra/database');

// live reload
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // devTools: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'pages', 'index.html'));
  mainWindow.webContents.openDevTools();
};

ipcMain.handle('dados:products', async (event, args) => {
  event.preventDefault();
  const produto = args[0];
  const database = new Database();
  const products = await database.getProducts(produto);
  // database.destroy();
  return products;
});

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  } else {
    nativeTheme.themeSource = 'dark';
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system';
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
