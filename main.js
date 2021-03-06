const {app, Menu, BrowserWindow} = require('electron')

const path = require('path')
const url = require('url')

const { OSXtemplate, PCtemplate } = require('./menu/menu')
let mainWindow

app.allowRendererProcessReuse = false

function createWindow () {
  mainWindow = new BrowserWindow({width: 1000, height: 800, webPreferences: {nodeIntegration: false}})

  mainWindow.loadURL('https://codewars.com');
  // mainWindow.webContents.openDevTools()

  if(process.platform === 'darwin') {
    Menu.setApplicationMenu(Menu.buildFromTemplate(OSXtemplate))
  } else if(process.platform !== 'darwin') {
    mainWindow.setMenu(Menu.buildFromTemplate(PCtemplate))
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
