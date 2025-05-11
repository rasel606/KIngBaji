import React, { useEffect, useState } from "react";
import { useModal } from "../Component/ModelContext";
import { searchTransactionsbyUserId } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";

export default ({ modalName }) => {
  const { activeModal, closeModal } = useModal();
  const { userId, userDeatils } = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const statusOptions = [
    { label: "Processing", value: 0 },
    { label: "Approved", value: 1 },
    { label: "Rejected", value: 2 },
  ];
  const paymentTypeOptions = [
    { label: "Deposit", value: 0 },
    { label: "Withdrawal", value: 1 },
    { label: "Adjustment", value: 2 },
  ];
  const dateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "last7days" }, // Match backend's 'last7days'
  ];

  // const [activeTab, setActiveTab] = useState("Today");

  const [filters, setFilters] = useState({
    status: [0],
    type: [0],
    date: "today",
  });

  console.log(filters);
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "date") {
        return { ...prev, date: value };
      }

      // Toggle array values for multi-select
      return {
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter((v) => v !== value)
          : [...prev[filterType], value],
      };
    });
  };
  const tabs = [filters.date];
  const fetchTransactions = async () => {
    try {
      console.log(filters);
      const response = await searchTransactionsbyUserId({
        params: {
          userId,
          filters,
        },
      });
      console.log(response.data.data);
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    if (activeModal === modalName) {
      fetchTransactions();
    }
  }, [activeModal, filters, userId]);

  const [activeTab, setActiveTab] = useState("timeline");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
  };

  if (activeModal !== modalName) return null;

  return (
    <div className="popup-page-wrapper active" onClick={closeModal}>
      <div
        className="popup-page show-toolbar popup-page--active popup-page--align-top"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">লেনদেনের রেকর্ড</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="content mcd-style player-content">
            <div className="transaction-records">
              {/* Filter Tab */}
              <div className={`searchpage ${isFilterOpen ? "active" : ""}`}>
                <div className="search-top-info">
                  <div className="back" onClick={() => setIsFilterOpen(false)}>
                    <span className="item-icon"></span>
                    পিছনে
                  </div>
                  <input type="text" placeholder="লেনদেন ফিল্টার" disabled />
                </div>

                <div className="searchpage-main">
                  <FilterGroup
                    title="স্ট্যাটাস"
                    type="checkbox"
                    options={statusOptions}
                    selected={filters.status}
                    onChange={(val) => handleFilterChange("status", val)}
                  />

                  <FilterGroup
                    title="লেনদেন প্রকার"
                    type="checkbox"
                    options={paymentTypeOptions}
                    selected={filters.type}
                    onChange={(val) => handleFilterChange("type", val)}
                  />

                  <FilterGroup
                    title="তারিখ"
                    type="radio"
                    options={dateOptions}
                    selected={filters.date}
                    onChange={(val) => handleFilterChange("date", val)}
                  />
                  <div class="searchpage-bar active" onClick={()=>setIsFilterOpen(false)}>
                    <button class="button"> Confirm </button>
                  </div>
                </div>

                <div className="searchpage-bar">
                  <button
                    className="button"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    প্রয়োগ করুন
                  </button>
                </div>
              </div>

              <div className="transaction-container">
                <div
                  className="filter-header"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <div className="tab filter-tab">
                    <ul className="item-ani">
                      {tabs.map((tab) => (
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
                </div>
              </div>

              {/* Transaction List Header */}
              <div className="record-item item-title transaction-record-list">
                <div className="item type">Type</div>
                <div className="item amount">Amount</div>
                <div className="item status">Status</div>
                <div className="item time">Txn Date</div>
              </div>

              {/* Transaction List */}
              {transactions.map((tnxDate) => (
                <div className="list list-betting-record">
                  <div className="date-title">
                    <div className="date">
                      <span className="item-icon calendar-icon"></span>{" "}
                      {tnxDate.date}
                    </div>
                    <div className="time-zone">GMT+6</div>
                  </div>

                  <div className="list-content">
                    {tnxDate.transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="record-item transaction-record-list no-detail-info"
                        onClick={() => handleTransactionClick(tx)}
                      >
                        {console.log(tx)}
                        <div className="item type">
                          {tx.type === 0 ? "Deposit" : "Withdrawal"}
                        </div>
                        <div className="item amount">
                          <i>{tx.base_amount}</i>
                        </div>
                        <div
                          className={`item status ${
                            tx.status === 0
                              ? "pending"
                              : tx.type === 1
                              ? "positive"
                              : tx.type === 2
                              ? "negative"
                              : "revert"
                          }`}
                        >
                          {console.log(tx.type)}
                          <div className="tags">
                            {tx.status === 0
                              ? "pending"
                              : parseInt(tx.type) === 1
                              ? "accepted"
                              : parseInt(tx.type) === 2
                              ? "rejected"
                              : "adjustment"}
                          </div>
                        </div>
                        <div className="item time">
                          {new Date(tx.datetime)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, " : ")}
                        </div>
                        <div className="list-arrow"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Transaction Details Popup */}
              {showDetails && selectedTransaction && (
                <div className="pop-transaction-records-details active">
                  <div
                    className="pop-bg"
                    onClick={() => setShowDetails(false)}
                  ></div>

                  <div className="details-content">
                    <div className="bank-name">
                      <img
                        src="https://img.j189eb.com/jb/h5/assets/images/payment/bkash.png"
                        alt="bkash"
                      />
                      <span>bKash</span>
                    </div>

                    <a
                      className="btn-closed"
                      onClick={() => setShowDetails(false)}
                    ></a>

                    <div className="header">Transaction Record Details</div>

                    <div
                      className={`content pop-content ${selectedTransaction.status}`}
                    >
                      {/* Tab Buttons */}
                      <div className="tab-btn-section tab-btn-wrap">
                        <div className="tab-btn tab-btn-bar">
                          <div
                            className="line"
                            style={{
                              width: "50%",
                              transform:
                                activeTab === "timeline"
                                  ? "translate(0%, 0px)"
                                  : "translate(100%, 0px)",
                            }}
                          ></div>

                          <div
                            className={`btn ${
                              activeTab === "timeline" ? "current" : ""
                            }`}
                            onClick={() => setActiveTab("timeline")}
                          >
                            <img
                              className="icon"
                              src="https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-timeline.svg"
                              alt="icon-timeline"
                            />
                          </div>

                          <div
                            className={`btn ${
                              activeTab === "details" ? "current" : ""
                            }`}
                            onClick={() => setActiveTab("details")}
                          >
                            <img
                              className="icon"
                              src="https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-table.svg"
                              alt="icon-table"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tab Content */}
                      <div className="tab-content tab-content-page">
                        <div
                          className="inner-wrap"
                          style={{
                            transform:
                              activeTab === "timeline"
                                ? "translate(0%, 0px)"
                                : "translate(-100%, 0px)",
                          }}
                        >
                          {/* Timeline Tab */}
                          <div
                            className={`inner-box ${
                              activeTab === "timeline" ? "current" : ""
                            }`}
                            style={{ height: "auto" }}
                          >
                            <div className="transaction-details-wrap">
                              <div className="title">
                                <h3>Transaction Progress</h3>
                                <div className="tags">
                                  {selectedTransaction.status === 0
                                    ? "Pending"
                                    : selectedTransaction.status === 1
                                    ? "Accept"
                                    : selectedTransaction.status === 2
                                    ? "Reject"
                                    : "Unknown"}
                                </div>
                              </div>

                              <div className="timeline-box">
                                {/* {selectedTransaction.timeline.map(
                                  (event, index) => ( */}
                                <React.Fragment>
                                  <div className="date">
                                    {selectedTransaction.date}
                                  </div>

                                  <div className={`timeline-block`}>
                                    <div className={`point `}>
                                      <span
                                        className="item-icon"
                                        style={{
                                          maskImage: `url(${
                                            selectedTransaction.status === 0
                                              ? "https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-pending-type05.svg"
                                              : selectedTransaction.status === 1
                                              ? "https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-check-type06.svg"
                                              : "https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-cross-type07.svg"
                                          })`,
                                          display: "block",
                                          opacity: "1",
                                        }}
                                      ></span>
                                    </div>

                                    <div
                                      className="content"
                                      style={{
                                        animation: `1s ease ${
                                          0.2 * 0.1
                                        }s 1 normal none running slide`,
                                      }}
                                    >
                                      <div className="text">
                                        Your Deposit Has been{" "}
                                        {selectedTransaction.status === 0
                                          ? "Pending"
                                          : selectedTransaction.status === 1
                                          ? "Accept"
                                          : selectedTransaction.status === 2
                                          ? "Reject"
                                          : "Unknown"}
                                      </div>
                                      <div className="time">
                                        {new Date(
                                          selectedTransaction.updatetime
                                        ).toLocaleTimeString("en-GB")}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`timeline-block`}>
                                    <div className={`point `}>
                                      <span
                                        className="item-icon"
                                        style={{
                                          maskImage: `url(${
                                            selectedTransaction.status === 0
                                              ? "https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-pending-type05.svg"
                                              : selectedTransaction.status === 1
                                              ? "https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-check-type06.svg"
                                              : "https://img.j189eb.com/jb/h5/assets/images/icon-set/icon-cross-type07.svg"
                                          })`,
                                          display: "block",
                                          opacity: "1",
                                        }}
                                      ></span>
                                    </div>

                                    <div
                                      className="content"
                                      style={{
                                        animation: `1s ease ${
                                          0.2 * 0.1
                                        }s 1 normal none running slide`,
                                      }}
                                    >
                                      <div className="text">
                                        Your Deposit Seen{" "}
                                        {selectedTransaction.status === 0
                                          ? "Pending"
                                          : selectedTransaction.status === 1
                                          ? "Accept"
                                          : selectedTransaction.status === 2
                                          ? "Reject"
                                          : "Unknown"}
                                      </div>
                                      <div className="time">
                                        {new Date(
                                          selectedTransaction.updatetime
                                        ).toLocaleTimeString("en-GB")}
                                      </div>
                                    </div>
                                  </div>
                                </React.Fragment>
                                {/* ) */}
                                {/* )} */}
                              </div>
                            </div>
                          </div>

                          {/* Details Tab */}
                          <div
                            className={`inner-box ${
                              activeTab === "details" ? "current" : ""
                            }`}
                            style={{ height: "auto" }}
                          >
                            <div className="transaction-details-wrap">
                              <div className="title">
                                <h3>Transaction Record Details</h3>
                                <div className="tags">
                                  {selectedTransaction.status === 0
                                    ? "Pending"
                                    : selectedTransaction.status === 1
                                    ? "Accept"
                                    : selectedTransaction.status === 2
                                    ? "Reject"
                                    : "Unknown"}
                                </div>
                              </div>

                              <div className="details-box">
                                <div className="info">
                                  <div className="name">No.</div>
                                  <div className="value">
                                    {selectedTransaction._id}
                                  </div>
                                </div>

                                <div className="info">
                                  <div className="name">Type</div>
                                  <div className="value">
                                    {selectedTransaction.type === 0
                                      ? "Deposit"
                                      : selectedTransaction.type === 1
                                      ? "Withdrawal"
                                      : "transfer"}
                                  </div>
                                </div>

                                <div className="info">
                                  <div className="name">Payment Method</div>
                                  <div className="value">
                                    {selectedTransaction.gateway_name}
                                  </div>
                                </div>

                                <div className="info">
                                  <div className="name">Payment Type</div>
                                  <div className="value">
                                    {selectedTransaction.type === 0
                                      ? "sendMoney"
                                      : selectedTransaction.type === 1
                                      ? "cashout"
                                      : selectedTransaction.type === 2
                                      ? "payment"
                                      : "transfer"}
                                  </div>
                                </div>

                                <div className="info">
                                  <div className="name">Bank Name</div>
                                  <div className="value">
                                    {selectedTransaction.gateway_name}
                                  </div>
                                </div>

                                <div className="info">
                                  <div className="name">Amount</div>
                                  <div className="value">
                                    <i>
                                      {selectedTransaction.currency}
                                      {selectedTransaction.base_amount}
                                    </i>
                                  </div>
                                </div>

                                <div className="info">
                                  <div className="name">Reference No.</div>
                                  <div className="value">
                                    {selectedTransaction.transactionID}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="member-content">
                      <div id="txn-submitMissingTrx" className="button">
                        <a>Submit Missing Transaction</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="prompt">－end of page－</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterGroup = ({ title, type, options, selected, onChange }) => (
  <div className="search-checkbox-group">
    <h2>{title}</h2>
    <ul>
      {options.map((option) => (
        <li key={option.value} onClick={() => onChange(option.value)}>
          {/* Use value as key */}
          <input
            type={type}
            name={title}
            checked={
              type === "radio"
                ? selected === option.value
                : selected.includes(option.value)
            }
          />
          <label>{option.label}</label> {/* Render label property */}
        </li>
      ))}
    </ul>
  </div>
);
