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
          {vm.songQueue.map(s => (
            <div key={s.id} className="border song dock">
              <div className="horizontal">
                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                <div>{s.name}</div>
              </div>
              <button className="button circle">
                <img src="/assets/Images/play.png" alt="play" />
              </button>
            </div>
          ))}
        </div>
        <span className="label baseH1 dock" style={{ marginLeft: 5 }}>Suggestions</span>
          <div className="scroll">
          {vm.suggestedSongs.map(s => (
            <div key={s.id} className="border song dock">
              <div className="horizontal">
                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                <div>{s.name}</div>
              </div>
              <button className="button circle">
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
