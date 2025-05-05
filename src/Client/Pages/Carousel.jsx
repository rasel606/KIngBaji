import React, { useState, useEffect, useRef } from 'react';

export default ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translate, setTranslate] = useState(0);
  const carouselRef = useRef(null);
  const itemWidth = 265.6;

  // Auto-rotate configuration
  const autoRotate = true;
  const rotateDelay = 5000;

  useEffect(() => {
    let interval;
    if (autoRotate) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % images.length);
      }, rotateDelay);
    }
    return () => clearInterval(interval);
  }, [images.length]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setTranslate(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const delta = translate;
    if (Math.abs(delta) > itemWidth / 4) {
      setActiveIndex(prev => 
        delta > 0 
          ? (prev - 1 + images.length) % images.length 
          : (prev + 1) % images.length
      );
    }
    setTranslate(0);
  };

  return (
    <div className="ng-star-inserted" id="mcd-carousel-banner-1">
      <div className="banner">
        <div className="banner-v1 ng-star-inserted">
          <div className="carousel-wrap style-init mcd siblings" 
               data-auto="true" 
               data-delay="500"
               ref={carouselRef}
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleMouseUp}>
            
            <div className="cdk-drag item-drag" 
                 style={{ transform: `translate3d(${-activeIndex * itemWidth + translate}px, 0, 0)` }}>
              <div className="item-left">
                <div className="item-wrap">
                  {images.map((img, idx) => (
                    <div key={idx} 
                         className="item ng-star-inserted" 
                         idx={idx}
                         message-id={idx + 1000}
                         style={{ width: `${itemWidth}px` }}>
                      <div className="item-pic ng-star-inserted" 
                           style={{ backgroundImage: `url(${img})` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ul className="dot-group style-bar">
              {images.map((_, idx) => (
                <li key={idx} 
                    href="#" 
                    value="4" 
                    idx={idx}
                    className={`ng-star-inserted ${activeIndex === idx ? 'active' : ''}`}>
                  <span className="dot-progress" 
                        style={{ animationDuration: `${rotateDelay}ms` }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

     
    </div>
  );
};

