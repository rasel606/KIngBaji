import React, { useState } from "react";
import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();

  const [activePopup, setActivePopup] = useState("main");
  const [vpInput, setVpInput] = useState("");
  const [moneyInput, setMoneyInput] = useState("");
  const [convertSuccess, setConvertSuccess] = useState(false);
  if (activeModal !== modalName) return null;
  // VIP data - could come from props/API in a real app
  const vipData = {
    level: "Copper",
    levelIcon:
      "https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/vip-sidenav-1.svg",
    currentPoints: 0,
    progress: 0,
    nextLevelRequirement: 1000,
    conversionRatio: 1000,
    minConversion: 5000,
    history: {
      year: 2025,
      month: "May",
      acquired: "0.3",
    },
  };

  const handleVpChange = (e) => {
    const value = e.target.value;
    setVpInput(value);
    // Auto-calculate money value
    if (value) {
      setMoneyInput((parseInt(value) / vipData.conversionRatio).toString());
    } else {
      setMoneyInput("");
    }
  };

  const handleMoneyChange = (e) => {
    const value = e.target.value;
    setMoneyInput(value);
    // Auto-calculate VP value
    if (value) {
      setVpInput((parseInt(value) * vipData.conversionRatio).toString());
    } else {
      setVpInput("");
    }
  };

  const handleConvert = () => {
    if (parseInt(vpInput) >= vipData.minConversion) {
      setConvertSuccess(true);
      setTimeout(() => setConvertSuccess(false), 3000);
    }
  };

  return (
    <div className="vip-system">
      {/* Main VIP Popup */}
      <div
        className={`popup-page-wrapper ${
          activePopup === "main" ? "active" : ""
        }`}
      >
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page__backdrop" ></div>
          <div className="popup-page__main popup-page-main popup-page-main--show">
            <div className="popup-page-main__header">
              
              <div className="popup-page-main__title">My VIP</div>
              <div className="popup-page-main__close" onClick={closeModal}></div>
            </div>
            <div className="popup-page-main__container">
              <div className="content mcd-style player-content vip-content">
                <div className="player-vip-box deco vip-card lv1">
                  <div className="card-top">
                    <div className="vip-lv-area">
                      <div className="lv-totem">
                        <span
                          className="item-icon"
                          style={{
                            backgroundImage: `url(${vipData.levelIcon})`,
                          }}
                        ></span>
                      </div>
                      <div className="lv-text">
                        <div className="text">VIP LEVEL</div>
                        <h2>{vipData.level}</h2>
                      </div>
                      <a
                        className="lv-history"
                        onClick={() => setActivePopup("history")}
                      >
                        <span
                          className="item-icon"
                          style={{
                            maskImage:
                              'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/icon-history.svg")',
                          }}
                        ></span>
                        <p>history</p>
                      </a>
                    </div>
                    <div className="vip-lv-area">
                      <div className="progress-bar">
                        <div className="bar">
                          <div
                            className="bar-inner"
                            style={{ width: `${vipData.progress}%` }}
                          ></div>
                        </div>
                        <div className="number">
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                      <div
                        className="next-lv-totem"
                        style={{
                          backgroundImage:
                            'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/vip-totem-bg-2.svg")',
                        }}
                      ></div>
                    </div>
                    <p>
                      You need {vipData.nextLevelRequirement} turnovers to
                      proceed to the 2 level.
                    </p>
                  </div>
                </div>

                <div className="player-vip-box total">
                  <div className="title">VIP Points</div>
                  <div className="status-box">
                    <div className="status">
                      <div className="number">{vipData.currentPoints}</div>
                      <div className="text">VP</div>
                    </div>
                    <a
                      className="cleader"
                      onClick={() => setActivePopup("points")}
                    >
                      <span
                        className="item-icon"
                        style={{
                          maskImage:
                            'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/icon-points.svg")',
                        }}
                      ></span>
                      <p>detail</p>
                    </a>
                  </div>
                </div>

                <div className="player-vip-box cash-card">
                  <div className="title">
                    <h2>
                      <span> Convert VP </span>
                    </h2>
                  </div>
                  <div className="cash-points">
                    <div className="coin">
                      <div className="movie-box">
                        <video
                          width="100%"
                          height="100%"
                          autoPlay
                          playsInline
                          loop
                          poster="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-silver.png"
                        >
                          <source
                            src="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-silver-alpha.mov"
                            type="video/quicktime"
                          />
                          <source
                            src="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-silver-alpha.webm"
                            type="video/webm"
                          />
                        </video>
                      </div>
                      <div className="convert-icon">
                        <div className="chevron"></div>
                        <div className="chevron"></div>
                      </div>
                      <div className="movie-box">
                        <video
                          width="100%"
                          height="100%"
                          autoPlay
                          playsInline
                          loop
                          poster="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-gold.png"
                        >
                          <source
                            src="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-gold-alpha.mov"
                            type="video/quicktime"
                          />
                          <source
                            src="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-gold-alpha.webm"
                            type="video/webm"
                          />
                        </video>
                      </div>
                    </div>
                    <div className="cash-detail">
                      <div className="cash-input">
                        <div className="detail-title">
                          <span>Points</span>
                          <p className="text">
                            Minimum VP Required:{" "}
                            <span>{vipData.minConversion}</span>
                          </p>
                        </div>
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="0"
                          value={vpInput}
                          onChange={handleVpChange}
                        />
                      </div>
                      <div className="conversion">
                        <div className="ratio">
                          <span>VP Conversion Ratio : </span>
                          <div className="text">{vipData.conversionRatio}</div>
                        </div>
                      </div>
                      <div className="cash-input">
                        <div className="detail-title">
                          <span>Real Money</span>
                        </div>
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder="0"
                          value={moneyInput}
                          onChange={handleMoneyChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="button-ani button default"
                  onClick={handleConvert}
                >
                  Convert to Real Money
                  <img
                    alt="convert-button-dfbg"
                    src="https://img.s628b.com/sb/h5/assets/images/player/vip/convert-button-dfbg.png"
                  />
                </div>

                {convertSuccess && (
                  <div id="convert-content" className="convert-content">
                    <div className="convert-ani">
                      <div className="coin-block">
                        <video
                          width="100%"
                          height="100%"
                          loop
                          poster="https://img.s628b.com/sb/h5/assets/images/vip/vip-coin.png"
                        >
                          <source
                            src="https://img.s628b.com/sb/h5/assets/images/vip/vip-coin-alpha.mov"
                            type="video/quicktime"
                          />
                          <source
                            src="https://img.s628b.com/sb/h5/assets/images/vip/vip-coin-alpha.webm"
                            type="video/webm"
                          />
                        </video>
                        <div className="convert-success text">Success !</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIP History Popup */}
      {activePopup === "history" && (
        <div
          className={`popup-page-wrapper ${
            activePopup === "history" ? "active" : ""
          }`}
        >
          <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
            <div className="popup-page__backdrop"></div>
            <div className="popup-page__main popup-page-main popup-page-main--show">
              <div className="popup-page-main__header">
                <div
                  className="popup-page-main__back"
                  onClick={() => setActivePopup("main")}
                
                >
                  
                  </div>
                <div className="popup-page-main__title">VIP History</div>
                <div className="popup-page-main__close" onClick={closeModal}></div>
              </div>
              <div className="popup-page-main__container">
                <div className="content mcd-style player-content vip-content">
                  <div className="acquired-content">
                    <div className="history-content">
                      <div className="vip-year">{vipData.history.year}</div>
                      <div className="vip-history-list">
                        <ul className="form-vip-history">
                          <li className="vip-month">{vipData.history.month}</li>
                          <li className="lv1 vip-level">
                            <span
                              className="item-icon"
                              style={{
                                backgroundImage: `url(${vipData.levelIcon})`,
                              }}
                            ></span>
                            <div className="text">VIP LEVEL</div>
                            <div className="level">{vipData.level}</div>
                          </li>
                          <li className="vip-acquired">
                            <div className="text">Experience Acquired</div>
                            <div className="acquired">
                              {vipData.history.acquired}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIP Points Popup */}
      {activePopup === "points" && (
        <div
          className={`popup-page-wrapper ${
            activePopup === "points" ? "active" : ""
          }`}
        >
          <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
            <div className="popup-page__backdrop"></div>
            <div className="popup-page__main popup-page-main popup-page-main--show">
              <div className="popup-page-main__header">
                <div
                  className="popup-page-main__back"
                  onClick={() => setActivePopup("main")}
                  // style={{
                  //   maskImage:
                  //     'url("/assets/images/icon-set/icon-arrow-type01.svg")',
                  // }}
                ></div>
                <div className="popup-page-main__title">VIP Points (VP)</div>
                <div className="popup-page-main__close" onClick={closeModal}></div>
              </div>
              <div className="popup-page-main__container">
                <div className="content mcd-style player-content player-vip">
                  <div className="player-top">
                    <div className="tab-btn-section">
                      <div className="tab-btn tab-btn-page">
                        <div
                          className="line"
                          style={{
                            width: "calc(50%)",
                            transform: "translate(0%, 0px)",
                          }}
                        ></div>
                        <div className="btn active">
                          <div className="text">VP Received</div>
                        </div>
                        <div className="btn">
                          <div className="text">VP Used</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content tab-content-page">
                    <div className="inner-box">
                      <div className="no-result">
                        <div className="pic">
                          <img
                            alt="no-data"
                            src="https://img.s628b.com/sb/h5/assets/images/no-data.png"
                          />
                        </div>
                        <div className="text">No Data</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
