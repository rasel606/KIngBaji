import React, { useEffect, useState } from "react";

import { TfiAnnouncement } from "react-icons/tfi";
import { LuRefreshCcw } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

import Carousel from "./Carousel";
// import promotionImg from "../../../public/assets/images/icon-set/toolbar-icon-deposit.svg";
// import depositImg from "../../../public/assets/images/icon-set/toolbar-icon-deposit.svg";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";
import { UserAllDetails } from "../Component/Axios-API-Service/AxiosAPIService";
import FeaturedGames from "./FeaturedGames";
import Favourites from "./Favourites";
import Marquee from "./Marquee";
import MyProfilemodal from "./MyProfilemodal";

export default (props) => {
  const { modalShow, setModalShow } = props;
  // const [Loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const images = [
    "https://i.ibb.co.com/DChN5S5/img-1.jpg",
    "https://i.ibb.co.com/VqtD7Tq/img-2.jpg",
    "https://i.ibb.co.com/7Kkr63k/img-3.jpg",
    "https://i.ibb.co.com/LQB0VW7/img-4.jpg",
    "https://i.ibb.co.com/gdQVX9d/image-5.jpg",
  ];

  const games = [
    {
      name: "Super Ace",
      imgSrc: "https://i.ibb.co.com/DChN5S5/img-1.jpg",
    },
    {
      name: "Crazy777",
      imgSrc: "https://i.ibb.co.com/VqtD7Tq/img-2.jpg",
    },
    {
      name: "Alibaba",
      imgSrc: "https://i.ibb.co.com/7Kkr63k/img-3.jpg",
    },
    {
      name: "Fortune Gems 2",
      imgSrc: "https://i.ibb.co.com/LQB0VW7/img-4.jpg",
    },
    {
      name: "Golden Empire",
      imgSrc: "https://i.ibb.co.com/gdQVX9d/image-5.jpg",
    },
  ];

  const {
    isAuthenticated,
    loginUser,
    logoutUser,
    Token,
    isLoginNotify, setIsLoginNotify,
    token,
    userDeatils,

    // loading,
    // setLoading,
  } = useAuth();

const [loading,
    setLoading] = useState(true);

    const userId = userDeatils?.userId;
  // const referredBy = userDeatils?.referredBy || "";


  // const userdata = {
  //   userId: userId
  // };


  const userBalance =userDeatils ? userDeatils.balance : ""

  const [active, setActive] = useState(data[0]?.category);
  const [activeIndex, setActiveIndex] = useState(
    data[0]?.category.uniqueProviders
  );

  const referralCode = localStorage.getItem("referralCode");
  console.log(localStorage.getItem("referralCode"));
  console.log(referralCode);

  const [balance, setBalance] = useState(userBalance);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(userId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playGameData, setPlayGameData] = useState(null);
  const [gameData, setGameData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setActive(data[0]?.category);
      setActiveIndex(0); // Reset index when data changes
    }
  }, [data]);
  console.log(data[0]?.category.uniqueProviders);
  console.log("active", active);
  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    setActive(item ? item : data[0]?.category?.uniqueProviders);
    console.log(item);
  };

  const [isFixed, setIsFixed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [gameWindow, setGameWindow] = useState(null);
  const [scrollStopped, setScrollStopped] = useState(false);
  let scrollTimeout;

  useEffect(() => {
    handleRefresh();
    setLoading(true);
    const url = "https://api.kingbaji.live/api/v1/New-table-categories";
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mood: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY >= 150);

      // Clear the previous timeout
      clearTimeout(scrollTimeout);

      // Reset `scrollStopped` and debounce logic
      setScrollStopped(false);
      scrollTimeout = setTimeout(() => {
        setScrollStopped(true);
      }, 200); // Adjust debounce delay as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  const navigate = useNavigate();

  const handleOpenModal1 = () => {
    navigate("/modal1");
  };

  const handlePlay = async (game) => {
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
      }else{
         setIsLoginNotify("আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!");
      }
    } catch (error) {
      console.error("Error launching game:", error);
       setIsLoginNotify("আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!");
    } finally {
      setIsPlaying(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (gameWindow && !gameWindow.closed) {
        gameWindow.close();
      }
    };
  }, [gameWindow]);

  /** 🚀 Refresh Balance */
  const handleRefresh = async (userId) => {
    try {
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

  return (
    <div className="">
      <div>
        <div className="content mcd-style">
          <Carousel images={images}></Carousel>
          <Marquee></Marquee>

          <div className="game-nav-container">
            <div
              className={`${
                scrollStopped ? "scroll-stopped " : ""
              } nav nav-category ${isFixed ? "active" : ""}nav-auto`}
            >
              {data.map((item, index) => (
                <div
                  className={`btn ${index === activeIndex ? "selected" : ""}`}
                  key={index}
                  onClick={() => handleItemClick(index, item?.category)}
                >
                  {/* {console.log(item.category)} */}
                  <div className="icon">
                    <span
                      className="item-icon"
                      style={{
                        backgroundImage: `url(${item?.category?.image})`,
                      }}
                    >
                      {/* <img src={item.icon} alt="" /> */}
                    </span>
                    <p>{item?.category?.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="nav-wrap ">
              <div className="content-title">
                <h2>
                  <span>{active?.name}</span>
                </h2>
              </div>
              <div className="nav-content-wrap">
                <div className="nav-content-inner">
                  <div className="content-box">
                    <div className="layout-brand">
                      <div className="card1">
                        <ul>
                          {active?.uniqueProviders?.map((item, index) => {
                            // যদি প্রথম ২ ক্যাটাগরি হয়, তাহলে লিঙ্ক না দিয়ে সরাসরি গেম প্লে কল দিন
                            if (activeIndex < 2) {
                              // প্রথম ২ ক্যাটাগরি
                              return (
                                <li key={index}>
                                  <Link
                                    onClick={() => handlePlay(item)}
                                  >
                                    <img
                                      src={item.image_url}
                                      alt={item.company}
                                    />
                                    <p>{item.company}</p>
                                  </Link>
                                </li>
                              );
                            } else {
                              // বাকি ক্যাটাগরি লিঙ্ক সহ
                              return (
                                <li key={index}>
                                  {console.log(active)}
                                  <Link
                                    to={`/gamesProvidersPageWithCategory/${encodeURIComponent(
                                      active.name
                                    )}/${encodeURIComponent(
                                      item.providercode
                                    )}`}
                                  >
                                    <img
                                      src={item.image_url}
                                      alt={item.company}
                                    />
                                    <p>{item.company}</p>
                                  </Link>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Favourites></Favourites>
          <FeaturedGames></FeaturedGames>
        </div>
        <div>
          <div className="my-2">
            <Footer></Footer>
          </div>
        </div>
      </div>
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
  );
};
