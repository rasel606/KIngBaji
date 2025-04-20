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

  const scrollimages = [
    {
      src: "https://i.ibb.co.com/DChN5S5/img-1.jpg",
      alt: "Image 1",
      link: "#",
    },
    {
      src: "https://i.ibb.co.com/VqtD7Tq/img-2.jpg",
      alt: "Image 2",
      link: "#",
    },
    {
      src: "https://i.ibb.co.com/7Kkr63k/img-3.jpg",
      alt: "Image 3",
      link: "#",
    },
    // Add more images as needed
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
    verifyUserToken,
    verifyUser,
    token,
    userDeatils,
    userId,
    loading,
    setLoading,
  } = useAuth();

  const [active, setActive] = useState(data[0]?.category);
  const [activeIndex, setActiveIndex] = useState(
    data[0]?.category.uniqueProviders
  );

  console.log(data[0]?.category.uniqueProviders);
  console.log("active", active);
  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    setActive(item ? item : data[0]?.category?.uniqueProviders);
    console.log(item);
  };

  const referralCode = localStorage.getItem("referralCode");
  console.log(localStorage.getItem("referralCode"));
  console.log(referralCode);

  const [isFixed, setIsFixed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [scrollStopped, setScrollStopped] = useState(false);
  let scrollTimeout;

  useEffect(() => {
    handleRefresh();
    setLoading(true);
    const url = "http://localhost:5000/api/v1/New-table-categories";
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

  const [balance, setBalance] = useState(userDeatils.balance);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(userId);
  const handleRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    setLoading(true);
    // handelUserDetails(userId);
    try {
      handelUserDetails(userId);

      const response = await axios.post(
        "http://localhost:5000/api/v1/user_balance",
        { userId }
      );
      console.log(response);
      setBalance(response.data.balance);

      if (response.data.hasOwnProperty("balance")) {
        verifyUser(token); // Ensure token is available in scope
      }
      setLoading(false);
    } catch (error) {
      // console.error("Error fetching balance:", error);
    } finally {
      setTimeout(() => setRefreshing(false), 1000); // Proper finally block
    }
  };

  const handelUserDetails = async (userId) => {
    setLoading(true);
    const result = await UserAllDetails(userId);
    // console.log( result = await UserAllDetails(userId))
    console.log(result.data.user.balance);
    setBalance(result.data.user.balance);
    setUserData(result.data.user);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      handleRefresh(); // Call the function whenever userId changes
    }
  }, [setRefreshing, userId, balance, loading, token]);

  return (
    <div className="">
      <div>
        <div className="ontent mcd-style">
          <Carousel images={images}></Carousel>
          <div className="announcement-row">
            {/* <span
            className="item-icon"
            style={{
              maskImage:
                "url('https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/index-announcement-icon.svg?v=1736849889723')",
            }}
          ></span> */}
            <div className="announcement-row">
              <div className="marquee">
                <ul>
                  <li
                    dangerouslySetInnerHTML={{
                      __html: `<p><span style="font-size:14px;">
                    <strong>🏏You are on Asia's trusted cricket trading... 🏏You are on Asia's trusted cricket trading...</strong>
                  </span></p>`,
                    }}
                  />
                </ul>
              </div>
            </div>
          </div>

          {isAuthenticated ? (
            <div className="nav-category nav-balance ">
              <div className="balance-box ">
                <div className="username">
                  {userDeatils ? userId : loading ? "...." : "User"}
                </div>
                <div className="balance">
                  <i className="balance-value">
                    <i id="" style={{ display: "initial", color: "white" }}>
                      ৳ {userDeatils ? balance : loading ? "...." : "0"}
                    </i>
                  </i>
                  <div
                    className={`icon refresh ${refreshing ? "active" : ""}`}
                    onClick={handleRefresh}
                  ></div>
                </div>
              </div>
              <ul className="nav-group">
                <li className="nav-item" tabindex="0">
                  {/* <img src={promotionImg} /> */}
                  <span>প্রমোশন</span>
                </li>
                <li className="nav-item" tabindex="0">
                  {/* <img src={depositImg} /> */}
                  <span>ডিপোজিট</span>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
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
                            return (
                              <li>
                                <Link
                                  to={`/gamesProvidersPageWithCategory/${encodeURIComponent(
                                    active.name
                                  )}/${encodeURIComponent(item.providercode)}`}
                                >
                                  <img src={item.image_url} alt="" />
                                  <p>{item.company}</p>
                                </Link>
                              </li>

                              // {`${activeIndex !== 0 ? `gamesProvidersPageWithCategory/${encodeURIComponent(active.name)}/${encodeURIComponent(item.providercode)}` : ""}`}
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="recommend scroll-banner">
            <div className="recommend-title">
              <h2>Favourites</h2>
            </div>
            <div className="recommend-bg">
              <div className="recommend-main">
                {scrollimages.map((image, index) => (
                  <div key={index} className="recommend-card">
                    <a href={image.link || "#"}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="recommend-image"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="recommend feature-games">
            <div className="recommend-title">
              <h2>Featured Games</h2>
            </div>
            <div className="recommend-bg games">
              <div className="recommend-main games-main">
                {games.map((game, index) => (
                  <div className="games-box" key={index}>
                    <div className="pic">
                      <a href="#">
                        <img src={game.imgSrc} alt={game.name} loading="lazy" />
                      </a>
                    </div>
                    <div className="text">
                      <h3>{game.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="my-2">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </div>
  );
};
