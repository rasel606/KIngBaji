import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { UpdateName } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";
export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const {
    isAuthenticated,
    loginUser,
    logoutUser,
    userDeatils,
    setLoading,
    loading,
  } = useAuth();
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  const userId = userDeatils?.userId || "";


   const handleMyProfile = () => {
    openModal("AddNameModel");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (userDeatils?.userId) {
        const response = await UpdateName(name, userId);
        console.log(
          "response-------------------------------------------------------------------------------------------------------------1",
          response
        );

        setLoading(false);

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          closeModal();
          openModal("MyProfileModel");
        }, 3000);
      
          
  
        
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <>
      <div
        className="mcd-popup-page popup-page-wrapper active"
        onClick={closeModal}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
            <div className="popup-page-main__header">
              <div className="popup-page-main__title">Add Full Name</div>
              <div
                className="popup-page-main__close"
                onClick={closeModal}
              ></div>
            </div>
            <div className="popup-page-main__container">
              <div className="content mcd-style new-profile third-party-login member-content">
                <div className="content player-content">
                  <form className="">
                    <div className="menu-box">
                      <div className="input-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          className="input "
                          placeholder="Your full name ..."
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input className="clear" />
                      </div>
                    </div>
                  </form>
                  <div
                    className={`button ${name ? "" : "btn-disabled"}`}
                    onClick={handleSubmit}
                  >
                    <a>Submit</a>
                  </div>
                  <p className="button-tips player">
                    আপনার গোপনীয়তার জন্য, নিশ্চিতকরণের পরে তথ্য পরিবর্তন করা
                    যাবে না। আপনার যদি সাহায্যের প্রয়োজন হয়, তাহলে অনুগ্রহ করে{" "}
                    <i>গ্রাহক পরিষেবাতে</i> যোগাযোগ করুন।
                  </p>

                  {ShowSuccess && (
                    <div
                      className={`pop-wrap pop-success ${
                        ShowSuccess ? "show" : ""
                      }`}
                    >
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
    </>
  );
};
