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
  const [showPopup, setShowPopup] = useState(true);
  const [activeTab, setActiveTab] = useState('Active');

  // Filter tickets based on the tab
  const filteredTickets = tickets.filter(ticket => ticket.status === activeTab);

  const toggleList = () => {
    setIsOpenTaggle(!isOpenTaggle);
  };

  const handleClose = () => {
    setShowPopup(false);
  };
  return (
    <div className="mcd-popup-page popup-page-wrapper active">
    <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
      <div className="popup-page__backdrop" onClick={handleClose}></div>
      
      <div className="popup-page__main popup-page-main popup-page-main--show">
        <div className="popup-page-main__header">
          <div className="popup-page-main__title">Turnover</div>
          <div className="popup-page-main__close" onClick={handleClose}></div>
        </div>

        <div className="popup-page-main__container">
          <div className="content mcd-style fixed-tab player-content">
            <div className="tab-btn-section">
              <div className="tab-btn tab-btn-page">
                <div 
                  className="line" 
                  style={{
                    width: '50%',
                    transform: `translate(${activeTab === 'active' ? 0 : 100}%, 0px)`
                  }}
                ></div>
                <button
                  className={`btn ${activeTab === 'active' ? 'active' : ''}`}
                  onClick={() => setActiveTab('active')}
                >
                  <div className="text">Active</div>
                </button>
                <button
                  className={`btn ${activeTab === 'completed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                  <div className="text">Completed</div>
                </button>
              </div>
            </div>

            <div className="tab-content">
              {activeTab === 'active' ? (
                <ul className="ticket-wrap">
                  <div className="no-result">
                    <div className="pic">
                      <img 
                        src="https://img.c88rx.com/cx/h5/assets/images/no-data.png?v=1742895464610" 
                        alt="no-data" 
                      />
                    </div>
                    <div className="text">No Data</div>
                  </div>
                </ul>
              ) : (
                <ul className="ticket-wrap">
                  <li className="ticket completed">
                    <div className="ticket-inner">
                      <div className="ticket-inner-left">
                        <div className="title">৩.৫০%+২% PG স্লট বোনাস</div>
                        <div className="detail">
                          <div className="date">Event ends in : 2025/02/13</div>
                          <div className="detail-btn">
                            <a>Detail</a>
                          </div>
                        </div>
                        <div className="discount">
                          <div className="amount">
                            <i>৳ 207.00</i>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="bar">
                            <div 
                              className="bar-inner" 
                              style={{ width: '100%' }}
                            ></div>
                          </div>
                          <div className="number">
                            <span>207</span>
                            <span>207</span>
                          </div>
                        </div>
                      </div>
                      <div className="ticket-inner-right">
                        <div className="text">
                          <span 
                            className="item-icon"
                            style={{
                              backgroundImage: 'url(https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-check-type01.svg?v=1742895464610)'
                            }}
                          ></span>
                          Completed
                        </div>
                      </div>
                    </div>
                    <div className="ticket-deco open-pop">
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
