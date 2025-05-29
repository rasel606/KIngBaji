import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// import { Accordion, Container, Navbar } from "react-bootstrap";
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
    isLoginNotify, setIsLoginNotify,
    isAuthenticated,
    loginUser,
    logoutUser,
    isAmountAlertError,
    setIsAmountAlertError,
    isPasswordresetNotify, setIsPasswordresetNotifyNotify
  } = useAuth();
  const { showAmountLimit, setShowAmountLimit } = usePayNow();
  const { showAmountLimitw, setShowAmountLimitw } = useWidthrowNow();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [showSecondMenu, setShowSecondMenu] = useState(true);

 

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
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
        ></HeaderGroup>
      </div>
      <div style={{ marginTop: "45px" }}>
        <Outlet />
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

              <li className="home">
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
    </>
  );
};
