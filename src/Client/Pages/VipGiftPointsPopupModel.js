import React, { useState } from "react";

import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
    const { activeModal, openModal, closeModal } = useModal();
    if (activeModal !== modalName) return null;


    const [activeTab, setActiveTab] = useState("received");
    const giftData = [
      { id: 1, points: 802, source: "Auto", date: "2025-02-12", time: "22:00:00" },
    ];


  return (
    <div className="pop-wrap gift-points-pop show">
      <button className="btn-close" onClick={closeModal}></button>
      <div className="detail-banner">
        <img
          src="https://img.c88rx.com/cx/h5/assets/images/vip/banner-2.png?v=1739269017539&source=mcdsrc"
          alt="banner-2"
          // loading="lazy"
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
                {/* <th>Product (Games)</th> */}
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
          <strong className="tips-block">Note: 1,000 Gift Point is equivalent to 1 real money.</strong>
        </div>
        <h4>Terms & Conditions:</h4>
        <ul>
          <li>All Crickex players are eligible for this promotion.</li>
          <li>Redeem your gift points with a minimum of 5,000 points.</li>
          <li>1,000 gift point equals 1 real money.</li>
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
  );
};

