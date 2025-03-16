import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { searchTransactionsbyUserId } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";
import { use } from "react";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
 const { isAuthenticated, loginUser,logout, logoutUser,verifyUserToken, verifyUser,token,userDeatils ,userId } =
     useAuth();
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

  const handleConfirm = async() => {
    const transactionRecord = await searchTransactionsbyUserId({userId})
    console.log(transactionRecord.data.transactionExists);
    setTransactions(transactionRecord.data.transactionExists); // Placeholder for dynamic data fetching
  };


  useEffect(() => {
    handleConfirm();
  }, [selectedStatus, selectedPaymentType, selectedDate,userDeatils.userId,token]);

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
            <div className="content">
              {/* <div className="searchpage">
                <div className="tab filter-tab">
                  <ul className="item-ani">
                    {["Today", "Yesterday", "Last 7 days"].map((tab) => (
                      <li
                        key={tab}
                        className={activeTab === tab ? "active" : ""}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </li>
                    ))}
                  </ul>
                  <div className="btn search-btn">
                    <span className="item-icon"></span>
                  </div>
                </div>
              </div> */}

              {/* <div className="searchpage-main">
                <div className="search-checkbox-group">
                  <h2>Status</h2>
                  <ul>
                    {["Processing", "Rejected", "Approved"].map((status) => (
                      <li key={status}>
                        <input
                          type="checkbox"
                          onChange={() => handleStatusChange(status)}
                        />
                        <label>{status}</label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="search-checkbox-group">
                  <h2>Payment Type</h2>
                  <ul>
                    {["Deposit", "Withdrawal", "Adjustment"].map((type) => (
                      <li key={type}>
                        <input
                          type="checkbox"
                          onChange={() => handlePaymentChange(type)}
                        />
                        <label>{type}</label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="search-checkbox-group">
                  <h2>Date</h2>
                  <ul>
                    {["Today", "Yesterday", "Last 7 days"].map((date) => (
                      <li key={date}>
                        <input
                          type="radio"
                          name="date"
                          checked={selectedDate === date}
                          onChange={() => handleDateChange(date)}
                        />
                        <label>{date}</label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="searchpage-bar">
                  <button className="button" onClick={handleConfirm}>
                    Confirm
                  </button>
                </div>
              </div> */}

              <div className="record-item item-title transaction-record-list">
                <div className="item type">Type</div>
                <div className="item amount">Amount</div>
                <div className="item status">Status</div>
                <div className="item time">Txn Date</div>
              </div>

              {transactions.length === 0 ? (
                <div className="no-result">
                  <div className="pic">
                    <img
                      src="https://img.c88rx.com/cx/h5/assets/images/no-data.png"
                      alt="no-data"
                    />
                  </div>
                  <div className="text">No Data</div>
                </div>
              ) : (
                transactions.map((transaction) => (
                  <div
                    className="record-item transaction-record-list"
                    key={transaction.id}
                  >
                    <div className="item type">{transaction.type === 0 ? "Deposit" : "Withdrawal"}</div>
                    <div className="item amount">{transaction.amount}</div>
                    <div className="item status">{transaction.status === 0 ? "Processing" : "Approved" || transaction.status === 1 ? "Approved" : "Rejected" || transaction.status === 2 ? "Rejected" : "Processing" }</div>
                    <div className="item time">{new Date(transaction.datetime).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
