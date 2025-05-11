import React, { useEffect, useRef, useState } from "react";
import { useModal } from "../Component/ModelContext";
import { UserOptVerify } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";
import "../Component/SideBar.css";

export default function VerificationModal({ modalName }) {
  const { activeModal } = useModal();
  const { userId } = useAuth(); // Ensure userId is defined
  const phone = "+8801335432023"; // Set your dynamic phone number here



  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(180); // 4:31 in seconds
  const [success, setSuccess] = useState(false);
  const [resendActive, setResendActive] = useState(false);
  const inputsRef = useRef([]);
  
  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendActive(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-submit once 4 digits entered
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleVerify();
    }
  }, [code]);
  if (activeModal !== modalName) return null;
  const handleInputChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  
  const handleVerify = async () => {
    console.log(code.join(""));
    try {
      const response = await UserOptVerify(
        {phone:userId.phone[0].number,
        userId:userId,
        code:code.join("")}
      );
      console.log("API Response:", response.data);
  
      if (response.data.success) {
        setSuccess(true);
      } else {
        alert(response.data.message || "Invalid code");
      }
    } catch (err) {
      alert("Verification failed");
    }
  };

  const handleResend = () => {
    setCode(["", "", "", ""]);
    setTimer(300);
    setSuccess(false);
    setResendActive(false);
    inputsRef.current[0]?.focus();
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `(${min}:${sec})`;
  };

  return (
    <div className="popup-page__main popup-page-main popup-page-main--show">
      <div className="popup-page-main__header">
        <div className="popup-page-main__back"></div>
        <div className="popup-page-main__title">Verification Code</div>
        <div className="popup-page-main__close"></div>
      </div>
      <div className="popup-page-main__container">
        <div className="content mcd-style third-party-login verify-code">
          <div className="verification-wrap">
            <div className="verification-txt">
              <p>
                Please enter the 4-digit code sent to{" "}
                <span className="player">{phone}</span>
              </p>
            </div>
            <div className="verification-content">
              <form className="verification-code" noValidate>
                <fieldset>
                  <div className="verification-input" id="verification-input">
                    {[...Array(4)].map((_, i) => (
                      <input
                        key={i}
                        id={`code-${i}`}
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="1"
                        value={code[i]}
                        onChange={(e) =>
                          handleInputChange(i, e.target.value)
                        }
                        ref={(el) => (inputsRef.current[i] = el)}
                        onInput={(e) => {
                          if (e.target.value.length > 1)
                            e.target.value = e.target.value.slice(0, 1);
                        }}
                      />
                    ))}
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="verification-tips">
              <p>
                Didn't receive code?{" "}
                <a
                  className={`resend-btn ${resendActive ? "active" : ""}`}
                  onClick={resendActive ? handleResend : undefined}
                >
                  Resend{" "}
                  
                </a>
                <span className={`time ${resendActive ? "active" : ""}`}>{formatTime(timer)}</span>
              </p>
            </div>
          </div>

          {success && (
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
          )}
        </div>
      </div>
    </div>
  );
}
