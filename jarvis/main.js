import { app, BrowserWindow,ipcMain } from 'electron';
import path from 'path';
import memoryMap from './memoryMap.js';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Load the Vite dev server URL in development
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:5173' // Vite's default port is 5173
            : `file://${path.join(__dirname, 'dist/index.html')}` // 'dist' is Vite's default build output directory
    );

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

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

ipcMain.handle('read-memory-map', async (event, filePath) => {
    try {
      const buffer = memoryMap.createMemoryMap(filePath);
      // Convert to regular array/string as needed
      const data = Buffer.from(buffer).toString();
      return data;
    } catch (error) {
      console.error('Memory mapping failed:', error);
      throw error;
    }
  });