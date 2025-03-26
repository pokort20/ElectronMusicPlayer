import { Song } from './models/Song.js';
import { BrowserWindow } from "electron";
import ld from 'lodash';

export class SongQueue {
    private queue: Song[];
    private playedSongs: Song[];
    private _shuffle: boolean;
    private _repeat: boolean;
    private _currentPlayingSong: Song | null = null;
    private _window: BrowserWindow | null = null;

    constructor() {
        this.queue = [];
        this.playedSongs = [];
        this._shuffle = false;
        this._repeat = false;
    }
    public set shuffle(value: boolean){
        this.window?.webContents.send("shuffleChanged", this.shuffle);
        this._shuffle = value;
    }
    public get shuffle(): boolean{
        return this._shuffle;
    }
    public set repeat(value: boolean){
        this.window?.webContents.send("repeatChanged", this.repeat);
        this._repeat = value;
    }
    public get repeat(): boolean{
        return this._repeat;
    }


    public set window(window: BrowserWindow | null){
        this._window = window;
    }
    public get window(): BrowserWindow | null{
        return this._window;
    }
    public get currentPlayingSong(): Song | null {
        return this._currentPlayingSong;
    }
    public Shuffle(): void{
        this.shuffle = !this.shuffle;
        if(this.shuffle)
        {
           ld.shuffle(this.queue);
        }
    }
    public Repeat(): void{
        this.repeat = !this.repeat;
    }
    public set currentPlayingSong(value: Song | null) {
        if(value === null) return;
        console.log("set Current playign song called")
        if (this.currentPlayingSong !== value) {
            if (value && this.queue.find(s => s.id === value.id)) {
                let index = this.queue.findIndex(s => s.id === value.id);
                this.queue = this.queue.slice(index + 1);
            }
            console.log("Current playign song changed");
            this._currentPlayingSong = value;
            this.window?.webContents.send("songDescriptionChanged", {
                name: this.currentPlayingSong?.name,
                artist: "TBD"
            });
        }
    }

    public clearQueue(): void {
        this.queue = [];
        this.playedSongs = [];
        this.currentPlayingSong = null;
    }

    public shuffleQueue(includeCurrentPlayingSong: boolean): void {
        if (!this.currentPlayingSong || this.queue.length <= 0) return;

        if (includeCurrentPlayingSong) {
            this.queue.push(this.currentPlayingSong);
        }

        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }

        if (includeCurrentPlayingSong) {
            this.currentPlayingSong = this.queue.shift()!;
        }
    }

    public getSongs(): Song[] {
        console.debug(this.queue.map(s => s.name).join(', '));
        return [...this.queue];
    }

    public add(song: Song): void {
        if (!this.currentPlayingSong) {
            this.currentPlayingSong = song;
            return;
        }

        if (!this.queue.find(s => s.id === song.id)) {
            this.queue.push(song);
        }
        this.window?.webContents.send("songQueueChanged", this.queue);
    }
    public addSongs(songs: Song[]): void {
        for (const song of songs) {
            this.add(song);
        }
    }

    public remove(song: Song): void {
        this.queue = this.queue.filter(s => s.id !== song.id);
    }

    public next(repeat: boolean): Song | null {
        if (this.currentPlayingSong && this.queue.length > 0) {
            if (!repeat) {
                const nextSong = this.queue.shift()!;
                this.playedSongs.push(this.currentPlayingSong);
                this.currentPlayingSong = nextSong;
            }
        }
        return this.currentPlayingSong;
    }

    public previous(): Song | null {
        if (this.currentPlayingSong && this.playedSongs.length > 0) {
            const previousSong = this.playedSongs.pop()!;
            this.queue.unshift(this.currentPlayingSong);
            this.currentPlayingSong = previousSong;
        }
        return this.currentPlayingSong;
    }

    public changePosition(queue: Song[], item: Song, newIndex: number): Song[] {
        const list = [...queue];
        const oldIndex = list.findIndex(s => s.id === item.id);

        if (oldIndex === -1 || newIndex < 0 || newIndex >= list.length || list.length === 0) {
            return queue;
        }

        list.splice(oldIndex, 1);
        list.splice(newIndex, 0, item);

        return list;
    }
}
export default new SongQueue();
