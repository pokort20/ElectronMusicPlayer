import type { Song } from "./models/Song.js" with { "resolution-mode": "import" };

const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    playSong: (songid: number) => {
        console.log("PRELOAD:playSong");
        return electron.ipcRenderer.invoke("playSong", songid);
    },
    playPlaylist: (playlistId: number) => {
        console.log("PRELOAD:playPlaylist", playlistId);
        return electron.ipcRenderer.invoke("playPlaylist", playlistId);
      },
    playAlbum: (albumId: number) => {
        console.log("PRELOAD:playAlbum", albumId);
        return electron.ipcRenderer.invoke("playAlbum", albumId);
    },
    playArtist: (artistId: number) => {
        console.log("PRELOAD:playArtist", artistId);
        return electron.ipcRenderer.invoke("playArtist", artistId);
    },
    playPodcast: (podcastId: number) => {
        console.log("PRELOAD:playPodcast", podcastId);
        return electron.ipcRenderer.invoke("playPodcast", podcastId);
    },
    playPause: () => {
        console.log("PRELOAD:playPause");
        return electron.ipcRenderer.invoke("playPause");
    },
    mute: () => {
        console.log("PRELOAD:mute");
        electron.ipcRenderer.invoke("mute");
    },
    changeVolume: (volume: number) => {
        console.log("PRELOAD:changeVolume", volume);
        electron.ipcRenderer.invoke("changeVolume", volume);
    },
    next: () => {
        console.log("PRELOAD:next");
        return electron.ipcRenderer.invoke("next");
    },
    previous: () => {
        console.log("PRELOAD:previous");
        return electron.ipcRenderer.invoke("previous");
    },
    shuffle: () => {
        console.log("PRELOAD:shuffle");
        return electron.ipcRenderer.invoke("shuffle");
    },
    repeat: () => {
        console.log("PRELOAD:repeat");
        return electron.ipcRenderer.invoke("repeat");
    },



    searchDB: (searchTerm: string) => {
        console.log("PRELOAD:searchDB", searchTerm);
        return electron.ipcRenderer.invoke("searchDB", searchTerm);
    },


    //subscribtions
    subVolume: (callback: (volume: number) => void) => {
        electron.ipcRenderer.on("volumeChanged", (_: any, data: number) => {
            callback(data);
        })
    },
    songDescriptionChanged: (callback: (description: { name: string, artist: string }) => void) => {
        console.log("PRELOAD:songDescriptionChanged");
        electron.ipcRenderer.on("songDescriptionChanged", (_: any, data: { name: string, artist: string }) => {
            callback(data);
        });
    },
    songQueueChanged: (callback: (queue: Song[]) => void) => {
        console.log("PRELOAD:subSongQueueChanged");
        electron.ipcRenderer.on("songQueueChanged", (_: any, data: Song[]) => {
            callback(data);
        });
    },
    isPlayingChanged: (callback: (isPlaying: boolean) => void) => {
        console.log("PRELOAD:isPlayingChanged");
        electron.ipcRenderer.on("isPlayingChanged", (_: any, data: boolean) => {
            callback(data);
        });
    },
    shuffleChanged: (callback: (shuffle: boolean) => void) => {
        console.log("PRELOAD:shuffleChanged");
        electron.ipcRenderer.on("shuffleChanged", (_: any, data: boolean) => {
            callback(data);
        });
    },
    repeatChanged: (callback: (repeat: boolean) => void) => {
        console.log("PRELOAD:repeatChanged");
        electron.ipcRenderer.on("repeatChanged", (_: any, data: boolean) => {
            callback(data);
        });
    },
});



electron.contextBridge.exposeInMainWorld("api", {
    loadPlaylists: (accountId: number) => {
        console.log("PRELOAD:loadPlaylists", accountId);
        return electron.ipcRenderer.invoke("load-playlists", accountId);
    },
    loadArtists: (accountId: number) => {
        console.log("PRELOAD:loadArtists", accountId);
        return electron.ipcRenderer.invoke("load-artists", accountId);
    },
    loadAlbums: (accountId: number) => {
        console.log("PRELOAD:loadAlbums", accountId);
        return electron.ipcRenderer.invoke("load-albums", accountId);
    },
    loadPodcasts: (accountId: number) => {
        console.log("PRELOAD:loadPodcasts", accountId);
        return electron.ipcRenderer.invoke("load-podcasts", accountId);
    },
    loadSuggestedSongs: (accountId: number, count: number) => {
        console.log("PRELOAD:loadSuggestedSongs", accountId, count);
        return electron.ipcRenderer.invoke("load-suggested-songs", accountId, count);
    },
    loadSuggestedArtists: (accountId: number, count: number) => {
        console.log("PRELOAD:loadSuggestedArtists", accountId, count);
        return electron.ipcRenderer.invoke("load-suggested-artists", accountId, count);
    }

});  
