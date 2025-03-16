import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { UpdateName } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";
import "../Component/SideBar.css";
export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

 const { isAuthenticated, loginUser,logout, logoutUser,verifyUserToken, verifyUser,token,userDeatils ,userId } =
     useAuth();

  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [code, setCode] = useState(["", "", "", ""]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };
  // Timer countdown logic
  useEffect(() => {
    let countdown;
    if (timer > 0 && isResendDisabled) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer, isResendDisabled]);

  const handleCodeChange = (index, value) => {
    if (value.match(/^[0-9]*$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      // Focus on the next input
      if (value !== "" && index < 3) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    setIsResendDisabled(true);
    setCode(Array(4).fill(""));
    console.log("Code resent");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
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
            <div className="model-content member-content  third-party-login">
              <div className="content mcd-style third-party-login verify-code">
                <div className="verification-wrap">
                  <div className="verification-txt">
                    <p>
                      Please enter the 4-digit code sent to{" "}
                      <span className="player">{userDeatils.email}</span>
                    </p>
                  </div>
                  <div className="verification-content">
                    <form
                      noValidate
                      name="one-time-code"
                      className="verification-code ng-untouched ng-pristine ng-valid"
                    >
                      <fieldset>
                        {[0, 1, 2, 3].map((_, index) => (
                          <input
                            key={index}
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={code[index]}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            onInput={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            id={`code-${index}`}
                            className="ng-star-inserted"
                          />
                        ))}
                      </fieldset>
                    </form>
                  </div>
                  <div className="verification-tips">
                    <p>
                      Didn’t receive code?{" "}
                      <a className="resend-btn active">
                        Resend <span className="time active">(04:49)</span>
                      </a>
                    </p>
                  </div>
                </div>
                <div className="pop-wrap pop-success">
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
                        <h4>Success</h4>
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
  );
};
