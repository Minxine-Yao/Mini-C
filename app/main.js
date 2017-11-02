// 主进程

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url')

let win;
var width = 800;
var height = 600;

function createWindow() {
    // 创建浏览器窗口
    win = new BrowserWindow({width: width, height: height});

    // 加载应用内的index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/src/index/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })
    
    const {globalShortcut} = require('electron');
    globalShortcut.register('F11', () => {
        // 全屏模式
        win.setFullScreen(!win.isFullScreen());
        win.setMenuBarVisibility(!win.isMenuBarVisible());
    });
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});