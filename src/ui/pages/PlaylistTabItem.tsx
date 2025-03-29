import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface PlaylistTabItemProps {
    vm: MainViewModel;
}

const PlaylistTabItem: React.FC<PlaylistTabItemProps> = ({ vm }) => {
    return (
        <div className="scroll" style={{ maxHeight: 574 }}>
            <div className="wrap" style={{ justifyContent: "center" }}>
                {vm.searchPlaylists.map((playlist, index) => (
                    <div key={index} className="border card" style={{ width: 220, height: 210 }} onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Playlist', id: playlist.id, name: playlist.name})}}>
                        <button onClick={() => vm.playPlaylistCommand(playlist.id)}>
                            <img className="cardImage" src="/assets/Images/account.png" width={150} height={150} />
                        </button>
                        <span className="label base" style={{ fontSize: 16, textAlign: "center" }}>{playlist.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistTabItem;
