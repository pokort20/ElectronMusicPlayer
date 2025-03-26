import React from "react";
import { useMainViewModel } from "../viewmodels/useMainViewModel";

interface YourMusicViewProps {
    vm: ReturnType<typeof useMainViewModel>; // reuse correct type
  }
  

const YourMusicView: React.FC<YourMusicViewProps> = ({ vm }) => {
  return (
    <div className="border base" style={{ height: "100%" }}>
      {/* <div className="grid" style={{ gridTemplateRows: "auto auto 1fr auto 1fr auto 1fr auto 1fr" }}> */}
      <div className="grid" style={{ gridTemplateRows: "auto auto 130px auto 130px auto 130px auto 130px" }}>
        <span className="label baseH1" style={{ gridRow: 1, marginLeft: 5 }}>Your music</span>

        <div className="dock" style={{ gridRow: 2 }}>
          <span className="label baseH2" style={{ marginLeft: 20 }}>Playlists</span>
          <button className="button transparent">
            <img src="/assets/Images/plus.png" />
          </button>
        </div>
        <div className="scroll" style={{ gridRow: 3 }}>
          {vm.playlists.map(p => (
            <div key={p.id} className="border song dock">
              <div className="horizontal">
                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                <div>{p.name}</div>
              </div>
              <button className="button circle">
                <img src="/assets/Images/play.png" alt="play" />
              </button>
            </div>
          ))}
        </div>

        <span className="label baseH2 dock" style={{ gridRow: 4, marginLeft: 20 }}>Artists</span>
        <div className="scroll" style={{ gridRow: 5 }}>
          {vm.artists.map(a => (
            <div key={a.id} className="border song dock">
              <div className="horizontal">
                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                <div>{a.name}</div>
              </div>
              <button className="button circle">
                <img src="/assets/Images/play.png" alt="play" />
              </button>
            </div>
          ))}
        </div>

        <span className="label baseH2 dock" style={{ gridRow: 6, marginLeft: 20 }}>Albums</span>
        <div className="scroll" style={{ gridRow: 7 }}>
          {vm.albums.map(a => (
            <div key={a.id} className="border song dock">
              <div className="horizontal">
                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                <div>{a.name}</div>
              </div>
              <button className="button circle">
                <img src="/assets/Images/play.png" alt="play" />
              </button>
            </div>
          ))}
        </div>

        <span className="label baseH2 dock" style={{ gridRow: 8, marginLeft: 20 }}>Podcasts</span>
        <div className="scroll" style={{ gridRow: 9 }}>
          {vm.podcasts.map(p => (
            <div key={p.id} className="border song dock">
              <div className="horizontal">
                <img src="/assets/Images/home.png" alt="icon" className="img icon" />
                <div>{p.name}</div>
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

export default YourMusicView;
