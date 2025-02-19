import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
  const [isOpenTaggle, setIsOpenTaggle] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 565095842,
      title: '৩.৫০%+২% PG স্লট বোনাস',
      date: '2025/02/13',
      amount: '৳ 207.00',
      progress: 100,
      status: 'Completed',
    },
    // Add more ticket objects here as needed
  ]);

  const [activeTab, setActiveTab] = useState('Active');

  // Filter tickets based on the tab
  const filteredTickets = tickets.filter(ticket => ticket.status === activeTab);

  const toggleList = () => {
    setIsOpenTaggle(!isOpenTaggle);
  };
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">My wallet</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style fixed-tab player-content">
              <div className="tab-btn-section">
                <div className="tab-btn tab-btn-page">
                  <div
                    className="line"
                    style={{
                      width: "calc(50%)",
                      transform:
                        activeTab === "Active"
                          ? "translate(0%, 0px)"
                          : "translate(100%, 0px)",
                    }}
                  ></div>
                  <div
                    className={`btn ${activeTab === "Active" ? "active" : ""}`}
                    onClick={() => setActiveTab("Active")}
                  >
                    <div className="text">Active</div>
                  </div>
                  <div
                    className={`btn ${
                      activeTab === "Completed" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Completed")}
                  >
                    <div className="text">Completed</div>
                  </div>
                </div>
              </div>

              <div className="ng-trigger-tabPageTriggerAni">
                <ul className="ticket-wrap">
                  {filteredTickets.length === 0 ? (
                    <div className="no-result">
                      <div className="pic">
                        <img
                          src="https://img.c88rx.com/cx/h5/assets/images/no-data.png?v=1739269017539&source=mcdsrc"
                          alt="no-data"
                          loading="lazy"
                        />
                      </div>
                      <div className="text">No Data</div>
                    </div>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <li
                        key={ticket.id}
                        className={`ticket ${ticket.status.toLowerCase()}`}
                      >
                        <div className="ticket-inner">
                          <div className="ticket-inner-left">
                            <div className="title">{ticket.title}</div>
                            <div className="detail">
                              <div className="date">
                                Event ends in : {ticket.date}
                              </div>
                              <div className="detail-btn">
                                <a href="#">Detail</a>
                              </div>
                            </div>
                            <div className="discount">
                              <div className="amount">
                                <i>{ticket.amount}</i>
                              </div>
                            </div>
                            <div className="progress-bar">
                              <div className="bar">
                                <div
                                  className="bar-inner"
                                  style={{ width: `${ticket.progress}%` }}
                                ></div>
                              </div>
                              <div className="number">
                                <span>{ticket.progress}</span>
                                <span>{ticket.progress}</span>
                              </div>
                            </div>
                          </div>
                          <div className="ticket-inner-right">
                            <div className="text">
                              <span
                                className="item-icon"
                                style={{
                                  backgroundImage:
                                    'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-check-type01.svg?v=1739269017539")',
                                }}
                              ></span>
                              {ticket.status}
                            </div>
                          </div>
                        </div>
                        <div className="ticket-deco open-pop">
                          <div className="line"></div>
                          <div className="line"></div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
