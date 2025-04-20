import React, { useEffect, useState } from "react";
import { useModal } from "./ModelContext";

export default () => {
    // const { activeModal, openModal, closeModal } = useModal();
    // if (activeModal !== modalName) return null;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("");
    const [showSecondMenu, setShowSecondMenu] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data)

    const categories = [
      { id: 'sport', name: 'স্পোর্ট', icon: 'sport.png' },
      { id: 'casino', name: 'ক্যাসিনো', icon: 'casino.png' },
      { id: 'slot', name: 'স্লট', icon: 'slot.png' },
      { id: 'table', name: 'টেবিল', icon: 'table.png' },
      { id: 'crash', name: 'ক্রাশ', icon: 'crash.png' },
      { id: 'fish', name: 'ফিসিং', icon: 'fish.png' },
      { id: 'arcade', name: 'আর্কেড', icon: 'arcade.png' },
      { id: 'lottery', name: 'লটারী', icon: 'lottery.png' },
    ];
  
    const providers = [
      { id: 'playtech', name: 'Playtech', icon: 'provider-awcmpt.png' },
      { id: 'jili', name: 'Jili', icon: 'provider-awcmjili.png' },
      { id: 'pgsoft', name: 'PG Soft', icon: 'provider-pg.png' },
      { id: 'jdb', name: 'JDB', icon: 'provider-jdb.png' },
      { id: 'fachai', name: 'Fa Chai', icon: 'provider-awcmfc.png' },
      { id: 'spadegaming', name: 'Spadegaming', icon: 'provider-awcmsg.png' },
      { id: 'redtiger', name: 'Red Tiger', icon: 'provider-awcmrt.png' },
      { id: 'pragmatic', name: 'Pragmatic Play', icon: 'provider-awcmpp.png' },
      { id: 'fastspin', name: 'FastSpin', icon: 'provider-awcmfastspin.png' },
      { id: 'rich88', name: 'Rich88', icon: 'provider-rich88.png' },
      { id: 'joker', name: 'Joker', icon: 'provider-joker.png' },
      { id: 'kagaming', name: 'KA Gaming', icon: 'provider-ka.png' },
      { id: 'worldmatch', name: 'WorldMatch', icon: 'provider-worldmatch.png' },
      { id: 'playngo', name: 'Play\'n Go', icon: 'provider-playngo.png' },
      { id: 'cq9', name: 'CQ9', icon: 'provider-cq9.png' },
      { id: 'netent', name: 'Netent', icon: 'provider-netent.png' },
    ];

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };



    
      useEffect(() => {

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
            console.log("data",data);
          });
      }, []);
  return (
    <header
      id="header"
      className="normal login dialog-opened"
     
       >
      <div className="header-left-btn-group" onClick={toggleMenu}>
        <div
          className="back-btn"
          style={{
            backgroundImage:
              "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1738748531996)",
          }}
        ></div>
         <div className="menu-btn" >
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      </div>

      <div className="header-title" ></div>
      <div 
        className="logo"
        tabIndex="0"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png)",
        }}
      ></div>

      {/* <div className="header-right-btn-group">
        <a className="app-download" href="/bd/en/app-download">
          <span
            className="item-icon"
            style={{
              maskImage:
                "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/header-appdownload-icon.svg?v=1738748531996)",
            }}
          ></span>
          <p>App</p>
        </a>

        <a className="service-btn" name="liveChatBtn">
          <span
            className="item-icon"
            style={{
              maskImage:
                "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/header-service-icon.svg?v=1738748531996)",
            }}
          ></span>
          <p>LiveChat</p>
        </a>

        <div
          className="editor-btn"
          style={{
            display: "none",
            maskImage:
              "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-editor.svg?v=1738748531996)",
          }}
        ></div>
      </div> */}
      {isMenuOpen && (
        <div className="cdk-overlay-container">
        <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing" >
        <div className="cdk-global-overlay-wrapper" dir="ltr" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div id="cdk-overlay-2" className="cdk-overlay-pane dialog-panel" style={{ position: 'static' }}>
          <div className="popup" id="dialog-2">
            <div className="popup__header"></div>
            <div className="popup__content">
              <div className="menu active">
                <div className="menu-first">
                  <ul className="home">
                    <li data-category="home">
                      <span className="item-icon" style={{ backgroundImage: 'url(https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1725363175075)' }}></span>
                      <a className="" href="/bd/bn">হোম</a>
                    </li>
                  </ul>
                  
                  <ul className="vendor">
                    {data.filter(cat => cat.id !== 'home').map(category => (
                      <li 
                        key={category.id}
                        className={activeCategory === category.id ? 'active' : ''}
                        data-category={category.id}
                        onClick={() => setActiveCategory(category.id) && setShowSecondMenu(true)}
                      >
                        <span 
                          className="item-icon" 
                          style={{ backgroundImage: `url(${category.image})` }}
                        ></span>
                        <a>{category.name}</a>
                      </li>
                    ))}
                  </ul>
                  
                  <ul className="promotion-block">
                    <li data-category="promotion">
                      <span className="item-icon" style={{ backgroundImage: 'url(https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-promotion.png?v=1725363175075)' }}></span>
                      <a href="/bd/bn/promotion">প্রমোশন</a>
                    </li>
                  </ul>
                  
                  <div className="support-block">
                    <div className="service" data-service="affiliate">
                      <span className="item-icon" style={{ backgroundImage: 'url(https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-affiliate.png?v=1725363175075)' }}></span>
                      <p>এফিলিয়েট</p>
                    </div>
                    
                    <div className="service" data-service="talk" name="liveChatBtn">
                      <span className="item-icon" style={{ backgroundImage: 'url(https://img.r24b.xyz/hb/h5/assets/images/icon-set/theme-icon/icon-talk.png?v=1725363175075)' }}></span>
                      <p name="liveChatBtn">24/7 LiveChat <span>24/7 গুণমানের পরিষেবা সরবরাহ করে</span></p>
                    </div>
                  </div>
                </div>
                
                {showSecondMenu && (
                  <div className="menu-second">
                    <ul className={`menu-second-ul ${activeCategory === `${activeCategory}` ? 'active' : ''}`}>
                      {providers.map(provider => (
                        <li key={provider.id}>
                          <a tabIndex="-1">
                            <img 
                              alt={`provider-${provider.id}`} 
                              src={`https://img.r24b.xyz/hb/h5/assets/images/brand/white/${provider.icon}?v=1725363175075`} 
                              loading="lazy"
                            />
                            <p>{provider.name}</p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="menu-mask" style={{ display: 'block' }}></div>
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


