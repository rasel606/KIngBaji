import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import MashImage from "../../assets/icon-refresh-type01.svg";
import DepositModel from "./DepositModel";
import MyProfilemodal from "./MyProfilemodal";
import { useModal } from "../Component/ModelContext";

import { useAuth } from "../Component/AuthContext";

import axios from "axios";
import { UserAllDetails } from "../Component/Axios-API-Service/AxiosAPIService";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
  const {
    isAuthenticated,
    loginUser,
    logout,
    logoutUser,
    verifyUserToken,
    verifyUser,
    token,
    userDeatils,
    userId,
  } = useAuth();

  const [balance, setBalance] = useState(userId?.balance);
  const [userData, setUserData] = useState(userId);
  const [refreshing, setRefreshing] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  // const [activeWallet, setActiveWallet] = useState('main');

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    // handelUserDetails(userId);
    try {
      handelUserDetails(userId);

      const response = await axios.post(
        "http://localhost:5000/api/v1/user_balance",
        { userId }
      );
      // console.log(response);
      //  setBalance(response.data.balance);

      if (response.data.hasOwnProperty("balance")) {
        verifyUser(token); // Ensure token is available in scope
      }
    } catch (error) {
      // console.error("Error fetching balance:", error);
    } finally {
      setTimeout(() => setRefreshing(false), 1000); // Proper finally block
    }
  };

  const handelUserDetails = async (userId) => {
    const result = await UserAllDetails(userId);
    // console.log( result = await UserAllDetails(userId))
    console.log(result.data.user.balance);
    setBalance(result.data.user.balance);
    setUserData(result.data.user);
  };

  useEffect(() => {
    if (refreshing) {
    }
  }, [setRefreshing]);

  useEffect(() => {
    if (userId) {
      handleRefresh(); // Call the function whenever userId changes
    }
  }, [setRefreshing, userId, balance]);

  //  const [refreshing, setRefreshing] = useState(false);

  //  const handleRefresh = async () => {
  //    if (refreshing) return;
  //    setRefreshing(true);

  //    try {
  //      const response = await axios.post("http://localhost:5000/api/v1/user_balance", {userId});
  //      setBalance(response.data.balance);

  //      if (response.data.hasOwnProperty("balance")) {
  //        verifyUser(token); // Ensure token is available in scope
  //      }
  //    } catch (error) {
  //      console.error("Error fetching balance:", error);
  //    } finally {
  //      setTimeout(() => setRefreshing(false), 1000); // Proper finally block
  //    }
  //  };

  //    useEffect(() => {
  //      if (userId) {

  //        handleRefresh(); // Call the function whenever userId changes
  //      }
  //    }, [setRefreshing, userId, balance]);






  const menuSections = [
    {
      title: 'Funds',
      items: [
        { name: 'Deposit', icon: 'icon-deposit.png', modalName: 'DepositModel' },
        { name: 'Withdrawal', icon: 'icon-withdrawal.png',modalName: 'WithdrawModel' },
        // { name: 'My Promotion', icon: 'icon-bonuses.png',modalName: 'DepositModel' }
      ]
    },
    {
      title: 'History',
      items: [
        { name: 'Betting Records', icon: 'icon-bet-records.png',modalName: 'BettingRecordModal' },
        { name: 'Turnover', icon: 'icon-turnover.png',modalName: 'TurnOverModal' },
        { name: 'Transaction Records', icon: 'icon-records.png',modalName: 'TransactionRecordModal' }
      ]
    },
    {
      title: 'Profile',
      items: [
        { name: 'Personal Info', icon: 'icon-profile.png',modalName: 'modal2' },
        { name: 'Reset Password', icon: 'icon-resetpasswords.png',modalName: 'ResetmypasswordModal' },
        { name: 'Inbox', icon: 'icon-inbox.png',modalName: 'InboxModel' },
        { name: 'Refer Bonus', icon: 'icon-referral.png',modalName: 'RefferBonusModel' }
      ]
    },
    {
      title: 'Contact Us',
      items: [
        { name: 'CS Link', icon: 'icon-customer.png' },
        { name: 'Telegram', icon: 'icon-telegram.png' },
        { name: 'Support Email', icon: 'icon-email.png' },
        { name: 'Facebook', icon: 'icon-facebook-messenger.png' }
      ]
    }
  ];

  return (
    <div className="member-menu-inner">
    <div className="member-menu active">
      <div className="close" onClick={closeModal}></div>
      <div
        className="member-header bonuswallet"
        style={{
          backgroundImage:
            "url(	https://img.c88rx.com/cx/h5/assets/images/member-header-bg.png?v=1736240945415)",
        }}
      >
        <div className="member-header-content">
          <div
            className="pic"
            style={{
              backgroundImage:
                "url(https://img.c88rx.com/cx/h5/assets/images/player/vip/memberpic-lv1.svg?v=1736240945415)",
            }}
          ></div>
          <div className="infor">
            <div className="account"></div>
            <div
              className="vip-points active"
              onClick={() => openModal("GiftPointsModel")}
            >
              Gift Point
              <span className="">0</span>
              <Link className="myvip-text">
                My Gift Point
                {/* <img
                          style={{ background: "#000", position: "relative" }}
                          src="https://cxwelcome.com/assets/images/icon-set/player/vip/icon-arrow.svg"
                          alt=""
                        /> */}
                <span className="item-icon arrow-icon">
                  <img
                    style={{ background: "#ffffff" }}
                    src="https://cxwelcome.com/assets/images/icon-set/player/vip/icon-arrow.svg"
                    alt=""
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="member-menu-content bonuswallet">
        <div className="member-menu-box balance-box">
          <div className="balance balance-row">
            <div className="text">
              Main Wallet
              <div
                className={`icon refresh ${refreshing ? "active" : ""}`}
                onClick={handleRefresh}
              ></div>
              <div className="icon eyes" onClick={(e) => { e.stopPropagation(); toggleBalanceVisibility() }}></div>
            </div>
            <span className="amount totalBalanceWallet">
              <i className="balance-value">
                <i id="" style={{ display: "initial", color: "#fff" }}>
                  
                  {showBalance ? `৳ ${userDeatils.balance}` : '•••••'}
                </i>
              </i>
            </span>
          </div>
        </div>
        {menuSections.map((section, index) => (
            <div className="member-menu-box member-list" key={index}>
              <div className="title">
                <h2><span>{section.title}</span></h2>
              </div>
              <ul className={section.title === 'Funds' || section.title === 'History' ? 'align-center' : ''}>
                {section.items.map((item, itemIndex) => (
                  <li className={item.name.toLowerCase().replace(/\s+/g, '')} key={itemIndex} onClick={()=>openModal(`${item?.modalName}`)}>
                    <a>
                      <span 
                        className="item-icon" 
                        style={{ backgroundImage: `url(https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/${item.icon})` }}
                      ></span>
                      <p>{item.name}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        <div
          className="member-menu-logout"
          type="submit"
          onClick={() => logout()}
        >
          <Link>
            <span
              className="item-icon"
              style={{
                maskImage:
                  'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/header-logout-icon.svg?v=1742895464610")',
                WebkitMaskImage:
                  'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/header-logout-icon.svg?v=1742895464610")',
              }}
            ></span>
            <div className="text">
              <p>Log out</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};
