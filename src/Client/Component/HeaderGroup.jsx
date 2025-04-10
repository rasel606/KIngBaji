import React, { useState } from "react";
import { useModal } from "./ModelContext";

export default () => {
    // const { activeModal, openModal, closeModal } = useModal();
    // if (activeModal !== modalName) return null;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

  return (
    <header
      id="header"
      className="normal login dialog-opened"
     
       >
      <div className="header-left-btn-group" onClick={toggleMenu}>
        <div
          className="back-btn"
          style={{
            backgroundImage:
              "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1738748531996)",
          }}
        ></div>
         <div className="menu-btn" >
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      </div>

      <div className="header-title" ></div>
      <div 
        className="logo"
        tabIndex="0"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png)",
        }}
      ></div>

      {/* <div className="header-right-btn-group">
        <a className="app-download" href="/bd/en/app-download">
          <span
            className="item-icon"
            style={{
              maskImage:
                "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/header-appdownload-icon.svg?v=1738748531996)",
            }}
          ></span>
          <p>App</p>
        </a>

        <a className="service-btn" name="liveChatBtn">
          <span
            className="item-icon"
            style={{
              maskImage:
                "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/header-service-icon.svg?v=1738748531996)",
            }}
          ></span>
          <p>LiveChat</p>
        </a>

        <div
          className="editor-btn"
          style={{
            display: "none",
            maskImage:
              "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-editor.svg?v=1738748531996)",
          }}
        ></div>
      </div> */}
      {isMenuOpen && (
        <div className="cdk-overlay-container">
        <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing" onClick={toggleMenu}>
          <div className="cdk-global-overlay-wrapper" dir="ltr">
            <div className="cdk-overlay-pane dialog-panel">
              <div className="popup" id="dialog-2">
                <div className="popup__content">
                  <div className="menu active">
                    <div className="menu-first">
                      {/* Home Section */}
                      <ul className="home">
                        <li data-category="home">
                          <span 
                            className="item-icon" 
                            style={{
                              backgroundImage: `url("https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1725363175075")`
                            }}
                          ></span>
                          <a href="/bd/bn">হোম</a>
                        </li>
                      </ul>

                      {/* Vendor Section */}
                      <ul className="vendor">
                        {['sport', 'casino', 'slot', 'table', 'crash', 'fish', 'arcade', 'lottery'].map((category, index) => (
                          <li key={index} data-category={category}>
                            <span
                              className="item-icon"
                              style={{
                                backgroundImage: `url("https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-${category}.png?v=1725363175075")`
                              }}
                            ></span>
                            <a>{category}</a>
                          </li>
                        ))}
                      </ul>

                      {/* Promotion Section */}
                      <ul className="promotion-block">
                        <li data-category="promotion">
                          <span
                            className="item-icon"
                            style={{
                              backgroundImage: `url("https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-promotion.png?v=1725363175075")`
                            }}
                          ></span>
                          <a href="/bd/bn/promotion">প্রমোশন</a>
                        </li>
                      </ul>

                      {/* Support Block */}
                      <div className="support-block">
                        <div className="service" data-service="affiliate">
                          <span
                            className="item-icon"
                            style={{
                              backgroundImage: `url("https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-affiliate.png?v=1725363175075")`
                            }}
                          ></span>
                          <p>এফিলিয়েট</p>
                        </div>
                        <div className="service" data-service="talk">
                          <span
                            className="item-icon"
                            style={{
                              backgroundImage: `url("https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-talk.png?v=1725363175075")`
                            }}
                          ></span>
                          <p>24/7 LiveChat</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    
    </header>
  );
};


