import React, { useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default ({ showAmountLimit, setShowAmountLimit, title }) => {
  const navigate = useNavigate();
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowAmountLimit(false);
      }
    };

    if (showAmountLimit) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAmountLimit, setShowAmountLimit]);

  if (!showAmountLimit) return null;

  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"></div>
      <div className="cdk-global-overlay-wrapper">
        <div className="cdk-overlay-pane dialog-pane">
          <div className="popup" ref={popupRef}>
            <div className="popup__header" onClick={() => navigate(-1)}>
              <div
                className="popup__close"
                onClick={() => setShowAmountLimit(false)}
              ></div>
            </div>

            <div className="popup-content">
              <div
                className="pop-bg"
                onClick={() => setShowAmountLimit(false)}
              />
              {/* <div
                class="menu-mask"
                style={{ display: showAmountLimit ? "block" : "none" }}
                onClick={() => setShowAmountLimit(false)}
              ></div> */}
              {/* {isLoginNotify === true && ( */}
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
                    যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ
                    করুন আমাদের সাথে। এটা একেবারেই <b>ফ্রী!</b> */}
                    {/* {massages} */}
                    {showAmountLimit}
                  </p>
                </div>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
