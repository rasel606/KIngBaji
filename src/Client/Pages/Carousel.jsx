import React, { useEffect, useRef, useState } from "react";
import "../Component/SideBar.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default () => {
  const images = [
    "https://i.ibb.co.com/DChN5S5/img-1.jpg",
    "https://i.ibb.co.com/VqtD7Tq/img-2.jpg",
    "https://i.ibb.co.com/7Kkr63k/img-3.jpg",
    "https://i.ibb.co.com/LQB0VW7/img-4.jpg",
    "https://i.ibb.co.com/gdQVX9d/image-5.jpg",
  ];

  // const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWrapRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  let sliderRef = useRef(null);
  const play = () => {
    sliderRef.slickPlay();
  };
  const pause = () => {
    sliderRef.slickPause();
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    dots: true,
    autoplaySpeed: 2000,
    
  };

  return (

        <div >
          <div style={{ overflow: "hidden",height:"100px",width:"100%",background:"#4C086C" }}>
            <div className="cdk-drag item-drag">
              <div className="item-left">
                <div className="slider-container" >
                  <Slider ref={slider => (sliderRef = slider)} {...settings}>
                    {images.map((image, idx) => (
                      <div
                        key={idx}
                        className={`item ${idx === currentIndex ? "active" : ""}`}
                      >
                        <div className="item-pic" >
                          <img src={image} alt="" style={{height:"auto",width:"100%",borderRadius:"10px",padding:"5px"}}/>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

          <ul className="dot-group style-bar">
          <Slider ref={slider => (sliderRef = slider)} {...settings}>
            {images.map((_, index) => (
              <li
                key={index}
                className={index === currentIndex ? "active" : ""}
                
              >
                <span
                  className="dot-progress"
                  style={{ animationDuration: "3000ms" }}
                ></span>
              </li>
            ))}
            </Slider>
          </ul>
        </div>
      
  );
};
