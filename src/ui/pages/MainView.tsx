import { useMainViewModel } from "../viewmodels/useMainViewModel";
import AccountSettingsView from "./AccountAndSettings";
import PlayerControlsView from "./PlayerControls";
import QueueSuggestionsView from "./QueueAndSuggestions";
import YourMusicView from "./YourMusicView";
import HomeView from "./HomeView";
import SongTabItem from "./SongTabItem";
import ArtistTabItem from "./ArtistTabItem";
import AlbumTabItem from "./AlbumTabItem";
import PlaylistTabItem from "./PlaylistTabItem";
import PodcastTabItem from "./PodcastTabItem";

export default function MainView() {
  const vm = useMainViewModel();

  return (
    <div className="grid main-view">
      <div className="grid" style={{ gridTemplateColumns: "256px 1fr 256px" }}>
        <AccountSettingsView vm={vm} />

        <PlayerControlsView vm={vm} />

        {/* empty */}
        <div className="border base"></div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "256px 1fr 256px", height: "100%" }}>
        <YourMusicView vm={vm} />

        {/* center content that is changing (tabs, home screne) */}
        <div className="border base">
          <div className="grid" style={{ gridTemplateRows: "auto 1fr" }}>
            <div className="stack baseH" style={{ gridTemplateColumns: "auto auto 1fr auto" }}>
              <button className="button circle">
                <img src="/assets/Images/left_arrow.png" />
              </button>
              <button className="button circle">
                <img src="/assets/Images/right_arrow.png" />
              </button>
              <input
                className="textbox base flex-grow"
                placeholder="Search..."
                value={vm.searchText}
                onChange={async (e) => {
                  const newText = e.target.value;
                  vm.setSearchText(newText);

                  if (newText.trim().length > 0) {
                    // @ts-ignore
                    const results = await window.electron.searchDB(newText);
                    console.log("Search results:", results);
                    //update state
                  }
                }}
              />

              <button className="button circle" onClick={vm.homeCommand}>
                <img src="/assets/Images/home.png" />
              </button>
            </div>
            <div>
              {vm.isHomePageVisible ? <HomeView vm={vm} /> : <div></div>}
              {vm.isTabControlVisible && (
                <div className="tab-control">
                  <div className="tab-header">
                    {["Songs", "Artists", "Albums", "Playlists", "Podcasts"].map((label, i) => (
                      <button
                        key={label}
                        className={`tab-button ${vm.selectedTabIndex === i ? "active" : ""}`}
                        onClick={() => vm.setSelectedTabIndex(i)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="tab-content">
                    {vm.selectedTabIndex === 0 && <SongTabItem vm={vm} />}
                    {vm.selectedTabIndex === 1 && <ArtistTabItem vm={vm} />}
                    {vm.selectedTabIndex === 2 && <AlbumTabItem vm={vm} />}
                    {vm.selectedTabIndex === 3 && <PlaylistTabItem vm={vm} />}
                    {vm.selectedTabIndex === 4 && <PodcastTabItem vm={vm} />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <QueueSuggestionsView vm={vm} />
      </div>
    </div>
  );
}
