/*import React from "react";*/

export default function MainView() {
    return (
      <div
        className="grid min-w-[800px] min-h-[400px]"
        style={{
          background: "var(--ternary-bg)",
          display: "grid",
          gridTemplateRows: "100px 1fr",
          height: "100vh"
        }}
      >
        {/* Navigation panel */}
        <div
          className="grid"
          style={{ display: "grid", gridTemplateColumns: "256px 1fr 256px" }}
        >
          {/* Account & settings */}
          <div className="border base">
            <div className="stack baseV">
              <button className="button round">
                <div className="stack leftH">
                  <div style={{ width: 34, height: 34, borderRadius: 20 }}>
                    <img width={22} height={22} src="/assets/Images/account.png" />
                  </div>
                  <span className="label base">AccountName</span>
                </div>
              </button>
              <button className="button round">
                <div className="stack leftH">
                  <div style={{ width: 34, height: 34, borderRadius: 20 }}>
                    <img width={22} height={22} src="/assets/Images/settings.png" />
                  </div>
                  <span className="label base">Settings</span>
                </div>
              </button>
            </div>
          </div>
  
          {/* Song player area */}
          <div className="border base">
            <div className="grid" style={{ gridTemplateRows: "70px auto", height: "100%" }}>
              <div className="grid" style={{ gridTemplateColumns: "1fr 3fr 1fr" }}>
                <div className="stack leftH">
                  <img src="/assets/avalonia-logo.ico" />
                  <div className="stack leftV">
                    <span className="label base" style={{ fontSize: 20, marginTop: 18, marginBottom: -4 }}>SongName</span>
                    <span className="label base" style={{ fontSize: 13 }}>AuthorName</span>
                  </div>
                </div>
  
                <div className="stack baseH">
                  <button className="toggle-button transparent" style={{ marginRight: 20 }}>
                    <img width={25} height={25} src="/assets/Images/shuffle.png" />
                  </button>
                  <button className="button circle">
                    <img src="/assets/Images/previous.png" />
                  </button>
                  <button className="button circle" style={{ height: 50, width: 50 }}>
                    <img src="/assets/Images/play.png" />
                  </button>
                  <button className="button circle">
                    <img src="/assets/Images/next.png" />
                  </button>
                  <button className="toggle-button transparent" style={{ marginLeft: 20 }}>
                    <img width={20} height={20} src="/assets/Images/repeat.png" />
                  </button>
                </div>
  
                <div className="stack rightH">
                  <button className="button transparent">
                    <img src="/assets/Images/volume.png" />
                  </button>
                  <input type="range" className="slider volume" />
                </div>
              </div>
  
              <div className="grid" style={{ gridTemplateColumns: "auto 1fr auto" }}>
                <span className="label base" style={{ marginLeft: 10, width: 40 }}>0:00</span>
                <input type="range" className="slider song" />
                <span className="label base" style={{ marginRight: 10, width: 40 }}>3:30</span>
              </div>
            </div>
          </div>
  
          {/* Window controls (empty) */}
          <div className="border base"></div>
        </div>
  
        {/* Main content 3-column layout */}
        <div
          className="grid"
          style={{ display: "grid", gridTemplateColumns: "256px 1fr 256px", height: "100%" }}
        >
          {/* Left panel (your music) */}
          <div className="border base">
            <div className="grid" style={{ gridTemplateRows: "repeat(9, auto)" }}>
              <span className="label baseH1" style={{ marginLeft: 5 }}>Your music</span>
  
              <div className="dock" style={{ gridRow: 2 }}>
                <span className="label baseH2" style={{ marginLeft: 20 }}>Playlists</span>
                <button className="button transparent">
                  <img src="/assets/Images/plus.png" />
                </button>
              </div>
  
              <div className="scroll" style={{ gridRow: 3 }}></div>
              <span className="label baseH2" style={{ marginLeft: 20 }}>Artists</span>
              <div className="scroll"></div>
              <span className="label baseH2" style={{ marginLeft: 20 }}>Albums</span>
              <div className="scroll"></div>
              <span className="label baseH2" style={{ marginLeft: 20 }}>Podcasts</span>
              <div className="scroll"></div>
            </div>
          </div>
  
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
                <input className="textbox base" placeholder="Search..." />
                <button className="button circle">
                  <img src="/assets/Images/home.png" />
                </button>
              </div>
              <div>{/* Conditional: <HomeView /> or tab view */}</div>
            </div>
          </div>
  
          {/* Right panel (queue + suggestions) */}
          <div className="border base">
            <div className="grid" style={{ gridTemplateRows: "1.5fr 1fr" }}>
              <div className="grid" style={{ gridTemplateRows: "auto 1fr" }}>
                <span className="label baseH1" style={{ marginLeft: 5 }}>Queue</span>
                <div className="scroll"></div>
              </div>
              <div className="grid" style={{ gridTemplateRows: "auto 1fr" }}>
                <span className="label baseH1" style={{ marginLeft: 5 }}>Suggestions</span>
                <div className="scroll"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  