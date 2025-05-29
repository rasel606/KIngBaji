import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const McdTopAlert = ({
  isAmountAlertError,
  iconUrl,
  setIsAmountAlertError,
}) => {

   const navigate = useNavigate();
    const popupRef = useRef();
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setIsAmountAlertError(false);
        }
      };
  
      if (isAmountAlertError) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isAmountAlertError, setIsAmountAlertError]);
  
    if (!isAmountAlertError) return null;
  
  return (
    
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"></div>
      <div className="cdk-global-overlay-wrapper">
        <div className="cdk-overlay-pane dialog-pane">
          <div className="popup" ref={popupRef}>
            <div className="popup__header" onClick={() => navigate(-1)}>
              <div
                className="popup__close"
                onClick={() => setIsAmountAlertError(false)}
              ></div>

              <div
                className={`pop-wrap pop-login-fail ${
                  isAmountAlertError ? "active" : ""
                }`}
              >
                <div className="login-fail-tip">
                  <div
                    className="login-fail-icon"
                    style={{
                      maskImage: `url(${iconUrl})`,
                      WebkitMaskImage: `url(${iconUrl})`, // For cross-browser compatibility
                    }}
                  ></div>
                  <span>{isAmountAlertError}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McdTopAlert;
