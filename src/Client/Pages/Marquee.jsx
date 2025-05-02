import React, { useEffect, useRef } from 'react';


export default () => {
  const marqueeRef = useRef(null);
  
  // Dynamic content - could also be fetched from props or API
  const announcements = [
    {
      id: 1,
      content: ` মাত্র ৳১০০ দিয়ে 
                        
                          KingBaji
                          
                        -তে 👑 যোগদান করুন! 🎉 সব গেম খেলুন! প্রতিটি ডিপোজিটে
                        অতিরিক্ত নগদ + বিনামূল্যে স্পিন পান! সাইন আপ করুন এবং
                        এখনই জেতা শুরু করুন! 💵🔥`},
    // Add more announcements as needed
  ];

  useEffect(() => {
    // Marquee animation logic
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ul = marquee.querySelector('ul');
    if (!ul) return;

    let position = 0;
    const speed = 1; // Adjust speed as needed

    const animate = () => {
      position -= speed;
      if (position <= -ul.children[0].offsetWidth) {
        position = 0;
      }
      ul.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="announcement-row">
      <div className="item-icon"></div>
      <div className="marquee" ref={marqueeRef}>
        <ul style={{ display: 'flex', width: 'fit-content' }}>
          {announcements.map((announcement) => (
            <li key={announcement.id} className="ng-star-inserted" style={{}}>
              <span>
                <p>
                  <span style={{ color: '#e74c3c' }}>
                    <span style={{ fontSize: '14px' }}>
                      <strong>{announcement.content}</strong>
                    </span>
                  </span>
                </p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

