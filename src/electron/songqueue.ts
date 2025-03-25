import { Song } from './models/Song.js';

export class SongQueue {
    private queue: Song[];
    private playedSongs: Song[];
    private _currentPlayingSong: Song | null;

    constructor() {
        this.queue = [];
        this.playedSongs = [];
        this._currentPlayingSong = null;
    }

    public get currentPlayingSong(): Song | null {
        return this._currentPlayingSong;
    }

    public set currentPlayingSong(value: Song | null) {
        if (this._currentPlayingSong !== value) {
            if (value && this.queue.find(s => s.id === value.id)) {
                let index = this.queue.findIndex(s => s.id === value.id);
                this.queue = this.queue.slice(index + 1);
            }
            this._currentPlayingSong = value;
        }
    }

    public clearQueue(): void {
        this.queue = [];
        this.playedSongs = [];
        this._currentPlayingSong = null;
    }

    public shuffleQueue(includeCurrentPlayingSong: boolean): void {
        if (!this._currentPlayingSong || this.queue.length <= 0) return;

        if (includeCurrentPlayingSong) {
            this.queue.push(this._currentPlayingSong);
        }

        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }

        if (includeCurrentPlayingSong) {
            this._currentPlayingSong = this.queue.shift()!;
        }
    }

    public getSongs(): Song[] {
        console.debug(this.queue.map(s => s.name).join(', '));
        return [...this.queue];
    }

    public add(song: Song): void {
        if (!this._currentPlayingSong) {
            this._currentPlayingSong = song;
            return;
        }

        if (!this.queue.find(s => s.id === song.id)) {
            this.queue.push(song);
        }
    }

    public remove(song: Song): void {
        this.queue = this.queue.filter(s => s.id !== song.id);
    }

    public next(repeat: boolean): Song | null {
        if (this._currentPlayingSong && this.queue.length > 0) {
            if (!repeat) {
                const nextSong = this.queue.shift()!;
                this.playedSongs.push(this._currentPlayingSong);
                this._currentPlayingSong = nextSong;
            }
        }
        return this._currentPlayingSong;
    }

    public previous(): Song | null {
        if (this._currentPlayingSong && this.playedSongs.length > 0) {
            const previousSong = this.playedSongs.pop()!;
            this.queue.unshift(this._currentPlayingSong);
            this._currentPlayingSong = previousSong;
        }
        return this._currentPlayingSong;
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
