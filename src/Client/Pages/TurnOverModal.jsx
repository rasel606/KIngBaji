import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({
  modalName
}) => {

  const {  activeModal, openModal, closeModal  } = useModal();
  if (activeModal !== modalName) return null;
  const [isOpenTaggle, setIsOpenTaggle] = useState(false);

  const toggleList = () => {
    setIsOpenTaggle(!isOpenTaggle);
  };
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">My wallet</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="model-content member-content new-login third-party-login">
              <div className="tab-btn-section">
                <div className="tab-btn tab-btn-page">
                  <div className="btn">
                    <div className="text">Active</div>
                  </div>
                  <div className="btn">
                    <div className="text">Complate</div>
                  </div>
                </div>
              </div>
              <div className="ticket-wrap">
                <ul>
                  <div className="no-result">
                    <div className="pic">
                      <img
                        src="https://img.c88rx.com/cx/h5/assets/images/no-data.png?v=1736240945415&source=mcdsrc"
                        alt=""
                      />
                      <div className="text">Thare Have No Data</div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
