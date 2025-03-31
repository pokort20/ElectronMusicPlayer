import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";
import AddPlaylistModal from "./AddPlaylistModal";

interface YourMusicViewProps {
    vm: MainViewModel;
}


const YourMusicView: React.FC<YourMusicViewProps> = ({ vm }) => {
    return (
        <div className="border base">
            <div className="grid" style={{ gridTemplateRows: "40px 50px 120px 30px 120px 30px 120px 30px 120px" }}>
                <span className="label baseH1" style={{ gridRow: 1, marginLeft: 5 }}>Your music</span>

                <div className="dock" style={{ gridRow: 2 }}>
                    <span className="label baseH2" style={{ marginLeft: 20 }}>Playlists</span>
                    <button className="button transparent"  title="Add playlist" onClick={ () => {vm.openModal, vm.setIsModalOpen(!vm.isModalOpen);}}>
                        <img src="/assets/Images/plus.png" />
                    </button>
                </div>
                {vm.isModalOpen && (
                    <AddPlaylistModal
                        onAddPlaylist={vm.addPlaylistCommand}
                        onClose={vm.closeModal}
                    />)}
                <div className="scroll" style={{ gridRow: 3 }}>
                    {vm.playlists.map(p => (
                        <div key={p.id} className="border song dock" onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Playlist', id: p.id, ownerid: p.ownerid, name: p.name})}}>
                            <div className="horizontal">
                                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                                <div>{p.name}</div>
                            </div>
                            <button className="button circle">
                                <img src="/assets/Images/play.png" alt="play" onClick={() => vm.playPlaylistCommand(p.id)} />
                            </button>
                        </div>
                    ))}
                </div>

                <span className="label baseH2 dock" style={{ gridRow: 4, marginLeft: 20 }}>Artists</span>
                <div className="scroll" style={{ gridRow: 5 }}>
                    {vm.artists.map(a => (
                        <div key={a.id} className="border song dock" onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Artist', id: a.id, name: a.name})}}>
                            <div className="horizontal">
                                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                                <div>{a.name}</div>
                            </div>
                            <button className="button circle">
                                <img src="/assets/Images/play.png" alt="play" onClick={() => vm.playArtistCommand(a.id)} />
                            </button>
                        </div>
                    ))}
                </div>

                <span className="label baseH2 dock" style={{ gridRow: 6, marginLeft: 20 }}>Albums</span>
                <div className="scroll" style={{ gridRow: 7 }}>
                    {vm.albums.map(a => (
                        <div key={a.id} className="border song dock" onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Album', id: a.id, name: a.name})}}>
                            <div className="horizontal">
                                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                                <div className="stack leftV">
                                    <span className="label base" style={{ fontSize: 16 }}>{a.name}</span>
                                    <span className="label base" style={{ maxWidth: 100, fontSize: 12 }}>{a.artistNames}</span>
                                </div>
                            </div>
                            <button className="button circle">
                                <img src="/assets/Images/play.png" alt="play" onClick={() => vm.playAlbumCommand(a.id)} />
                            </button>
                        </div>
                    ))}
                </div>

                <span className="label baseH2 dock" style={{ gridRow: 8, marginLeft: 20 }}>Podcasts</span>
                <div className="scroll" style={{ gridRow: 9 }}>
                    {vm.podcasts.map(p => (
                        <div key={p.id} className="border song dock" onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Podcast', id: p.id, name: p.name})}}>
                            <div className="horizontal">
                                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                                <div>{p.name}</div>
                            </div>
                            <button className="button circle">
                                <img src="/assets/Images/play.png" alt="play" onClick={() => vm.playPodcastCommand(p.id)} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YourMusicView;
