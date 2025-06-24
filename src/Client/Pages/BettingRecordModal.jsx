import React, { useState, useEffect, useMemo } from "react";

import {

  GetGameProvider,
  GetGameCategory
} from "../Component/Axios-API-Service/AxiosAPIService";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";


const API_BASE_URL = "https://api.kingbaji.live/api/v1";

// Fetch betting summary
export const GetBettingRecordSummary = async ({ userId, dateRange, site, product, status }) => {
  const params = new URLSearchParams({ userId, dateRange, status });
  
  if (site && site.length > 0) params.append('platform', site.join(','));
  if (product && product.length > 0) params.append('gameType', product.join(','));
  
  try {
    const response = await axios.get(`https://api.kingbaji.live/api/v1/betting-records/summary`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching betting summary:", error);
    throw error;
  }
};

// Fetch betting details
export const GetBettingRecordDetails = async ({ userId, date, platform, gameType, status }) => {
  const params = { userId, date, platform, gameType, status };
  
  try {
    const response = await axios.get(`https://api.kingbaji.live/api/v1/betting-records/detail`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching betting details:", error);
    throw error;
  }
};

// Fetch game providers
export const GetGameProviders = async () => {
  try {
    const response = await GetGameProvider();
    if (response.data.errCode === 200) {
      return response.data.data;
    }
    throw new Error('Failed to fetch providers');
  } catch (error) {
    console.error("Error fetching game providers:", error);
    return [];
  }
};

// Fetch game categories
export const GetGameCategorys = async () => {
  try {
    const response = await GetGameCategory();
    if (response.data.errCode === 200) {
      return response.data.data;
    }
    throw new Error('Failed to fetch categories');
  } catch (error) {
    console.error("Error fetching game categories:", error);
    return [];
  }
};

const BettingRecordModal = ({ modalName }) => {
  const { activeModal, closeModal } = useModal();
  const { userId } = useAuth();

  // Separate state management
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    product: [],
    site: [],
    date: "last7days"
  });


  console.log(filters);
  const [activeTab, setActiveTab] = useState("settled");
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bettingData, setBettingData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dateOptions = useMemo(
    () => [
      { label: "Today", value: "today" },
      { label: "Yesterday", value: "yesterday" },
      { label: "Last 7 Days", value: "last7days" },
    ],
    []
  );

  // Fetch initial data when modal becomes active
  useEffect(() => {
    if (activeModal === modalName) {
      fetchInitialData();
    }
  }, [activeModal, modalName]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [providersData, categoriesData] = await Promise.all([
        GetGameProviders(),
        GetGameCategorys()
      ]);
      
      setProviders(providersData);
      setCategories(categoriesData);
      fetchBettingData();
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setError("Failed to load game data");
      setIsLoading(false);
    }
  };

  // Fetch betting data when filters or tab change
  const fetchBettingData = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const summaryData = await GetBettingRecordSummary({
        userId,
        dateRange: filters.date,
        site: filters.site,
        product: filters.product,
        status: activeTab
      });

      // Transform data to match frontend structure
      const groupedData = summaryData.reduce((acc, record) => {
        if (!acc[record.date]) {
          acc[record.date] = [];
        }
        
        acc[record.date].push({
          provider_name: record.platform,
          category_name: record.gameType,
          totalTurnover: record.turnover,
          profitLoss: record.profitLoss
        });
        
        return acc;
      }, {});
      
      const transformedData = Object.keys(groupedData).map(date => ({
        date,
        items: groupedData[date]
      }));

      setBettingData(transformedData);
    } catch (error) {
      console.error("Error fetching betting data:", error);
      setError("Failed to load betting records");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (providers.length > 0 && categories.length > 0) {
      fetchBettingData();
    }
  }, [filters, activeTab, providers, categories]);

  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === "date") {
        return { ...prev, date: value };
      }
      
      return {
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(v => v !== value)
          : [...prev[filterType], value]
      };
    });
  };

  // View record details
  const viewRecordDetails = async (item, groupDate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const details = await GetBettingRecordDetails({
        userId,
        date: groupDate,
        platform: item.provider_name,
        gameType: item.category_name,
        status: activeTab
      });
      
      setSelectedRecord({
        ...item,
        date: groupDate,
        records: details.map(record => ({
          ...record,
          start_time: record.start_time,
          game: record.game,
          turnover: record.turnover,
          profitLoss: record.profitLoss,
          status: record.status
        }))
      });
    } catch (error) {
      console.error("Error fetching record details:", error);
      setError("Failed to load record details");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const getProviderName = (providerCode) => {
    const provider = providers.find(p => p.providercode === providerCode);
    return provider ? provider.company : providerCode;
  };

  const getCategoryName = (categoryType) => {
    const category = categories.find(c => c.g_type === categoryType);
    return category ? category.category_name : categoryType;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate totals for display
  const calculateTotals = () => {
    return bettingData.reduce(
      (acc, dateGroup) => {
        dateGroup.items.forEach((item) => {
          acc.totalTurnover += item.totalTurnover || 0;
          acc.totalProfit += item.profitLoss || 0;
        });
        return acc;
      },
      { totalTurnover: 0, totalProfit: 0 }
    );
  };

  const { totalTurnover, totalProfit } = calculateTotals();

  if (activeModal !== modalName) return null;

  return (
    <div className="popup-page-wrapper active" onClick={closeModal}>
      <div
        className="popup-page show-toolbar popup-page--active popup-page--align-top"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Betting Records</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          
          <div className="popup-page-main__container">
            <div className="content mcd-style fixed-tab player-content">
              {/* Tab Navigation */}
              <div className="tab-btn-section">
                <div className="tab-btn tab-btn-page">
                  <div
                    className="line"
                    style={{
                      width: "50%",
                      transform: `translate(${
                        activeTab === "settled" ? 0 : 100
                      }%, 0px)`,
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

              {/* Filter Panel */}
              <div className="content">
                <div className={`searchpage ${isFilterOpen ? "active" : ""}`}>
                  <div className="search-top-info">
                    <div className="back" onClick={() => setIsFilterOpen(false)}>
                      <span className="item-icon"></span>
                      Back
                    </div>
                    <input
                      type="text"
                      placeholder="Betting Record Filter"
                      disabled
                    />
                  </div>

                  <div className="searchpage-main">
                    {/* Platform Filter */}
                    <div className="search-checkbox-group check-group">
                      <h2>Platform</h2>
                      <ul>
                        {providers.map((provider) => (
                          <li key={provider.providercode}>
                            <input
                              type="checkbox"
                              id={`site-${provider.providercode}`}
                              checked={filters.site.includes(
                                provider.providercode
                              )}
                              onChange={() =>
                                handleFilterChange(
                                  "site",
                                  provider.providercode
                                )
                              }
                            />
                            <label htmlFor={`site-${provider.providercode}`}>
                              {provider.company}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Game Type Filter */}
                    <div className="search-checkbox-group check-group">
                      <h2>Game Type</h2>
                      <ul>
                        {categories.map((category) => (
                          <li key={category.category_name}>
                            <input
                              type="checkbox"
                              id={`product-${category.category_name}`}
                              checked={filters.product.includes(
                                category.category_name
                              )}
                              onChange={() =>
                                handleFilterChange("product", category.category_name)
                              }
                            />
                            <label htmlFor={`product-${category.category_name}`}>
                              {category.category_name}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Date Filter */}
                    <div className="search-checkbox-group check-group">
                      <h2>Date</h2>
                      <ul>
                        {dateOptions.map((option) => (
                          <li key={option.value}>
                            <input
                              type="radio"
                              id={`date-${option.value}`}
                              name="date"
                              checked={filters.date === option.value}
                              onChange={() =>
                                handleFilterChange("date", option.value)
                              }
                            />
                            <label htmlFor={`date-${option.value}`}>
                              {option.label}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="searchpage-bar">
                    <button className="button" onClick={() => setIsFilterOpen(false)}>
                      Confirm
                    </button>
                  </div>
                </div>

                {/* Quick Filter Header */}
                <div className="container">
                  <div className="filter-header" onClick={() => setIsFilterOpen(true)}>
                    <div className="tab filter-tab">
                      <ul className="item-ani">
                        {dateOptions.map((option) => (
                          <li
                            key={option.value}
                            className={
                              filters.date === option.value
                                ? "active"
                                : ""
                            }
                          >
                            {option.label}
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

              {/* Main Content */}
              <div className="tab-content tab-content-page">
                <div className="inner-wrap">
                  <div className="inner-box">
                    {/* Summary Bar */}
                    {/* <div className="betting-summary-bar">
                      <div className="summary-item">
                        <span className="label">Total Turnover:</span>
                        <span className="value">
                          {totalTurnover.toFixed(2)}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="label">Total Profit/Loss:</span>
                        <span
                          className={`value ${
                            totalProfit < 0 ? "negative" : "positive"
                          }`}
                        >
                          {totalProfit.toFixed(2)}
                        </span>
                      </div>
                    </div> */}

                    {/* Records List Header */}
                    <div className="record-item betting-record-list item-title">
                      <div className="item platform">Platform</div>
                      <div className="item type">Game Type</div>
                      <div className="item bet">Turnover</div>
                      <div className="item profit">Profit/Loss</div>
                    </div>

                    {/* Records List */}
                    <div className="list list-betting-record">
                      {isLoading ? (
                        <div className="loading-message">Loading...</div>
                      ) : error ? (
                        <div className="error-message">{error}</div>
                      ) : bettingData.length > 0 ? (
                        bettingData.map((dateGroup) => (
                          <React.Fragment key={dateGroup.date}>
                            <div className="date-title">
                              <div className="date">
                                <span className="item-icon"></span>
                                {formatDate(dateGroup.date)}
                              </div>
                              <div className="time-zone">GMT+6</div>
                            </div>

                            {dateGroup.items.map((item, index) => (
                              <div
                                className="list-content"
                                key={`${dateGroup.date}-${index}`}
                                onClick={() => viewRecordDetails(item, dateGroup.date)}
                              >
                                <div className="record-item">
                                  <div className="item platform">
                                    {console.log(item)}
                                    {getProviderName(item.provider_name)}
                                  </div>
                                  <div className="item type">
                                    {getCategoryName(item.category_name)}
                                  </div>
                                  <div className="item bet">
                                    {item.totalTurnover?.toFixed(2) || "0.00"}
                                  </div>
                                  <div
                                    className={`item ${
                                      item.profitLoss >= 0 ? "green" : "positive"
                                    } profit`}
                                  >
                                    {item.profitLoss?.toFixed(2) || "0.00"}
                                  </div>
                                  <div className="list-arrow"></div>
                                </div>
                              </div>
                            ))}
                          </React.Fragment>
                        ))
                      ) : (
                        <div className="no-result">
                          <div className="pic">
                            <img
                              src="https://img.c88rx.com/cx/h5/assets/images/no-data.png?v=1742895464610"
                              alt="no-data"
                            />
                          </div>
                          <div className="text">No Data Available</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="popup">
          <div className="popup__content">
            <div className="dialog-wrap">
              <div className="top-bar">
                <div className="bar-title">Betting Record Details</div>
                <div className="back-btn" onClick={() => setSelectedRecord(null)}></div>
              </div>
              
              <div className="betting-record-sum">
                <div className="item platform">
                  <div className="title">Platform</div>
                  <div className="text">
                    {getProviderName(selectedRecord.provider_name)}
                  </div>
                </div>
                <div className="item type">
                  <div className="title">Game Type</div>
                  <div className="text">
                    {getCategoryName(selectedRecord.category_name)}
                  </div>
                </div>
                <div className="item bet">
                  <div className="title">Turnover</div>
                  <div className="text">
                    {selectedRecord.totalTurnover?.toFixed(2) || "0.00"}
                  </div>
                </div>
                <div className={`item ${
                              selectedRecord.profitLoss >= 0 ? "negative" : "positive"
                            } profit`}>
                  <div className="title">Profit/Loss</div>
                  <div className="text">
                    <span >
                      {selectedRecord.profitLoss?.toFixed(2) || "0.00"}
                    </span>
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
                <div className="date-title">
                  <div className="date">
                    <span className="item-icon"></span>
                    {formatDate(selectedRecord.date)}
                  </div>
                  <div className="time-zone">GMT+6</div>
                </div>
                
                <div className="list-content">
                  <ul>
                    {isLoading ? (
                      <li className="loading-message">Loading details...</li>
                    ) : selectedRecord.records && selectedRecord.records.length > 0 ? (
                      selectedRecord.records.map((record, index) => (
                        <li
                          key={index}
                          className={`betting-record-list record-item ${
                            record.status === "settled" ? "settled" : "unsettled"
                          }`}
                        >
                          <div className="item time">
                            {formatTime(record.start_time)}
                          </div>
                          <div className="item game">
                            {record.game}
                          </div>
                          <div className="item bet">
                            {record.turnover?.toFixed(2) || "0.00"}
                          </div>
                          <div
                            className={`item profit ${
                              record.profitLoss >= 0 ?  "negative" : "positive"
                            }`}
                          >
                            {record.profitLoss?.toFixed(2) || "0.00"}
                          </div>
                          {/* <div className="item-status">
                            <div className="tags">
                              {record.status || 
                                (activeTab === "settled" ? "Settled" : "Unsettled")}
                            </div>
                          </div> */}
                        </li>
                      ))
                    ) : (
                      <li className="no-result">No transaction details found</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BettingRecordModal;
// import React, { useEffect, useState } from "react";
// import { useModal } from "../Component/ModelContext";
// import {
//   GetBettingHistoryByMember,
//   GetGameCategory,
//   GetGameProvider,
//   searchTransactionsbyUserId,
// } from "../Component/Axios-API-Service/AxiosAPIService";
// import { useAuth } from "../Component/AuthContext";

// export default ({ modalName }) => {
//   const { activeModal, closeModal } = useModal();
//   const { userId } = useAuth();

//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     product: [],
//     site: [],
//     date: "today",
//   });
//   const [transactions, setTransactions] = useState([]);

//   console.log(filters);

//   const dateOptions = [
//     { label: "Today", value: "today" },
//     { label: "Yesterday", value: "yesterday" },
//     { label: "Last 7 Days", value: "last7days" }, // Match backend's 'last7days'
//   ];
//   // const provider = []
//   const [activeDayTab, setActiveDayTab] = useState("Today");
//   const tabs = ["today", "yesterday", "last7Days"];

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => {
//       if (filterType === "date") {
//         return { ...prev, date: value };
//       }

//       // Toggle array values for multi-select
//       return {
//         ...prev,
//         [filterType]: prev[filterType].includes(value)
//           ? prev[filterType].filter((v) => v !== value)
//           : [...prev[filterType], value],
//       };
//     });
//   };
//   const [activeTab, setActiveTab] = useState("settled");

//   const [selectedDate, setSelectedDate] = useState("last7days");
//   const [selectedPlatforms, setSelectedPlatforms] = useState([]);
//   const [selectedGameTypes, setSelectedGameTypes] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [showRecordDetails, setShowRecordDetails] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const GetBettingHistor = async () => {
//     try {
//       const response = await GetBettingHistoryByMember({
//           userId,
//           filters,
//       });
//       console.log(response.data);
//       setRecords(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setRecords([]);
//     }
//   };

//   useEffect(() => {
//     if (activeModal === modalName) {
//       const fetchProvider = async () => {
//         try {
//           const response = await GetGameProvider();
//           console.log("fetching provider:", response.data);
//           if (response.data.errCode === 200) {
//             setSelectedPlatforms(response.data.data || []);
//           }
//         } catch (error) {
//           console.error("Error fetching provider:", error);
//           setSelectedPlatforms([]);
//         }
//       };

//       fetchProvider();
//     }
//   }, [activeModal, userId]);
//   useEffect(() => {
//     if (activeModal === modalName) {
//       const fetchCategory = async () => {
//         try {
//           const response = await GetGameCategory();

//           if (response.data.errCode === 200) {
//             console.log("fetching Category:", response.data);
//             setSelectedGameTypes(response.data.data || []);
//           }
//         } catch (error) {
//           console.error("Error fetching provider:", error);
//           setSelectedGameTypes([]);
//         }
//       };

//       fetchCategory();
//     }
//   }, [activeModal, userId]);

//   useEffect(() => {
//     if (activeModal === modalName) {
//       GetBettingHistor();
//     }
//   }, [activeModal, filters, userId]);

//   const platforms = selectedPlatforms || [];
//   const gameTypes = selectedGameTypes;
//   // console.log(platforms);

//   if (activeModal !== modalName) return null;
//   // Sample data

//   const togglePlatform = (platform) => {
//     if (selectedPlatforms.includes(platform)) {
//       setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
//     } else {
//       setSelectedPlatforms([...selectedPlatforms, platform]);
//     }
//   };

//   const toggleGameType = (gameType) => {
//     if (selectedGameTypes.includes(gameType)) {
//       setSelectedGameTypes(selectedGameTypes.filter((g) => g !== gameType));
//     } else {
//       setSelectedGameTypes([...selectedGameTypes, gameType]);
//     }
//   };

//   const viewRecordDetails = (record) => {
//     setSelectedRecord(record);
//     setShowRecordDetails(true);
//   };

//   return (
//     <div className="popup-page-wrapper active" onClick={closeModal}>
//       <div
//         className="popup-page show-toolbar popup-page--active popup-page--align-top"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="popup-page__main popup-page-main popup-page-main--show">
//           <div className="popup-page-main__header">
//             <div className="popup-page-main__title">Betting History</div>
//             <div className="popup-page-main__close" onClick={closeModal}></div>
//           </div>

//           <div className="content fixed-tab player-content">
//             <div className="tab-btn-section">
//               <div className="tab-btn tab-btn-page">
//                 <div
//                   className="line"
//                   style={{
//                     width: "50%",
//                     transform:
//                       activeTab === "settled"
//                         ? "translate(0%, 0px)"
//                         : "translate(100%, 0px)",
//                   }}
//                 ></div>
//                 <div
//                   className={`btn ${activeTab === "settled" ? "active" : ""}`}
//                   onClick={() => setActiveTab("settled")}
//                 >
//                   <div className="text">Settled</div>
//                 </div>
//                 <div
//                   className={`btn ${activeTab === "unsettled" ? "active" : ""}`}
//                   onClick={() => setActiveTab("unsettled")}
//                 >
//                   <div className="text">Unsettled</div>
//                 </div>
//               </div>
//             </div>
//             <div className="content">
//               <div className={`searchpage ${isFilterOpen ? "active" : ""}`}>
//                 <div className="search-top-info">
//                   <div className="back" onClick={() => setIsFilterOpen(false)}>
//                     <span className="item-icon"></span>
//                     পিছনে
//                   </div>
//                   <input type="text" placeholder="Betting Filter" disabled />
//                 </div>

//                 <div className="searchpage-main">
//                   <FilterGroup
//                     title="Platforms"
//                     type="checkbox"
//                     options={selectedPlatforms.map((p) => ({
//                       label: p.company,
//                       value: p.providercode,
//                     }))}
//                     selected={filters.site}
//                     onChange={(val) => handleFilterChange("site", val)}
//                   />
//                   <FilterGroup
//                     title="Game Types"
//                     type="checkbox"
//                     options={selectedGameTypes.map((g) => ({
//                       label: g.category_name,
//                       value: g.p_type,
//                     }))}
//                     selected={filters.product}
//                     onChange={(val) => handleFilterChange("product", val)}
//                   />
//                   <FilterGroup
//                     title="তারিখ"
//                     type="radio"
//                     options={dateOptions.map((d) => ({
//                       label: d.label,
//                       value: d.value,
//                     }))}
//                     selected={filters.date}
//                     onChange={(val) => handleFilterChange("date", val)}
//                   />
//                   <div
//                     className="searchpage-bar active"
//                     onClick={() => setIsFilterOpen(false)}
//                   >
//                     <button className="button"> Confirm </button>
//                   </div>
//                 </div>

//                 <div className="searchpage-bar">
//                   <button
//                     className="button"
//                     onClick={() => setIsFilterOpen(false)}
//                   >
//                     প্রয়োগ করুন
//                   </button>
//                 </div>
//               </div>

//               <div className="container">
//                 <div
//                   className="filter-header"
//                   onClick={() => setIsFilterOpen(true)}
//                 >
//                   <div className="tab filter-tab">
//                     <ul className="item-ani">
//                       {tabs.map((tab) => (
//                         <li
//                           key={tab}
//                           className={activeTab === tab ? "active" : ""}
//                           onClick={() => setActiveTab(tab)}
//                         >
//                           {tab}
//                         </li>
//                       ))}
//                     </ul>
//                     <div className="btn search-btn">
//                       <span className="item-icon"></span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="tab-content tab-content-page">
//               <div className="inner-wrap">
//                 <div className="inner-box">
//                   <div className="record-item item-title">
//                     <div className="item platform">Platform</div>
//                     <div className="item type">Game Type</div>
//                     <div className="item bet">Turnover</div>
//                     <div className="item profit">Profit/Loss</div>
//                   </div>

//                   <div className="list list-betting-record">
//                     {records.map((record) => (
//                       <React.Fragment key={record.id}>
//                         <div className="date-title">
//                           <div className="date">
//                             <span className="item-icon"></span>
//                             {record.date}
//                           </div>
//                           <div className="time-zone">GMT+6</div>
//                         </div>
//                         <div className="list-content">
//                           <div
//                             className="record-item"
//                             onClick={() => viewRecordDetails(record)}
//                           >
//                             <div className="item platform">
//                               {record.site}
//                               {/* {console.log(record)} */}
//                             </div>
//                             <div className="item type">{record.product}</div>
//                             <div className="item bet">
//                               <i>{record.totalTurnover}</i>
//                             </div>
//                             <div
//                               className={`item profit ${
//                                 record.totaPayout < 0 ? "negative" : "positive"
//                               }`}
//                             >
//                               <i
//                                 style={{
//                                   color:
//                                     record.totaPayout < 0 ? "red" : "inherit",
//                                 }}
//                               >
//                                 ({record.totalBet})
//                               </i>
//                             </div>
//                             <div className="list-arrow"></div>
//                           </div>
//                         </div>
//                       </React.Fragment>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Filter Panel */}

//           {/* Record Details Dialog */}
//           {showRecordDetails && selectedRecord && (
//             <div className="popup">
//               <div className="popup__content">
//                 <div className="dialog-wrap">
//                   <div className="top-bar">
//                     <div className="bar-title">Betting Records</div>
//                     <div
//                       className="back-btn"
//                       onClick={() => setShowRecordDetails(false)}
//                     ></div>
//                   </div>

//                   <div className="betting-record-sum">
//                     <div className="item platform">
//                       <div className="title">Platform</div>
//                       <div className="text">{selectedRecord.platform}</div>
//                     </div>
//                     <div className="item type">
//                       <div className="title">Game Type</div>
//                       <div className="text">{selectedRecord.gameType}</div>
//                     </div>
//                     <div className="item bet">
//                       <div className="title">Turnover</div>
//                       <div className="text">{selectedRecord.turnover}</div>
//                     </div>
//                     <div
//                       className={`item profit ${
//                         selectedRecord.profitLoss < 0 ? "negative" : ""
//                       }`}
//                     >
//                       <div className="title">Profit/Loss</div>
//                       <div className="text">
//                         <i
//                           style={{
//                             color:
//                               selectedRecord.profitLoss < 0 ? "red" : "inherit",
//                           }}
//                         >
//                           ({Math.abs(selectedRecord.profitLoss)})
//                         </i>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="record-item betting-record-list item-title">
//                     <div className="item time">Txn Date</div>
//                     <div className="item game">Game</div>
//                     <div className="item bet">Turnover</div>
//                     <div className="item profit">Profit/Loss</div>
//                   </div>

//                   <div className="list list-betting-record">
//                     <div className="list-bar">
//                       <div className="date-title">
//                         <div className="date">
//                           <span className="item-icon"></span>
//                           {selectedRecord.date}
//                         </div>
//                         <div className="time-zone">GMT+6</div>
//                       </div>
//                       <div className="tip-area">
//                         <div className="tip-icon"></div>
//                         <div className="tip-box">
//                           <span>Revocation</span>
//                           <span>Void</span>
//                           <span>Refund</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="list-content">
//                       <ul>
//                         {console.log(selectedRecord)}
//                         {selectedRecord?.records?.map((betTxnRecord, index) => (
//                           <li
//                             key={index}
//                             className="betting-record-list record-item settled"
//                           >
//                             {console.log(betTxnRecord)}
//                             <div className="item time">
//                               {betTxnRecord.end_time}
//                             </div>
//                             <div className="item game">
//                               {console.log(betTxnRecord)}
//                               {betTxnRecord.gameName}
//                             </div>
//                             <div className="item bet">
//                               <i>{betTxnRecord.turnover}</i>
//                             </div>
//                             <div
//                               className={`item profit ${
//                                 betTxnRecord.bet < 0 ? "negative" : "positive"
//                               }`}
//                             >
//                               <i
//                                 style={{
//                                   color:
//                                     betTxnRecord.bet > 0 ? "red" : "inherit",
//                                 }}
//                               >
//                                 (
//                                 {betTxnRecord.bet > 0
//                                   ? betTxnRecord.bet.toFixed(2)
//                                   : "0"}
//                                 )
//                               </i>
//                             </div>
//                             <div className="item-status">
//                               <div className="tags">Settled</div>
//                             </div>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const FilterGroup = ({ title, type, options, selected, onChange }) => (
//   <div className="search-checkbox-group">
//     <h2>{title}</h2>
//     <ul>
//       {options.map((option) => (
//         <li key={option.value} onClick={() => onChange(option.value)}>
//           {/* Use value as key */}
//           <input
//             type={type}
//             name={title}
//             checked={
//               type === "radio"
//                 ? selected === option.label
//                 : selected.includes(option.label)
//             }
//           />
//           <label>{option.label}</label> {/* Render label property */}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// import React, { useEffect, useState } from "react";
// import { useModal } from "../Component/ModelContext";
// import {
//   GetBettingHistoryByMember,
//   GetGameCategory,
//   GetGameProvider,
// } from "../Component/Axios-API-Service/AxiosAPIService";
// import { useAuth } from "../Component/AuthContext";

// export default ({ modalName }) => {
//   const { activeModal, closeModal } = useModal();
//   const { userId } = useAuth();

//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     product: [],
//     site: [],
//     date: "today",
//   });
//   const [groupedRecords, setGroupedRecords] = useState([]);
//   const [meta, setMeta] = useState({
//     totalBet: 0,
//     totalTurnover: 0,
//     totalPayout: 0,
//     totalProfit: 0,
//     totalRecords: 0,
//   });

//   const dateOptions = [
//     { label: "Today", value: "today" },
//     { label: "Yesterday", value: "yesterday" },
//     { label: "Last 7 Days", value: "last7days" },
//     { label: "Last 30 Days", value: "last30days" },
//   ];

//   const [activeDayTab, setActiveDayTab] = useState("Today");
//   const tabs = ["today", "yesterday", "last7Days"];

//   const [activeTab, setActiveTab] = useState("settled");
//   const [selectedPlatforms, setSelectedPlatforms] = useState([]);
//   const [selectedGameTypes, setSelectedGameTypes] = useState([]);
//   const [showRecordDetails, setShowRecordDetails] = useState(false);
//   const [selectedProvider, setSelectedProvider] = useState(null);

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => {
//       if (filterType === "date") {
//         return { ...prev, date: value };
//       }
//       return {
//         ...prev,
//         [filterType]: prev[filterType].includes(value)
//           ? prev[filterType].filter((v) => v !== value)
//           : [...prev[filterType], value],
//       };
//     });
//   };

//   const fetchBettingHistory = async () => {
//     try {
//       const response = await GetBettingHistoryByMember({
//         userId,
//         filters,
//       });
//       setGroupedRecords(response.data.data || []);
//       setMeta(
//         response.data.meta || {
//           totalBet: 0,
//           totalTurnover: 0,
//           totalPayout: 0,
//           totalProfit: 0,
//           totalRecords: 0,
//         }
//       );
//     } catch (error) {
//       console.error("Error fetching betting history:", error);
//       setGroupedRecords([]);
//     }
//   };

//   useEffect(() => {
//     if (activeModal === modalName) {
//       const fetchProviders = async () => {
//         try {
//           const response = await GetGameProvider();
//           if (response.data.errCode === 200) {
//             setSelectedPlatforms(response.data.data || []);
//           }
//         } catch (error) {
//           console.error("Error fetching providers:", error);
//         }
//       };

//       const fetchCategories = async () => {
//         try {
//           const response = await GetGameCategory();
//           if (response.data.errCode === 200) {
//             setSelectedGameTypes(response.data.data || []);
//           }
//         } catch (error) {
//           console.error("Error fetching categories:", error);
//         }
//       };

//       fetchProviders();
//       fetchCategories();
//       fetchBettingHistory();
//     }
//   }, [activeModal, userId, filters]);

//   const togglePlatform = (platform) => {
//     handleFilterChange("site", platform.providercode);
//   };

//   const toggleGameType = (gameType) => {
//     handleFilterChange("product", gameType.p_type);
//   };

//   const viewProviderDetails = (provider) => {
//     setSelectedProvider(provider);
//     setShowRecordDetails(true);
//   };

//   if (activeModal !== modalName) return null;

//   return (
//     <div className="popup-page-wrapper active" onClick={closeModal}>
//       <div
//         className="popup-page show-toolbar popup-page--active popup-page--align-top"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="popup-page__main popup-page-main popup-page-main--show">
//           <div className="popup-page-main__header">
//             <div className="popup-page-main__title">Betting History</div>
//             <div className="popup-page-main__close" onClick={closeModal}></div>
//           </div>
//           <div className="content fixed-tab player-content">
//             <div className="tab-btn-section">
//               <div className="tab-btn tab-btn-page">
//                 <div
//                   className="line"
//                   style={{
//                     width: "50%",
//                     transform:
//                       activeTab === "settled"
//                         ? "translate(0%, 0px)"
//                         : "translate(100%, 0px)",
//                   }}
//                 ></div>
//                 <div
//                   className={`btn ${activeTab === "settled" ? "active" : ""}`}
//                   onClick={() => setActiveTab("settled")}
//                 >
//                   <div className="text">Settled</div>
//                 </div>
//                 <div
//                   className={`btn ${activeTab === "unsettled" ? "active" : ""}`}
//                   onClick={() => setActiveTab("unsettled")}
//                 >
//                   <div className="text">Unsettled</div>
//                 </div>
//               </div>
//             </div>
//             <div className="content">
//               <div
//                 className="filter-header"
//                 onClick={() => setIsFilterOpen(true)}
//               >
//                 <div className="tab filter-tab">
//                   <ul className="item-ani">
//                     {tabs.map((tab) => (
//                       <li
//                         key={tab}
//                         className={activeTab === tab ? "active" : ""}
//                         onClick={() => setActiveTab(tab)}
//                       >
//                         {tab}
//                       </li>
//                     ))}
//                   </ul>
//                   <div className="btn search-btn">
//                     <span className="item-icon"></span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className={`searchpage ${isFilterOpen ? "active" : ""}`}>
//               <div className="search-top-info">
//                 <div className="back" onClick={() => setIsFilterOpen(false)}>
//                   <span className="item-icon"></span>
//                   Back
//                 </div>
//                 <input type="text" placeholder="Betting Filter" disabled />
//               </div>

//               <div className="searchpage-main">
//                 <FilterGroup
//                   title="Platforms"
//                   type="checkbox"
//                   options={selectedPlatforms.map((p) => ({
//                     label: p.company,
//                     value: p.providercode,
//                   }))}
//                   selected={filters.site}
//                   onChange={(val) => handleFilterChange("site", val)}
//                 />
//                 <FilterGroup
//                   title="Game Types"
//                   type="checkbox"
//                   options={selectedGameTypes.map((g) => ({
//                     label: g.category_name,
//                     value: g.p_type,
//                   }))}
//                   selected={filters.product}
//                   onChange={(val) => handleFilterChange("product", val)}
//                 />
//                 <FilterGroup
//                   title="Date"
//                   type="radio"
//                   options={dateOptions}
//                   selected={filters.date}
//                   onChange={(val) => handleFilterChange("date", val)}
//                 />
//                 <div
//                   className="searchpage-bar active"
//                   onClick={() => setIsFilterOpen(false)}
//                 >
//                   <button className="button">Confirm</button>
//                 </div>
//               </div>
//             </div>

//             {/* <div className="container">
//               <div
//                 className="filter-header"
//                 onClick={() => setIsFilterOpen(true)}
//               >
//                 <div className="tab filter-tab">
//                   <div className="btn search-btn">
//                     <span className="item-icon"></span>
//                   </div>
//                 </div>
//               </div>
//             </div> */}

//           <div className="tab-content tab-content-page">
//             <div className="inner-wrap">
//               <div className="inner-box">
//                 <div className="record-item item-title">
//                   <div className="item platform">Platform</div>
//                   <div className="item type">Game Type</div>
//                   <div className="item bet">Turnover</div>
//                   <div className="item profit">Profit/Loss</div>
//                 </div>

//                 <div className="list list-betting-record">
//                   {groupedRecords.map((dateGroup) => (
//                     <React.Fragment key={dateGroup.date}>
//                       <div className="date-title">
//                         <div className="date">
//                           <span className="item-icon"></span>
//                           {dateGroup.date}
//                         </div>
//                         <div className="time-zone">GMT+6</div>
//                       </div>
//                       <div className="list-content">
//                         {dateGroup.providers.map((provider) => (
//                           <div
//                             key={`${dateGroup.date}-${provider.site}`}
//                             className="record-item"
//                             onClick={() => viewProviderDetails(provider)}
//                           >
//                             <div className="item platform">{provider.site}</div>
//                             <div className="item type">
//                               {provider.records[0]?.product || "N/A"}
//                             </div>
//                             <div className="item bet">
//                               <i>{provider.totalTurnover.toFixed(2)}</i>
//                             </div>
//                             <div
//                               className={`item profit ${
//                                 provider.totalProfit < 0
//                                   ? "negative"
//                                   : "positive"
//                               }`}
//                             >
//                               <i
//                                 style={{
//                                   color:
//                                     provider.totalProfit < 0
//                                       ? "red"
//                                       : "inherit",
//                                 }}
//                               >
//                                 {provider.totalProfit.toFixed(2)}
//                               </i>
//                             </div>
//                             <div className="list-arrow"></div>
//                           </div>
//                         ))}
//                       </div>
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Provider Details Dialog */}
//         {showRecordDetails && selectedProvider && (
//           <div className="popup">
//             <div className="popup__content">
//               <div className="dialog-wrap">
//                 <div className="top-bar">
//                   <div className="bar-title">Betting Records</div>
//                   <div
//                     className="back-btn"
//                     onClick={() => selectedProvider(false)}
//                   ></div>
//                 </div>
//                 <div className="betting-record-sum">
//                   <div className="item platform">
//                     <div className="title">Platform</div>
//                     <div className="text">{selectedProvider.platform}</div>
//                   </div>
//                   <div className="item type">
//                     <div className="title">Game Type</div>
//                     <div className="text">{selectedProvider.gameType}</div>
//                   </div>
//                   <div className="item bet">
//                     <div className="title">Turnover</div>
//                     <div className="text">{selectedProvider.turnover}</div>
//                   </div>
//                   <div
//                     className={`item profit ${
//                       selectedProvider.profitLoss < 0 ? "negative" : ""
//                     }`}
//                   >
//                     <div className="title">Profit/Loss</div>
//                     <div className="text">
//                       <i
//                         style={{
//                           color:
//                             selectedProvider.profitLoss < 0 ? "red" : "inherit",
//                         }}
//                       >
//                         ({Math.abs(selectedProvider.profitLoss)})
//                       </i>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="record-item betting-record-list item-title">
//                   <div className="item time">Txn Date</div>
//                   <div className="item game">Game</div>
//                   <div className="item bet">Turnover</div>
//                   <div className="item profit">Profit/Loss</div>
//                 </div>
//                 <div className="list list-betting-record">
//                   <div className="list-bar">
//                     <div className="date-title">
//                       <div className="date">
//                         <span className="item-icon"></span>
//                         {selectedProvider.date}
//                       </div>
//                       <div className="time-zone">GMT+6</div>
//                     </div>
//                     <div className="tip-area">
//                       <div className="tip-icon"></div>
//                       <div className="tip-box">
//                         <span>Revocation</span>
//                         <span>Void</span>
//                         <span>Refund</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="list-content">
//                     <ul>
//                       {console.log(selectedProvider)}
//                       {selectedProvider?.records?.map((betTxnRecord, index) => (
//                         <li
//                           key={index}
//                           className="betting-record-list record-item settled"
//                         >
//                           {console.log(betTxnRecord)}
//                           <div className="item time">
//                             {betTxnRecord.end_time}
//                           </div>
//                           <div className="item game">
//                             {console.log(betTxnRecord)}
//                             {betTxnRecord.gameName}
//                           </div>
//                           <div className="item bet">
//                             <i>{betTxnRecord.turnover}</i>
//                           </div>
//                           <div
//                             className={`item profit ${
//                               betTxnRecord.bet < 0 ? "negative" : "positive"
//                             }`}
//                           >
//                             <i
//                               style={{
//                                 color: betTxnRecord.bet > 0 ? "red" : "inherit",
//                               }}
//                             >
//                               (
//                               {betTxnRecord.bet > 0
//                                 ? betTxnRecord.bet.toFixed(2)
//                                 : "0"}
//                               )
//                             </i>
//                           </div>
//                           <div className="item-status">
//                             <div className="tags">Settled</div>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}{" "}
//       </div>
//     </div>
//     </div>
//   );
// };

// const FilterGroup = ({ title, type, options, selected, onChange }) => (
//   <div className="search-checkbox-group">
//     <h2>{title}</h2>
//     <ul>
//       {options.map((option) => (
//         <li key={option.value} onClick={() => onChange(option.value)}>
//           <input
//             type={type}
//             name={title}
//             checked={
//               type === "radio"
//                 ? selected === option.value
//                 : selected.includes(option.value)
//             }
//             readOnly
//           />
//           <label>{option.label}</label>
//         </li>
//       ))}
//     </ul>
//   </div>
// );
// // import React, { useEffect, useState } from "react";
// // import { useModal } from "../Component/ModelContext";
// // import {
// //   GetBettingHistoryByMember,
// //   GetGameCategory,
// //   GetGameProvider,
// //   searchTransactionsbyUserId,
// // } from "../Component/Axios-API-Service/AxiosAPIService";
// // import { useAuth } from "../Component/AuthContext";

// // export default ({ modalName }) => {
// //   const { activeModal, closeModal } = useModal();
// //   const { userId } = useAuth();

// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   const [filters, setFilters] = useState({
// //     product: [],
// //     site: [],
// //     date: "today",
// //   });
// //   const [transactions, setTransactions] = useState([]);

// //   console.log(filters);

// //   const dateOptions = [
// //     { label: "Today", value: "today" },
// //     { label: "Yesterday", value: "yesterday" },
// //     { label: "Last 7 Days", value: "last7days" }, // Match backend's 'last7days'
// //   ];
// //   // const provider = []
// //   const [activeDayTab, setActiveDayTab] = useState("Today");
// //   const tabs = ["today", "yesterday", "last7Days"];

// //   const handleFilterChange = (filterType, value) => {
// //     setFilters((prev) => {
// //       if (filterType === "date") {
// //         return { ...prev, date: value };
// //       }

// //       // Toggle array values for multi-select
// //       return {
// //         ...prev,
// //         [filterType]: prev[filterType].includes(value)
// //           ? prev[filterType].filter((v) => v !== value)
// //           : [...prev[filterType], value],
// //       };
// //     });
// //   };
// //   const [activeTab, setActiveTab] = useState("settled");

// //   const [selectedDate, setSelectedDate] = useState("last7days");
// //   const [selectedPlatforms, setSelectedPlatforms] = useState([]);
// //   const [selectedGameTypes, setSelectedGameTypes] = useState([]);
// //   const [records, setRecords] = useState([]);
// //   const [showRecordDetails, setShowRecordDetails] = useState(false);
// //   const [selectedRecord, setSelectedRecord] = useState(null);
// //   const GetBettingHistor = async () => {
// //     try {
// //       const response = await GetBettingHistoryByMember({
// //           userId,
// //           filters,
// //       });
// //       console.log(response.data);
// //       setRecords(response.data.data || []);
// //     } catch (error) {
// //       console.error("Error fetching transactions:", error);
// //       setRecords([]);
// //     }
// //   };

// //   useEffect(() => {
// //     if (activeModal === modalName) {
// //       const fetchProvider = async () => {
// //         try {
// //           const response = await GetGameProvider();
// //           console.log("fetching provider:", response.data);
// //           if (response.data.errCode === 200) {
// //             setSelectedPlatforms(response.data.data || []);
// //           }
// //         } catch (error) {
// //           console.error("Error fetching provider:", error);
// //           setSelectedPlatforms([]);
// //         }
// //       };

// //       fetchProvider();
// //     }
// //   }, [activeModal, userId]);
// //   useEffect(() => {
// //     if (activeModal === modalName) {
// //       const fetchCategory = async () => {
// //         try {
// //           const response = await GetGameCategory();

// //           if (response.data.errCode === 200) {
// //             console.log("fetching Category:", response.data);
// //             setSelectedGameTypes(response.data.data || []);
// //           }
// //         } catch (error) {
// //           console.error("Error fetching provider:", error);
// //           setSelectedGameTypes([]);
// //         }
// //       };

// //       fetchCategory();
// //     }
// //   }, [activeModal, userId]);

// //   useEffect(() => {
// //     if (activeModal === modalName) {
// //       GetBettingHistor();
// //     }
// //   }, [activeModal, filters, userId]);

// //   const platforms = selectedPlatforms || [];
// //   const gameTypes = selectedGameTypes;
// //   // console.log(platforms);

// //   if (activeModal !== modalName) return null;
// //   // Sample data

// //   const togglePlatform = (platform) => {
// //     if (selectedPlatforms.includes(platform)) {
// //       setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
// //     } else {
// //       setSelectedPlatforms([...selectedPlatforms, platform]);
// //     }
// //   };

// //   const toggleGameType = (gameType) => {
// //     if (selectedGameTypes.includes(gameType)) {
// //       setSelectedGameTypes(selectedGameTypes.filter((g) => g !== gameType));
// //     } else {
// //       setSelectedGameTypes([...selectedGameTypes, gameType]);
// //     }
// //   };

// //   const viewRecordDetails = (record) => {
// //     setSelectedRecord(record);
// //     setShowRecordDetails(true);
// //   };

// //   return (
// //     <div className="popup-page-wrapper active" onClick={closeModal}>
// //       <div
// //         className="popup-page show-toolbar popup-page--active popup-page--align-top"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <div className="popup-page__main popup-page-main popup-page-main--show">
// //           <div className="popup-page-main__header">
// //             <div className="popup-page-main__title">Betting History</div>
// //             <div className="popup-page-main__close" onClick={closeModal}></div>
// //           </div>

// //           <div className="content fixed-tab player-content">
// //             <div className="tab-btn-section">
// //               <div className="tab-btn tab-btn-page">
// //                 <div
// //                   className="line"
// //                   style={{
// //                     width: "50%",
// //                     transform:
// //                       activeTab === "settled"
// //                         ? "translate(0%, 0px)"
// //                         : "translate(100%, 0px)",
// //                   }}
// //                 ></div>
// //                 <div
// //                   className={`btn ${activeTab === "settled" ? "active" : ""}`}
// //                   onClick={() => setActiveTab("settled")}
// //                 >
// //                   <div className="text">Settled</div>
// //                 </div>
// //                 <div
// //                   className={`btn ${activeTab === "unsettled" ? "active" : ""}`}
// //                   onClick={() => setActiveTab("unsettled")}
// //                 >
// //                   <div className="text">Unsettled</div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="content">
// //               <div className={`searchpage ${isFilterOpen ? "active" : ""}`}>
// //                 <div className="search-top-info">
// //                   <div className="back" onClick={() => setIsFilterOpen(false)}>
// //                     <span className="item-icon"></span>
// //                     পিছনে
// //                   </div>
// //                   <input type="text" placeholder="Betting Filter" disabled />
// //                 </div>

// //                 <div className="searchpage-main">
// //                   <FilterGroup
// //                     title="Platforms"
// //                     type="checkbox"
// //                     options={selectedPlatforms.map((p) => ({
// //                       label: p.company,
// //                       value: p.providercode,
// //                     }))}
// //                     selected={filters.site}
// //                     onChange={(val) => handleFilterChange("site", val)}
// //                   />
// //                   <FilterGroup
// //                     title="Game Types"
// //                     type="checkbox"
// //                     options={selectedGameTypes.map((g) => ({
// //                       label: g.category_name,
// //                       value: g.p_type,
// //                     }))}
// //                     selected={filters.product}
// //                     onChange={(val) => handleFilterChange("product", val)}
// //                   />
// //                   <FilterGroup
// //                     title="তারিখ"
// //                     type="radio"
// //                     options={dateOptions.map((d) => ({
// //                       label: d.label,
// //                       value: d.value,
// //                     }))}
// //                     selected={filters.date}
// //                     onChange={(val) => handleFilterChange("date", val)}
// //                   />
// //                   <div
// //                     className="searchpage-bar active"
// //                     onClick={() => setIsFilterOpen(false)}
// //                   >
// //                     <button className="button"> Confirm </button>
// //                   </div>
// //                 </div>

// //                 <div className="searchpage-bar">
// //                   <button
// //                     className="button"
// //                     onClick={() => setIsFilterOpen(false)}
// //                   >
// //                     প্রয়োগ করুন
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="container">
// //                 <div
// //                   className="filter-header"
// //                   onClick={() => setIsFilterOpen(true)}
// //                 >
// //                   <div className="tab filter-tab">
// //                     <ul className="item-ani">
// //                       {tabs.map((tab) => (
// //                         <li
// //                           key={tab}
// //                           className={activeTab === tab ? "active" : ""}
// //                           onClick={() => setActiveTab(tab)}
// //                         >
// //                           {tab}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                     <div className="btn search-btn">
// //                       <span className="item-icon"></span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="tab-content tab-content-page">
// //               <div className="inner-wrap">
// //                 <div className="inner-box">
// //                   <div className="record-item item-title">
// //                     <div className="item platform">Platform</div>
// //                     <div className="item type">Game Type</div>
// //                     <div className="item bet">Turnover</div>
// //                     <div className="item profit">Profit/Loss</div>
// //                   </div>

// //                   <div className="list list-betting-record">
// //                     {records.map((record) => (
// //                       <React.Fragment key={record.id}>
// //                         <div className="date-title">
// //                           <div className="date">
// //                             <span className="item-icon"></span>
// //                             {record.date}
// //                           </div>
// //                           <div className="time-zone">GMT+6</div>
// //                         </div>
// //                         <div className="list-content">
// //                           <div
// //                             className="record-item"
// //                             onClick={() => viewRecordDetails(record)}
// //                           >
// //                             <div className="item platform">
// //                               {record.site}
// //                               {/* {console.log(record)} */}
// //                             </div>
// //                             <div className="item type">{record.product}</div>
// //                             <div className="item bet">
// //                               <i>{record.totalTurnover}</i>
// //                             </div>
// //                             <div
// //                               className={`item profit ${
// //                                 record.totaPayout < 0 ? "negative" : "positive"
// //                               }`}
// //                             >
// //                               <i
// //                                 style={{
// //                                   color:
// //                                     record.totaPayout < 0 ? "red" : "inherit",
// //                                 }}
// //                               >
// //                                 ({record.totalBet})
// //                               </i>
// //                             </div>
// //                             <div className="list-arrow"></div>
// //                           </div>
// //                         </div>
// //                       </React.Fragment>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Filter Panel */}

// //           {/* Record Details Dialog */}
// //           {showRecordDetails && selectedRecord && (
// //             <div className="popup">
// //               <div className="popup__content">
// //                 <div className="dialog-wrap">
// //                   <div className="top-bar">
// //                     <div className="bar-title">Betting Records</div>
// //                     <div
// //                       className="back-btn"
// //                       onClick={() => setShowRecordDetails(false)}
// //                     ></div>
// //                   </div>

// //                   <div className="betting-record-sum">
// //                     <div className="item platform">
// //                       <div className="title">Platform</div>
// //                       <div className="text">{selectedRecord.platform}</div>
// //                     </div>
// //                     <div className="item type">
// //                       <div className="title">Game Type</div>
// //                       <div className="text">{selectedRecord.gameType}</div>
// //                     </div>
// //                     <div className="item bet">
// //                       <div className="title">Turnover</div>
// //                       <div className="text">{selectedRecord.turnover}</div>
// //                     </div>
// //                     <div
// //                       className={`item profit ${
// //                         selectedRecord.profitLoss < 0 ? "negative" : ""
// //                       }`}
// //                     >
// //                       <div className="title">Profit/Loss</div>
// //                       <div className="text">
// //                         <i
// //                           style={{
// //                             color:
// //                               selectedRecord.profitLoss < 0 ? "red" : "inherit",
// //                           }}
// //                         >
// //                           ({Math.abs(selectedRecord.profitLoss)})
// //                         </i>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="record-item betting-record-list item-title">
// //                     <div className="item time">Txn Date</div>
// //                     <div className="item game">Game</div>
// //                     <div className="item bet">Turnover</div>
// //                     <div className="item profit">Profit/Loss</div>
// //                   </div>

// //                   <div className="list list-betting-record">
// //                     <div className="list-bar">
// //                       <div className="date-title">
// //                         <div className="date">
// //                           <span className="item-icon"></span>
// //                           {selectedRecord.date}
// //                         </div>
// //                         <div className="time-zone">GMT+6</div>
// //                       </div>
// //                       <div className="tip-area">
// //                         <div className="tip-icon"></div>
// //                         <div className="tip-box">
// //                           <span>Revocation</span>
// //                           <span>Void</span>
// //                           <span>Refund</span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="list-content">
// //                       <ul>
// //                         {console.log(selectedRecord)}
// //                         {selectedRecord?.records?.map((betTxnRecord, index) => (
// //                           <li
// //                             key={index}
// //                             className="betting-record-list record-item settled"
// //                           >
// //                             {console.log(betTxnRecord)}
// //                             <div className="item time">
// //                               {betTxnRecord.end_time}
// //                             </div>
// //                             <div className="item game">
// //                               {console.log(betTxnRecord)}
// //                               {betTxnRecord.gameName}
// //                             </div>
// //                             <div className="item bet">
// //                               <i>{betTxnRecord.turnover}</i>
// //                             </div>
// //                             <div
// //                               className={`item profit ${
// //                                 betTxnRecord.bet < 0 ? "negative" : "positive"
// //                               }`}
// //                             >
// //                               <i
// //                                 style={{
// //                                   color:
// //                                     betTxnRecord.bet > 0 ? "red" : "inherit",
// //                                 }}
// //                               >
// //                                 (
// //                                 {betTxnRecord.bet > 0
// //                                   ? betTxnRecord.bet.toFixed(2)
// //                                   : "0"}
// //                                 )
// //                               </i>
// //                             </div>
// //                             <div className="item-status">
// //                               <div className="tags">Settled</div>
// //                             </div>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const FilterGroup = ({ title, type, options, selected, onChange }) => (
// //   <div className="search-checkbox-group">
// //     <h2>{title}</h2>
// //     <ul>
// //       {options.map((option) => (
// //         <li key={option.value} onClick={() => onChange(option.value)}>
// //           {/* Use value as key */}
// //           <input
// //             type={type}
// //             name={title}
// //             checked={
// //               type === "radio"
// //                 ? selected === option.label
// //                 : selected.includes(option.label)
// //             }
// //           />
// //           <label>{option.label}</label> {/* Render label property */}
// //         </li>
// //       ))}
// //     </ul>
// //   </div>
// // );
