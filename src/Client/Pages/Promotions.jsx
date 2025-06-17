import React, { useState, useEffect } from "react";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";
import { GetAllBonuses } from "../Component/Axios-API-Service/AxiosAPIService";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();

  const {
    isAuthenticated,
    loginUser,
    logoutUser,
    userDeatils,
    birthday,
    userId,
    setBirthday,
    showPromoDetails, setShowPromoDetails
  } = useAuth();
  if (activeModal !== modalName) return null;
  const [activeTab, setActiveTab] = useState("all");

  const [selectedPromo, setSelectedPromo] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: "all", name: "অল" },
    { id: "slots", name: "স্লটস" },
    { id: "live-casino", name: "লাইভ ক্যাসিনো" },
    { id: "sport", name: "স্পোর্ট" },
    { id: "fishing", name: "ফিশিং" },
    { id: "card", name: "কার্ড" },
    { id: "esports", name: "E-sports" },
    { id: "lottery", name: "লটারি" },
    { id: "p2p", name: "P2P" },
    { id: "table", name: "টেবিল" },
    { id: "arcade", name: "আর্কেড" },
    { id: "cock-fight", name: "মোরগ লড়াই" },
    { id: "rain", name: "Rain" },
    { id: "crash", name: "ক্র্যাশ" },
  ];

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await GetAllBonuses();
        console.log(response.data.data);
        setPromotions(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching promotions:", err);
      }
    };

    fetchPromotions();
  }, []);
  const handlePromoClick = (promo) => {
    setSelectedPromo(promo);
    setShowPromoDetails(promo);
  };

  console.log("promotions", promotions);

  const closePromoDetails = () => {
    setShowPromoDetails(false);
    setSelectedPromo(null);
  };

  return (
    <div
      className="mcd-popup-page popup-page-wrapper active"
      onClick={() => closeModal()}
    >
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div
          className="popup-page__backdrop"
          onClick={() => closeModal()}
        ></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">প্রমোশন</div>
            <div
              className="popup-page-main__close"
              onClick={() => closeModal()}
            ></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style">
              <div className="content-main">
                <div className="content-box">
                  <div className="promotion">
                    <div className="tab search-tab">
                      <ul className="item-ani">
                        {tabs.map((tab) => (
                          <li
                            key={tab.id}
                            className={activeTab === tab.id ? "active" : ""}
                            onClick={() => setActiveTab(tab.id)}
                          >
                            {tab.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <form className="promo-code-form">
                      <div className="input-group">
                        <input
                          type="text"
                          maxLength="30"
                          placeholder="প্রোমো কোড"
                          className="password"
                        />
                        <div className="promo-code-add-btn">অ্যাড</div>
                      </div>
                    </form>

                    <div className="promotion-main">
                      <div className="promotion-list">
                        {promotions.map((promo) => (
                          <div
                            key={promo.id}
                            className="promotion-box new promotion-toggle"
                          >
                            <div className="pic">
                              <img
                                src={promo.image}
                                alt={promo.title}
                                loading="lazy"
                              />
                              <span className="item-bg"></span>
                            </div>
                            <div className="promotion-box-inner content-style">
                              <div className="text-main">
                                <h3>{promo.name}</h3>
                                <p>{promo.description}</p>
                              </div>
                              <div className="times">
                                <span className="item-icon"></span>
                                <span>{promo.createdAt}</span>
                              </div>
                              <div className="button-box">
                                {userDeatils ? (
                                  <div
                                    className="button button__joined active"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openModal("DepositModel");
                                    }}
                                  >
                                    <span>Apply Now</span>
                                  </div>
                                ) : (
                                  <div className="button button__apply"
                                   onClick={(e) => {
                                        e.stopPropagation();
                                        openModal("SingUpModal");
                                      }}
                                  >
                                    <span>
                                      Register Now
                                    </span>
                                  </div>
                                )}
                                <div
                                  className="button btn-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePromoClick(promo);
                                  }}
                                >
                                  <span>Detail</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="prompt">－পৃষ্ঠার শেষ－</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Details Dialog */}
      {/* {showPromoDetails && selectedPromo && (
        <div className="cdk-overlay-container">
          <div
            className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"
            onClick={() => closePromoDetails()}
          ></div>
          <div
            className="cdk-global-overlay-wrapper"
            dir="ltr"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div
              className="cdk-overlay-pane dialog-panel"
              style={{ position: "static" }}
            >
              <div className="popup" id="dialog-0">
                <div className="popup__content">
                  <div className="pop-wrap promotion-pop new show">
                    <a className="btn-close" onClick={()=>closePromoDetails()}>
                      <span className="item-icon"></span>
                    </a>
                    <div className="detail-banner">
                      <img
                        src={selectedPromo.image}
                        alt={selectedPromo.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="pop-title">
                      <h3>{selectedPromo.title}</h3>
                    </div>
                    <div className="pop-inner content-style">
                      <div>
                        <h2>
                          <span style={{ color: "#3498db" }}>
                            <strong>{selectedPromo.details.description}</strong>
                          </span>
                        </h2>

                        <h3>
                          <span style={{ color: "#e74c3c" }}>
                            <strong>কিভাবে যোগ দিতে হবে:</strong>
                          </span>
                        </h3>

                        <ul>
                          {selectedPromo.details.howToJoin.map(
                            (step, index) => (
                              <li key={index}>{step}</li>
                            )
                          )}
                        </ul>

                        <h3>
                          <span style={{ color: "#e74c3c" }}>
                            <strong>বোনাসের বিবরণ:</strong>
                          </span>
                        </h3>

                        <table>
                          <tbody>
                            {selectedPromo.details.bonusDetails.map(
                              (detail, index) => (
                                <tr key={index}>
                                  <th scope="row">{detail.label}</th>
                                  <td>{detail.value}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>

                        <h3>
                          <span style={{ color: "#e74c3c" }}>
                            <strong>শর্তাবলী ও নিয়মাবলি:</strong>
                          </span>
                        </h3>

                        <ul>
                          {selectedPromo.details.terms.map((term, index) => (
                            <li key={index}>{term}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};
