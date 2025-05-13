import React, { useState, useEffect } from "react";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";
import AddMobileNumberModel from "./AddMobileNumberModel";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  const { userDeatils, token, updateUserDetails } = useAuth();
  const [isOpenToggle, setIsOpenToggle] = useState(true);
  const [isOpenToggle1, setIsOpenToggle1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(userDeatils.phone || "");
  // const [isPhoneVerified, setIsPhoneVerified] = useState(
  //   userDeatils?.isVerified.phone || false
  // );

  if (activeModal !== modalName) return null;

  const toggleList = () => {
    setIsOpenToggle(!isOpenToggle);
  };
  const toggleListOne = () => {
    setIsOpenToggle1(!isOpenToggle1);
  };

  const handleAddName = () => {
    openModal("AddNameModel");
  };

  const handleAddBirthday = () => {
    openModal("AddBirthdayModal");
  };

  const handleVerifyPhone = () => {
    openModal("VerifyOptPage");
  };

  const handleAddEmail = () => {
    openModal("AddEmailModel");
  };
  const handleAddMobile = () => {
    openModal("AddMobileNumberModel");
  };

  
    // useEffect(() => {
    //   if (userDeatils.length > 0) {
    //     setIsPhoneVerified(userDeatils?.isVerified?.phone);
    //   }
    // }, [userDeatils,modalName]);

  // const handleSendVerificationCode = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "/api/user/send-verification-code",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     // Show success message or proceed to verification
  //     openModal("VerifyOptPage");
  //   } catch (error) {
  //     console.error("Error sending verification code:", error);
  //     // Handle error
  //   } finally {
  //     setLoading(false);
  //   }
  // };






  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="popup-page-wrapper active">
      <div
        className="popup-page show-toolbar popup-page--active popup-page--align-top"
        onClick={closeModal}
      >
        <div
          className="popup-page__backdrop"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-page__main popup-page-main popup-page-main--show">
            <div className="popup-page-main__header">
              <div className="popup-page-main__title">Personal Info</div>
              <div
                className="popup-page-main__close"
                onClick={closeModal}
              ></div>
            </div>
            <div className="popup-page-main__container">
              <div className="content mcd-style new-profile player-content third-party-login">
                <div className="player-vip-lv1">
                  <div
                    className="player-info-vip"
                    style={{
                      backgroundImage:
                        "url('https://img.s628b.com/sb/h5/assets/images/player/vip/vip-card-bg-1.jpg?v=1745315543147')",
                    }}
                  >
                    <div className="member-pic">
                      <span
                        className="item-icon"
                        style={{
                          backgroundImage:
                            "url('https://img.s628b.com/sb/h5/assets/images/player/vip/memberpic-lv1.svg?v=1745315543147')",
                        }}
                      ></span>
                    </div>
                    <div
                      className="member-label"
                      style={{
                        backgroundImage:
                          "url('https://img.s628b.com/sb/h5/assets/images/player/vip/vip-label-1.png?v=1745315543147')",
                      }}
                    ></div>
                  </div>
                  <div className="membername-wrap">
                    <div className="membername">
                      {userDeatils.userId || "N/A"}
                    </div>
                    <div className="level">Copper</div>
                    <br />
                    <div className="register-date">
                      Date Registered: <i>{formatDate(userDeatils.timestamp)}</i>
                    </div>
                  </div>
                </div>

                <div id="profile-vip-div" className="menu-box">
                  <div className="vip-area-group">
                    <div className="left-box">
                      <div className="item">
                        <h3>VIP Points (VP)</h3>
                        <div className="points-number">
                          {userDeatils.vipPoints || 0}
                        </div>
                      </div>
                    </div>
                    <div className="right-box">
                      <a
                        className="goto-myvip"
                        onClick={() => openModal("MyVipModal")}
                      >
                        <div className="myvip-text">
                          <span>My VIP</span>
                          <span
                            className="item-icon"
                            style={{
                              maskImage:
                                "url('https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/icon-arrow.svg?v=1745315543147')",
                            }}
                          ></span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {userDeatils?.isVerified.phone !== true &&(<div className="tips-info verify-tips tips-info-toggle">
                  <div className="title-box">
                    <h5>
                      <i
                        className="tips-icon"
                        style={{
                          maskImage:
                            "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-tips-type02.svg?v=1745315543147')",
                        }}
                      ></i>
                      <span>
                        Below info are required to proceed deposit request.
                      </span>
                    </h5>
                    <div
                      className={`toggle-btn ${isOpenToggle ? "active" : ""}`}
                      onClick={toggleList}
                      style={{
                        maskImage:
                          "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1745315543147')",
                      }}
                    ></div>
                  </div>
                  {isOpenToggle && (
                    <ol className="tips-info-block active">
                      <li className="contact-info">
                        <a>
                          <label>Contact Info</label>
                          <ul>
                            <li>Phone Number</li>
                          </ul>
                        </a>
                      </li>
                    </ol>
                  )}
                </div>)}

                <div className="tips-info verify-tips tips-info-toggle">
                  <div className="title-box">
                    <h5>
                      <i
                        className="tips-icon"
                        style={{
                          maskImage:
                            "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-tips-type02.svg?v=1745315543147')",
                        }}
                      ></i>
                      <span>
                        Please complete the verification below before you
                        proceed with the withdrawal request.
                      </span>
                    </h5>
                    <div
                      className={`toggle-btn ${isOpenToggle1 ? "active" : ""}`}
                      onClick={toggleListOne}
                      style={{
                        maskImage:
                          "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1745315543147')",
                      }}
                    ></div>
                  </div>
                  {isOpenToggle1 && (
                    <ol className="tips-info-block active">
                      <li className="personal-info">
                        <a>
                          <label>Personal Info</label>
                          <ul>
                            <li>Full Name</li>
                          </ul>
                        </a>
                      </li>
                      {userDeatils?.isVerified.phone !== true&& (<li className="contact-info">
                        <a>
                          <label>Contact Info</label>
                          <ul>
                            <li>Phone Number</li>
                          </ul>
                        </a>
                      </li>)}
                    </ol>
                  )}
                </div>

                <div className="menu-box unverified-block-personal">
                  {/* Full Name Section */}
                  <div className="list-group" name="Full Name">
                    <div className="icon-block">
                      <div
                        className="item-icon"
                        style={{
                          maskImage:
                            "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-username.svg?v=1745315543147')",
                        }}
                      ></div>
                    </div>
                    <div className="list">
                      <div className="list-info">
                        <div className="left">
                          <div className="info-block">
                            <div>
                              <label className="title">Full Name</label>
                              {/* <label className="">{userDeatils.name || ""}</label> */}
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          {!userDeatils.name ? (
                            <button className="button" onClick={handleAddName}>
                              Add
                            </button>
                          ) : (
                            <div className="status verified-btn">
                              {userDeatils.name ? userDeatils.name : "Verified"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Birthday Section */}
                  <div className="list-group" name="Birthday">
                    <div className="icon-block">
                      <div
                        className="item-icon"
                        style={{
                          maskImage:
                            "url('https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-birthday.svg?v=1745315543147')",
                        }}
                      ></div>
                    </div>
                    <div className="list">
                      <div className="list-info">
                        <div className="left">
                          <div className="info-block">
                            <div>
                              <label className="title">Birthday</label>
                              <br/>
                              {/* <label className="ng-tns-c753367749-27">
                                {formatDate(userDeatils.birthday)}
                              </label> */}
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          {!userDeatils.birthday ? (
                            <button
                              className="button"
                              onClick={handleAddBirthday}
                            >
                              Add
                            </button>
                          ) : (
                            <div className="status verified-btn">{formatDate(userDeatils.birthday)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number Section */}
                  <div className="list-group" name="Phone Number">
                    <div className="icon-block">
                      <div
                        className="item-icon"
                        style={{
                          maskImage:
                            "url('https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-phone.svg?v=1745315543147')",
                        }}
                      ></div>
                    </div>
                    <div className="list phone">
                      {userDeatils.phone?.length > 0 ? (
                        <div className="list-info">
                          <div className="left">
                            <div className="info-block">
                              <div>
                                <label className="title">Phone Number</label>
                              </div>
                              <label className="tips">
                                {userDeatils.phone.map((phone, index) => (
                                  <div key={index}>
                                    {phone.countryCode} {phone.number}
                                    {phone.isDefault && " (Default)"}
                                  </div>
                                ))}
                              </label>
                            </div>
                          </div>
                          <div className="right">
                            {userDeatils.phone[0].verified ? (
                              <div className="status verified-btn">
                                {userDeatils.phone[0].verified
                                  ? "Verified"
                                  : "Not Verified"}
                              </div>
                            ) : (
                              <div
                                className="status unconfirm-btn"
                                onClick={handleAddMobile}
                              >
                                Not Verified
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <a className="add-phone-btn" onClick={handleAddMobile}>
                          <div className="icon-add-phone-btn"></div>
                          <p>Add</p>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Email Section */}
                  <div className="list-group" id="profile-email" name="E-mail">
                    <div className="icon-block">
                      <div
                        className="item-icon"
                        style={{
                          maskImage:
                            "url('https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-email.svg?v=1745315543147')",
                        }}
                      ></div>
                    </div>
                    <div className="list">
                      <div className="list-info">
                        <div className="left">
                          <div className="info-block">
                            <div>
                              <label className="title">Email</label>
                            </div>
                            <label className="tips">
                              {userDeatils.email || ""}
                            </label>
                          </div>
                        </div>
                        <div className="right">
                          {!userDeatils.email ? (
                            <button className="button" onClick={handleAddEmail}>
                              Add
                            </button>
                          ) : userDeatils.emailVerified ? (
                            <div className="status verified-btn">Verified</div>
                          ) : (
                            <div className="status unconfirm-btn">
                              Not Verified
                            </div>
                          )}
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
                          "url('https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-customer.png?v=1745315543147')",
                      }}
                    ></span>
                  </i>
                  <p>
                    For privacy and security, Information can't be modified
                    after confirmation. Please{" "}
                    <span name="liveChatBtn" className="ng-tns-c753367749-27">
                      contact customer service
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
