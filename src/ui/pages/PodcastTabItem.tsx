import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface PodcastTabItemProps {
    vm: MainViewModel;
}

const PodcastTabItem: React.FC<PodcastTabItemProps> = ({ vm }) => {
    return (
        <div className="scroll" style={{ maxHeight: 574 }}>
            <div className="wrap" style={{ flexDirection: "column", alignItems: "center", gap: 16 }}>
                {vm.searchPodcasts.map((podcast, index) => (
                    <div key={index} className="border podcast">
                        <div className="horizontal" style={{margin: "20px"}}>
                            <button onClick={() => vm.playPodcastCommand(podcast.id)}>
                                <img src="/assets/Images/account.png" width={120} height={120} />
                            </button>
                            <div style={{alignContent:"center", margin: "0 0 0 50px"}}>
                                <div className="podcast-title">{podcast.name}</div>
                                <div className="podcast-author">AUTHOR</div>
                            </div>
                        </div>
                        <div className="podcast-description">
                            <span>{podcast.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PodcastTabItem;
