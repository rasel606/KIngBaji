import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
    const { userDeatils, token, updateUserDetails } = useAuth()
  const [activeTab, setActiveTab] = useState('invite');
  const [friendsInvited, setFriendsInvited] = useState(0);
  const [friendsCompleted, setFriendsCompleted] = useState(0);
  const [todayRebate, setTodayRebate] = useState(0);
  const [yesterdayRebate, setYesterdayRebate] = useState(0);
  const [canClaimBonus, setCanClaimBonus] = useState(false);
  const [claimableBonus, setClaimableBonus] = useState(0);

  const invitationCode = `${userDeatils.referralCode}`;
  const invitationUrl = `https://kingbaji.live/?ref=${userDeatils.referralCode}`;
  const [showBonusDetails, setShowBonusDetails] = useState(false);

  const toggleBonusDetails = () => {
    setShowBonusDetails(!showBonusDetails);
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(invitationUrl);
    alert('Invitation code copied!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on KIngBaji',
        text: 'Use my referral code to get bonus!',
        url: invitationUrl,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(invitationUrl);
      alert('Invitation link copied to clipboard!');
    }
  };

  const handleClaimBonus = () => {
    if (canClaimBonus) {
      alert(`Successfully claimed ${claimableBonus}৳ bonus!`);
      setClaimableBonus(0);
      setCanClaimBonus(false);
    }
  };

  return (
    <div className="mcd-popup-page popup-page-wrapper active" onClick={closeModal}>
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top" onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__backdrop"></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Refer Bonus</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          
          <div className="popup-page-main__container">
            <div className="content mcd-style fixed-tab player-content">
              <div className="tab-btn-section referral-partner-tab">
                <div className="tab-btn tab-btn-page">
                  <div className="line" style={{ width: 'calc(50%)' }}></div>
                  <div 
                    className={`btn ${activeTab === 'invite' ? 'active' : ''}`}
                    onClick={() => setActiveTab('invite')}
                  >
                    <div className="text">Invite</div>
                  </div>
                  <div 
                    className={`btn ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                  >
                    <div className="text">Details</div>
                  </div>
                </div>
              </div>

              {activeTab === 'invite' && (
                <div className="referral-partner">
                  {/* Invitation Section */}
                  <div className="menu-box invitation-link">
                    <div className="title">
                      <h2><span>Refer Your Friends and Earn</span></h2>
                    </div>
                    <div className="code-box">
                      <div className="invite-banner">
                        <img 
                          alt="referral-invite-banner-en" 
                          src="https://img.s628b.com/sb/h5/assets/images/player/referral/referral-invite-banner-en.png" 
                          loading="lazy" 
                        />
                      </div>
                      <div className="invite-cont">
                        <div className="left">
                          <div className="bonus-title">Invitation QR Code</div>
                          <div className="invite-qr-code">
                            <div className="qr-code">
                              <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(invitationUrl)}`} 
                                alt="QR Code" 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="right">
                          <div className="bonus-title">Invitation URL</div>
                          <div className="btn-share" onClick={handleShare}>
                            Share
                          </div>
                          <div className="bonus-title">Invitation Code</div>
                          <div className="code">
                            <span>{userDeatils.referralCode}</span>
                            <div className="btn" onClick={handleCopyCode}>
                              <img 
                                alt="icon-copy-type02" 
                                src="https://img.s628b.com/sb/h5/assets/images/icon-set/icon-copy-type02.svg" 
                                loading="lazy" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Section */}
                  <div className="menu-box referral-dashboard">
                    <div className="title">
                      <h2><span>Dashboard</span></h2>
                    </div>
                    <div className="recommend-friends-box">
                      <div className="referral-cont">
                        <div className="status-box">
                          <div className="status">
                            <div className="text">Friends' Invited</div>
                            <div className="number">{friendsInvited}</div>
                          </div>
                          <div className="status">
                            <div className="text">Friends' Completed</div>
                            <div className="number">{friendsCompleted}</div>
                          </div>
                          <div className="status">
                            <div className="text">Today's Rebate</div>
                            <div className="number">৳ {todayRebate}</div>
                          </div>
                          <div className="status">
                            <div className="text">Yesterday's Rebate</div>
                            <div className="number">৳ {yesterdayRebate}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rebate Bonus Section */}
                  <div className="menu-box can-receive-bonus">
                    <div className="title">
                      <h2><span>Rebate Bonus</span></h2>
                    </div>
                    <div className="receive-box">
                      <div className="referral-banner">
                        <img 
                          alt="receive-betting-bonus-banner-en" 
                          src="https://img.s628b.com/sb/h5/assets/images/player/referral/receive-betting-bonus-banner-en.png" 
                          loading="lazy" 
                        />
                      </div>
                      <div className="item">
                        <div className="receive-bonus">
                          <div className="text">৳ {claimableBonus}</div>
                          <div 
                            className={`button ${canClaimBonus ? '' : 'btn-disabled'}`}
                            onClick={handleClaimBonus}
                          >
                            Claim
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements Section */}
                  <div className="menu-box referral-requirement">
                    <div className="title">
                      <h2><span>Requirement</span></h2>
                    </div>
                    <div className="condition-box">
                      <div className="invite-banner">
                        <img 
                          alt="referral-requirement-banner-en" 
                          src="https://img.s628b.com/sb/h5/assets/images/player/referral/referral-requirement-banner-en.png" 
                          loading="lazy" 
                        />
                      </div>
                      <div className="referral-cont">
                        <div className="title">
                          The following conditions must be met for each referrer and referred friends.
                        </div>
                        <div className="condition-list">
                          <div className="item">
                            <div className="condition">Total Deposits</div>
                            <div className="text">৳ 2,000.00</div>
                          </div>
                          <div className="item">
                            <div className="condition">Total Turnover</div>
                            <div className="text">5,000.00</div>
                          </div>
                          <div className="item">
                            <div className="condition">Within Days</div>
                            <div className="text">7</div>
                          </div>
                          <div className="item">
                            <div className="condition">Email</div>
                            <div className="text">Email verified</div>
                          </div>
                          <div className="item">
                            <div className="condition">Phone</div>
                            <div className="text">Phone verified</div>
                          </div>
                        </div>
                        <div className="code-box-tips">
                          <p>Both you & your friend will receive the bonus once met the conditions.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Goals Section */}
                  <div className="menu-box referral-bonus-goals">
                    <div className="title title-group">
                      <h2><span>Monthly Achievement Goals</span></h2>
                      <div className="detail-btn" onClick={toggleBonusDetails}>
                        <img 
                          alt="icon-search-type02" 
                          src="https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-search-type02.svg" 
                          loading="lazy" 
                        />
                        <span>Goals & Bonuses</span>
                      </div>
                    </div>
                    <div className="achievement-bonus-block">
                      <div className="achievement-bonus item-ani">
                        <ul className="achievement-bonus-box item-ani">
                          <li>
                            <div className="achievement-icon">
                              <img 
                                alt="achievement-icon-1" 
                                src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-1.png" 
                                loading="lazy" 
                              />
                            </div>
                            <div className="achievement-bonus-group">
                              <div className="achievement-bonus-title">
                                <p className="txt">Agent Achievement <i>5</i></p>
                                <p className="number"><i>0</i> / 5</p>
                              </div>
                              <div className="achievement-bonus-bar">
                                <div className="progress-bar">
                                  <div className="bar">
                                    <div className="bar-inner" style={{ width: '0%' }}></div>
                                  </div>
                                </div>
                              </div>
                              <strong className="achievement-bonus-number">৳ 177.00</strong>
                            </div>
                          </li>
                          <li>
                            <div className="lock-mask">
                              <div className="icon">
                                <img 
                                  alt="icon-lock" 
                                  src="https://img.c88rx.com/cx/h5/assets/images/player/referral/icon-lock.png" 
                                  loading="lazy" 
                                />
                              </div>
                            </div>
                            <div className="achievement-icon">
                              <img 
                                alt="achievement-icon-2" 
                                src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-2.png" 
                                loading="lazy" 
                              />
                            </div>
                            <div className="achievement-bonus-group">
                              <div className="achievement-bonus-title">
                                <p className="txt">Agent Achievement <i>10</i></p>
                                <p className="number"><i>0</i> / 10</p>
                              </div>
                              <div className="achievement-bonus-bar">
                                <div className="progress-bar">
                                  <div className="bar">
                                    <div className="bar-inner" style={{ width: '0%' }}></div>
                                  </div>
                                </div>
                              </div>
                              <strong className="achievement-bonus-number">৳ 377.00</strong>
                            </div>
                          </li>
                          <li>
                            <div className="lock-mask">
                              <div className="icon">
                                <img 
                                  alt="icon-lock" 
                                  src="https://img.c88rx.com/cx/h5/assets/images/player/referral/icon-lock.png" 
                                  loading="lazy" 
                                />
                              </div>
                            </div>
                            <div className="achievement-icon">
                              <img 
                                alt="achievement-icon-3" 
                                src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-3.png" 
                                loading="lazy" 
                              />
                            </div>
                            <div className="achievement-bonus-group">
                              <div className="achievement-bonus-title">
                                <p className="txt">Agent Achievement <i>15</i></p>
                                <p className="number"><i>0</i> / 15</p>
                              </div>
                              <div className="achievement-bonus-bar">
                                <div className="progress-bar">
                                  <div className="bar">
                                    <div className="bar-inner" style={{ width: '0%' }}></div>
                                  </div>
                                </div>
                              </div>
                              <strong className="achievement-bonus-number">৳ 777.00</strong>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Commission Info Section */}
                  <div className="menu-box ">
                    <div className="title">
                      <h2><span>How to Earn More Rewards</span></h2>
                    </div>
                    <div className="rebate-bonus-box">
                      <div className="referral-cont">
                        <div className="sec">
                          <p>
                            All referrer will receive a certain cash reward percentage for every referee 
                            when they play games on KIngBaji.
                          </p>
                        </div>
                        <div className="sec">
                          <h3>Daily Commission Table</h3>
                          <div className="table">
                            <table>
                              <tr>
                                <th>Turnover</th>
                                <th style={{}}>Tier 1</th>
                                <th style={{}}>Tier 2</th>
                                <th style={{}}>Tier 3</th>
                              </tr>
                              <tr>
                                <td>৳ 100 - ৳ 25,000</td>
                                <td style={{}}>0.15%</td>
                                <td style={{}}>0.10%</td>
                                <td style={{}}>0.05%</td>
                              </tr>
                              <tr>
                                <td>৳ 25,001 - ৳ 50,000</td>
                                <td style={{}}>0.25%</td>
                                <td style={{}}>0.15%</td>
                                <td style={{}}>0.10%</td>
                              </tr>
                              <tr>
                                <td>৳ 50,001</td>
                                <td style={{}}>0.35%</td>
                                <td style={{}}>0.25%</td>
                                <td style={{}}>0.20%</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="referral-banner">
                        <div className="sec">
                          <img 
                            alt="commission-from" 
                            src="https://img.s628b.com/sb/h5/assets/images/player/referral/commission-from.png" 
                            loading="lazy" 
                          />
                          <p>
                            Be diligent in referring, be the upline and earn upto 3 tiers easily.
                          </p>
                          <strong>Earn Lifetime Commissions! With KIngBaji</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="referral-partner">
                  {/* Details tab content would go here */}
                  <div className="menu-box">
                    <div className="title">
                      <h2><span>Referral Details</span></h2>
                    </div>
                    <div className="content">
                      <p>Detailed referral statistics and history would appear here.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showBonusDetails && (
        <div className="pop-wrap referral-reward-bonus ani show">
          <a className="btn-close" onClick={toggleBonusDetails}></a>
          <div className="title">
            <p>Cumulative Deposit Users</p>
            <p>Bonus</p>
          </div>
          <div className="reward-bonus-list">
            <ul>
              <li><span>5</span><span>177.00BDT</span></li>
              <li><span>10</span><span>377.00BDT</span></li>
              <li><span>15</span><span>777.00BDT</span></li>
              <li><span>20</span><span>1777.00BDT</span></li>
              <li><span>50</span><span>3777.00BDT</span></li>
              <li><span>100</span><span>7777.00BDT</span></li>
              <li><span>250</span><span>17777.00BDT</span></li>
              <li><span>1000</span><span>77777.00BDT</span></li>
              <li><span>2500</span><span>177777.00BDT</span></li>
              <li><span>5000</span><span>377777.00BDT</span></li>
            </ul>
          </div>
          <div className="pop-bg" onClick={toggleBonusDetails}></div>
        </div>
      )}
    </div>
 
  );
};
