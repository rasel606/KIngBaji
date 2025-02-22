import React, { useEffect, useState } from "react";

import { TfiAnnouncement } from "react-icons/tfi";
import { LuRefreshCcw } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

import { Button } from "react-bootstrap";
import Carousel from "./Carousel";
import promotionImg from "../../assets/toolbar-icon-promotion.svg";
import depositImg from "../../assets/toolbar-icon-deposit.svg";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";

export default (props) => {
  const { modalShow, setModalShow } = props;
  const [Loading, setLoading] = useState(true);
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
      src: "https://img.c88rx.com/upload/announcement/image_206351.jpg",
      alt: "Image 1",
      link: "#",
    },
    {
      src: "https://img.c88rx.com/upload/announcement/image_206121.jpg",
      alt: "Image 2",
      link: "#",
    },
    {
      src: "https://img.c88rx.com/upload/announcement/image_206122.jpg",
      alt: "Image 3",
      link: "#",
    },
    // Add more images as needed
  ];
  const games = [
    {
      name: "Super Ace",
      imgSrc: "https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-027.png",
    },
    {
      name: "Crazy777",
      imgSrc: "https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-014.png",
    },
    {
      name: "Alibaba",
      imgSrc: "https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-049.png",
    },
    {
      name: "Fortune Gems 2",
      imgSrc: "https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-076.png",
    },
    {
      name: "Golden Empire",
      imgSrc: "https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-042.png",
    },
    {
      name: "Golden Bank",
      imgSrc: "https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-023.png",
    },
    {
      name: "Boxing King",
      imgSrc: "https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-031.png",
    },
    {
      name: "Fortune Gems",
      imgSrc: "https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-043.png",
    },
  ];

  const { isAuthenticated, loginUser, logoutUser,verifyUserToken, verifyUser,token,userDeatils ,userId } =
    useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState([data[0]?.category || ""]);
  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    setActive(item);
  };

  const [isFixed, setIsFixed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [scrollStopped, setScrollStopped] = useState(false);
  let scrollTimeout;

  useEffect(() => {
    const url = "http://localhost:6000/api/v1/New-table-categories";
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
  if (userId) {
    
    await verifyUser(token);
  }


    setTimeout(() => setRefreshing(false), 1000); // Reset animation after 1s
  };
  useEffect(() => {
    if (userId) {
     
      handleRefresh(); // Call the function whenever userId changes
    }
  }, [userId]);
  console.log("active", userDeatils);

  return (
    <div className="">
      <div className="">
        <Carousel images={images}></Carousel>
        <div className="announcement-row">
          <span
            className="item-icon"
            style={{
              maskImage:
                "url('https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/index-announcement-icon.svg?v=1736849889723')",
            }}
          ></span>
          <div className="marquee">
            <ul className="marquee-list">
              <li className="marquee-item">
                <span>
                  <p>
                    <span className="marquee-text">
                      <a
                        href="http://kingbaji.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="link-text">🔗kingbaji.com/</span> থেকে
                        আমাদের ব্যাকআপ লিংকগুলি পান৷ Crickex-এ যোগ দিন, আপনার
                        বিশ্বস্ত ক্রিকেট ট্রেডিং প্ল্যাটফর্ম। ব্যাক অ্যান্ড লে,
                        প্রিমিয়াম ক্রিকেট, অভিনব বাজি এবং আরও অনেক কিছু।👥৩
                        স্তর পর্যন্ত প্রতিটি রেফার থেকে সীমাহীন রিবেট কমিশন
                        উপার্জন করুন📊।এখনই আপনার ফ্রী আইডির জন্য সাইন আপ করুন!
                        💸💰🏏
                      </a>
                    </span>
                  </p>
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="nav-category nav-balance ">
          <div className="balance-box ">
            <div className="balance">
              <span className="balance-value">৳ 0</span>
              <div className="icon refresh">
                <LuRefreshCcw className=" refreshi" />
              </div>
            </div>
            <ul className="nav-group">
              <li className="nav-item">
                <img
                  src='https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-promotion.png?v=1735554244437"'
                  alt=""
                />
                <span>Promosions</span>
              </li>
              <li className="nav-item">
                <img
                  src="https://i.ibb.co.com/DRsnG9j/icon-deposit.png"
                  alt=""
                />
                <span>Deposit</span>
              </li>
            </ul>
          </div>
        </div> */}

        {
          isAuthenticated ? (
            <div
          
          className="nav-category nav-balance "
        >
          <div className="balance-box ">
            <div className="username">{userDeatils?.userId}</div>
            <div className="balance">
              <i className="balance-value">
                <i id="" style={{display: "initial", color: "white"}} >
                  ৳ {userDeatils.balance}
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
              <img src={promotionImg} />
              <span>প্রমোশন</span>
            </li>
            <li className="nav-item" tabindex="0">
              <img src={depositImg} />
              <span>ডিপোজিট</span>
            </li>
          </ul>
        </div>
          ):""
        }
        <div className="">
          <div
            className={`${
              scrollStopped ? "scroll-stopped " : ""
            } nav nav-category ${isFixed ? "active" : ""}  nav-auto`}
          >
            {data.map((item, index) => (
              <div
                className={`btn ${index === activeIndex ? "selected" : ""}`}
                key={index}
                onClick={() => handleItemClick(index, item?.category)}
              >
                {console.log(item.category)}
                <div className="icon">
                  <span
                    className="item-icon"
                    style={{ backgroundImage: `url(${item?.category?.image})` }}
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
                      {console.log(active.name)}
                      <ul>
                        {active?.uniqueProviders?.map((item, index) => {
                          return (
                            <li>
                              {console.log(item.providercode)}
                              <Link
                                to={`/gamesProvidersPageWithCategory/${encodeURIComponent(
                                  active.name
                                )}/${encodeURIComponent(item.providercode)}`}
                              >
                                <img src={item.image_url} alt="" />
                                <p>{item.company}</p>
                              </Link>
                            </li>
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
        <div>
          <div className="my-2">
            <Footer></Footer>
          </div>
        </div>
        {/* <Button
          className="auth-container__button auth-container__button--primary"
          onClick={() => setModalShow(true)} // Pass row data on click
        >
          Login
        </Button> */}
      </div>
    </div>
  );
};
