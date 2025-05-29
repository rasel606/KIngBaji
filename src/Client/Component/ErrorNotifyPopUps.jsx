import React from "react";
import { Link } from "react-router-dom";

export default ({showAmountLimit, setShowAmountLimit,title}) => {


console.log(showAmountLimit, setShowAmountLimit)
    
  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing">
        <div
          className="cdk-global-overlay-wrapper"
          dir="ltr"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            id="cdk-overlay-2"
            className="cdk-overlay-pane dialog-panel"
            style={{ position: "static" }}
          >
            <div className="popup" id="dialog-2">
              <div className="popup__header"></div>
              <div className="popup__content">
                <div
                  class="menu-mask"
                  style={{ display: showAmountLimit ? "block" : "none" }}
                  onClick={() => setShowAmountLimit(false)}
                ></div>
                <div
                  class="pop-bg"
                  style={{ display: showAmountLimit ? "block" : "none" }}
                  onClick={() => setShowAmountLimit(false)}
                ></div>
                <div className="pop-wrap ani show">
                  {/* {title && <h2 className="popup-title">{title}</h2>} */}
                  <Link
                    className="btn-close"
                    onClick={() => setShowAmountLimit(false)}
                  >
                    <span
                      className="item-icon"
                      style={{
                        backgroundImage:
                          "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg)",
                      }}
                    />
                  </Link>
                  <div className="pop-title">
                    <h3> {title}</h3>
                  </div>
                  <div className="pop-inner content-style">
                    <p>
                      {/* আপনাকে লগইন করতে হবে খেলার জন্য <br />
            যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের
            সাথে। এটা একেবারেই <b>ফ্রী!</b> */}
                      {"Sorry! your amount Invalid. Please enter amount between ৳ 300 and ৳ 25,000."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
