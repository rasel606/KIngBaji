import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";
import { UserAllDetails } from "../Component/Axios-API-Service/AxiosAPIService";
import Footer from "./Footer";
import ProtectedRoute from "../Component/ProtectedRoute";

const GameBox = ({ game, onPlay }) => (
  <div className="games-box">
    <div className="pic" onClick={() => onPlay(game)}>
      <p>
        <img src={game?.imgFileName} alt={game.name} loading="lazy" />
      </p>
    </div>
    <div className="text">
      <h3>{game.gameName?.gameName_enus || game.name}</h3>
    </div>
  </div>
);

const JackpotBanner = ({ jackpotValues }) => (
  <div className="jackpot-banner-wrapper">
    <img
      className="jackpot-banner-img"
      src="https://img.s628b.com/upload/backgroundImgH5/image_244710.jpg"
      alt="Jackpot Banner"
    />
    <div className="game-jackpot-number-group">
      <p className="wide-to-narrow-grand">{jackpotValues?.grand}</p>
      <p className="wide-to-narrow-major">{jackpotValues?.major}</p>
      <p className="wide-to-narrow-mini">{jackpotValues?.mini}</p>
    </div>
  </div>
);

const SearchTab = ({
  providers,
  selectedProvider,
  onProviderChange,
  showSearch,
  setShowSearch,
}) => {
  const isAllSelected = selectedProvider === 'ALL' || 
                       (Array.isArray(selectedProvider) && selectedProvider.length === 0);

  return (
    <div className="tab search-tab ng-star-inserted">
      <ul className="item-ani">
        <li
          className={`condition-groups ng-star-inserted ${isAllSelected ? "active" : ""}`}
          onClick={() => onProviderChange("ALL")}
        >
          <div
            className="icon-all"
            style={{
              backgroundImage:
                'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-filter-all.svg?v=1745315543147")',
            }}
          />
          <p>ALL</p>
        </li>
        {providers.map((provider) => (
          <li
            key={provider._id}
            className={`condition-groups ${
              Array.isArray(selectedProvider) && 
              selectedProvider.includes(provider.providercode) ? "active" : ""
            } ng-star-inserted`}
            onClick={() => onProviderChange(provider.providercode)}
          >
            <div className="provider-label">{provider.company}</div>
          </li>
        ))}
      </ul>
      <div
        className="btn search-btn ng-star-inserted"
        onClick={() => setShowSearch(!showSearch)}
      >
        <span
          className="item-icon ng-star-inserted"
          style={{
            maskImage:
              'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1745315543147")',
          }}
        />
      </div>
    </div>
  );
};

