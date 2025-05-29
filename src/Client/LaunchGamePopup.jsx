import React, { useState } from 'react';

export default ({ gameUrl, gameId,isLoading, setIsLoading  }) => {
//   const [isLoading, setIsLoading] = useState(false);
  const [showGame, setShowGame] = useState(true); // simulate display: block

  const logoUrl = "https://img.s628b.com/sb/h5/assets/images/logo.png?v=1747712919023";
  const lightRingUrl = "https://img.s628b.com/sb/h5/assets/images/launch-game/icon-light-ring.svg?v=1747712919023";

  return (
    <div className="popup__content">
      <div className="launch-game-content">
        {/* Loading Screen */}
        {isLoading && (
          <div className="launch-game-loading select-slot">
            <div className="loading-bg" />
            <div className="loader-round" style={{ opacity: 0 }}>
              <svg version="1.2" baseProfile="tiny" id="Layer_1" width="471.197px" height="471.197px" viewBox="0 0 471.197 471.197" overflow="inherit" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="loading-bar-color">
                    <stop offset="5%" className="loading-stop-color" />
                    <stop offset="100%" className="loading-end-color" />
                  </linearGradient>
                </defs>
                <g id="loader">
                  <circle id="dark" fill="transparent" strokeWidth="36" strokeLinecap="round" strokeMiterlimit="1" cx="235.582" cy="235.114" r="212.599" className="circle" />
                  <circle id="white" fill="transparent" strokeWidth="36" strokeLinecap="round" strokeMiterlimit="10" cx="235.582" cy="235.114" r="212.599" className="circle" />
                </g>
              </svg>
              <div className="center-logo-bg">
                <div className="brand-logo" style={{ backgroundImage: `url(${logoUrl})` }}></div>
                <img className="center-logo" alt={gameId} src="" loading="lazy" />
              </div>
            </div>
          </div>
        )}

        {/* Launch Game Page */}
        {showGame && (
          <div className="launch-game-page">
            <div className="site-top">
              <div className="site-menu no-deposit">
                <div className="btn">
                  <div className="btn-cross" />
                </div>

                <div className="info-wrap" style={{ display: "none" }}>
                  <div className="info-block">
                    <div className="info-title">USER</div>
                    <div className="info-value">
                      <span className="info-value-sub">- V.144.48.149.102</span>
                    </div>
                  </div>
                </div>

                <div className="f-logo-bg">
                  <div className="f-logo logo-image" style={{ backgroundImage: `url(${logoUrl})` }}></div>
                  <div className="light-ring" style={{ backgroundImage: `url(${lightRingUrl})` }}></div>
                </div>

                <div className="btn">
                  <div className="btn-deposit" style={{ maskImage: "url(/assets/images/launch-game/icon-deposit.svg)" }}></div>
                  <div className="light-ring" style={{ backgroundImage: `url(${lightRingUrl})` }}></div>
                </div>

                <div className="menu-bg">
                  <div className="highlight" />
                </div>
              </div>
              <div className="top-bg" />
            </div>

            <div className="site-bg" />
            <div className="launch-game-wrap show">
              <iframe
                name="myiFrame"
                title="Game Frame"
                marginHeight="0px"
                marginWidth="0px"
                height="603px"
                width="375px"
                allowFullScreen
                className="launch-game-iframe"
                style={{ border: "0px #ffffff none" }}
                scrolling="yes"
                src={gameUrl}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


