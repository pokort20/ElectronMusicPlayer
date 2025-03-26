import { BrowserWindow } from "electron";
import path, { dirname } from 'path';
import { Readable } from 'stream';
import Speaker from 'speaker';
import prism from 'prism-media';
import Volume from 'pcm-volume';
import { fileURLToPath } from 'url';
import { Song } from './models/Song.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class AudioPlayer {
    private ffmpeg: InstanceType<typeof prism.FFmpeg> | null = null;
    private speaker: Speaker | null = null;
    private stream: Readable | null = null;
    private volumeNode: Volume | null = null;
    private _window: BrowserWindow | null = null;
    private isInitiated = false;
    private _isPlaying = false;
    private isMuted = false;
    private _volume: number = 0.05;
    private unmutedVolume = 0.05;

    public set window(window: BrowserWindow | null) {
        this._window = window;
    }
    public get window(): BrowserWindow | null {
        return this._window;
    }

    private set isPlaying(value: boolean) {
        this.window?.webContents.send("isPlayingChanged", this.isPlaying);
        this._isPlaying = value;
    }
    private get isPlaying(): boolean {
        return this._isPlaying;
    }

    public get volume(): number {
        return this._volume;
    }

    async play(song: Song | null): Promise<boolean> {
        // if(this.isPlaying)this.stop();

        // this.isPlaying = true;
        // const filePath = path.resolve(__dirname, '../public/assets/Sounds/0.mp3');

        // this.stream = fs.createReadStream(filePath);
        // this.ffmpeg = new prism.FFmpeg({
        //     args: ['-analyzeduration', '0', '-loglevel', '0', '-i', 'pipe:0', '-f', 's16le', '-ar', '48000', '-ac', '2'],
        // });

        // this.volumeNode = new Volume();
        // this.volumeNode.setVolume(this._volume);

        // this.speaker = new Speaker({
        //     channels: 2,
        //     bitDepth: 16,
        //     sampleRate: 48000,
        // });

        // this.stream
        //     .pipe(this.ffmpeg)
        //     .pipe(this.volumeNode)
        //     .pipe(this.speaker);

        // this.isInitiated = true;
        // console.log("AudioPlayer: playing song");

        return this.isPlaying;
    }
    async playPause(song: Song | null): Promise<boolean> {
        //if(song == null)return this.isPlaying;
        if (this.isPlaying) {
            this.pause();
            console.log("AudioPlayer: Paused");
        }
        else {
            this.resume();
            console.log("AudioPlayer: Playing");
        }
        this.isPlaying = !this.isPlaying;
        return this.isPlaying;
    }
    async pause(): Promise<void> {
        if (this.stream) this.stream.pause();
    }
    async resume(): Promise<void> {
        if (this.stream) this.stream.resume();
    }
    async mute(): Promise<void> {
        if (this.isMuted) {
            this.changeVolume(this.unmutedVolume);
            console.log("AudioPlayer: Unmuted");
        }
        else {
            this.changeVolume(0);
            console.log("AudioPlayer: Muted");
        }
        this.isMuted = !this.isMuted;
    }

    async stop(): Promise<void> {
        if (this.stream) this.stream.destroy();
        if (this.ffmpeg) this.ffmpeg.destroy();
        if (this.volumeNode) this.volumeNode.end();
        if (this.speaker) this.speaker.end();

        this.stream = null;
        this.ffmpeg = null;
        this.volumeNode = null;
        this.speaker = null;
        this.isInitiated = false;
        this.isPlaying = false;
    }

    async changeVolume(volume: number): Promise<void> {
        this._volume = volume;
        if (this.volumeNode) {
            this.volumeNode.setVolume(this._volume); // volume: 0.0 - 1.0
            if (this._volume > 0) this.unmutedVolume = this._volume;
            console.log("AudioPlayer: volume set to ", this._volume);
        }
    }

    async seekTo(seconds: number): Promise<void> {
        console.log('Seek is not implemented yet. It requires re-creating the stream with a time offset using FFmpeg.');
    }

    isPlayerInitiated(): boolean {
        return this.isInitiated;
    }
}

export default new AudioPlayer();
