
import React, { useEffect} from "react";

const SuccessPopUp = () => {



  return (

<div className="cdk-overlay-container">
  <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"></div>
  <div className="cdk-global-overlay-wrapper">
    <div className="cdk-overlay-pane dialog-pane">
      <div className="popup" >
        {/* {showCloseButton && (
          <div className="popup__header" onClick={() => navigate(-1)}>
            <div className="popup__close" onClick={onClose}></div>
          </div>
        )} */}

        <div className="popup-content">
          <div
            class="menu-mask"
            style={{ display: "block"  }}
            // onClick={() => onClose()}
          ></div>
          <div className={`pop-wrap pop-success${ "show" }`}>
            <div className="register-success-wrap">
              <div className="register-success-cont">
                <div className="register-success-txt top-inner">
                  <div className="success-checkmark">
                    <div className="check-icon">
                      <span className="icon-line line-tip"></span>
                      <span className="icon-line line-long"></span>
                      <div className="icon-circle"></div>
                      <div className="icon-fix"></div>
                    </div>
                  </div>
                  <h4>{"message"}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
}

export default SuccessPopUp;
