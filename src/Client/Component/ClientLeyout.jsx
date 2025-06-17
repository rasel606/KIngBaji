import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// import { Accordion, Container, Navbar } from "react-bootstrap";
import axios from "axios";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Carousel from "../Pages/Carousel";
import LoginModel from "../Pages/LoginModel";
import SingUpModal from "../Pages/SingUpModal";
import DepositModel from "../Pages/DepositModel";
import ProfileModel from "../Pages/ProfileModel";
import WidthrawModel from "../Pages/WidthrawModel";
import MyProfilemodal from "../Pages/MyProfilemodal";
import AddNameModel from "../Pages/AddNameModel";
import AddBirthdayModal from "../Pages/AddBirthdayModal";
import AddEmailModel from "../Pages/AddEmailModel";

import RefferBonusModel from "../Pages/RefferBonusModel";
import TurnOverModal from "../Pages/TurnOverModal";
import TransactionRecordModal from "../Pages/TransactionRecordModal";
import { useMediaQuery } from "react-responsive";
import { useModal } from "./ModelContext";
import { useAuth } from "./AuthContext";
import VerifyOptPage from "../Pages/VerifyOptPage";
import SendEmailOtp from "../Pages/SendEmailOtp";
import VerifyOptPageEmail from "../Pages/VerifyOptPageemail";
import CurrencyLanguageSelector from "./CurrencyLanguageSelector";
import GiftPointsModel from "../Pages/GiftPointsModel";

import SideNavPopUp from "../Pages/SideNavPopUp";
import InboxModal from "../Pages/InboxModal";

import HeaderGroup from "./HeaderGroup";
import BkashModal from "../Pages/BkashModal";
import NagadModal from "../Pages/NagadModal";
import RocketModal from "../Pages/RocketModal";
import UpayModal from "../Pages/UpayModal";
import BettingRecordModal from "../Pages/BettingRecordModal";
import AddMobileNumberModel from "../Pages/AddMobileNumberModel";
import McdTopAlert from "./McdTopAlart";
import { usePayNow } from "../PaymentContext/PaymenyContext";
import ErrorNotifyPopUps from "./ErrorNotifyPopUps";
import NotificationMiniPopUp from "./NotificationMiniPopUp";
import { useWidthrowNow } from "../PaymentContext/WidthrawPaymentContext";
import ForgetPasswordModal from "../Pages/ForgetPasswordModal";
import ResetPasswordPopup from "../Pages/ResetPasswordPopup";
import LaunchGamePopup from "../LaunchGamePopup";
import TermsAndConditions from "../Pages/TermsAndConditions";
import Promotions from "../Pages/Promotions";
import TurnOverPopUp from "./TurnOverPopUp";
import { UserAllDetails } from "./Axios-API-Service/AxiosAPIService";
import PromotionDetailsPopUp from "./PromotionDetailsPopUp";

