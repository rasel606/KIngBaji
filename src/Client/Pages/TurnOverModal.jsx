import React, { useEffect, useState } from "react";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import {
  GetCheckTurnoverEligibilityActive,
  GetCheckTurnoverEligibilityComplate,
} from "../Component/Axios-API-Service/AxiosAPIService";
import { useNavigate } from "react-router-dom";

export default ({ modalName }) => {
  const { userId } = useAuth();
  const { activeModal, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchTickets = async () => {
    if (activeModal !== modalName) return;

    setIsLoading(true);
    setError(null);

    try {
      const response =
        activeTab === "active"
          ? await GetCheckTurnoverEligibilityActive({ userId })
          : await GetCheckTurnoverEligibilityComplate({ userId });

      setTickets(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch tickets"
      );
      setTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [activeModal, activeTab, userId]);

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedTicket(null);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetails(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateProgress = (ticket) => {
    if (ticket.status === "completed") return 100;
    const progress =
      (ticket.completedTurnover / ticket.turnoverRequirement) * 100;
    return Math.min(100, Math.round(progress));
  };

  const renderTicketItem = (ticket) => (
    <li
      className={`ticket ${ticket.status}`}
      key={ticket._id}
      onClick={() => handleTicketClick(ticket)}
    >
      <div
        className="ticket-inner"
        style={{ color: ticket.status === "active" ? "#fff" : "#5081b7" }}
      >
        <div className="ticket-inner-left">
          <div
            className="title"
            style={{ color: ticket.status === "active" ? "#fff" : "#5081b7" }}
          >
            {ticket.bonusInfo.name}
          </div>
          <div className="detail">
            <div
              className="date"
              style={{ color: ticket.status === "active" ? "#fff" : "#5081b7" }}
            >
              {ticket.status === "active"
                ? `Event ends in: ${formatDate(ticket.expiryDate)}`
                : `Completed on: ${formatDate(ticket.updatedAt)}`}
            </div>
            <div
              className="detail-btn"
              style={{ borderColor: ticket.status === "active" ? "#fff" : "#5081b7" }}
            >
              <a
                style={{ color: ticket.status === "active" ? "#fff" : "#5081b7" }}
              >
                Detail
              </a>
            </div>
          </div>
          <div className="discount">
            <div className="amount">
              <i
                style={{
                  color: ticket.status === "active" ? "#fff" : "#5081b7",
                }}
              >
                ৳ {ticket.turnoverRequirement.toFixed(2)}
              </i>
            </div>
          </div>
          <div className="progress-bar">
            <div className="bar">
              <div
                className="bar-inner"
                style={{ width: `${calculateProgress(ticket)}%` }}
              ></div>
            </div>
            <div className="number">
              <span
                style={{
                  color: ticket.status === "active" ? "#fff" : "#5081b7",
                }}
              >
                {ticket.completedTurnover.toFixed(2)}
              </span>
              <span
                style={{
                  color: ticket.status === "active" ? "red" : "#5081b7",
                }}
              >
                {ticket.turnoverRequirement.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="ticket-inner-right">
          <div
            className="text"
            style={{ color: ticket.status === "active" ? "#fff" : "#5081b7" }}
          >
            <span
              className="item-icon"
              style={{
                backgroundImage: `url(${
                  ticket.status === "active"
                    ? ""
                    : "https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-check-type02.svg?v=1742895464610"
                })`,
              }}
            ></span>
            {(ticket.status === "active"
              ? "active"
              : "completed"
            ).toUpperCase()}
          </div>
        </div>
      </div>
      <div className="ticket-deco open-pop">
        <div className="line" ></div>
        <div className="line"></div>
      </div>
    </li>
  );

  if (activeModal !== modalName) return null;

  return (
    <div
      className="mcd-popup-page popup-page-wrapper active"
      onClick={closeModal}
    >
      <div
        className="popup-page show-toolbar popup-page--active popup-page--align-top"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-page__backdrop" onClick={closeModal}></div>

        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Turnover</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="popup-page-main__container">
            {showDetails && selectedTicket ? (
              <div className="content mcd-style player-content">   
                <div className="pop-wrap pop-check show ani">
                  <div className="btn-close" onClick={handleCloseDetails}>
                    <span
                      className="item-icon"
                      style={{
                        backgroundImage:
                          'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-cross-type01.svg?v=1742895464610")',
                      }}
                    ></span>
                  </div>

                  <div className="pop-title">
                    <h3>{selectedTicket.bonusInfo.name}</h3>
                  </div>

                  <div className="pop-inner content-style">
                    <div className="form-wrap">
                      <div className="arrow" style={{ opacity: 0.8 }}>
                        <span
                          className="item-icon"
                          style={{
                            backgroundImage:
                              'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-arrow-type01.svg?v=1742895464610")',
                          }}
                        ></span>
                      </div>

                      <div className="form-wrap-col">
                        <div>Transaction Amount</div>
                        <div>{selectedTicket.amount.toFixed(2)}</div>
                      </div>

                      <div className="form-wrap-col">
                        <div>Bonus</div>
                        <div>
                          {(
                            selectedTicket.amount *
                            (selectedTicket.bonusInfo.percentage / 100)
                          ).toFixed(2)}
                        </div>
                      </div>

                      <div className="form-wrap-col">
                        <div>Turnover Requirement</div>
                        <div>
                          {selectedTicket.turnoverRequirement.toFixed(2)}
                        </div>
                      </div>

                      <div className="form-wrap-col">
                        <div>Turnover Completed</div>
                        <div>{selectedTicket.completedTurnover.toFixed(2)}</div>
                      </div>

                      <div className="form-wrap-col">
                        <div>Completed Ratio</div>
                        <div>{calculateProgress(selectedTicket)}%</div>
                      </div>

                      <div className="form-wrap-col">
                        <div>Turnover Create Time</div>
                        <div>{formatDate(selectedTicket.createdAt)}</div>
                      </div>

                      {selectedTicket.status === "active" && (
                        <div className="form-wrap-col">
                          <div>Expiry Date</div>
                          <div>{formatDate(selectedTicket.expiryDate)}</div>
                        </div>
                      )}

                      {selectedTicket.status === "completed" && (
                        <div className="form-wrap-col">
                          <div>Completion Date</div>
                          <div>{formatDate(selectedTicket.updatedAt)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="content mcd-style fixed-tab player-content">
                <div className="tab-btn-section">
                  <div className="tab-btn tab-btn-page">
                    <div
                      className="line"
                      style={{
                        width: "50%",
                        transform: `translate(${
                          activeTab === "active" ? 0 : 100
                        }%, 0px)`,
                      }}
                    ></div>
                    <div
                      className={`btn ${
                        activeTab === "active" ? "active" : "completed"
                      }`}
                      onClick={() => setActiveTab("active")}
                    >
                      <div className="text">Active</div>
                    </div>
                    <div
                      className={`btn ${
                        activeTab === "completed" ? "active" : "completed"
                      }`}
                      onClick={() => setActiveTab("completed")}
                    >
                      <div className="text">Completed</div>
                    </div>
                  </div>
                </div>

                <div className="tab-content">
                  {isLoading ? (
                    <div className="loading-spinner">Loading...</div>
                  ) : error ? (
                    <div className="error-message">{error}</div>
                  ) : tickets.length === 0 ? (
                    <div className="no-result">
                      <div className="pic">
                        <img
                          src="https://img.c88rx.com/cx/h5/assets/images/no-data.png?v=1742895464610"
                          alt="no-data"
                        />
                      </div>
                      <div className="text">No Data Available</div>
                    </div>
                  ) : (
                    <ul className="ticket-wrap">
                      {tickets.map(renderTicketItem)}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
