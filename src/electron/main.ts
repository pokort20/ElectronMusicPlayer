import { app, BrowserWindow, MenuItemConstructorOptions, Menu, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import * as dataHandler from './database/datahandler.js';
import audioPlayer from './audioplayer.js';
import songQueue from './songqueue.js';
import audioplayer from "./audioplayer.js";
import songqueue from "./songqueue.js";
import { Playlist } from "./models/Playlist.js";

app.on("ready", () => {
  const apppath = path.join(app.getAppPath(), './dist-electron/preload.cjs');
  const mainWindow = new BrowserWindow({
    title: "ElectronPlayer",
    resizable: false,
    fullscreen: false,
    minWidth: 1400,
    minHeight: 830,
    width: 1400,
    height: 830,
    webPreferences: {
      preload: apppath,
    },
  });
  //pass window reference to the songQueue
  songQueue.window = mainWindow;
  audioPlayer.window = mainWindow;

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5247/");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
  let isPlaying = false;

  //player control handles
  ipcMain.handle("playSong", async (_, song) => {
    isPlaying = !isPlaying;
    console.log("HANDLE:playSong");
    songQueue.currentPlayingSong = song;
    return isPlaying;
  });
  ipcMain.handle("playPlaylist", async (_, playlistId) => {
    console.log("HANDLE:playPlaylist", playlistId);
    const songs = await dataHandler.getSongsByPlaylist(playlistId);
    songqueue.clearQueue();
    songQueue.addSongs(songs);
    return isPlaying;
  });

  ipcMain.handle("playAlbum", async (_, albumId) => {
    console.log("HANDLE:playAlbum", albumId);
    // const songs = await dataHandler.getSongsByAlbum(albumId);
    // songqueue.clearQueue();
    // songQueue.addSongs(songs);
    // audioPlayer.play(songqueue.currentPlayingSong);
    return isPlaying;
  });

  ipcMain.handle("playArtist", async (_, artistId) => {
    console.log("HANDLE:playArtist", artistId);
    const songs = await dataHandler.getSongsByArtist(artistId);
    songqueue.clearQueue();
    songQueue.addSongs(songs);
    return isPlaying;
  });

  ipcMain.handle("playPodcast", async (_, podcastId) => {
    console.log("HANDLE:playPodcast", podcastId);
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
  ipcMain.handle("next", () => {
    console.log("HANDLE:next");
    songQueue.next();
  });

  ipcMain.handle("previous", () => {
    console.log("HANDLE:previous");
    songQueue.previous();
  });

  ipcMain.handle("shuffle", () => {
    console.log("HANDLE:shuffle");
    songQueue.Shuffle();
  });

  ipcMain.handle("repeat", () => {
    console.log("HANDLE:repeat");
    songQueue.Repeat();
  });

  ipcMain.handle('showContextMenu', async (event, accountId: number, object: any) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;

    let template: MenuItemConstructorOptions[] = [];
    if (await dataHandler.isInFavourites(accountId, object)) {
      template.push({
        label: 'Remove from favourites',
        click: async () => {
          await dataHandler.removeFromFavourites(accountId, object);
          switch (object?.type.toLowerCase()) {
            case 'album': {
              mainWindow.webContents.send("albumsChanged", await dataHandler.getAlbumsByAccount(accountId));
              break;
            }

            case 'artist': {
              mainWindow.webContents.send("artistsChanged", await dataHandler.getArtistsByAccount(accountId));
              break;
            }

            case 'podcast': {
              mainWindow.webContents.send("podcastsChanged", await dataHandler.getPodcastsByAccount(accountId));
              break;
            }

            case 'playlist': {
              mainWindow.webContents.send("playlistsChanged", await dataHandler.getPlaylistsByAccount(accountId));
              break;
            }

            default:
              console.log("unable to add unknown type to favourites:", object?.type);
          }
        }
      });
    }
    else {
      template.push({
        label: 'Add to favourites',
        click: async () => {
          console.log("Adding to faviourites");
          await dataHandler.addToFavourites(accountId, object);
          switch (object?.type.toLowerCase()) {
            case 'album': {
              mainWindow.webContents.send("albumsChanged", await dataHandler.getAlbumsByAccount(accountId));
              break;
            }

            case 'artist': {
              mainWindow.webContents.send("artistsChanged", await dataHandler.getArtistsByAccount(accountId));
              break;
            }

            case 'podcast': {
              mainWindow.webContents.send("podcastsChanged", await dataHandler.getPodcastsByAccount(accountId));
              break;
            }

            case 'playlist': {
              mainWindow.webContents.send("playlistsChanged", await dataHandler.getPlaylistsByAccount(accountId));
              break;
            }

            default:
              console.log("unable to add unknown type to favourites:", object?.type);
          }

        }
      },)
    }
    if (object?.type.toLowerCase() === 'song') {
      let submenuTemplate: MenuItemConstructorOptions[] = [];
      await dataHandler.getPlaylistsByAccount(accountId).then(playlists => {
        playlists.forEach(p => {
          if (p.ownerid == accountId) {
            submenuTemplate.push({
              label: p.name,
              click: () => {
                dataHandler.addToPlaylist(accountId, object, p);
              }
            })
          }
        });
      });
      template.push({
        label: 'Add to playlist',
        submenu: submenuTemplate
      },)
    }
    if (object?.type.toLowerCase() === 'playlist') {
      const playlist = object as Playlist;
      if (playlist.ownerid === accountId) {
        template.push({
          label: 'Delete playlist',
          click: async () => {
            await dataHandler.deletePlaylist(accountId, playlist.id);
            mainWindow.webContents.send("playlistsChanged", await dataHandler.getPlaylistsByAccount(accountId));
          }
        },)
      }
    }

    // template.push({
    //   label: 'Inspect Element',
    //   click: () => win.webContents.openDevTools()
    // });


    const menu = Menu.buildFromTemplate(template);
    menu.popup({ window: win });
  });






  ipcMain.handle("searchDB", (searchTerm) => {
    console.log("HANDLE:searchDB");
    // @ts-ignore
    return dataHandler.searchSongs(searchTerm).then((songs) => {
      console.log("HANDLE:searchDB Results:", songs);
      return songs;
    });
  });

  //API handles
  ipcMain.handle("add-new-playlist", async (_, accountId: number, name: string) => {
    console.log("HANDLE:add-new-playlist", name);
    await dataHandler.addNewPlaylist(accountId, name);
    mainWindow.webContents.send("playlistsChanged", await dataHandler.getPlaylistsByAccount(accountId));
  });
  ipcMain.handle("load-playlists", async (_, accountId) => {
    console.log("HANDLE:load-playlists");
    return await dataHandler.getPlaylistsByAccount(accountId);
  });
  ipcMain.handle("load-artists", async (_, accountId) => {
    console.log("HANDLE:load-artists");
    return await dataHandler.getArtistsByAccount(accountId);
  });
  ipcMain.handle("load-albums", async (_, accountId) => {
    console.log("HANDLE:load-albums");
    return await dataHandler.getAlbumsByAccount(accountId);
  });
  ipcMain.handle("load-podcasts", async (_, accountId) => {
    console.log("HANDLE:load-podcasts");
    return await dataHandler.getPodcastsByAccount(accountId);
  });
  ipcMain.handle("load-suggested-songs", async (_, accountId, count) => {
    console.log("HANDLE:load-suggested-songs");
    return await dataHandler.getSuggestedSongs(accountId, count);
  });
  ipcMain.handle("load-suggested-artists", async (_, accountId, count) => {
    console.log("HANDLE:load-suggested-artists");
    return await dataHandler.getSuggestedArtists(accountId, count);
  });
  ipcMain.handle("search-songs", async (_, searchTerm) => {
    console.log("HANDLE:search-songs");
    return await dataHandler.searchSongs(searchTerm);
  });

  ipcMain.handle("search-artists", async (_, searchTerm) => {
    console.log("HANDLE:search-artists");
    return await dataHandler.searchArtists(searchTerm);
  });

  ipcMain.handle("search-albums", async (_, searchTerm) => {
    console.log("HANDLE:search-albums");
    return await dataHandler.searchAlbums(searchTerm);
  });

  ipcMain.handle("search-podcasts", async (_, searchTerm) => {
    console.log("HANDLE:search-podcasts");
    return await dataHandler.searchPodcasts(searchTerm);
  });

  ipcMain.handle("search-playlists", async (_, searchTerm) => {
    console.log("HANDLE:search-playlists");
    return await dataHandler.searchPlaylists(searchTerm);
  });


  console.log(apppath);
});


