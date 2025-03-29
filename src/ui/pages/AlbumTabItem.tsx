import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface AlbumTabItemProps {
    vm: MainViewModel;
}

const AlbumTabItem: React.FC<AlbumTabItemProps> = ({ vm }) => {
    return (
        <div className="scroll" style={{ maxHeight: 574 }}>
            <div className="wrap" style={{ justifyContent: "center" }}>
                {vm.searchAlbums.map((album, index) => (
                    <div key={index} className="border card" style={{ width: 220, height: 210 }} onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Album', id: album.id, name: album.name})}}>
                        <button onClick={() => vm.playAlbumCommand(album.id)}>
                            <img className="cardImage" src="/assets/Images/account.png" width={150} height={150} />
                        </button>
                        <div className="stack leftV">
                            <span className="label base" style={{ fontSize: 16, textAlign: "center" }}>{album.name}</span>
                            <span className="label base" style={{ fontSize: 16, textAlign: "center" }}>{album.artistNames}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumTabItem;
