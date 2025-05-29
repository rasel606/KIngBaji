import React, { useEffect, useRef } from 'react';

export default () => {
  const images = [
    "https://img.s628b.com/upload/h5Announcement/image_218846.jpg",
    "https://img.s628b.com/upload/h5Announcement/image_231401.jpg",
    "https://img.s628b.com/upload/h5Announcement/image_218523.jpg",
    "https://img.s628b.com/upload/h5Announcement/image_221809.jpg",
    "https://img.s628b.com/upload/h5Announcement/image_227293.jpg",
    "https://img.s628b.com/upload/h5Announcement/image_236835.png",
    "https://img.s628b.com/upload/h5Announcement/image_211169.jpg",
    "https://img.s628b.com/upload/h5Announcement/image_241498.jpg",
    "https://img.s628b.com/upload/h5Announcement/image_216168.jpg",
  ];

  const marqueeRef = useRef(null);
  const intervalRef = useRef(null);
  const positionRef = useRef(0);
  const itemWidthRef = useRef(0);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const wrapper = marquee.querySelector('.item-wrap');
    const firstItem = wrapper.querySelector('.item');
    if (!firstItem) return;

    // Get initial item width
    itemWidthRef.current = firstItem.offsetWidth;
    
    const moveSlider = () => {
      positionRef.current -= itemWidthRef.current;
      
      // Reset position when we've scrolled through all original images
      if (Math.abs(positionRef.current) >= itemWidthRef.current * images.length) {
        positionRef.current = 0;
        // Remove transition for instant reset
        wrapper.style.transition = 'none';
        wrapper.style.transform = `translateX(${positionRef.current}px)`;
        
        // Force reflow before adding transition back
        void wrapper.offsetWidth;
      }
      
      // Apply smooth transition
      wrapper.style.transition = 'transform 1s ease-in-out';
      wrapper.style.transform = `translateX(${positionRef.current}px)`;
    };

    // Start the auto-slide interval (5 seconds)
    intervalRef.current = setInterval(moveSlider, 5000);

    // Handle window resize
    const handleResize = () => {
      // Update item width on resize
      itemWidthRef.current = firstItem.offsetWidth;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [images.length]);

  return (
    <div className="banner">
      <div className="banner-v1" ref={marqueeRef}>
        <div className="carousel-wrap style-init mcd siblings" data-auto="true" data-delay="500">
          <div className="cdk-drag item-drag">
            <div className="item-left">
              <div className="item-wrap">
                {[...images, ...images].map((url, idx) => (
                  <div key={idx} className="item" style={{ width: "167.6px" }}>
                    <div
                      className="item-pic"
                      style={{ backgroundImage: `url("${url}")` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ul className="dot-group style-bar">
            {images.map((_, idx) => (
              <li key={idx}>
                <span className={`dot-progress ${idx === 0 ? "active" : ""}`} 
                      style={{ animationDuration: "5000ms" }}></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};