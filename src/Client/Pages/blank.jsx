import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const [activeTab, setActiveTab] = useState('SPORTS');
  const [carouselItems] = useState([
    'https://img.c88rx.com/upload/h5Announcement/image_204114.jpg',
    'https://img.c88rx.com/upload/h5Announcement/image_210291.jpg',
    // Add all image URLs from original
  ]);

  return (
    <div className="mcd-root ng-tns-c3211308377-0">
      {/* Loader */}
      <div className="mcd-loader-box ng-tns-c51509331-1" />
      
      <div className="main-router-wrapper mcd-style ng-trigger">
        {/* Header */}
        <header className="normal ng-star-inserted">
          <div className="header-left-btn-group">
            <div className="back-btn ng-star-inserted" />
            <div className="menu-btn">
              <ul>
                <li /><li /><li />
              </ul>
            </div>
          </div>
          <div className="logo" style={{ 
            backgroundImage: 'url(https://img.c88rx.com/cx/h5/assets/images/logo.png)'
          }} />
          <div className="header-right-btn-group">
            <a className="service-btn ng-star-inserted">
              <span className="item-icon" />
              <p>LiveChat</p>
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="content mcd-style">
          {/* Carousel Banner */}
          <div className="banner-v1 ng-star-inserted">
            <div className="carousel-wrap style-init mcd siblings">
              {carouselItems.map((img, index) => (
                <div key={index} className="item ng-star-inserted">
                  <div className="item-pic" style={{ backgroundImage: `url(${img})` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Marquee */}
          <div className="announcement-row">
            <div className="marquee">
              <ul>
                <li dangerouslySetInnerHTML={{
                  __html: `<p><span style="font-size:14px;">
                    <strong>🏏You are on Asia's trusted cricket trading...</strong>
                  </span></p>`
                }} />
              </ul>
            </div>
          </div>

          {/* Game Navigation */}
          <div className="nav nav-category ng-star-inserted nav-auto">
            {['SPORTS', 'CASINO', 'SLOTS', 'TABLE', 'CRASH', 'FISHING', 'ARCADE', 'LOTTERY'].map(tab => (
              <div 
                key={tab}
                className={`btn ${activeTab === tab ? 'selected' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <div className="icon">
                  <span className="item-icon" />
                </div>
                <p>{tab}</p>
              </div>
            ))}
          </div>

          {/* Scroll Banner */}
          <div className="recommend scroll-banner ng-star-inserted">
            <div className="recommend-title"><h2>Favourites</h2></div>
            <div className="recommend-main">
              {[/* Add image URLs */].map((img, index) => (
                <div key={index} className="recommend-card">
                  <img src={img} alt={`promo-${index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer ng-star-inserted">
          <div className="footer-top">
            {/* Payment Methods */}
            <div className="pay ng-star-inserted">
              <h2>Payment Methods</h2>
              <ul>
                {[16,17,22,33,34,45,46,59,60,61].map(n => (
                  <li key={n}>
                    <img src={`https://img.c88rx.com/cx/h5/assets/images/footer/color-black/pay${n}.png`} />
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Sponsors */}
            <div className="sponsor-ambassadors">
              {[1,2,3,4].map(n => (
                <div key={n} className="sponsor">
                  <img src={`https://img.c88rx.com/cx/h5/assets/images/footer/sponsor${n}.png`} />
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

