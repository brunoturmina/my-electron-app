const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: 'corvo.jpg',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // ipcMain.on('set-title', (event, title) => {
  //   const webContents = event.sender
  //   const win = BrowserWindow.fromWebContents(webContents)
  //   win.setTitle(title)
  //   shell.openPath(app.getAppPath() + '\\batchtest.bat')
  // })

  ipcMain.on('set-title', (event) => {
    shell.openPath(app.getAppPath() + '\\batchtest.bat')
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})