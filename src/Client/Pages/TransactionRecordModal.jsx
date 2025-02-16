import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState([]);
  const [selectedDate, setSelectedDate] = useState("আজ");
  const [transactions, setTransactions] = useState([]);

  const handleStatusChange = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  const handlePaymentChange = (type) => {
    setSelectedPaymentType((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    // Fetch or filter transaction data based on selected filters
    setTransactions([]); // Placeholder for dynamic data fetching
  };



  const [activeTab, setActiveTab] = useState("আজ");
  const tabs = ["আজ", "আগামীকাল", "এই সপ্তাহ"];

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Transaction Record</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="content mcd-style player-content">
            <div className="searchpage">
            <div className="ng-tns-c2862789022-5 ng-trigger ng-trigger-staggerFadeAnimation tab filter-tab ng-star-inserted">
      <ul className="item-ani ng-tns-c2862789022-5">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`ng-tns-c2862789022-5 ng-star-inserted ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="btn search-btn ng-tns-c2862789022-5 ng-star-inserted">
        <span
          className="item-icon ng-tns-c2862789022-5 ng-star-inserted"
          style={{
            backgroundImage: "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/games-filter-icon.svg?v=1737700422219)",
            // WebkitMaskImage: "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/games-filter-icon.svg?v=1737700422219)",
          }}
        ></span>
      </div>
    </div>
            </div>


            <div className="record-item item-title transaction-record-list">
              <div className="item type">টাইপ</div>
              <div className="item amount">এমাউন্ট</div>
              <div className="item status">স্ট্যাটাস</div>
              <div className="item time">Txn তারিখ</div>
            </div>

            {transactions.length === 0 ? (
              <div className="no-result">
                <div className="pic">
                  <img
                    src="https://img.c88rx.com/cx/h5/assets/images/no-data.png"
                    alt="no-data"
                  />
                </div>
                <div className="text">কোনও ডেটা নেই</div>
              </div>
            ) : (
              <div>{/* Render transaction data here */}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
