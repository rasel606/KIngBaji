import React from "react";
import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
    const { activeModal, openModal, closeModal } = useModal();
    if (activeModal !== modalName) return null;
  const menuItems = [
    // { category: "home", label: "Home", icon: "icon-home.png" },
    { category: "promotion", label: "Promotions", href: "/bd/en/promotion", icon: "icon-promotion.png" },
    { category: "Affiliate", label: "Affiliate",  icon: "icon-affiliate.png" },
    { category: "LiveCHat", label: " 24/7 LiveCHat",  icon: "icon-talk.png" },
    
  ];

  const gameProviders = [
    { name: "Home", icon: "icon-home.png" },
    { name: "SPORTS", icon: "icon-sport.png" },
    { name: "CASINO", icon: "icon-casino.png" },
    { name: "SLOTS", icon: "icon-slot.png" },
    { name: "TABLE", icon: "icon-table" },
    { name: "CRASH", icon: "icon-crash" },
    { name: "FISHING", icon: "icon-fishing" },
    { name: "ARCADE", icon: "icon-arcade" },
    { name: "LOTTERY", icon: "icon-lottery" },
    
  ];

  return (
    
    <div className="cdk-global-overlay-wrapper" dir="ltr" onClick={closeModal}>
      <div id="cdk-overlay-6" className="cdk-overlay-pane dialog-panel" onClick={(e) => e.stopPropagation()}>
        <div className="popup" id="dialog-6">
          <div className="popup__header"></div>
          <div className="popup__content">
            <div className="menu active">
              <div className="menu-first">
                {/* <ul style={{background:"#38094D"}}>
                  {menuItems.map((item, index) => (
                    <li key={index} data-category={item.category} >
                      <a href={item.href} target={item.target || "_self"}>
                        <span
                          className="item-icon"
                          style={{
                            backgroundImage: `url(https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/${item.icon})`,
                          }}
                        ></span>
                        <p style={{color:"#fff"}}>{item.label}</p>
                      </a>
                    </li>
                  ))}
                </ul> */}
                {/* <div className="title" style={{background:"#38094D"}}> 
                  <p style={{color:"#fff"}}>Games</p>
                  </div> */}
                <ul style={{background:"#38094D"}}>
                  {gameProviders.map((provider, index) => (
                    <li key={index} web-category-type="VENDOR" game-type="1"  >
                      <a tabIndex="-1">
                      <span
                          className="item-icon"
                          style={{
                            backgroundImage: `url(	https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/${provider.icon})`,
                            display: "inline-block",
                            opacity: "1"
                          }}
                        ></span>
                        <p style={{color:"#fff"}}>{provider.name}</p>
                      </a>
                    </li>
                  ))}
                  {menuItems.map((item, index) => (
                    <li key={index} data-category={item.category} >
                      <a href={item.href} target={item.target || "_self"}>
                        <span
                          className="item-icon"
                          style={{
                            backgroundImage: `url(https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/${item.icon})`,
                          }}
                        ></span>
                        <p style={{color:"#fff"}}>{item.label}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="menu-mask" style={{ display: "block" }}></div>
          </div>
        </div>
    </div>
     </div>
  );
};


