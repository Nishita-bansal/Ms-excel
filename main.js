// npm init -y
// npm install electron--- isse electron install hojayega 
const electron = require("electron");
// npm init -y
// npm install electron
// "start":"electron ."
// npm install ejs-electron

// electron logic


const {app , BrowserWindow} = electron;
const ejse = require("ejs-electron");

//const ejse = require("ejs-electron");
function createWindow(){
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // desktop appplication usme node enable
          //enableRemoteModule:true
        }
      })
      win.loadFile('index.ejs').then(function(){
      win.maximize();
      win.webContents.openDevTools();
      });
    }
app.whenReady().then(createWindow);