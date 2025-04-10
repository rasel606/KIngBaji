import React, { useState, useEffect } from 'react';
// import './CenterMode.css';

export default ()=> {
    const images = [
        'https://img.c88rx.com/upload/registerH5Slider/image_207120.jpg',
        'https://img.c88rx.com/upload/registerH5Slider/image_207087.jpg',
        'https://img.c88rx.com/upload/registerH5Slider/image_207014.jpg',
        'https://img.c88rx.com/upload/registerH5Slider/image_207017.jpg',
        'https://img.c88rx.com/upload/registerH5Slider/image_207120.jpg',
        'https://img.c88rx.com/upload/registerH5Slider/image_207087.jpg',
        'https://img.c88rx.com/upload/registerH5Slider/image_207014.jpg',
        'https://img.c88rx.com/upload/registerH5Slider/image_207017.jpg'
      ];


  const [currentIndex, setCurrentIndex] = useState(2); // Starting index 2

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="banner">
      <div className="banner-v1">
        <div className="carousel-wrap style-init siblings">
          <div className="cdk-drag item-drag" style={{ transform: `translate3d(0, 0, 0)`,opacity:"1"}}>
            <div className="item-left">
              <div
                className="item-wrap"
                style={{ transform: `translate3d(${-(currentIndex * 100)}%, 0, 0)`}}
              >
                {images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`item-pic`}
                    style={{
                      
                      backgroundImage: `url(${image})`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ul className="dot-group style-bar">
          {images.map((_, idx) => (
            <li
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`ng-star-inserted ${idx === currentIndex ? 'active' : ''}`}
            >
              <span className="dot-progress" style={{ animationDuration: '3000ms' }}></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation buttons */}
      {/* <button className="button-prev" onClick={prevSlide}>
        <img src="path_to_prev_arrow_icon" alt="Prev" />
      </button>
      <button className="button-next" onClick={nextSlide}>
        <img src="path_to_next_arrow_icon" alt="Next" />
      </button> */}
    </div>
  );
}


