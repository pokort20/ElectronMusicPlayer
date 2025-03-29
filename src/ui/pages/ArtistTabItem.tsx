import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface ArtistTabItemProps {
    vm: MainViewModel;
}

const ArtistTabItem: React.FC<ArtistTabItemProps> = ({ vm }) => {
    return (
        <div className="scroll" style={{ maxHeight: 574}}>
            <div className="wrap" style={{ justifyContent: "center" }}>
                {vm.searchArtists.map((artist, index) => (
                    <div key={index} className="border card" style={{ width: 220, height: 210 }} onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Artist', id: artist.id, name: artist.name})}}>
                        <button onClick={() => vm.playArtistCommand(artist.id)}>
                            <img className="cardImage" src="/assets/Images/account.png" width={150} height={150} />
                        </button>
                        <span className="label base" style={{ fontSize: 16, textAlign: "center" }}>{artist.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtistTabItem;