const SortBar = ({ sortOption, setSortOption }) => {
  const sortOptions = [
    { id: "recommend", label: "Recommend" },
    { id: "latest", label: "Latest" },
    { id: "favorite", label: "Favorite" },
    { id: "aZ", label: "A-Z" },
  ];

  return (
    <div className="sort-bar ng-star-inserted">
      <div className="sort-bar__title">
        <span>Slots</span>
      </div>
      <div className="sort-bar__box">
        <div className="sort-bar__btn">
          <span className="ng-star-inserted">Filter</span>
          <span className="arrow" style={{ maskImage: 'url("")' }} />
        </div>
        <ul className="sort-bar__select">
          {sortOptions.map((option) => (
            <li
              key={option.id}
              className={`sort-bar__select__item ng-star-inserted ${
                sortOption === option.id ? "active" : ""
              }`}
              onClick={() => setSortOption(option.id)}
            >
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SearchPage = ({
  showSearch,
  setShowSearch,
  providers,
  selectedProvider,
  onProviderChange,
  searchQuery,
  setSearchQuery,
}) => (
  <div className={`searchpage ${showSearch ? "active" : ""}`}>
    <div className="search-top-info">
      <div className="back" onClick={() => setShowSearch(false)}>
        <span className="item-icon"></span> Back
      </div>
      <div
        className="icon-search"
        style={{
          maskImage:
            'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-search-type02.svg?v=1745315543147")',
        }}
      ></div>
      <input
        type="text"
        placeholder="Search Games"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="searchpage-main">
      <div className="search-checkbox-group check-group">
        <h2>Providers</h2>
        <ul>
          {providers.map((provider) => (
            <li key={provider._id}>
              <input
                type="checkbox"
                id={`search-${provider.providercode}`}
                checked={selectedProvider.includes(provider.providercode)}
                onChange={() => onProviderChange(provider.providercode)}
              />
              <label htmlFor={`search-${provider.providercode}`}>
                {provider.company}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="search-checkbox-group check-group">
        <h2>GameCategoryType</h2>
        <ul>
          <li>
            <input type="radio" id="category-slots" checked={true} readOnly />
            <label htmlFor="category-slots">SLOTS</label>
          </li>
        </ul>
      </div>
    </div>

    <div className="searchpage-bar active">
      <button className="button" onClick={() => setShowSearch(false)}>
        Confirm
      </button>
    </div>
  </div>
);

export default  () => {
  const { userDeatils, isLoginNotify, setIsLoginNotify } = useAuth();
  const [data, setData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [balance, setBalance] = useState(userDeatils?.balance || 0);
  const [gameWindow, setGameWindow] = useState(null);
  const [playGameData, setPlayGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { category_name, providercode } = useParams();
  const [selectedProvider, setSelectedProvider] = useState(providercode ? [providercode] : 'ALL');
  const [categories, setCategories] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sortOption, setSortOption] = useState();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef();
  const limit = 24;
  const userId = userDeatils?.userId;
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [jackpotValues, setJackpotValues] = useState({
    grand: "89,918.18",
    major: "10,480.47",
    mini: "827.91",
  });

  // Filter games based on sort option
  useEffect(() => {
    let sortedGames = [...gameData];

    switch (sortOption) {
      case "latest":
        sortedGames.sort(
          (a, b) => new Date(b.updatetimestamp) - new Date(a.updatetimestamp)
        );
        break;
      case "favorite":
        // Implement favorite sorting logic if needed
        break;
      case "aZ":
        sortedGames.sort((a, b) =>
          (a.gameName?.gameName_enus || "").localeCompare(
            b.gameName?.gameName_enus || ""
          )
        );
        break;
      default: // recommend
        sortedGames.sort((a, b) => a.serial_number - b.serial_number);
    }

    setFilteredGames(sortedGames);
  }, [sortOption, gameData]);

  // Fetch category data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.kingbaji.live/api/v1/New-table-Games-with-Providers?category=${category_name}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        setLoading(false);
        setData(data[0]?.uniqueProviders || []);
        setCategories(data[0]?.categories?.[0]?.p_type || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [category_name]);

  // Handle provider selection change
  const handleProviderChange = (provider) => {
    if (provider === 'ALL') {
      setSelectedProvider('ALL');
    } else {
      setSelectedProvider(prev => {
        if (prev === 'ALL') {
          return [provider];
        }
        if (Array.isArray(prev)) {
          return prev.includes(provider) ? 
            prev.filter(p => p !== provider) : 
            [...prev, provider];
        }
        return [provider];
      });
    }
    // Reset pagination
    
  };

  // Fetch games with pagination
  const fetchGames = async () => {
    if (!categories) return;

    try {
      const params = {
        category: category_name,
        page: page,
        provider: selectedProvider === 'ALL' ? [] : selectedProvider,
        gameName: searchQuery,
        sortBy: sortOption,
      };

      const res = await axios.get(
        `https://api.kingbaji.live/api/v1/New-Games-with-Providers-By-Category`,
        { params }
      );
      const result = await res.data
      console.log(result.data);
      console.log("result.data",result.data.length);
      if (result.success) {
        if (result.data.length < limit) setHasMore(false);
        setGameData((prev) => [...prev, ...result.data]);

        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setGameData([]);
    setHasMore(true);
  }, [selectedProvider]);
  // useEffect(() => {
  //   if (page === 1) fetchGames(); // initial
  // }, [categories, selectedProvider]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchGames();
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [gameData, hasMore]);
  // Initial fetch when filters change
 

  // Handle game play
  const handlePlay = async (game) => {
    if (isPlaying) return;
    if (!userDeatils) {
      setIsLoginNotify("Please login to play games. If you don't have an account, sign up for free!");
      return;
    }

    setIsPlaying(true);
    setLoading(true);

    try {
      if (userId) {
        const response = await fetch(
          "https://api.kingbaji.live/api/v1/launch_gamePlayer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              userId,
              game_id: game.g_code,
              p_type: game.p_type,
              p_code: game.p_code,
            }),
          }
        );

        const data = await response.json();

        if (data.errMsg === "Success" && userId) {
          console.log(data);
          setPlayGameData(data);
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error("Error launching game:", error);
      // setError(error);
    } finally {
      setIsPlaying(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (gameWindow && !gameWindow.closed) {
        gameWindow.close();
      }
    };
  }, [gameWindow]);

  /** 🚀 Refresh Balance */
  const handleRefresh = async (userId) => {
       if (!userDeatils?.userId) {
      setIsLoginNotify(true);
      return;
    }
    try {
      await handelUserDetails(userId);
      // if(userId){
      const response = await axios.post(
        "https://api.kingbaji.live/api/v1/user_balance",
        { userId }
      );
      setBalance(response.data.balance);
      console.log("Balance Data:", response.data);
      // }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  /** 🚀 Fetch User Details */
  const handelUserDetails = async (userId) => {
    const result = await UserAllDetails(userId);
    setBalance(result.data.user.balance);
  };

  /** 🚀 Handle Popup Close */
  const handleClosePopup = () => {
    setShowPopup(false);
    handleRefresh(userId);
  };

  useEffect(() => {
    if (!showPopup && userId) {
      handleRefresh(userId);
    }
  }, [showPopup, userId]);

  return (
    <div className="content mcd-style">
      <div className="ng-trigger ng-trigger-routeLayoutPageAni">
        <div className="content-main ng-star-inserted">
          <div className="content-box">
            <div className="games">
              <JackpotBanner jackpotValues={jackpotValues} />

              <SearchTab
                providers={data}
                selectedProvider={selectedProvider}
                onProviderChange={handleProviderChange}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
              />
              
              {showSearch && (
                <SearchPage
                  showSearch={showSearch}
                  setShowSearch={setShowSearch}
                  providers={data}
                  selectedProvider={selectedProvider}
                  onProviderChange={handleProviderChange}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}

              <SortBar sortOption={sortOption} setSortOption={setSortOption} />

              <div className="games-main">
                {gameData.map(
                  (game) => (
                    <GameBox key={game._id} game={game} onPlay={handlePlay} />
                  )
                )}
              </div>
               <div ref={loader} className="loading">
                {hasMore && <div className="list-loading"></div>}
                {!hasMore && <div className="prompt">－end of page－</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {showPopup && playGameData?.gameUrl && (
        <div className="popup-page-wrapper active" onClick={handleClosePopup}>
          <div
            className="popup-page show-toolbar popup-page--active popup-page--align-top"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-page__main popup-page-main popup-page-main--show">
              <div className="popup-page-main__header new-login-tab">
                <div className="popup-page-main__title">Game</div>
                <div
                  className="popup-page-main__close"
                  onClick={handleClosePopup}
                ></div>
              </div>
              <div className="popup-page-main__container">
                <iframe
                  src={playGameData.gameUrl}
                  title="Game"
                  width="100%"
                  height="100%"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