export default () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenProfile, setIsOpenProfile] = useState(false);
  // const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);
  // const [isIsDepositModal, setIsDepositModal] = useState(false);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  // const [isMyProfileModal, setIsMyProfileModal] = useState(false);
  // const [isProfileModal, setIsProfileModal] = useState(false);

  // const { openModal } = useContext()
  const user = false;
  const { activeModal, openModal, closeModal } = useModal();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const {
    isLoginNotify,
    setIsLoginNotify,
    isAuthenticated,
    loginUser,
    logoutUser,
    isAmountAlertError,
    setIsAmountAlertError,
    isPasswordresetNotify,
    setIsPasswordresetNotifyNotify,
    chat,
    userDeatils,
    setChat,
    showPromoDetails, setShowPromoDetails
  } = useAuth();
  const { showAmountLimit, setShowAmountLimit } = usePayNow();
  const {
    showAmountLimitw,
    setShowAmountLimitw,
    showEligibilityCheck,
    setShowEligibilityCheck,
  } = useWidthrowNow();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [showSecondMenu, setShowSecondMenu] = useState(true);

  const [loading, setLoading] = useState(true);
  const userBalance = userDeatils ? userDeatils.balance : "";
  const userId = userDeatils?.userId;
  const [balance, setBalance] = useState(userBalance);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(userId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playGameData, setPlayGameData] = useState(null);
  const [gameData, setGameData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handlePlay = async (game) => {
    console.log(game);
    if (!userDeatils) return;
    if (isPlaying) return;

    setIsPlaying(true);
    setLoading(true);

    try {
      if (userId) {
        const response = await fetch(
          "https://api.kingbaji.live/api/v1/launch_gamePlayer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              userId,
              game_id: "0",
              g_type: game.g_type,
              p_code: game.providercode,
            }),
          }
        );

        const data = await response.json();

        if (data.errMsg === "Success" && userId) {
          console.log(data);
          setPlayGameData(data);
          setShowPopup(true);
        }
      } else {
        setIsLoginNotify(
          "আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!"
        );
      }
    } catch (error) {
      console.error("Error launching game:", error);
      setIsLoginNotify(
        "আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!"
      );
    } finally {
      setIsPlaying(false);
      setLoading(false);
    }
  };

  /** 🚀 Refresh Balance */
  const handleRefresh = async (userId) => {
    try {
      if (!userDeatils) return;
      await handelUserDetails(userId);
      // if(userId){
      const response = await axios.post(
        "https://api.kingbaji.live/api/v1/user_balance",
        { userId }
      );
      setBalance(response.data.balance);
      console.log("Balance Data:", response.data);
      // }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  /** 🚀 Fetch User Details */
  const handelUserDetails = async (userId) => {
    if (!userDeatils) return;
    const result = await UserAllDetails(userId);
    setBalance(result.data.user.balance);
  };

  /** 🚀 Handle Popup Close */
  const handleClosePopup = () => {
    setShowPopup(false);
    handleRefresh(userId);
  };

  useEffect(() => {
    if (!showPopup && userId) {
      handleRefresh(userId);
    }
  }, [showPopup, userId]);

  const location = useLocation();

  useEffect(() => {
    // Get the query parameters
    const params = new URLSearchParams(location.search);
    const referralCode = params.get("ref");

    // If referral code exists, open the SignUpModal
    if (referralCode) {
      localStorage.setItem("referralCode", referralCode);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset menu states when closing
    if (!isMenuOpen) {
      setActiveCategory("");
      setShowSecondMenu(true);
    }
  };

  return (
    <>
      <div className="main-router-wrapper">
        <HeaderGroup
          handlePlay={handlePlay}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
        ></HeaderGroup>
      </div>
      <div>
        <Outlet />
        {showPopup && playGameData?.gameUrl && (
          <div className="popup-page-wrapper active" onClick={handleClosePopup}>
            <div
              className="popup-page show-toolbar popup-page--active popup-page--align-top"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-page__main popup-page-main popup-page-main--show">
                <div className="popup-page-main__header new-login-tab">
                  <div className="popup-page-main__title">KingBaji</div>
                  <div
                    className="popup-page-main__close"
                    onClick={handleClosePopup}
                  ></div>
                </div>
                <div className="popup-page-main__container">
                  <iframe
                    src={playGameData.gameUrl}
                    title="Game"
                    width="100%"
                    height="100%"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="toolbar">
        {isAuthenticated ? (
          <>
            <ul>
              <li className="home active">
                <Link to={"/"}>
                  <img
                    className="item-icon"
                    style={{
                      display: "flex",
                    }}
                    src={
                      "https://img.c88rx.com/cx/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-home.svg?v=1736240945415"
                    }
                    alt=""
                  />

                  <p>Home</p>
                </Link>
              </li>

              <li className="home" onClick={() => openModal("Promotions")}>
                <Link>
                  <img
                    className="item-icon"
                    style={{
                      display: "flex",
                    }}
                    src={
                      "https://img.c88rx.com/cx/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-promotion.svg?v=1736849889723"
                    }
                    alt=""
                  />

                  <p>Promotions</p>
                </Link>
              </li>
              <li className="home" onClick={() => openModal("DepositModel")}>
                <Link>
                  <img
                    className="item-icon"
                    style={{
                      display: "flex",
                    }}
                    src={
                      "https://img.c88rx.com/cx/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-deposit.svg?v=1736849889723"
                    }
                    alt=""
                  />

                  <p>Deposit</p>
                </Link>
              </li>
              <li className="home" onClick={() => openModal("ProfileModel")}>
                <Link>
                  <span
                    className="item-icon"
                    style={{
                      display: "block",
                      backgroundImage: `url("https://img.c88rx.com/cx/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-mine.svg?v=1736240945415")`,
                      opacity: "1",
                    }}
                    alt=""
                  />

                  <p>Account</p>
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <div className="beforelogin havelanguage">
            <div
              className="language-select"
              onClick={() => openModal("CurrencyLanguageSelector")}
            >
              <img
                src="https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1736240945415&source=mcdsrc"
                alt=""
              />
              <div>
                <p>ENGLISH</p>
                <p>বাংলা</p>
              </div>
            </div>
            <div
              className="register-button"
              onClick={() => openModal("SingUpModal")}
            >
              <p>Sign Up</p>
            </div>
            <div
              className="login-button"
              onClick={() => openModal("LoginModel")}
            >
              <p>Login</p>
            </div>
          </div>
        )}

        {/* ========================================= */}

        {/* ========================================= */}
      </div>
      <div>
        <LaunchGamePopup modalName="LaunchGamePopup"></LaunchGamePopup>
        <TransactionRecordModal modalName="TransactionRecordModal"></TransactionRecordModal>
        <BettingRecordModal modalName="BettingRecordModal"></BettingRecordModal>
        <MyProfilemodal modalName="MyProfileModel"></MyProfilemodal>
        <ProfileModel modalName="ProfileModel"></ProfileModel>
        {/* ========================================= */}
        <BkashModal modalName="Bkash"></BkashModal>
        {/* ========================================= */}
        <NagadModal modalName="Nagad"></NagadModal>
        {/* ========================================= */}
        <RocketModal modalName="Rocket"></RocketModal>
        {/* ========================================= */}
        <UpayModal modalName="Upay"></UpayModal>
        {/* ========================================= */}
        <TurnOverModal modalName="TurnOverModal"></TurnOverModal>
        {/* ========================================= */}
        <RefferBonusModel modalName="RefferBonusModel"></RefferBonusModel>
        {/* ========================================= */}
        <ForgetPasswordModal modalName="ForgetPasswordModal"></ForgetPasswordModal>
        <ResetPasswordPopup modalName="ResetPasswordPopup"></ResetPasswordPopup>
        {/* ========================================= */}
        <AddEmailModel modalName="AddEmailModel"></AddEmailModel>
        <AddMobileNumberModel modalName="AddMobileNumberModel"></AddMobileNumberModel>
        {/* ========================================= */}
        <AddBirthdayModal modalName="AddBirthdayModal"></AddBirthdayModal>
        {/* ========================================= */}
        <AddNameModel modalName="AddNameModel"></AddNameModel>
        {/* ========================================= */}
        <InboxModal modalName="InboxModel"></InboxModal>
        {/* ========================================= */}
        <SendEmailOtp modalName="SendEmailOtp"></SendEmailOtp>
        {/* ========================================= */}
        <VerifyOptPageEmail modalName="VerifyOptPageEmail"></VerifyOptPageEmail>
        {/* ========================================= */}
        <VerifyOptPage modalName="VerifyOptPage"></VerifyOptPage>
        {/* ========================================= */}
        <WidthrawModel modalName="WidthrawModel"></WidthrawModel>
        {/* ========================================= */}
        <GiftPointsModel modalName="GiftPointsModel"></GiftPointsModel>
        <TermsAndConditions modalName="TermsAndConditions"></TermsAndConditions>
        <Promotions modalName="Promotions"></Promotions>
        {/* ========================================= */}
        <LoginModel modalName="LoginModel"></LoginModel>
        <SingUpModal modalName="SingUpModal"></SingUpModal>
        <DepositModel modalName="DepositModel"></DepositModel>
        <CurrencyLanguageSelector modalName="CurrencyLanguageSelector"></CurrencyLanguageSelector>
        <SideNavPopUp modalName="SideNavPopUp"></SideNavPopUp>
      </div>

      {isAmountAlertError && (
        <McdTopAlert
          isAmountAlertError={isAmountAlertError}
          setIsAmountAlertError={setIsAmountAlertError}
          title={`{${isAmountAlertError ? "Notification" : ""}`}
        />
      )}
      {showAmountLimit && (
        <NotificationMiniPopUp
          showAmountLimit={showAmountLimit}
          setShowAmountLimit={setShowAmountLimit}
          title={`${showAmountLimit ? "Notification" : ""}`}
        />
      )}
      {showEligibilityCheck && (
        <NotificationMiniPopUp
          showAmountLimit={showEligibilityCheck}
          setShowAmountLimit={setShowEligibilityCheck}
          title={`${showEligibilityCheck ? "Notification" : ""}`}
        />
      )}
      {showAmountLimitw && (
        <NotificationMiniPopUp
          showAmountLimit={showAmountLimitw}
          setShowAmountLimit={setShowAmountLimitw}
          title={`${showAmountLimitw ? "Notification" : ""}`}
        />
      )}
      {showAmountLimitw && (
        <NotificationMiniPopUp
          showAmountLimit={showAmountLimitw}
          setShowAmountLimit={setShowAmountLimitw}
          title={`${showAmountLimitw ? "Notification" : ""}`}
        />
      )}
      {isLoginNotify && (
        <NotificationMiniPopUp
          showAmountLimit={isLoginNotify}
          setShowAmountLimit={setIsLoginNotify}
          title={`${showAmountLimit ? "Notification" : ""}`}
        />
      )}
      {isPasswordresetNotify && (
        <NotificationMiniPopUp
          showAmountLimit={isLoginNotify}
          setShowAmountLimit={setIsLoginNotify}
          title={`${isPasswordresetNotify ? "Notification" : ""}`}
        />
      )}
      {showPromoDetails && (
        <PromotionDetailsPopUp
          showPromoDetails={showPromoDetails}
          setShowPromoDetails={setShowPromoDetails}
        />
      )}
    </>
  );
};
