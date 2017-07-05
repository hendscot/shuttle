const electron = require('electron')
    // Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

const Menu = electron.Menu
const Tray = electron.Tray

let appIcon;

let popup;

ipc.on('put-in-tray', function(event) {
    const iconName = 'rocket.png'
    const iconPath = path.join(__dirname, iconName)
    appIcon = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([{
            label: 'Restore',
            click: function() {
                appIcon.destroy();
                mainWindow.maximize();
            },
        },
        {
            label: 'Exit',
            click: function() {
                appIcon.destroy();
                mainWindow.close();
            }
        }
    ])

    appIcon.setToolTip('Shuttle');
    appIcon.setContextMenu(contextMenu)
    appIcon.on('click', function() {
        appIcon.destroy();
        mainWindow.maximize();
    })
})

ipc.on('remove-tray', function() {
    appIcon.destroy()
    mainWindow.maximize();
})



app.on('window-all-closed', function() {
    if (appIcon) appIcon.destroy()
})

var fs = require('fs');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true
    });
    mainWindow.maximize();
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    mainWindow.setMenu = null;
    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    /*popup = new BrowserWindow({
        width: 600,
        height: 250,
        frame: true
    })
    popup.focus();
    popup.loadURL(url.format({
        pathname: path.join(__dirname, 'api.html'),
        protocol: 'file',
        slashes: true
    }))
    popup.webContents.on('will-navigate', function(event, url) {
        console.log(url);
    })*/
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }

    app.on('browser-window-created', function(e, window) {
        window.setMenu(null);
    });
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()

    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.