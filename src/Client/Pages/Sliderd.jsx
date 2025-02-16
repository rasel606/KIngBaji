import React, { useState } from "react";
import Carousel from "./Carousel";
import DropdownWithScroll from "./DropdownWithScroll";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";
import { useModal } from "../Component/ModelContext";
import SingupSlider from "./SingupSlider";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login-tab">
            <div className="popup-page-main__title"> SignUp </div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <iframe
                // src={src}
                // width={width}
                // height={height}
                style={{
                  border: "none",
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
                // allowFullScreen
                
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
