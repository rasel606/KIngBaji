import React, { useEffect, useState } from "react";
import { useModal } from "../Component/ModelContext";
import { searchTransactionsbyUserId } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";

const TransactionRecordsModal = ({ modalName }) => {
  const { activeModal, closeModal } = useModal();
  const { userId } = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    paymentType: [],
    date: "today",
  });
  const [transactions, setTransactions] = useState([]);

  const statusOptions = ["Processing", "Rejected", "Approved"];
  const paymentTypeOptions = ["Deposit", "Withdrawal", "Adjustment"];
  const dateOptions = ["today", "yesterday", "last7Days"];

  const [activeTab, setActiveTab] = useState("Today");
  const tabs = ["Today", "Yesterday", "This Week"];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const fetchTransactions = async () => {
    try {
      const response = await searchTransactionsbyUserId({
        userId,
        filters,
      });
      setTransactions(response.data.transactionExists || []);
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
                  selected={filters.paymentType}
                  onChange={(val) => handleFilterChange("paymentType", val)}
                />

                <FilterGroup
                  title="তারিখ"
                  type="radio"
                  options={dateOptions}
                  selected={filters.date}
                  onChange={(val) => handleFilterChange("date", val)}
                />
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

              <div className="record-item item-title">
                <div className="item type">প্রকার</div>
                <div className="item amount">পরিমাণ</div>
                <div className="item status">স্ট্যাটাস</div>
                <div className="item time">তারিখ</div>
              </div>

              {transactions.length === 0 ? (
                <NoData />
              ) : (
                transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))
              )}
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
        <li key={option}>
          <input
            type={type}
            name={title}
            checked={
              type === "radio" ? selected === option : selected.includes(option)
            }
            onChange={() => onChange(option)}
          />
          <label>{option}</label>
        </li>
      ))}
    </ul>
  </div>
);

const TransactionItem = ({ transaction }) => {
  const getStatus = () => {
    switch (transaction.status) {
      case 0:
        return "প্রক্রিয়াধীন";
      case 1:
        return "অনুমোদিত";
      case 2:
        return "প্রত্যাখ্যাত";
      default:
        return "অজানা";
    }
  };

  return (
    <div className="record-item">
      <div className="item type">
        {transaction.type === 0 ? "ডিপোজিট" : "উত্তোলন"}
      </div>
      <div className="item amount">৳{transaction.amount}</div>
      <div className="item status">{getStatus()}</div>
      <div className="item time">
        {new Date(transaction.datetime).toLocaleDateString("bn-BD", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

const NoData = () => (
  <div className="no-result">
    <div className="pic">
      <img
        src="https://img.c88rx.com/cx/h5/assets/images/no-data.png"
        alt="no-data"
      />
    </div>
    <div className="text">কোনো ডাটা পাওয়া যায়নি</div>
  </div>
);

export default TransactionRecordsModal;
