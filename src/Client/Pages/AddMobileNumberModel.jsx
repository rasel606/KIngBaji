import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";
import { UserOptSend } from "../Component/Axios-API-Service/AxiosAPIService";
export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const {
    isAuthenticated,
    loginUser,
    logoutUser,
    verifyUser,
    userId,
    userDeatils,
  } = useAuth();

  console.log(userDeatils);
  const [phone, setPhone] = useState(userDeatils.phone[0].number || "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  const handleSubmit =async () => {
    // e.preventDefault(); // optional if form used
    // if (!phone.trim()) {
    //   alert("অনুগ্রহ করে সঠিক ফোন নম্বর লিখুন।");
    //   return;
    // }
    const payload = {
      userId: userId,
      phone: {
        number: phone,
      },
    };

    const response = await UserOptSend(payload);
    console.log("API Response:", response.data);

    if (response.data) {
      console.log("OTP sent successfully ✅");

      setIsSubmitted(true);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        openModal("VerifyOptPage");
      }, 1000);
    } else {
      console.error("Failed to send OTP:", response.data.message);
      console.Log("Failed to send OTP:", response.data.message);
      alert(response.data.message || "OTP পাঠানো ব্যর্থ হয়েছে।");
    }
  };

  // const handleSubmit = async (e) =>{}

  return (
    <div
      className="mcd-popup-page popup-page-wrapper active"
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Add Mobile</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content member-content new-login third-party-login">
              <div className="content player-content">
                <div className="content player-content">
                  <form className="">
                    <div className="menu-box">
                      <div className="input-group">
                        <label>Phone</label>
                        <input
                          type="text"
                          className="input "
                          placeholder="Your phone number ..."
                          value={phone || userDeatils.phone[0].number}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {phone && (
                          <input
                            className="clear"
                            onClick={() => setPhone("")}
                          />
                        )}
                      </div>
                    </div>
                  </form>
                  <div
                    className={`button ${
                      phone || userDeatils.phone[0].number ? "btn" : "btn-disabled"
                    }`}
                    onClick={() => handleSubmit()}
                  >
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
