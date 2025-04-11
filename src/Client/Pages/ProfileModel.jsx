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

  const [balance, setBalance] = useState(userDeatils.balance);
  const [userData, setUserData] = useState(userId);
  const [refreshing, setRefreshing] = useState(false);

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
  //      const response = await axios.post("https://api.kingbaji.live/api/v1/user_balance", {userId});
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

  return (
    <div className="member-menu active">
      <div className="close" onClick={closeModal}></div>
      <div
        className="member-header"
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
            <div className="account">{userData.userId}</div>
            <div
              className="vip-points active"
              onClick={() => openModal("GiftPointsModel")}
            >
              Gift Point
              <span>0</span>
              <Link className="myvip-text">
                My Gift Point
                {/* <img
                          style={{ background: "#000", position: "relative" }}
                          src="https://cxwelcome.com/assets/images/icon-set/player/vip/icon-arrow.svg"
                          alt=""
                        /> */}
                <span className="item-icon">
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

      <div className="member-menu-content">
        <div className="member-menu-box balance-box">
          <div className="balance balance-row">
            <div className="text">
              Main Wallet
              <div
                className={`icon refresh ${refreshing ? "active" : ""}`}
                onClick={handleRefresh}
              ></div>
              <div className="icon eyes"></div>
            </div>
            <span className="amount totalBalanceWallet">
              <i className="balance-value">
                <i id="" style={{ display: "initial", color: "#fff" }}>
                  ৳ {balance}
                </i>
              </i>
            </span>
          </div>
        </div>
        <div className="member-menu-box member-list">
          <div className="title">
            <h2>
              <span>Funds</span>
            </h2>
          </div>
          <ul className="align-center">
            <li className="deposit" onClick={() => openModal("DepositModel")}>
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-deposit.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Deposit</p>
              </Link>
            </li>
            <li className="deposit" onClick={() => openModal("DepositModel")}>
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="	https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-withdrawal.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Withdrawal</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="member-menu-box member-list">
          <div className="title">
            <h2>
              <span>History</span>
            </h2>
          </div>
          <ul className="align-center">
            <li className="deposit">
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-bet-records.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Betting Records</p>
              </Link>
            </li>
            <li className="deposit" onClick={() => openModal("TurnOverModal")}>
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-turnover.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>TurnOver</p>
              </Link>
            </li>
            <li
              className="deposit"
              onClick={() => openModal("TransactionRecordModal")}
            >
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-turnover.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Transaction Records</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="member-menu-box member-list">
          <div className="title">
            <h2>
              <span>Profile Info</span>
            </h2>
          </div>
          <ul className="align-center">
            <li className="profile" onClick={() => openModal("modal2")}>
              <Link to="">
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-profile.png?v=1737454371567"
                    alt=""
                  />
                </span>
                <p>Personal Info</p>
              </Link>
            </li>
            <li
              className="profile"
              onClick={() => openModal("ResetmypasswordModal")}
            >
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-resetpasswords.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Reset Password</p>
              </Link>
            </li>
            <li className="profile">
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-inbox.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Inbox</p>
              </Link>
            </li>
            <li
              className="profile"
              onClick={() => openModal("RefferBonusModel")}
            >
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-referral.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Refer Bonus</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="member-menu-box member-list">
          <div className="title">
            <h2>
              <span>Contact Us</span>
            </h2>
          </div>
          <ul className="align-center">
            <li className="deposit">
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-customer.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Live Chat 24/7</p>
              </Link>
            </li>
            <li className="deposit">
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-telegram.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Telegram Support</p>
              </Link>
            </li>
            <li className="deposit">
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-telegram.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Telegram Channel</p>
              </Link>
            </li>

            <li className="deposit">
              <Link>
                <span
                // className="item-icon"
                // style={{
                //   backgroundImage:
                //     "url(https://img.c88rx.com/cx/h5/assets/images/icon-set…on/member-center/icon-deposit.png?v=1736240945415)",
                // }}
                >
                  <img
                    className="item-icon"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-email.png?v=1738748531996"
                    alt=""
                  />
                </span>
                <p>Support Email</p>
              </Link>
            </li>
          </ul>
        </div>

        {/* <Link className="logout-button" >
                <span
                  className="item-icon"
                ></span>
                <div className="item-text" onClick={()=>logout()}>
                  <p>লগ আউট</p>
                </div>
              </Link> */}
        <div
          className="member-menu-logout"
          type="submit"
          onClick={() => logout()}
        >
          <Link type="submit">
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
  );
};
