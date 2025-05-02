import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({
  modalName
}) => {

  const {  activeModal, openModal, closeModal  } = useModal();
  if (activeModal !== modalName) return null;

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [ShowSuccess, setShowSuccess] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("অনুগ্রহ করে ইমেল ঠিকানা লিখুন।");
      return;
    }

    if (!validateEmail(email)) {
      setError("অনুগ্রহ করে সঠিক ইমেল ঠিকানা লিখুন।");
      return;
    }

    setError("");
    setIsSubmitted(true);
    openModal("VerifyOtpPageemail");
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
                          placeholder="Your full email ..."
                        />
                        <input className="clear" />
                      </div>
                    </div>
                  </form>
                  <div className={`button ${email ? "" : "btn-disabled"}`} onClick={()=>openModal("VerifyOtpPageemail")} >
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
