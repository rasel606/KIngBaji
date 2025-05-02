import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({
  modalName
}) => {

  const {  activeModal, openModal, closeModal  } = useModal();
  if (activeModal !== modalName) return null;

  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.trim()) {
      setIsSubmitted(true);
    } else {
      alert("অনুগ্রহ করে সম্পূর্ণ নাম লিখুন।");
    }
  };
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Add Email</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="model-content member-content new-login third-party-login">
              <div className="Namecontent player-content">
                <div className="Namecontent player-content">
                  <form className="">
                    <div className="menu-box">
                      <div className="input-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="input "
                          placeholder="Your full phone ..."
                        />
                        <input className="clear" />
                      </div>
                    </div>
                  </form>
                  <div className="button-phone btn-disabled "onClick={()=>openModal("VerifyOtpPageemail")} >
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
