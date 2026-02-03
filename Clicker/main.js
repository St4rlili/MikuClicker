const { app, BrowserWindow } = require('electron');
const path = require('path');
const { contextIsolated } = require('process');

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
    });

    const indexPath = path.join(
        __dirname,
        'dist',
        'Clicker',
        'browser',
        'index.html'
    );

    win.loadFile(indexPath);
}

app.whenReady().then(createWindow);