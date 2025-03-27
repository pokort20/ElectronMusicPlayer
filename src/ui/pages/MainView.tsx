import { useMainViewModel } from "../viewmodels/useMainViewModel";
import AccountSettingsView from "./AccountAndSettings";
import PlayerControlsView from "./PlayerControls";
import QueueSuggestionsView from "./QueueAndSuggestions";
import YourMusicView from "./YourMusicView";
import HomeView from "./HomeView";

export default function MainView() {
  const vm = useMainViewModel();

  return (
    <div className="grid main-view">
      {/* Navigation panel */}
      <div className="grid" style={{ gridTemplateColumns: "256px 1fr 256px" }}>
        <AccountSettingsView vm={vm}/>

        <PlayerControlsView vm={vm}/>
        
        {/* empty section */}
        <div className="border base"></div>
      </div>

      {/* Main content 3-column layout */}
      <div className="grid" style={{ gridTemplateColumns: "256px 1fr 256px", height: "100%" }}>
        {/* Left panel (your music) */}
        <YourMusicView vm={vm}/>

        {/* Center content */}
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
              {/* Conditional rendering */}
              {vm.isHomePageVisible ? <HomeView vm={vm}/> : <div>Tabs</div>}
            </div>
          </div>
        </div>

        {/* Right panel (queue + suggestions) */}
        <QueueSuggestionsView vm={vm}/>
      </div>
    </div>
  );
}
