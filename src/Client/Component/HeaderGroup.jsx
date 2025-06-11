import React, { useEffect, useState } from "react";
import { useModal } from "./ModelContext";
import { Link, useNavigate } from "react-router-dom";

export default (props) => {
  // const { activeModal, openModal, closeModal } = useModal();
  // if (activeModal !== modalName) return null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [showSecondMenu, setShowSecondMenu] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState(data[0]?.category.uniqueProviders);
  const [activeIndex, setActiveIndex] = useState(
    data[0]?.category.uniqueProviders
  );
  console.log(data);
  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    setActive(item);
    // console.log(item);
  };
  const categories = [
    { id: "sport", name: "স্পোর্ট", icon: "sport.png" },
    { id: "casino", name: "ক্যাসিনো", icon: "casino.png" },
    { id: "slot", name: "স্লট", icon: "slot.png" },
    { id: "table", name: "টেবিল", icon: "table.png" },
    { id: "crash", name: "ক্রাশ", icon: "crash.png" },
    { id: "fish", name: "ফিসিং", icon: "fish.png" },
    { id: "arcade", name: "আর্কেড", icon: "arcade.png" },
    { id: "lottery", name: "লটারী", icon: "lottery.png" },
  ];

  const providers = [
    { id: "playtech", name: "Playtech", icon: "provider-awcmpt.png" },
    { id: "jili", name: "Jili", icon: "provider-awcmjili.png" },
    { id: "pgsoft", name: "PG Soft", icon: "provider-pg.png" },
    { id: "jdb", name: "JDB", icon: "provider-jdb.png" },
    { id: "fachai", name: "Fa Chai", icon: "provider-awcmfc.png" },
    { id: "spadegaming", name: "Spadegaming", icon: "provider-awcmsg.png" },
    { id: "redtiger", name: "Red Tiger", icon: "provider-awcmrt.png" },
    { id: "pragmatic", name: "Pragmatic Play", icon: "provider-awcmpp.png" },
    { id: "fastspin", name: "FastSpin", icon: "provider-awcmfastspin.png" },
    { id: "rich88", name: "Rich88", icon: "provider-rich88.png" },
    { id: "joker", name: "Joker", icon: "provider-joker.png" },
    { id: "kagaming", name: "KA Gaming", icon: "provider-ka.png" },
    { id: "worldmatch", name: "WorldMatch", icon: "provider-worldmatch.png" },
    { id: "playngo", name: "Play'n Go", icon: "provider-playngo.png" },
    { id: "cq9", name: "CQ9", icon: "provider-cq9.png" },
    { id: "netent", name: "Netent", icon: "provider-netent.png" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset menu states when closing
    if (!isMenuOpen) {
      setActiveCategory("");
      setShowSecondMenu(true);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setShowSecondMenu(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
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
        console.log("data", data);
      });
  }, []);

  console.log("activeCat", active);

  return (
    <header id="header" className="normal login dialog-opened">
      <div className="header-left-btn-group" onClick={toggleMenu}>
        {/* <div
          className="back-btn"
          style={{
            backgroundImage:
              "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1738748531996)",display:"Block",opacity:"1"
          }}
        ></div> */}
        <div className="menu-btn">
          <ul style={{ display: "Block", opacity: "1", color: "white" }}>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="header-title"></div>
      <div
        onClick={() => navigate("/")}
        className="logo"
        tabIndex="0"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png)",
        }}
      ></div>
        <div className="header-right-btn-group">
        <Link className="app-download">
          <span className="item-icon"></span>
          <p>App</p>
        </Link>
        <Link className="service-btn" name="liveChatBtn">
          <span className="item-icon"></span>
          <p>LiveChat</p>
        </Link>
      </div>

      {isMenuOpen && (
        <div className="cdk-overlay-container">
          <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing">
            <div
              className="cdk-global-overlay-wrapper"
              dir="ltr"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <div
                id="cdk-overlay-2"
                className="cdk-overlay-pane dialog-panel"
                style={{ position: "static" }}
              >
                <div className="popup" id="dialog-2">
                  <div className="popup__header"></div>
                  <div className="popup__content">
                    <div
                      class="menu-mask"
                      style={{ display: isMenuOpen ? "block" : "none" }}
                      onClick={() => setIsMenuOpen(false)}
                    ></div>
                    <div className={`menu ${isMenuOpen ? "active" :""}`} >
                      <div className="menu-first">
                        <ul className="home">
                          <li data-category="home">
                            <span
                              className="item-icon"
                              style={{
                                backgroundImage:
                                  "url(https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1725363175075)",
                              }}
                            ></span>
                            <Link to="/" className="" onClick={toggleMenu}>
                              হোম
                            </Link>
                          </li>
                        </ul>

                        <ul className="vendor">
                          {data?.map((category, index) => (
                            <li
                              key={category.id}
                              className={activeIndex === index ? "active" : ""}
                              data-category={category.id}
                              onClick={() =>
                                handleItemClick(index, category?.category)
                              }
                            >
                              {console.log(
                                "category",
                                category.category?.image
                              )}
                              <span
                                className="item-icon"
                                style={{
                                  backgroundImage: `url(${category.category?.image})`,
                                  display: "block",
                                }}
                              ></span>
                              <a>{category.name || category.category?.name}</a>
                            </li>
                          ))}
                        </ul>

                        <ul className="promotion-block">
                          <li data-category="promotion">
                            <span
                              className="item-icon"
                              style={{
                                backgroundImage:
                                  "url(https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-promotion.png?v=1725363175075)",
                              }}
                            ></span>
                            <a href="/bd/bn/promotion">প্রমোশন</a>
                          </li>
                        </ul>

                        <div className="support-block">
                          <div className="service" data-service="affiliate">
                            <span
                              className="item-icon"
                              style={{
                                backgroundImage:
                                  "url(https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-affiliate.png?v=1725363175075)",
                              }}
                            ></span>
                            <p>এফিলিয়েট</p>
                          </div>

                          <div
                            className="service"
                            data-service="talk"
                            name="liveChatBtn"
                          >
                            <span
                              className="item-icon"
                              style={{
                                backgroundImage:
                                  "url(https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-talk.png?v=1725363175075)",
                              }}
                            ></span>
                            <p name="liveChatBtn">
                              24/7 LiveChat{" "}
                              <span>24/7 গুণমানের পরিষেবা সরবরাহ করে</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {showSecondMenu && active && (
                        <div className={`menu-second ${active !== null ? "active" : ""}`}>
                          <div className="menu-second-header">
                            <button
                              className="back-button"
                              onClick={() => setShowSecondMenu(false)}
                            >
                              Back
                            </button>
                            <h3>
                              {categories.find((cat) => cat.id === activeIndex)
                                ?.name ||
                                categories.find((cat) => cat.id === activeIndex)
                                  ?.category?.name}
                            </h3>
                          </div>
                          <ul className={`menu-second ${active !== null ? "active" : ""}`}>
                            {active?.uniqueProviders.map((provider) => (
                              <li key={provider.id}>
                                <Link
                                  onClick={toggleMenu}
                                  to={`/gamesProvidersPageWithCategory/${encodeURIComponent(
                                    active.name
                                  )}/${encodeURIComponent(
                                    provider.providercode
                                  )}`}
                                >
                                  {console.log("provider", provider)}
                                  <img
                                    alt={`provider-${provider.id}`}
                                    src={provider.image_url}
                                    loading="lazy"
                                  />
                                  <p>{provider.company}</p>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
    
  );
};
