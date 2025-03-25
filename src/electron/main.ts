import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import * as dataHandler from './database/datahandler.js';
import audioPlayer from './audioplayer.js';
import songQueue from './songqueue.js';
import audioplayer from "./audioplayer.js";

app.on("ready", () => {
    const apppath = path.join(app.getAppPath(), './dist-electron/preload.cjs');
  const mainWindow = new BrowserWindow({
    title: "AvaloniaPlayer",
    minWidth: 1200,
    minHeight: 600,
    width: 1280,
    height: 720,
    webPreferences: {
        preload: apppath,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5247/");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
  let isPlaying = false;


//electron handles
ipcMain.handle("playSong", () => {
  isPlaying = !isPlaying;
  console.log("HANDLE:playSong");
  audioPlayer.play(songQueue.currentPlayingSong);
  return isPlaying;
});
ipcMain.handle("playPause", () => {
  isPlaying = !isPlaying;
  console.log("HANDLE:playPause");
  return audioplayer.playPause(songQueue.currentPlayingSong);
});
ipcMain.handle("mute", () => {
  console.log("HANDLE:mute");
  audioPlayer.mute();
  mainWindow.webContents.send("volumeChanged", audioPlayer.volume);
});
ipcMain.handle("changeVolume", (event, volume) => {
  console.log("HANDLE:changeVolume", volume);
  // @ts-ignore
  audioPlayer.changeVolume(volume);
  mainWindow.webContents.send("volumeChanged", volume);
});

ipcMain.handle("searchDB", (searchTerm) => {
  console.log("HANDLE:searchDB");
  // @ts-ignore
  return dataHandler.searchSongs(searchTerm).then((songs) => {
    console.log("HANDLE:searchDB Results:", songs);
    return songs;
  });
});
 // array

 //API handles
 ipcMain.handle("load-playlists", async (_, accountId) => {
  return await dataHandler.getPlaylistsByAccount(accountId);
});

ipcMain.handle("load-artists", async (_, accountId) => {
  return await dataHandler.getArtistsByAccount(accountId);
});

ipcMain.handle("load-podcasts", async (_, accountId) => {
  return await dataHandler.getPodcastsByAccount(accountId);
});
  console.log(apppath);
});


