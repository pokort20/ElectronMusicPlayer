import type { Song } from "./models/Song.js" with { "resolution-mode": "import" };
import type { Album } from "./models/Album.js" with { "resolution-mode": "import" };
import type { Playlist } from "./models/Playlist.js" with { "resolution-mode": "import" };
import type { Artist } from "./models/Artist.js" with { "resolution-mode": "import" };
import type { Podcast } from "./models/Podcast.js" with { "resolution-mode": "import" };


const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    playSong: (song: Song) => {
        console.log("PRELOAD:playSong");
        return electron.ipcRenderer.invoke("playSong", song);
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
    showContextMenu: (accountId: number, object: any) => {
        console.log("PRELOAD:showContextMenu");
        electron.ipcRenderer.invoke("showContextMenu", accountId, object)
    },



    // searchDB: (searchTerm: string) => {
    //     console.log("PRELOAD:searchDB", searchTerm);
    //     return electron.ipcRenderer.invoke("searchDB", searchTerm);
    // },


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
    albumsChanged: (callback: (albums: Album[]) => void) => {
        console.log("PRELOAD:subAlbumsChanged");
        electron.ipcRenderer.on("albumsChanged", (_: any, data: Album[]) => {
            callback(data);
        });
    },

    playlistsChanged: (callback: (playlists: Playlist[]) => void) => {
        console.log("PRELOAD:subPlaylistsChanged");
        electron.ipcRenderer.on("playlistsChanged", (_: any, data: Playlist[]) => {
            callback(data);
        });
    },

    artistsChanged: (callback: (artists: Artist[]) => void) => {
        console.log("PRELOAD:subArtistsChanged");
        electron.ipcRenderer.on("artistsChanged", (_: any, data: Artist[]) => {
            callback(data);
        });
    },

    podcastsChanged: (callback: (podcasts: Podcast[]) => void) => {
        console.log("PRELOAD:subPodcastsChanged");
        electron.ipcRenderer.on("podcastsChanged", (_: any, data: Podcast[]) => {
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
    songProgressChanged: (callback: (progress: { elapsed: string, remaining: string }) => void) => {
        console.log("PRELOAD:songProgressChanged");
        electron.ipcRenderer.on("songProgressChanged", (_: any, data: { elapsed: string, remaining: string }) => {
            callback(data);
        });
    },
});



electron.contextBridge.exposeInMainWorld("api", {
    addNewPlaylist: (accountId: number, name: string) => {
        console.log("PRELOAD:addNewPlaylist, accountid: ", accountId, " name:", name);
        return electron.ipcRenderer.invoke("add-new-playlist", accountId, name);
    },
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
    },
    searchSongs: (searchTerm: string) => {
        console.log("PRELOAD:searchSongs", searchTerm);
        return electron.ipcRenderer.invoke("search-songs", searchTerm);
    },
    searchArtists: (searchTerm: string) => {
        console.log("PRELOAD:searchArtists", searchTerm);
        return electron.ipcRenderer.invoke("search-artists", searchTerm);
    },
    searchAlbums: (searchTerm: string) => {
        console.log("PRELOAD:searchAlbums", searchTerm);
        return electron.ipcRenderer.invoke("search-albums", searchTerm);
    },
    searchPodcasts: (searchTerm: string) => {
        console.log("PRELOAD:searchPodcasts", searchTerm);
        return electron.ipcRenderer.invoke("search-podcasts", searchTerm);
    },
    searchPlaylists: (searchTerm: string) => {
        console.log("PRELOAD:searchPlaylists", searchTerm);
        return electron.ipcRenderer.invoke("search-playlists", searchTerm);
    },
});  
