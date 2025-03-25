const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    playSong: () => {
        console.log("PRELOAD:playSong");
        return electron.ipcRenderer.invoke("playSong");
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
    searchDB: (searchTerm: string) => {
        console.log("PRELOAD:searchDB", searchTerm);
        return electron.ipcRenderer.invoke("searchDB", searchTerm);
    },


    //subscribtions
    subVolume:(callback: (volume: number) => void) => {
        electron.ipcRenderer.on("volumeChanged", (_ : any, data: number)  => {
            callback(data);
        })
    },
});