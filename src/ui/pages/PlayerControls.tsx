import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface PlayerControlsViewProps {
    vm: MainViewModel;
}

const PlayerControlsView: React.FC<PlayerControlsViewProps> = ({ vm }) => {
    return (
        <div className="border base">
            <div className="grid" style={{ gridTemplateRows: "70px auto", height: "100%" }}>
                <div className="grid" style={{ gridTemplateColumns: "200px 3fr 200px" }}>
                    <div className="stack leftH">
                        <img className="img song" src="/assets/Images/home.png" />
                        <div className="stack leftV" style={{ marginLeft: 5, marginBottom: 10 }}>
                            <span className="label base" style={{ fontSize: 20, marginTop: 18, marginBottom: -4 }}>{vm.songName}</span>
                            <span className="label base" style={{ maxWidth: 150, fontSize: 13 }}>{vm.authorName}</span>
                        </div>
                    </div>

                    <div className="stack baseH">
                        <button
                            className={`toggle-button transparent ${vm.shuffle ? "toggled" : "base"}`}
                            style={{ marginRight: 20 }}
                            onClick={vm.shuffleCommand}
                            title="Shuffle">
                            <img width={25} height={25} src="/assets/Images/shuffle.png" />
                        </button>
                        <button className="button circle" onClick={vm.previousCommand} title="Previous">
                            <img src="/assets/Images/previous.png" />
                        </button>
                        <button className="button circle" style={{ height: 50, width: 50 }} onClick={vm.playPauseCommand} title="Play/Pause">
                            <img src={vm.isPlaying ? "assets/Images/pause.png" : "assets/Images/play.png"} alt="Play/Pause" />
                        </button>
                        <button className="button circle" onClick={vm.nextCommand} title="Next">
                            <img src="/assets/Images/next.png" />
                        </button>
                        <button
                            className={`toggle-button transparent ${vm.repeat ? "toggled" : "base"}`}
                            style={{ marginRight: 20 }}
                            onClick={vm.repeatCommand}
                            title="Repeat">
                            <img width={25} height={25} src="/assets/Images/repeat.png" />
                        </button>
                    </div>

                    <div className="stack rightH">
                        <button className="button transparent" onClick={vm.muteCommand} title="Mute/Unmute">
                            <img src="assets/Images/volume1.png" />
                        </button>
                        <input
                            title="Volume"
                            type="range"
                            className="slider volume"
                            min="0"
                            max="1"
                            step="0.01"
                            value={vm.volume}
                            onChange={(e) => vm.setVolume(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: "auto 1fr auto" }}>
                    <span className="label base" style={{ marginLeft: 10, width: 40 }}>{vm.timeElapsed}</span>
                    <input
                        type="range"
                        className="slider song"
                        value={vm.songProgress}
                        min={vm.minSongProgress}
                        max={vm.maxSongProgress}
                        onChange={(e) => vm.setSongProgress(parseFloat(e.target.value))}
                    />
                    <span className="label base" style={{ marginRight: 10, width: 40 }}>{vm.timeLeft}</span>
                </div>
            </div>
        </div>
    );
};

export default PlayerControlsView;