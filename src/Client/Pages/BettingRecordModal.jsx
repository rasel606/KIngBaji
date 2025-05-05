import React, { useEffect, useState } from "react";
import { useModal } from "../Component/ModelContext";
import { GetBettingHistoryByMember, searchTransactionsbyUserId } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";

export default ({ modalName }) => {
  const { activeModal, closeModal } = useModal();
  const { userId } = useAuth();

 

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    gameTypes: [],
    platforms: [],
    date: "today",
  });
  const [transactions, setTransactions] = useState([]);

  // const statusOptions = ["Processing", "Rejected", "Approved"];
  // const paymentTypeOptions = ["Deposit", "Withdrawal", "Adjustment"];
  const dateOptions = ["today", "yesterday", "last7Days"];

  const [activeDayTab, setActiveDayTab] = useState("Today");
  const tabs = ["today", "yesterday", "last7Days"];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };
  const [activeTab, setActiveTab] = useState("settled");
  // const [showFilter, setShowFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState("last7days");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedGameTypes, setSelectedGameTypes] = useState([]);
  const [records, setRecords] = useState([]);
  const [showRecordDetails, setShowRecordDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const fetchTransactions = async () => {
    try {
      const response = await GetBettingHistoryByMember(
         {
          range: filters.date,
          member: userId,
          product: selectedPlatforms || ""
        }
      );
      console.log(response.data.data.summary);
      setRecords(response.data.data.summary|| []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setRecords([]);
    }
  };

  useEffect(() => {
    if (activeModal === modalName) {
      fetchTransactions();
    }
  }, [activeModal, filters, userId]);



  const platforms = ["Evolution", "Pragmatic", "Ezugi", "SexyBaccarat"];
const gameTypes = ["Slot", "Live Casino", "Sportsbook", "Table"];


  useEffect(() => {
    if (activeModal === modalName) {
      fetchTransactions();
    }
  }, [activeModal, filters, userId]);

  if (activeModal !== modalName) return null;
  // Sample data


  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const toggleGameType = (gameType) => {
    if (selectedGameTypes.includes(gameType)) {
      setSelectedGameTypes(selectedGameTypes.filter((g) => g !== gameType));
    } else {
      setSelectedGameTypes([...selectedGameTypes, gameType]);
    }
  };

  const viewRecordDetails = (record) => {
    setSelectedRecord(record);
    setShowRecordDetails(true);
  };

  return (
    <div className="popup-page-wrapper active" onClick={closeModal}>
      <div
        className="popup-page show-toolbar popup-page--active popup-page--align-top"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Betting History</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="content fixed-tab player-content">
            <div className="tab-btn-section">
              <div className="tab-btn tab-btn-page">
                <div
                  className="line"
                  style={{
                    width: "50%",
                    transform:
                      activeTab === "settled"
                        ? "translate(0%, 0px)"
                        : "translate(100%, 0px)",
                  }}
                ></div>
                <div
                  className={`btn ${activeTab === "settled" ? "active" : ""}`}
                  onClick={() => setActiveTab("settled")}
                >
                  <div className="text">Settled</div>
                </div>
                <div
                  className={`btn ${activeTab === "unsettled" ? "active" : ""}`}
                  onClick={() => setActiveTab("unsettled")}
                >
                  <div className="text">Unsettled</div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className={`searchpage ${isFilterOpen ? "active" : ""}`}>
                <div className="search-top-info">
                  <div className="back" onClick={() => setIsFilterOpen(false)}>
                    <span className="item-icon"></span>
                    পিছনে
                  </div>
                  <input type="text" placeholder="Betting Filter" disabled />
                </div>

                <div className="searchpage-main">
                  <FilterGroup
                    title="Platforms"
                    type="radio"
                    options={platforms}
                    selected={filters.date}
                    onChange={(val) => handleFilterChange("date", val)}
                  />
                  <FilterGroup
                    title="GameTypes"
                    type="radio"
                    options={gameTypes}
                    selected={filters.date}
                    onChange={(val) => handleFilterChange("date", val)}
                  />
                  <FilterGroup
                    title="Date"
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

              <div className="container">
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
            </div>
            <div className="tab-content tab-content-page">
              <div className="inner-wrap">
                <div className="inner-box">
                  <div className="record-item item-title">
                    <div className="item platform">Platform</div>
                    <div className="item type">Game Type</div>
                    <div className="item bet">Turnover</div>
                    <div className="item profit">Profit/Loss</div>
                  </div>

                  <div className="list list-betting-record">
                    {records.map((record) => (
                      <React.Fragment key={record.id}>
                        <div className="date-title">
                          <div className="date">
                            <span className="item-icon"></span>
                            {record.date}
                          </div>
                          <div className="time-zone">GMT+6</div>
                        </div>
                        <div className="list-content">
                          
                          <div
                            className="record-item"
                            onClick={() => viewRecordDetails(record)}
                          >
                            <div className="item platform">
                              {record.site}
                              {console.log(record)}
                            </div>
                            <div className="item type">{record.product}</div>
                            <div className="item bet">
                              <i>{record.totalTurnover}</i>
                            </div>
                            <div
                              className={`item profit ${
                                record.totaPayout < 0 ? "negative" : "positive"
                              }`}
                            >
                              <i
                                style={{
                                  color:
                                    record.totaPayout < 0 ? "red" : "inherit",
                                }}
                              >
                                ({record.totalBet})
                              </i>
                            </div>
                            <div className="list-arrow"></div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Panel */}

          {/* Record Details Dialog */}
          {showRecordDetails && selectedRecord && (
            <div className="popup">
              <div className="popup__content">
                <div className="dialog-wrap">
                  <div className="top-bar">
                    <div className="bar-title">Betting Records</div>
                    <div
                      className="back-btn"
                      onClick={() => setShowRecordDetails(false)}
                    ></div>
                  </div>

                  <div className="betting-record-sum">
                    <div className="item platform">
                      <div className="title">Platform</div>
                      <div className="text">{selectedRecord.platform}</div>
                    </div>
                    <div className="item type">
                      <div className="title">Game Type</div>
                      <div className="text">{selectedRecord.gameType}</div>
                    </div>
                    <div className="item bet">
                      <div className="title">Turnover</div>
                      <div className="text">{selectedRecord.turnover}</div>
                    </div>
                    <div
                      className={`item profit ${
                        selectedRecord.profitLoss < 0 ? "negative" : ""
                      }`}
                    >
                      <div className="title">Profit/Loss</div>
                      <div className="text">
                        <i
                          style={{
                            color:
                              selectedRecord.profitLoss < 0 ? "red" : "inherit",
                          }}
                        >
                          ({Math.abs(selectedRecord.profitLoss)})
                        </i>
                      </div>
                    </div>
                  </div>

                  <div className="record-item betting-record-list item-title">
                    <div className="item time">Txn Date</div>
                    <div className="item game">Game</div>
                    <div className="item bet">Turnover</div>
                    <div className="item profit">Profit/Loss</div>
                  </div>

                  <div className="list list-betting-record">
                    <div className="list-bar">
                      <div className="date-title">
                        <div className="date">
                          <span className="item-icon"></span>
                          {selectedRecord.date}
                        </div>
                        <div className="time-zone">GMT+6</div>
                      </div>
                      <div className="tip-area">
                        <div className="tip-icon"></div>
                        <div className="tip-box">
                          <span>Revocation</span>
                          <span>Void</span>
                          <span>Refund</span>
                        </div>
                      </div>
                    </div>

                    <div className="list-content">
                      <ul>
                        {console.log(selectedRecord)}
                        {selectedRecord?.bets?.map((betTxnRecord, index) => (
                          <li
                            key={index}
                            className="betting-record-list record-item settled"
                          >
                            {console.log(betTxnRecord)}
                            <div className="item time">{betTxnRecord.end_time}</div>
                            <div className="item game">
                            {console.log(betTxnRecord)}
                              {betTxnRecord.gameName}
                            </div>
                            <div className="item bet">
                              <i>{betTxnRecord.turnover}</i>
                            </div>
                            <div
                              className={`item profit ${
                                betTxnRecord.bet < 0 ? "negative" : "positive"
                              }`}
                            >
                              <i
                                style={{
                                  color:
                                  betTxnRecord.bet > 0 ? "red" : "inherit",
                                }}
                              >
                                ({ betTxnRecord.bet > 0 ? betTxnRecord.bet.toFixed(2) : "0"})
                              </i>
                            </div>
                            <div className="item-status">
                              <div className="tags">Settled</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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

// const TransactionItem = ({ transaction }) => {
//   const getStatus = () => {
//     switch(transaction.status) {
//       case 0: return "প্রক্রিয়াধীন";
//       case 1: return "অনুমোদিত";
//       case 2: return "প্রত্যাখ্যাত";
//       default: return "অজানা";
//     }
//   };

//   return (
//     <div className="record-item">
//       <div className="item type">
//         {transaction.type === 0 ? "ডিপোজিট" : "উত্তোলন"}
//       </div>
//       <div className="item amount">৳{transaction.amount}</div>
//       <div className="item status">{getStatus()}</div>
//       <div className="item time">
//         {new Date(transaction.datetime).toLocaleDateString("bn-BD", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </div>
//     </div>
//   );
// };

// const NoData = () => (
//   <div className="no-result">
//     <div className="pic">
//       <img
//         src="https://img.c88rx.com/cx/h5/assets/images/no-data.png"
//         alt="no-data"
//       />
//     </div>
//     <div className="text">কোনো ডাটা পাওয়া যায়নি</div>
//   </div>
// );
