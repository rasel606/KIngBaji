import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
    const { activeModal, openModal, closeModal } = useModal();
    if (activeModal !== modalName) return null;
    const [giftPoints, setGiftPoints] = useState(0);
    const [realMoney, setRealMoney] = useState(0);
    const [inputPoints, setInputPoints] = useState(0);

    const handleConvertClick = () => {
        if (inputPoints >= 5000) {
            setRealMoney(inputPoints / 1000); // Conversion ratio
        } else {
            alert("Minimum Gift Required: 5000 Points");
        }
    };

    const [points, setPoints] = useState(0);
    const [showGiftModal, setShowGiftModal] = useState(false);
  
    const handlePointsChange = (e) => {
      setPoints(e.target.value);
    };
  
    const handleMoneyChange = (e) => {
      setRealMoney(e.target.value);
    };

    const toggleGiftModal = () => {
        setShowGiftModal(!showGiftModal);
    };

    return (
        <div className="modal-overlay" >
            <div >
                <div className="popup-page__main popup-page-main popup-page-main--show">
                    <div className="popup-page-main__header">
                        <div className="popup-page-main__title">My wallet</div>
                        <div className="popup-page-main__close" ></div>
                    </div>

                    <div className="content mcd-style player-content vip-content">
                        <div className="item-ani player-vip-box deco vip-card lv2" >
                            <a className="player-gift-points" >
                                <img
                                    className="card-top"
                                    alt="banner"
                                    src="https://img.c88rx.com/cx/h5/assets/images/vip/banner.png?v=1737700422219"
                                    loading="lazy"
                                />
                                <div className="card-bottom">
                                    <span>View Gift Points T&amp;C</span>
                                </div>
                            </a>
                        </div>
                        <div className="item-ani player-vip-box total">
                            <div className="title">Gift Points</div>
                            <div className="status-box">
                                <div className="status">
                                    <div className="number">{giftPoints}</div>
                                    <div className="text">Points</div>
                                </div>
                                <div className="cleader">
                                    <span
                                        className="item-icon"
                                        style={{
                                            maskImage:
                                                "url('https://img.c88rx.com/cx/h5/assets/images/icon-set/player/vip/icon-points.svg?v=1737700422219')",
                                        }}
                                    ></span>
                                    <a className="vip-cleader"></a>
                                </div>
                            </div>
                        </div>
                        <div className="item-ani player-vip-box cash-card">
                            <div className="title">
                                <h2>
                                    <span>Convert Gifts</span>
                                </h2>
                                <div className="refresh">
                                    <div className="text">Refresh</div>
                                    <div
                                        className="refresh-icon"
                                        style={{
                                            maskImage:
                                                "url('https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-refresh-type01.svg?v=1737700422219')",
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="cash-points">
                                <div className="coin">
                                    <div className="movie-box">
                                        <video
                                            width="100%"
                                            height="100%"
                                            autoPlay
                                            playsInline
                                            loop
                                            mcdsrc="/assets/images/vip/coin-rotate-silver.png"
                                            className="ng-tns-c2440093474-7"
                                            poster="https://img.c88rx.com/cx/h5/assets/images/vip/coin-rotate-silver.png?v=1737700422219"
                                        >
                                            <source
                                                src="/assets/images/vip/coin-rotate-silver-alpha.mov"
                                                type="video/quicktime"
                                                className="ng-tns-c2440093474-7"
                                                src="https://img.c88rx.com/cx/h5/assets/images/vip/coin-rotate-silver-alpha.mov?v=1737700422219"
                                            />
                                            <source
                                                src="/assets/images/vip/coin-rotate-silver-alpha.webm"
                                                type="video/webm"
                                                className="ng-tns-c2440093474-7"
                                                src="https://img.c88rx.com/cx/h5/assets/images/vip/coin-rotate-silver-alpha.webm?v=1737700422219"
                                            />
                                        </video>
                                    </div>
                                    <div className="convert-icon">
                                        <div className="chevron"></div>
                                        <div className="chevron"></div>
                                    </div>
                                    <div className="movie-box">
                                        <video
                                            width="100%"
                                            height="100%"
                                            autoPlay
                                            playsInline
                                            loop
                                            mcdsrc="/assets/images/vip/coin-rotate-gold.png"
                                            className="ng-tns-c2440093474-7"
                                            poster="https://img.c88rx.com/cx/h5/assets/images/vip/coin-rotate-gold.png?v=1737700422219"
                                        >
                                            <source
                                                mcdsrc="/assets/images/vip/coin-rotate-gold-alpha.mov"
                                                type="video/quicktime"
                                                className="ng-tns-c2440093474-7"
                                                src="https://img.c88rx.com/cx/h5/assets/images/vip/coin-rotate-gold-alpha.mov?v=1737700422219"
                                            />
                                            <source
                                                mcdsrc="/assets/images/vip/coin-rotate-gold-alpha.webm"
                                                type="video/webm"
                                                className="ng-tns-c2440093474-7"
                                                src="https://img.c88rx.com/cx/h5/assets/images/vip/coin-rotate-gold-alpha.webm?v=1737700422219"
                                            />
                                        </video>
                                    </div>
                                </div>
                                <div className="cash-detail">
                                    <div className="cash-input">
                                        <div className="detail-title">
                                            <span>Points</span>
                                            <p className="text">
                                                Minimum Gift Required: <span>5000</span>
                                            </p>
                                        </div>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            placeholder="0"
                                            value={points}
                                            onChange={handlePointsChange}
                                            className="ng-tns-c2440093474-7 ng-untouched ng-pristine ng-valid"
                                        />
                                    </div>
                                    <div className="conversion">
                                        <div className="ratio">
                                            <span>Gift Conversion Ratio</span>
                                            <div className="text">1000</div>
                                        </div>
                                    </div>
                                    <div className="cash-input">
                                        <div className="detail-title">
                                            <span>Real Money</span>
                                        </div>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            placeholder="0"
                                            value={realMoney}
                                            onChange={handleMoneyChange}
                                            className="ng-tns-c2440093474-7 ng-untouched ng-pristine ng-valid"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="item-ani button-ani button default" onClick={handleConvertClick}>
                            Convert to Real Money
                            <img
                                alt="convert-button-dfbg"
                                src="https://img.c88rx.com/cx/h5/assets/images/player/vip/convert-button-dfbg.png?v=1737700422219"
                                loading="lazy"
                            />
                        </div>
                    </div>

                </div>

            </div>
            {showGiftModal && (
                <div className="pop-wrap gift-points-pop show">
                    <button className="btn-close" onClick={toggleGiftModal}></button>
                    <div className="detail-banner">
                        <img
                            src="https://img.c88rx.com/cx/h5/assets/images/vip/banner-2.png?v=1739269017539&source=mcdsrc"
                            alt="banner-2"
                            loading="lazy"
                        />
                    </div>
                    <div className="pop-inner content-style">
                        <p>Start Earning Unlimited Gift Points And Exchange Them For Real Cash Now!</p>
                        <h4>How to Participate:</h4>
                        <ul>
                            <li>Register an account with Crickex.</li>
                            <li>Place bets and start earning gift points.</li>
                            <li>Exchange your gift points for real money.</li>
                        </ul>
                        <h4>Event Details:</h4>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product (Games)</th>
                                        <th>Turnover</th>
                                        <th>Gift Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Slots, Lottery & Sports</td>
                                        <td>৳1</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Live Casino, Table & Crash</td>
                                        <td>৳2</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                            <strong className="tips-block">Note: 1,000 Gift Points is equivalent to 1 real money.</strong>
                        </div>
                        <h4>Terms & Conditions:</h4>
                        <ul>
                            <li>All Crickex players are eligible for this promotion.</li>
                            <li>Redeem your gift points with a minimum of 5,000 points.</li>
                            <li>1,000 gift points equal 1 real money.</li>
                            <li>Earn unlimited gift points!</li>
                            <li>Please check our Promotion Terms & Conditions for excluded games.</li>
                            <li>Turnover calculations are updated daily after 22:00 BST.</li>
                            <li>Arcade games are excluded from this promotion.</li>
                            <li>Each player can only open one account to claim this bonus.</li>
                            <li>Fraudulent activities will result in forfeiture of balance.</li>
                            <li>Crickex reserves the right to modify or cancel the promotion.</li>
                            <li>Players must comply with the promotion terms.</li>
                            <li>Crickex’s Terms & Conditions apply.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>

    );
};
