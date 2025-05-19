import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { UpdateName } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";
// import "../Component/SideBar.css";
export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

 const { isAuthenticated, loginUser,logout, logoutUser,Token, token,userDeatils ,userId } =
     useAuth();

     const [code, setCode] = useState(['', '', '', '']);
     const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
     const [isVerified, setIsVerified] = useState(false);
     const inputsRef = useRef([]);
   
     useEffect(() => {
       if (!timeLeft || isVerified) return;
       const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
       return () => clearInterval(timer);
     }, [timeLeft, isVerified]);
   
     const handleChange = (index: number, value: string) => {
       if (/^\d$/.test(value) || value === '') {
         const newCode = [...code];
         newCode[index] = value;
         setCode(newCode);
   
         if (value && index < 3) {
           inputsRef.current[index + 1]?.focus();
         }
   
         // Auto-submit when all fields are filled
         if (newCode.every(c => c) && index === 3) {
           handleVerify();
         }
       }
     };
   
     const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
       if (e.key === 'Backspace' && !code[index] && index > 0) {
         inputsRef.current[index - 1]?.focus();
       }
     };
   
     const handleVerify = () => {
       // Add your verification logic here
       setIsVerified(true);
     };
   
     const handleResend = () => {
       if (timeLeft === 0) {
         setTimeLeft(300);
         // Add resend logic here
       }
     };
   
     const formatTime = (seconds: number) => {
       const mins = Math.floor(seconds / 60);
       const secs = seconds % 60;
       return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
     };
   
     const handlePaste = (e: React.ClipboardEvent) => {
       e.preventDefault();
       const pastedData = e.clipboardData.getData('text/plain').slice(0, 4);
       const newCode = [...code];
       
       pastedData.split('').forEach((char, index) => {
         if (index < 4 && /^\d$/.test(char)) {
           newCode[index] = char;
         }
       });
       
       setCode(newCode);
       inputsRef.current[Math.min(3, pastedData.length - 1)]?.focus();
     };
   
  return (
    <div className="mcd-popup-page popup-page-wrapper active" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">OTP Verify</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content member-content  third-party-login">
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
            {[0, 1, 2, 3].map((index) => (
              <label key={index} htmlFor={`code-${index}`} className="label">
                Number {index + 1}
              </label>
            ))}

            <div className="verification-input">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  id={`code-${index}`}
                  disabled={isVerified}
                />
              ))}
            </div>
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
