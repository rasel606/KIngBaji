import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";

export default ({ modalName}) => {
   const {  activeModal, openModal, closeModal  } = useModal();
    if (activeModal !== modalName) return null;

  const [isOpenTaggle, setIsOpenTaggle] = useState(false);
 const { isAuthenticated, loginUser,logout, logoutUser,verifyUserToken, verifyUser,token,userDeatils ,userId } =
     useAuth();
  const toggleList = () => {
    setIsOpenTaggle(!isOpenTaggle);
  };
  return (
    <div className="popup-page show-toolbar popup-page--active popup-page--align-top" onClick={closeModal}>
      <div className="popup-page__backdrop" onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">My wallet</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="model-content member-content  third-party-login">
              <div className="player-vip-lv1">
                <div
                  className="player-info-vip"
                  style={{
                    backgroundImage:
                      "url('https://img.c88rx.com/cx/h5/assets/images/player/vip/vip-card-bg-1.jpg?v=1736240945415')",
                  }}
                >
                  <div className="member-pic">
                    <span
                      className="item-icon"
                      style={{
                        backgroundImage:
                          "url('https://img.c88rx.com/cx/h5/assets/images/player/vip/memberpic-lv1.svg?v=1736240945415')",
                      }}
                    ></span>
                  </div>
                  <div
                    className="member-label"
                    style={{
                      backgroundImage:
                        "url('https://img.c88rx.com/cx/h5/assets/images/player/vip/vip-label-1.png?v=1736240945415')",
                    }}
                  ></div>
                </div>
                <div className="membername-wrap">
                  <div className="membername">{userDeatils.name}</div>
                  <div className="level">Bronze</div>
                  <br />
                  <div className="register-date">
                  Date of Registration : <i>{new Date(userDeatils.datetime).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}</i>
                  </div>
                </div>
              </div>
              <div id="profile-vip-div" className="menu-box">
                <div className="vip-area-group">
                  <div className="left-box">
                    <div className="item">
                      <h3>Gift points</h3>
                      <div className="points-number">0</div>
                    </div>
                  </div>
                  <div className="right-box">
                    <a
                      className="goto-myvip"
                      href="/bd/bn/member/vip-points-exchange(popup:member/new-profile-info)"
                    >
                      <div className="myvip-text">
                        <span>My Gift points</span>
                        <span
                          className="item-icon"
                          style={{
                            maskImage:
                              'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/player/vip/icon-arrow.svg?v=1736240945415")',
                          }}
                        ></span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="tips-info verify-tips tips-info-toggle">
                <div className="title-box">
                  <h5>
                    <i
                      className="tips-icon"
                      style={{
                        maskImage:
                          'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-tips-type02.svg?v=1736240945415")',
                      }}
                    ></i>
                    <span>
                      The following information is required to proceed with the
                      deposit request.
                    </span>
                  </h5>
                  <div
                    className={`toggle-btn ${isOpenTaggle ? "active" : ""}`}
                    onClick={toggleList}
                    style={{
                      maskImage:
                        'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1736240945415")',
                    }}
                  ></div>
                </div>
                <ol className={`tips-info-block `}>
                  {isOpenTaggle && (
                    <li className="contact-info">
                      <a>
                        <label>Contact Info</label>
                        <ul>
                          <li>ফোন নাম্বার</li>
                        </ul>
                      </a>
                    </li>
                  )}
                </ol>
              </div>
              <div className="tips-info verify-tips tips-info-toggle">
                <div className="title-box">
                  <h5>
                    <i
                      className="tips-icon"
                      style={{
                        maskImage:
                          'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-tips-type02.svg?v=1736240945415")',
                      }}
                    ></i>
                    <span>
                      Please complete the verification below before completing
                      the withdrawal request.
                    </span>
                  </h5>
                  <div
                    className="toggle-btn"
                    onClick={toggleList}
                    style={{
                      maskImage:
                        'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1736240945415")',
                    }}
                  ></div>
                </div>
                {isOpenTaggle && (
                  <ol className="tips-info-block active">
                    <li className="contact-info">
                      <a>
                        <label>Contact Info</label>
                        <ul>
                          <li>ফোন নাম্বার</li>
                        </ul>
                      </a>
                    </li>
                  </ol>
                )}
              </div>

              <div className="menu-box unverified-block-personal">
                <div className="list-group" name="Full Name">
                  <div className="icon-block">
                    <div
                      className="item-icon"
                      style={{
                        maskImage:
                          'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-username.svg?v=1736240945415")',
                      }}
                    ></div>
                  </div>
                  <div className="list">
                    <div className="list-info">
                      <div className="left">
                        <div className="info-block">
                          <label className="title">Full Name</label>
                        </div>
                      </div>
                      <div className="right">
                        <button className="button" onClick={()=> openModal("AddNameModel")}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="list-group" name="Birthday">
                  <div className="icon-block">
                    <div
                      className="item-icon"
                      style={{
                        maskImage:
                          'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/player/icon-birthday.svg?v=1736240945415")',
                      }}
                    ></div>
                  </div>
                  <div className="list">
                    <div className="list-info">
                      <div className="left">
                        <div className="info-block">
                          <label className="title">Birthday</label>
                        </div>
                      </div>
                      <div className="right">
                        <button className="button" onClick={()=> openModal("AddBirthdayModal")}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="list-group" name="Phone Number">
                  <div className="icon-block">
                    <div
                      className="item-icon"
                      style={{
                        maskImage:
                          'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/player/icon-phone.svg?v=1736240945415")',
                      }}
                    ></div>
                  </div>
                  <div className="list phone">
                    <div className="list-info">
                      <div className="left">
                        <div className="info-block" >
                          <label className="title">Phone Number</label>
                          <label className="tips"></label>
                        </div>
                      </div>
                      <div className="right" onClick={()=>openModal("VerifyOptPage")}>
                        <div className="status unconfirm-btn">
                          Not Verified
                        </div>
                      </div>
                    </div>
                    <a className="add-phone-btn">
                      <div className="icon-add-phone-btn"></div>
                      <p>অ্যাড</p>
                    </a>
                  </div>
                </div>

                <div className="list-group" id="profile-email" name="ই-মেইল">
                  <div className="icon-block">
                    <div
                      className="item-icon"
                      style={{
                        maskImage:
                          'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/player/icon-email.svg?v=1736240945415")',
                      }}
                    ></div>
                  </div>
                  <div className="list">
                    <div className="list-info">
                      <div className="left">
                        <div className="info-block" onClick={()=>openModal("SendEmailOtp")}>
                          <label className="title">Email</label>
                        </div>
                      </div>
                      <div className="right">
                        <button className="button"onClick={()=> openModal("AddEmailModel")}>অ্যাড</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="member-menu-point">
                <i>
                  <span
                    className="item-icon"
                    style={{
                      backgroundImage:
                        'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-customer.png?v=1736240945415")',
                    }}
                  ></span>
                </i>
                <p>
                  গোপনীয়তা এবং নিরাপত্তার জন্য, নিশ্চিতকরণের পরে তথ্য পরিবর্তন
                  করা যাবে না। অনুগ্রহ করে{" "}
                  <span name="liveChatBtn" className="liveChatBtn">
                    গ্রাহক পরিষেবার সাথে যোগাযোগ করুন
                  </span>{" "}
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
