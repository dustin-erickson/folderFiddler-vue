import { app, BrowserWindow } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);
if (isDevMode) enableLiveReload();


const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1020,
    height: 600,
    minHeight:350,
    minWidth:800,

  });
  
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(VUEJS_DEVTOOLS);
    mainWindow.webContents.openDevTools();
  }

  //on did-finish load event listener
  mainWindow.webContents.on('did-finish-load', ()=>{
   
    mainWindow.webContents.send('data', "New message send from main to renderer");
  });
  
   //listen for on unresponsive event
   mainWindow.on('unresponsive', ()=>{
    unresponsiveEventWindow = new BrowserWindow({
      width:350,
      height:280,
      maxWidth: 350, 
      maxHeight: 280,
      minWidth:770,
      minHeight:300
    });
    unresponsiveEventWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'src/unresponsiveApp.html'),
      protocol: 'file:',
      slashes: true
    }));
  });
  
   //listen for on resposive event
   mainWindow.on('responsive', ()=>{
    unresponsiveEventWindow = null;
  });
  

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });






};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
