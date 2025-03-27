import React from "react";
import type { MainViewModel } from "../viewmodels/useMainViewModel";

interface SongTabItemProps {
  vm: MainViewModel;
}

const SongTabItem: React.FC<SongTabItemProps> = ({ vm }) => {
  return (
    <div className="scroll"  style={{ maxHeight: 574}}>
      {vm.searchSongs.map((song, index) => (
        <div key={index} className="border song">
          <div className="grid" style={{ width: "100%", gridTemplateColumns: "auto 1fr auto" }}>
            <img
              src="/assets/Images/home.png"
              width={25}
              height={25}
              style={{ margin: "5px 3px" }}
            />
            <div className="stack leftV">
              <span className="label base" style={{ fontSize: 16 }}>{song.name}</span>
              <span className="label base" style={{ fontSize: 12 }}>{song.artistNames}</span>
            </div>
            <button className="button circle" onClick={() => vm.playSongCommand(song)}>
              <img src="/assets/Images/play.png" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongTabItem;
