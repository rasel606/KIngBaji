import React from "react";
import { useModal } from "./ModelContext";



export default ({ modalName }) => {
  const { activeModal,openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
  return (
    <div className="popup__content">
      <div className="pop-wrap show">
        <button className="btn-close" onClick={closeModal}>
          <span 
            className="item-icon" 
            style={{ 
              backgroundImage: "url(https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1745841515741)" 
            }}
          ></span>
        </button>
        <div className="pop-title">
          <h3>Notification</h3>
        </div>
        <div className="pop-inner content-style">
          <p>Please log in or sign up to play the game.</p>
          <div className="login-register-button beforelogin">
            <div className="button login-button">
              <a onClick={()=>openModal("LoginModel")}>Login</a>
            </div>
            <div className="button register-button">
              <a onClick={()=>openModal("SingUpModal")}>Sign up</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pop-bg" style={{ display: "block" }}></div>
    </div>
  );
};

