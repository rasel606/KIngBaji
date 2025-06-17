import { useEffect, useRef } from "react";

// PromotionDetailsPopUp.js
export default ({ showPromoDetails, setShowPromoDetails }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPromoDetails(null);
      }
    };

    if (showPromoDetails) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPromoDetails, setShowPromoDetails]);

  if (!showPromoDetails) return null;

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Generate the details HTML based on the promotion data
  const generateDetailsHTML = (promo) => {
    return `
      <h3><span style="color:#3498db;"><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;"><strong> ${promo.name}</strong></span></span></span></h3>

      <p><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">${promo.description}</span></span></p>

      <h3><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="color:#e74c3c;"><span style="font-size:14px;"><strong>Promotion Details:</strong></span></span></span></h3>

      <table style="width:100%; max-width:400px; border-collapse: collapse; margin: 10px 0;">
        <tbody>
          <tr>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; ">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Bonus Type</span></span>
            </th>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">${promo.bonusType.charAt(0).toUpperCase() + promo.bonusType.slice(1)} Bonus</span></span>
            </td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Bonus Percentage</span></span>
            </th>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">${promo.percentage}%</span></span>
            </td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; ">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Minimum Deposit</span></span>
            </th>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">৳${promo.minDeposit}</span></span>
            </td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; ">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Wagering Requirement</span></span>
            </th>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">${promo.wageringRequirement}x</span></span>
            </td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; ">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Valid For</span></span>
            </th>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">${promo.validDays} days</span></span>
            </td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; ">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Eligible Games</span></span>
            </th>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">${promo.eligibleGames[0] === 'all' ? 'All Games' : promo.eligibleGames.join(', ')}</span></span>
            </td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; ">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Promotion Period</span></span>
            </th>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">${formatDate(promo.startDate)} to ${formatDate(promo.endDate)}</span></span>
            </td>
          </tr>
        </tbody>
      </table>

      <h3><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="color:#e74c3c;"><span style="font-size:14px;"><strong>Terms & Conditions:</strong></span></span></span></h3>

      <ul>
        <li><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Players must meet ${promo.wageringRequirement}x turnover requirement to transfer or withdraw the bonus.</span></span></li>
        <li><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Minimum deposit of ৳${promo.minDeposit} required to qualify for this promotion.</span></span></li>
        <li><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">The bonus must be used within ${promo.validDays} days of being credited.</span></span></li>
        
        <li><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Only one account per player is allowed.</span></span></li>
        <li><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Players found opening multiple or fraudulent accounts will be disqualified from the promotion.</span></span></li>
        <li><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">The casino reserves the right to modify, alter, or cancel this promotion at its discretion.</span></span></li>
        <li><span style="font-family:Lucida Sans Unicode,Lucida Grande,sans-serif;"><span style="font-size:14px;">Standard <a href="/terms-and-conditions">Terms & Conditions</a> apply.</span></span></li>
      </ul>
    `;
  };

  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"></div>
      <div className="cdk-global-overlay-wrapper">
        <div className="cdk-overlay-pane dialog-pane">
          <div className="popup" ref={popupRef}>
            <div className="popup__header">
              <div className="popup__close"></div>
              <div className="popup">
                <div className="popup__content">
                  <div className="pop-wrap promotion-pop new ani show">
                    <a 
                      className="btn-close" 
                      onClick={() => setShowPromoDetails(null)}
                    >
                      <span 
                        className="item-icon" 
                        style={{backgroundImage: "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1749551549998)"}}
                      ></span>
                    </a>
                    <div className="detail-banner">
                      {/* You can add a default image or use promo-specific images if available */}
                      {/* <img 
                        src="https://img.s628b.com/upload/h5Announcement/image_219729.jpg" 
                        alt={showPromoDetails.name} 
                        loading="lazy" 
                      /> */}
                    </div>
                    <div className="pop-title">
                      <h3>{showPromoDetails.name}</h3>
                    </div>
                    <div className="pop-inner content-style">
                      <div dangerouslySetInnerHTML={{ __html: generateDetailsHTML(showPromoDetails) }} />
                    </div>
                  </div>
                  <div className="pop-bg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};