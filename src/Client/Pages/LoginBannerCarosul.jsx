import React, { useEffect, useState } from "react";
import "./LoginCarosul.css";
export default ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel-wrap">
      <div className="carousel-frame-alpha__unit ">
        <div className="item-carousel-wrap ">
          <img src={images[currentIndex]} className="item-pic" alt="" />
        </div>
      </div>

      <div className="carousel-wrap-line">
        <div
          className="item-info"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {images.map((_, index) => (
            <div
              key={index}
              className={`item-title ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToNext(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
