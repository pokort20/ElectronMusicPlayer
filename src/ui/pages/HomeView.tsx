import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface HomeViewProps {
    vm: MainViewModel;
}

const HomeView: React.FC<HomeViewProps> = ({ vm }) => {
    return (
        <div className="grid" style={{ gridTemplateRows: "40px 30px 300px 40px 30px 300px", gridTemplateColumns: "1fr 1fr" }}>
            {/* Trending */}
            <span className="label baseH1" style={{ gridRow: 1, gridColumn: "1 / span 2" }}>Trending</span>
            <span className="label baseH2" style={{ gridRow: 2, gridColumn: 1 }}>Songs</span>
            <span className="label baseH2" style={{ gridRow: 2, gridColumn: 2 }}>Artists</span>
            <div className="stack baseV" style={{ gridRow: 3, gridColumn: 1 }}>
                {vm.trendingSongs.map((song, index) => (
                    <div key={index} className="border song">
                        <div className="grid" style={{ gridTemplateColumns: "auto 1fr auto" }}>
                            <img src="/assets/Images/home.png" width={25} height={25} style={{ margin: "5px 3px" }} />
                            <div className="stack leftV">
                                <span className="label base" style={{ fontSize: 16 }}>{song.name}</span>
                                <span className="label base" style={{ fontSize: 12 }}>DOPLNIT</span>
                            </div>
                            <button className="button circle" onClick={() => vm.playSongCommand(song.id)}>
                                <img src="/assets/Images/play.png" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="wrap scroll" style={{ gridRow: 3, gridColumn: 2 }}>
                {vm.trendingArtists.map((artist, index) => (
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
