import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import MashImage from "../../assets/icon-refresh-type01.svg";
import DepositModel from "./DepositModel";
import MyProfilemodal from "./MyProfilemodal";
import { useModal } from "../Component/ModelContext";

import { useAuth } from "../Component/AuthContext";

import axios from "axios";
import {
  getUserSocialLinks,
  UserAllDetails,
} from "../Component/Axios-API-Service/AxiosAPIService";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
  const {
    isAuthenticated,
    loginUser,
    logout,
    logoutUser,
    Token,

    token,
    userDeatils,
  } = useAuth();

  const userId = userDeatils?.userId || "";

  const [balance, setBalance] = useState(userId?.balance);
  const [userData, setUserData] = useState(userId);
  const [refreshing, setRefreshing] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [socialLinksUserfacebook, setSocialLinksUserfacebook] = useState(true);
  const [socialLinksUserTelegram, setSocialLinksUserTelegram] = useState(true);
  const [socialLinksUserEmail, setSocialLinksUserEmail] = useState(true);
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
        "https://api.kingbaji.live/api/v1/user_balance",
        { userId }
      );
      console.log(response);
      setBalance(response.data.balance);

      // if (response.data.hasOwnProperty("balance")) {
      //   (token); // Ensure token is available in scope
      // }
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

  const userDeatilsSet = {
    userId: userId,
    referredBy: userDeatils?.referredBy,
  };

  console.log("userDeatilsSet", userDeatilsSet);
  console.log("userDeatils", userDeatils);
  // const UserSocialLink = async () => {
  //   const result = await getUserSocialLinks(userDeatilsSet);
  //   setSocialLinksUserfacebook(result?.data?.socialLinks?.facebook);
  //   setSocialLinksUserTelegram(result?.data?.socialLinks?.telegram);
  //   setSocialLinksUserEmail(result?.data?.socialLinks?.email);

  //   // const socialLink = result.data.user.socialLink;
  // };

  // useEffect(() => {
  //   UserSocialLink();
  // }, [userDeatils?.userId]);

  console.log(
    socialLinksUserfacebook,
    socialLinksUserTelegram,
    socialLinksUserEmail
  );

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
  //      const response = await axios.post("https://api.kingbaji.live/api/v1/user_balance", {userId});
  //      setBalance(response.data.balance);

  //      if (response.data.hasOwnProperty("balance")) {
  //        (token); // Ensure token is available in scope
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
      title: "Funds",
      items: [
        {
          name: "Deposit",
          icon: "icon-deposit.png",
          modalName: "DepositModel",
        },
        {
          name: "Withdrawal",
          icon: "icon-withdrawal.png",
          modalName: "WidthrawModel",
        },
        // { name: 'My Promotion', icon: 'icon-bonuses.png',modalName: 'DepositModel' }
      ],
    },
    {
      title: "History",
      items: [
        {
          name: "Betting Records",
          icon: "icon-bet-records.png",
          modalName: "BettingRecordModal",
        },
        {
          name: "Turnover",
          icon: "icon-turnover.png",
          modalName: "TurnOverModal",
        },
        {
          name: "Transaction Records",
          icon: "icon-records.png",
          modalName: "TransactionRecordModal",
        },
      ],
    },
    {
      title: "Profile",
      items: [
        {
          name: "Personal Info",
          icon: "icon-profile.png",
          modalName: "MyProfileModel",
        },
        {
          name: "Reset Password",
          icon: "icon-resetpasswords.png",
          modalName: "ResetPasswordPopup",
        },
        { name: "Inbox", icon: "icon-inbox.png", modalName: "InboxModel" },
        {
          name: "Refer Bonus",
          icon: "icon-referral.png",
          modalName: "RefferBonusModel",
        },
      ],
    },
    {
    title: "Contact Us",
    items: [
      { name: "CS Link", icon: "icon-customer.png" },
      {
        name: "Telegram",
        icon: "icon-telegram.png",
        link: socialLinksUserTelegram,
      },
      {
        name: "Support Email",
        icon: "icon-email.png",
        link: socialLinksUserEmail,
      },
      {
        name: "Facebook",
        icon: "icon-facebook-messenger.png",
        link: socialLinksUserfacebook,
      },
    ],
  }
  ];

  const socialLinkManu = {
    title: "Contact Us",
    items: [
      { name: "CS Link", icon: "icon-customer.png" },
      {
        name: "Telegram",
        icon: "icon-telegram.png",
        // link: socialLinksUserTelegram,
      },
      {
        name: "Support Email",
        icon: "icon-email.png",
        // link: socialLinksUserEmail,
      },
      {
        name: "Facebook",
        icon: "icon-facebook-messenger.png",
        // link: socialLinksUserfacebook,
      },
    ],
  };

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
                  <span className="item-icon arrow-icon" style={{ maskImage:`url("https://i.ibb.co/Pv1XP4R1/main-large.png")` }}>
                    {/* <img
                      style={{ background: "#ffffff" }}
                      src="https://cxwelcome.com/assets/images/icon-set/player/vip/icon-arrow.svg"
                      alt=""
                    /> */}
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
                <div
                  className="icon eyes"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBalanceVisibility();
                  }}
                ></div>
              </div>
              <span className="amount totalBalanceWallet">
                <i className="balance-value">
                  <i id="" style={{ display: "initial", color: "#fff" }}>
                    {showBalance
                      ? `৳ ${balance?.toFixed(2)}`
                      : "•••••"}
                  </i>
                </i>
              </span>
            </div>
          </div>
          {menuSections.map((section, index) => (
            <div className="member-menu-box member-list" key={index}>
              <div className="title">
                <h2>
                  <span>{section.title}</span>
                </h2>
              </div>
              <ul
                className={
                  section.title === "Funds" || section.title === "History"
                    ? "align-center"
                    : ""
                }
              >
                {section.items.map((item, itemIndex) => (
                  <li
                    className={item.name.toLowerCase().replace(/\s+/g, "")}
                    key={itemIndex}
                    onClick={() => {
                      if (item?.modalName) {
                        openModal(`${item?.modalName}`);
                      } else if (item?.link) {
                        window.open(item.link, "_blank");
                      }
                    }}
                  >
                    <a>
                      <span
                        className="item-icon"
                        style={{
                          backgroundImage: `url(https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/${item.icon})`,
                        }}
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
