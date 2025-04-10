import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const Depositdata = [
    {
      id: 1,
      DepositTitle: "Deposit",
      DepositDATA: "",
    },
  ];

  const options = [
    "৩.২৫% আনলিমিটেড ডিপোজিট বোনাস",
    "অন্য বিকল্প",
    "আরও একটি বিকল্প",
  ];

  const PaymentMathod = [
    {
      id: "depositSetting_3253",
      name: "depositSetting",
      value: "EXPAY",
    },
    {
      id: "depositSetting_1768",
      name: "depositSetting",
      value: "JustPay",
      tag: "Recommended",
      tagIconUrl:
        "https://img.m2911p.com/mp/h5/assets/images/icon-set/icon-recommond.svg?v=1736240166505",
    },
    {
      id: "depositSetting_3177",
      name: "depositSetting",
      value: "Autopay",
    },
    {
      id: "depositSetting_2959",
      name: "depositSetting",
      value: "সেন্ড মানি",
    },
  ];

  const Amount = [
    { id: "0", value: "2000", label: "2,000" },
    { id: "1", value: "5000", label: "5,000" },
    { id: "2", value: "10000", label: "10,000" },
    { id: "3", value: "15000", label: "15,000" },
    { id: "4", value: "20000", label: "20,000" },
    { id: "5", value: "25000", label: "25,000" },
    { id: "6", value: "1000", label: "1,000" },
    { id: "7", value: "200", label: "200" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="popup-page-wrapper active" onClick={closeModal}>
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top" onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Reffer bonus</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content fixed-tab player-content">
              <div className="tab-btn-section referral-partner-tab">
                <div className="tab-btn tab-btn-page">
                  <div className="line" style={{ width: "50%" }}></div>
                  <button className="btn active">
                    <div className="text">Invite</div>
                  </button>
                  <button className="btn">
                    <div className="text">Details</div>
                  </button>
                </div>
              </div>

              <div className="ng-trigger ng-trigger-tabPageTriggerAni">
                <div className="referral-partner">
                  <div className="menu-box invitation-link">
                    <h2>Refer Your Friends and Earn</h2>
                    <div className="code-box">
                      <div className="invite-banner">
                        <img
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/referral-invite-banner-en.png"
                          alt="Referral Banner"
                        />
                      </div>
                      <div className="invite-cont">
                        <div className="left">
                          <div className="bonus-title">
                            <div className="invite-qr-code">
                              <div className="qr-code">
                                <div className="qrcode">
                                  <img src="data:image/png;base64,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" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          <div className="bonus-title"> Invitation URL </div>
                          {/* <div className="bonus-title">
                            <div className="btn-share">Share</div>
                          </div> */}

                          <div className="btn-share">Share</div>
                          <div className="code">
                            <span>{"WOA86h"}</span>
                            <div className="btn">
                              <img
                                alt="icon-copy-type02"
                                src="https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-copy-type02.svg?v=1737454371567&amp;source=mcdsrc"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                  <div class="menu-box referral-dashboard">
                    <div class="title">
                      <h2>Dashboard</h2>
                    </div>
                    <div class="recommend-friends-box">
                      <div class="referral-cont">
                        <div class="status-box">
                          <div class="status">
                            <div class="text">Friends' Invited</div>
                            <div class="number">0</div>
                          </div>
                          <div class="status">
                            <div class="text">Friends' Completed</div>
                            <div class="number">0</div>
                          </div>
                          <div class="status">
                            <div class="text">Today's Rebate</div>
                            <div class="number">৳ 0</div>
                          </div>
                          <div class="status">
                            <div class="text">Yesterday's Rebate</div>
                            <div class="number">৳ 0</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                  <div className="menu-box can-receive-bonus">
                    <div className="title">
                      <h2>
                        <span>Rebate Bonus</span>
                      </h2>
                    </div>
                    <div className="receive-box">
                      <div className="referral-banner">
                        <img
                          alt="receive-betting-bonus-banner-en"
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/receive-betting-bonus-banner-en.png?v=1737454371567"
                          loading="lazy"
                        />
                      </div>
                      <div className="item">
                        <div className="receive-bonus">
                          <div className="text">
                            <i style={{ display: "initial" }}>৳ 0</i>
                          </div>
                          <div className="button">Claim</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="menu-box referral-requirement">
                    <div class="title">
                      <h2>Requirement</h2>
                    </div>
                    <div class="condition-box">
                      <div class="invite-banner">
                        <img
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/referral-requirement-banner-en.png?v=1737454371567"
                          alt="Referral Requirement Banner"
                        />
                      </div>
                      <div class="referral-cont">
                        <div class="title">
                          The following conditions must be met for each referrer
                          and referred friends.
                        </div>
                        <div class="condition-list">
                          <div class="item">
                            <div class="condition">Total Deposits</div>
                            <div class="text">৳ 2,000.00</div>
                          </div>
                          <div class="item">
                            <div class="condition">Total Turnover</div>
                            <div class="text">6,000.00</div>
                          </div>
                          <div class="item">
                            <div class="condition">Within Days</div>
                            <div class="text">15</div>
                          </div>
                          <div class="item">
                            <div class="condition">Phone</div>
                            <div class="text">Phone verified</div>
                          </div>
                        </div>
                        <div class="code-box-tips">
                          <p>
                            Both you &amp; your friend will receive the bonus
                            once met the conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-box referral-bonus-goals">
                    
                      <div class="title">
                        <h2>Monthly Achievement Goals</h2>
                        <div class="detail-btn">
                          <img
                            src="https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-search-type02.svg"
                            alt="icon"
                          />
                          <span>Goals & Bonuses</span>
                        </div>
                      </div>

                      <div class="achievement-bonus-block">
                        <ul class="achievement-bonus-box">
                          <li>
                            <div class="achievement-icon">
                              <img
                                src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-1.png"
                                alt="achievement"
                              />
                            </div>
                            <div class="achievement-bonus-group">
                              <div class="achievement-bonus-title">
                                <p>
                                  Agent Achievement <i>5</i>
                                </p>
                                <p class="number">
                                  <i>0</i> / 5
                                </p>
                              </div>
                              <div class="achievement-bonus-bar">
                                <div class="progress-bar">
                                  <div
                                    class="bar-inner"
                                    style={{width: "0%"}}
                                  ></div>
                                </div>
                              </div>
                              <strong class="achievement-bonus-number">
                                ৳ 177.00
                              </strong>
                            </div>
                          </li>

                          <li>
                            <div class="lock-mask">
                              <div class="icon">
                                <img
                                  src="https://img.c88rx.com/cx/h5/assets/images/player/referral/icon-lock.png"
                                  alt="lock"
                                />
                              </div>
                            </div>
                            <div class="achievement-icon">
                              <img
                                src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-2.png"
                                alt="achievement"
                              />
                            </div>
                            <div class="achievement-bonus-group">
                              <div class="achievement-bonus-title">
                                <p>
                                  Agent Achievement <i>10</i>
                                </p>
                                <p class="number">
                                  <i>0</i> / 10
                                </p>
                              </div>
                              <div class="achievement-bonus-bar">
                                <div class="progress-bar">
                                  <div
                                    class="bar-inner"
                                    style={{width: "0%"}}
                                  ></div>
                                </div>
                              </div>
                              <strong class="achievement-bonus-number">
                                ৳ 377.00
                              </strong>
                            </div>
                          </li>

                          <li>
                            <div class="lock-mask">
                              <div class="icon">
                                <img
                                  src="https://img.c88rx.com/cx/h5/assets/images/player/referral/icon-lock.png"
                                  alt="lock"
                                />
                              </div>
                            </div>
                            <div class="achievement-icon">
                              <img
                                src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-3.png"
                                alt="achievement"
                              />
                            </div>
                            <div class="achievement-bonus-group">
                              <div class="achievement-bonus-title">
                                <p>
                                  Agent Achievement <i>15</i>
                                </p>
                                <p class="number">
                                  <i>0</i> / 15
                                </p>
                              </div>
                              <div class="achievement-bonus-bar">
                                <div class="progress-bar">
                                  <div
                                    class="bar-inner"
                                    style={{width: "0%"}}
                                  ></div>
                                </div>
                              </div>
                              <strong class="achievement-bonus-number">
                                ৳ 777.00
                              </strong>
                            </div>
                          </li>
                        </ul>
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
