import React from "react";
import { useModal } from "./ModelContext";

export default () => {
    const { activeModal, openModal, closeModal } = useModal();
    // if (activeModal !== modalName) return null;
  return (
    <header
      id="header"
      className="normal login dialog-opened"
     
      onClick={(e) => e.stopPropagation()} >
      <div className="header-left-btn-group" onClick={()=> openModal("SideNavPopUp")}>
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
      <div onClick={closeModal}
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
    </header>
  );
};


