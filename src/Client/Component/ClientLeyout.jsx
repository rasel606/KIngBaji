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
import {
  AiOutlineBank,
  AiOutlineUnorderedList,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import {
  BsBagPlus,
  BsBagX,
  BsBox,
  BsCartPlus,
  BsCircle,
  BsGraphUp,
  BsPeople,
} from "react-icons/bs";
import { CiChat2 } from "react-icons/ci";
import { FaTelegram, FaUsers } from "react-icons/fa6";
import { MdEmail, MdLeaderboard } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import { RiDashboardLine } from "react-icons/ri";
import { TbCashBanknoteFilled, TbTruckDelivery } from "react-icons/tb";

import PromossionsModel from "./PromossionsModel";

// import SliderdModel from "../Pages/LoginModel";
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
import ResetmypasswordModal from "../Pages/ResetmypasswordModal";
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
import VipGiftPointsPopupModel from "../Pages/VipGiftPointsPopupModel";
import SideNavPopUp from "../Pages/SideNavPopUp";

import HeaderGroup from "./HeaderGroup";
import BkashModal from "../Pages/BkashModal";
import NagadModal from "../Pages/NagadModal";
import RocketModal from "../Pages/RocketModal";
import UpayModal from "../Pages/UpayModal";
import BettingRecordModal from "../Pages/BettingRecordModal";



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

  const {isAuthenticated, loginUser, logoutUser, verifyUser } = useAuth();


  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

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

  //  useEffect(() => {
  //   if (isSignedUp) {
  //     closeModal("SignUpModal");
  //   }
  // }, [isSignedUp, closeModal]);

  const onLogout = () => {
    // removeSessions();
  };
  return (
    <>





      {isMobile ? (
        <div >
         
         
         <div className="toolbar">
         <HeaderGroup></HeaderGroup>
         <ProfileModel modalName="ProfileModel"></ProfileModel>
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

                <li className="home active">
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
                <li
                  className="home active"
                  onClick={() => openModal("DepositModel")}
                >
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
                <li className="home active" onClick={() => openModal("ProfileModel")}>
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

            
            <div className="beforelogin havelanguage" >
              <div className="language-select" onClick={() => openModal("CurrencyLanguageSelector")}>
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
        <MyProfilemodal modalName="modal2"></MyProfilemodal>
        {/* ========================================= */}
        </div>
        </div>
      ) : (
        <div>This is the desktop version</div>
      )}

      {/* <div className="side-bar-item">
        <img
          src="https://img.k516g.com/kg/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1735560372671"
          style={{ height: "50px" }}
        />
        <span className="side-bar-item-caption">Home</span>
      </div> */}

      

      <div style={{ marginTop: "50px" }}>
        <Outlet />
        
      </div>
      <div className="fixed-bottom px-0">
        <TransactionRecordModal modalName="TransactionRecordModal"></TransactionRecordModal>
        <BettingRecordModal modalName="BettingRecordModal"></BettingRecordModal>

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
        {/* <TransactionRecordModal modalName="TurnOverModal"></TransactionRecordModal> */}

        {/* ========================================= */}
        <RefferBonusModel modalName="RefferBonusModel"></RefferBonusModel>
        {/* ========================================= */}
        <ResetmypasswordModal modalName="ResetmypasswordModal"></ResetmypasswordModal>
        {/* ========================================= */}
        <AddEmailModel modalName="AddEmailModel"></AddEmailModel>
        {/* ========================================= */}
        <AddBirthdayModal modalName="AddBirthdayModal"></AddBirthdayModal>
        {/* ========================================= */}
        <AddNameModel modalName="AddNameModel"></AddNameModel>
        {/* ========================================= */}

        {/* <MyProfilemodal
          isOpen={isModalOpen}
          closeModal={closeModal}
        ></MyProfilemodal> */}
        
        <SendEmailOtp modalName="SendEmailOtp"></SendEmailOtp>
        {/* ========================================= */}
        <VerifyOptPageEmail modalName="VerifyOptPageEmail"></VerifyOptPageEmail>
        {/* ========================================= */}

        <VerifyOptPage modalName="VerifyOptPage"></VerifyOptPage>
        {/* ========================================= */}

        <WidthrawModel modalName="WidthrawModel"></WidthrawModel>
        {/* ========================================= */}
        {/* <DepositModel
          isOpen={isModalOpen}
          closeModal={closeModal}
        ></DepositModel> */}
        {/* ========================================= */}
          <GiftPointsModel modalName="GiftPointsModel"></GiftPointsModel>
        {/* ========================================= */}  
        <VipGiftPointsPopupModel modalName="VipGiftPointsPopupModel" ></VipGiftPointsPopupModel>


        {/* ========================================= */}
        <LoginModel modalName="LoginModel"></LoginModel>

        
     
        <SingUpModal modalName="SingUpModal"></SingUpModal>

        <DepositModel modalName="DepositModel"></DepositModel>
        {/* <GamePlay modalName="GamePlay"></GamePlay> */}

        <CurrencyLanguageSelector modalName="CurrencyLanguageSelector"></CurrencyLanguageSelector>

        <SideNavPopUp modalName="SideNavPopUp"></SideNavPopUp>
      </div>

      
    </>
  );
};
