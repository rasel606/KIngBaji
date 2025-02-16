import React, { useState } from "react";
import { useModal } from "../Component/ModelContext";


export default ({
  modalName
}) => {

  const {  activeModal, openModal, closeModal  } = useModal();
  if (activeModal !== modalName) return null;

  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing" onClick={closeModal}></div>
      <div className="cdk-global-overlay-wrapper" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="cdk-overlay-pane dialog-panel">
          <div className="popup" id="dialog-1">
            <div className="popup__header"></div>
            <div className="popup__content">
              <div className="pop-wrap gift-points-pop ani show">
                <button className="btn-close" onClick={closeModal}></button>
                <div className="detail-banner">
                  <img src={eventData.bannerUrl} alt="banner" loading="lazy" />
                </div>
                <div className="pop-inner content-style">
                  <p>{eventData.description}</p>
                  <h4>How to Participate:</h4>
                  <ul>
                    {eventData.participationSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                  <h4>Event Details:</h4>
                  <div className="table">
                    <table>
                      <thead>
                        <tr>
                          <th>Product (Games)</th>
                          <th>Turnover</th>
                          <th>Gift Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventData.eventDetails.map((detail, index) => (
                          <tr key={index}>
                            <td>{detail.product}</td>
                            <td>{detail.turnover}</td>
                            <td>{detail.giftPoints}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <h4>Note: {eventData.note}</h4>
                  <h4>Terms & Conditions:</h4>
                  <ul>
                    {eventData.terms.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="pop-bg" style={{ display: "block" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};


