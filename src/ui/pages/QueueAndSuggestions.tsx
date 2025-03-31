import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface QueueSuggestionsViewProps {
    vm: MainViewModel;
}

const QueueSuggestionsView: React.FC<QueueSuggestionsViewProps> = ({ vm }) => {
    return (
        <div className="border base">
            <div className="grid" style={{ gridTemplateRows: "40px 350px 40px 230px" }}>
                <div className="label baseH1 dock" style={{ marginLeft: 5 }}>Queue</div>
                <div className="scroll">
                    {vm.songQueue.map((s, index) => (
                        <div key={index} className="border song dock" onContextMenu={(e) => { e.preventDefault(); vm.contextMenuCommand({ type: 'Song', id: s.id, name: s.name }) }}>
                            <div className="horizontal">
                                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                                <div className="stack leftV">
                                    <span className="label base" style={{ fontSize: 16 }}>{s.name}</span>
                                    <span className="label base" style={{ maxWidth: 100, fontSize: 12 }}>{s.artistNames}</span>
                                </div>
                            </div>
                            <button className="button circle" onClick={() => vm.playSongCommand(s)}>
                                <img src="/assets/Images/play.png" alt="play" />
                            </button>
                        </div>
                    ))}
                </div>
                <span className="label baseH1 dock" style={{ marginLeft: 5 }}>Suggestions</span>
                <div className="scroll">
                    {vm.suggestedSongs.map((song, index) => (
                        <div key={index} className="border song dock" onContextMenu={(e) => { e.preventDefault(); vm.contextMenuCommand({ type: 'Song', id: song.id, name: song.name }) }}>
                            <div className="horizontal">
                                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                                <div className="stack leftV">
                                    <span className="label base" style={{ fontSize: 16 }}>{song.name}</span>
                                    <span className="label base" style={{ maxWidth: 100, fontSize: 12 }}>{song.artistNames}</span>
                                </div>
                            </div>
                            <button className="button circle" onClick={() => vm.playSongCommand(song)}>
                                <img src="/assets/Images/play.png" alt="play" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QueueSuggestionsView;
