import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import { UserEmailOptVerify, UserOptSend } from "../Component/Axios-API-Service/AxiosAPIService";

export default ({
  modalName
}) => {

  const {  activeModal, openModal, closeModal  } = useModal();
  if (activeModal !== modalName) return null;
 const {
    isAuthenticated,
    loginUser,
    logoutUser,
    
    userId,
    userDeatils,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [ShowSuccess, setShowSuccess] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const payload = {
         userId: userId,
         email: email,
       };
   
       const response = await UserEmailOptVerify(payload);
       console.log("API Response:", response.data);
   
       if (response.data) {
         console.log("OTP sent successfully ✅");
   
         setIsSubmitted(true);
         
   
         setTimeout(() => {
           setShowSuccess(false);
           openModal("VerifyOtpPageemail");
         }, 1000);
       } else {
         console.error("Failed to send OTP:", response.data.message);
         console.Log("Failed to send OTP:", response.data.message);
         alert(response.data.message || "OTP পাঠানো ব্যর্থ হয়েছে।");
       }
    
  };
  return (
    <div className="mcd-popup-page popup-page-wrapper active" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Add Email</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content member-content new-login third-party-login">
              <div className="content player-content">
                <div className="content player-content">
                  <form className="">
                    <div className="menu-box">
                      <div className="input-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="input "
                          placeholder="Your phone number ..."
                          value={email || userDeatils.email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {email && (
                          <input
                            className="clear"
                            onClick={() => setEmail("")}
                          />
                        )}
                      </div>
                    </div>
                  </form>
                  <div className={`button ${email ? "" : "btn-disabled"}`} onClick={() => handleSubmit()} >
                    <a>সাবমিট</a>
                  </div>
                  <p className="button-tips player">
                    আপনার গোপনীয়তার জন্য, নিশ্চিতকরণের পরে তথ্য পরিবর্তন করা
                    যাবে না। আপনার যদি সাহায্যের প্রয়োজন হয়, তাহলে অনুগ্রহ করে{" "}
                    <i>গ্রাহক পরিষেবাতে</i> যোগাযোগ করুন।
                  </p>
                  {ShowSuccess && (
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
          </div>
        </div>
      </div>
    </div>
  );
};
