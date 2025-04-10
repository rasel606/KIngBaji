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
    <mcd-carousel-banner className="ng-star-inserted" id="mcd-carousel-banner-1">
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

      {/* <style jsx global>{`
        .carousel-wrap {
          display: block;
          position: relative;
          width: auto;
          height: inherit;
          overflow: hidden;
          max-width: 100vw;
          margin: auto;
        }

        .carousel-wrap.style-init .item-drag .item-left {
          width: inherit;
          transform: translate(-250%, -50%);
        }

        .carousel-wrap.style-init .item-drag .item-wrap {
          width: inherit;
        }

        .carousel-wrap.style-init.siblings .item-drag .item-left {
          transform: translate(-175%, -50%);
        }

        .carousel-wrap.style-init.siblings .item-drag .item {
          width: 70%;
        }

        .carousel-wrap .item-drag {
          display: block;
          margin: auto;
          padding-top: 35%;
          width: 100%;
          height: 100%;
        }

        .carousel-wrap .item-drag .item-left {
          display: block;
          width: inherit;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 100%;
        }

        .carousel-wrap .item-drag .item-left .item-wrap {
          display: block;
          position: relative;
          height: 100%;
          white-space: nowrap;
          line-height: 0;
        }

        .carousel-wrap .item {
          display: inline-block;
          position: relative;
          padding: 2.6666666667vw 2.6666666667vw 9.3333333333vw;
          width: 100%;
          height: 100%;
          margin: auto;
          color: #221919;
          opacity: 1;
          overflow: hidden;
          border-radius: .8vw;
        }

        .carousel-wrap .item .item-pic {
          display: block;
          position: relative;
          margin: auto;
          height: 100%;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          transform-origin: center;
          transition: all .3s;
        }

        .carousel-wrap.siblings .item {
          padding: 1.3333333333vw 1.3333333333vw 3.4666666667vw;
        }

        .carousel-wrap.siblings .item .item-pic {
          border-radius: 1.3333333333vw;
        }

        .carousel-wrap.siblings .item .item-pic.focus {
          box-shadow: 0 .5333333333vw 3.2vw #00000059;
          transform: translateY(-2px);
        }

        .dot-group {
          display: flex;
          justify-content: center;
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          padding: .5333333333vw;
          z-index: 1;
        }

        .dot-group.style-bar li {
          display: block;
          margin: 0 .8vw;
          width: 5.3333333333vw;
          height: .5333333333vw;
          background: #ffffff80;
          border-radius: 1.3333333333vw;
          overflow: hidden;
          position: relative;
        }

        .dot-group.style-bar li.active .dot-progress {
          position: absolute;
          width: 100%;
          height: 100%;
          animation-name: dot-ani;
          background: #fff;
        }

        @keyframes dot-ani {
          0% { left: -100%; }
          100% { left: 0; }
        }
      `}</style> */}
    </mcd-carousel-banner>
  );
};

