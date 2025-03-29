import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface HomeViewProps {
    vm: MainViewModel;
}

const HomeView: React.FC<HomeViewProps> = ({ vm }) => {
    return (
        <div className="grid" style={{ gridTemplateRows: "40px 30px 238px 40px 30px 238px", gridTemplateColumns: "1fr 1fr" }}>
            {/* Trending */}
            <span className="label baseH1" style={{ gridRow: 1, gridColumn: "1 / span 2" }}>Trending</span>
            <span className="label baseH2" style={{ gridRow: 2, gridColumn: 1 }}>Songs</span>
            <span className="label baseH2" style={{ gridRow: 2, gridColumn: 2 }}>Artists</span>
            <div className="scroll" style={{ gridRow: 3, gridColumn: 1 }}>
                {vm.trendingSongs.map((s, index) => (
                    <div key={index} className="border song dock" style={{ margin: "6px 20px 6px 25px" }}  onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Song', id: s.id, name: s.name})}}>
                        <div className="horizontal">
                            <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                            <div className="stack leftV">
                                <span className="label base" style={{ fontSize: 16 }}>{s.name}</span>
                                <span className="label base" style={{ maxWidth: 220, fontSize: 12 }}>{s.artistNames}</span>
                            </div>
                        </div>
                        <button className="button circle" onClick={() => vm.playSongCommand(s)}>
                            <img src="/assets/Images/play.png" alt="play" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="wrap scroll" style={{ gridRow: 3, gridColumn: 2 }}>
                {vm.trendingArtists.map((artist, index) => (
                    <div key={index} className="border card" onContextMenu={ (e) => {e.preventDefault(); vm.contextMenuCommand( {type: 'Artist', id: artist.id, name: artist.name})}}>
                        <button onClick={() => vm.playArtistCommand(artist.id)}>
                            <img className="cardImage" src="/assets/Images/account.png" width={86} height={86} />
                        </button>
                        <span className="label base" style={{ fontSize: 16, textAlign: "center" }}>{artist.name}</span>
                    </div>
                ))}
            </div>
            {/* Suggested */}
            <span className="label baseH1" style={{ gridRow: 4, gridColumn: "1 / span 2" }}>Suggested</span>
            <span className="label baseH2" style={{ gridRow: 5, gridColumn: 1 }}>Songs</span>
            <span className="label baseH2" style={{ gridRow: 5, gridColumn: 2 }}>Artists</span>
            <div className="scroll" style={{ gridRow: 6, gridColumn: 1 }}>
                {vm.suggestedSongs.map((s, index) => (
                    <div key={index} className="border song dock" style={{ margin: "6px 20px 6px 25px" }}>
                        <div className="horizontal">
                            <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                            <div className="stack leftV">
                                <span className="label base" style={{ fontSize: 16 }}>{s.name}</span>
                                <span className="label base" style={{ maxWidth: 220,fontSize: 12 }}>{s.artistNames}</span>
                            </div>
                        </div>
                        <button className="button circle" onClick={() => vm.playSongCommand(s)}>
                            <img src="/assets/Images/play.png" alt="play" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="wrap scroll" style={{ gridRow: 6, gridColumn: 2 }}>
                {vm.suggestedArtists.map((artist, index) => (
                    <div key={index} className="border card">
                        <button onClick={() => vm.playArtistCommand(artist.id)}>
                            <img className="cardImage" src="/assets/Images/account.png" width={86} height={86} />
                        </button>
                        <span className="label base" style={{ fontSize: 16, textAlign: "center" }}>{artist.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeView;
