import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Accordion, Container, Navbar } from "react-bootstrap";
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



export default () => {
  const getUserDetails = "";
  let contentRef,
    sideNavRef,
    topNavRef = useRef();

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const MenuBarClickHandler = () => {
  //   let sideNav = sideNavRef;
  //   let content = contentRef;
  //   let topNav = topNavRef;
  //   if (sideNav.classList.contains("side-nav-open")) {
  //     sideNav.classList.add("side-nav-close");
  //     sideNav.classList.remove("side-nav-open");
  //     content.classList.add("content-expand");
  //     content.classList.remove("content");
  //     topNav.classList.remove("top-nav-open");
  //     topNav.classList.add("top-nav-close");
  //   } else {
  //     sideNav.classList.remove("side-nav-close");
  //     sideNav.classList.add("side-nav-open");
  //     content.classList.remove("content-expand");
  //     content.classList.add("content");
  //     topNav.classList.add("top-nav-open");
  //     topNav.classList.remove("top-nav-close");
  //   }
  // };

  // const isSidebarAccordionActive = () => {
  //   let urlList = [];
  //   sidebarItems.map((item) => {
  //     urlList.push(
  //       item.subMenu.map((subItem) => {
  //         return subItem?.url;
  //       })
  //     );
  //   });
  //   return urlList.findIndex((items) =>
  //     items.includes(window.location.pathname)
  //   );
  // };

  const images = [
    "https://i.ibb.co.com/DChN5S5/img-1.jpg",
    "https://i.ibb.co.com/VqtD7Tq/img-2.jpg",
    "https://i.ibb.co.com/7Kkr63k/img-3.jpg",
    "https://i.ibb.co.com/LQB0VW7/img-4.jpg",
    "https://i.ibb.co.com/gdQVX9d/image-5.jpg",
  ];

  const sidebarItems = [
    {
      id: 1,
      title: "Sports",
      icon: "https://img.k516g.com/kg/h5/assets/images/icon-set/theme-icon/icon-sport.png?v=1735560372671",
      // url: "Spoerts",

      subMenu: [
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-saba.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-sbtech.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-sv388.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-sbov2.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-nst.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-awcmpinnacle.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
      ],
    },

    {
      id: 2,
      title: "Casino",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/icon-casino.png?v=1735560333041",
      // url: "Spoerts",

      subMenu: [
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-evo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmsexy.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmpp.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmhotroad.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmpt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmdg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
      ],
    },
    {
      id: 3,
      title: "Slot",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/icon-slot.png?v=1735560333041",
      // url: "Spoerts",

      subMenu: [
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-evo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-pg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmfastspin.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmsg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-jdb.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmfc.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-nextspin.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmyesbingo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmpt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },

        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmp8.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-rich88.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmrt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-worldmatch.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-worldmatch.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-joker.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-joker.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
      ],
    },
    {
      id: 4,
      title: "Table",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/icon-table.png?v=1735560333041",
      // url: "Spoerts",

      subMenu: [
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-exchange.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-saba.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-sbtech.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-sv388.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-sbov2.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-horsebook.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-cmd.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-nst.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/sports-icon/icon-awcmpinnacle.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
      ],
    },

    {
      id: 5,
      title: "Crash",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/icon-crash.png?v=1735560333041",
      // url: "Spoerts",

      subMenu: [
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-evo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmsexy.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmpp.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmhotroad.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmpt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmdg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
      ],
    },
    {
      id: 6,
      title: "Fishing",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/icon-fish.png?v=1735560333041",
      // url: "Spoerts",

      subMenu: [
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-evo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-pg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmfastspin.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmsg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-jdb.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmfc.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-nextspin.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmyesbingo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmpt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },

        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmp8.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-rich88.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmrt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-worldmatch.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-worldmatch.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-joker.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-joker.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
      ],
    },

    {
      id: 6,
      title: "Arcade",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/icon-arcade.png?v=1735560333041",
      // url: "Spoerts",

      subMenu: [
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-evo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-pg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmfastspin.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmsg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-jdb.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmfc.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-nextspin.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmyesbingo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmpt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },

        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmp8.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-rich88.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmrt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-worldmatch.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-worldmatch.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-joker.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-joker.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
      ],
    },
    {
      id: 7,
      title: "Lottery",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/icon-lottery.png?v=1735560333041",
      // url: "Spoerts",

      subMenu: [
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-evo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-pg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmfastspin.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmsg.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-jdb.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmfc.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-nextspin.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmyesbingo.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmpt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },

        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmp8.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-rich88.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmrt.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-worldmatch.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-worldmatch.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-joker.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
        {
          title: "Sports",
          icon: "https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-joker.png?v=1735560333041&source=mcdsrc",
          // url: "Spoerts",
        },
      ],
    },
    {
      title: "LiveContact",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-talk.png?v=1735560333041",

      subMenu: [
        {
          title: "Live Chat",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-customer.png?v=1735560333041",
          // url: "contactus",
        },
        {
          title: "Telegram",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-telegram.png?v=1735560333041",
          // url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Telegram Channel",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-telegram.png?v=1735560333041",
          // url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Facebook",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-facebook-messenger.png?v=1735560333041",
          // url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Support-Email",
          icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/member-center/icon-email.png?v=1735560333041",
          // url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
      ],
    },
    {
      title: "Promotions",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-promotion.png?v=1735560333041",

      // url: "Spoerts",
    },
    {
      title: "Leaderboard",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-sponsorship.png?v=1735560333041",
      // url: "Spoerts",
    },
    {
      title: "Download",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-download.png?v=1735560333041",
      // url: "Spoerts",
    },
    {
      title: "Responsible...",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-responsible-gaming.png?v=1735560333041",
      // url: "Spoerts",
    },
    {
      title: "Affilate",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-affiliate.png?v=1735560333041",
      // url: "Spoerts",
    },
    {
      title: "KingBaji Blog",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-crickex-blog.png?v=1735560333041",
      // url: "Spoerts",
    },
    {
      title: "About Us",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-about-us.png?v=1735560333041",
      // url: "Spoerts",
    },
    {
      title: "FAQ",
      icon: "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-faq.png?v=1735560333041",
      // url: "Spoerts",
    },
  ];

  const currencyList = [
    {
      code: "BDT",
      name: "United States Dollar",
      img: "https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1735560333041&source=mcdsrc",
    },
    {
      code: "INR",
      name: "United States Dollar",
      img: "https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1735560333041&source=mcdsrc",
    },
    {
      code: "PKR",
      name: "United States Dollar",
      img: "https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1735560333041&source=mcdsrc",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);
  const [isIsDepositModal, setIsDepositModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMyProfileModal, setIsMyProfileModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);

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
          {isAuthenticated ? (
            
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

      

      <div ref={(div) => (contentRef = div)} className="content">
        <Outlet />
        
      </div>
      <div className="fixed-bottom px-0">
        <TransactionRecordModal modalName="TransactionRecordModal"></TransactionRecordModal>

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
        {/* ========================================= */}
        <MyProfilemodal modalName="modal2"></MyProfilemodal>
        {/* ========================================= */}
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

        <ProfileModel modalName="ProfileModel"></ProfileModel>
     
        <SingUpModal modalName="SingUpModal"></SingUpModal>

        <DepositModel modalName="DepositModel"></DepositModel>
        {/* <GamePlay modalName="GamePlay"></GamePlay> */}

        <CurrencyLanguageSelector modalName="CurrencyLanguageSelector"></CurrencyLanguageSelector>

        <SideNavPopUp modalName="SideNavPopUp"></SideNavPopUp>
      </div>

      
    </>
  );
};
