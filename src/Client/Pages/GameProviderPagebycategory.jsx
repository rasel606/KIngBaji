import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";
import { UserAllDetails } from "../Component/Axios-API-Service/AxiosAPIService";
import Footer from "./Footer";
import ProtectedRoute from "../Component/ProtectedRoute";

const GameBox = ({ game, onPlay }) => (
  <div className="games-box">
    {console.log(game)}
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

const SearchTab = ({ providers, selectedProvider, onProviderChange }) => (
  <div className="tab search-tab ng-star-inserted">
    <ul className="item-ani">
      <li
        className={`condition-groups ng-star-inserted ${
          !selectedProvider ? "active" : ""
        }`}
        onClick={() => onProviderChange(null)}
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
            selectedProvider === provider.providercode ? "active" : ""
          } ng-star-inserted`}
          onClick={() => onProviderChange(provider.providercode)}
        >
          {console.log(provider.
providercode
)}
          <div className="provider-label">{provider.providercode}</div>
        </li>
      ))}
    </ul>
    <div className="btn search-btn ng-star-inserted">
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

const SortBar = () => (
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
        <li
          className="sort-bar__select__item ng-star-inserted"
          id="sort_recommend"
        >
          <span id="sort_recommend">Recommend</span>
        </li>
        <li
          className="sort-bar__select__item ng-star-inserted"
          id="sort_latest"
        >
          <span id="sort_latest">Latest</span>
        </li>
        <li
          className="sort-bar__select__item ng-star-inserted"
          id="sort_favorite"
        >
          <span id="sort_favorite">Favorite</span>
        </li>
        <li className="sort-bar__select__item ng-star-inserted" id="sort_aZ">
          <span id="sort_aZ">A-Z</span>
        </li>
      </ul>
    </div>
  </div>
);

export default () => {
    const { userDeatils} = useAuth();
  const [data, setData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [playGameData, setPlayGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { category_name, providercode } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(providercode);
  const [categories, setCategories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [balance, setBalance] = useState(userDeatils?.balance || 0);
  const [gameWindow, setGameWindow] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef();

    const userId = userDeatils?.userId;

  /** 🚀 Fetch Category Data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/New-table-Games-with-Providers?category=${category_name}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        console.log(data);
        console.log(data[0]?.uniqueProviders);
        setLoading(false);
        setData(data[0]?.uniqueProviders || []);
        setCategories(data[0]?.categories?.[0]?.p_type || []);
        console.log(data[0]?.categories?.[0]?.p_type || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [category_name]);

  /** 🚀 Fetch Games Based on Category */
  // useEffect(() => {
  //   fetchGames();
  // }, [selectedProvider, categories, category_name]);
  console.log(category_name, providercode );

  const fetchGames = async () => {
    if (!categories) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/New-Games-with-Providers-By-Category?category=${category_name}&provider=${selectedProvider}&page=${page}`
      );
      const result = await res.json();
console.log(result.data);
      if (result.success) {
        if (result.data.length < 24) setHasMore(false);
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
  useEffect(() => {
    if (page === 1) fetchGames(); // initial
  }, [categories, selectedProvider]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchGames();
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [gameData, hasMore]);

  /** 🚀 Handle Game Click */
  const handlePlay = async (game) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setLoading(true);

    try {
      if(userId)
        {const response = await fetch(
        "http://localhost:5000/api/v1/launch_gamePlayer",
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

      console.log(data);
      if (data.errMsg === "Success" && userId) {
        console.log(data);
        setPlayGameData(data);
        setShowPopup(true);
      }}
    } catch (error) {
      console.error("Error launching game:", error);
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
    try {
      await handelUserDetails(userId);
      // if(userId){
        const response = await axios.post(
          "http://localhost:5000/api/v1/user_balance",
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
              <SearchTab
                providers={data}
                selectedProvider={selectedProvider}
                onProviderChange={setSelectedProvider}
              />

              <SortBar />

              <div className="games-main">
                {
                  gameData?.map((game, index) => (
                    <div className="games-box">
                      {/* {console.log(game)} */}
                      <div className="pic" onClick={() => handlePlay(game)}>
                        <p>
                          <img
                            src={game?.imgFileName}
                            alt={game.name}
                            loading="lazy"
                          />
                        </p>
                      </div>
                      <div className="text">
                        <h3>{game.gameName?.gameName_enus || game.name}</h3>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div ref={loader} className="loading">
              {hasMore && <div className="list-loading"></div>}
                {!hasMore && <div className="prompt">－end of page－</div>}
              </div>
              {/* <div style={{ height: '10px', visibility: 'hidden' }}>anchor</div> */}
            </div>
          </div>
        </div>
      </div>
<Footer></Footer>
      {showPopup && playGameData?.gameUrl && (

        <div className="popup-page-wrapper active" onClick={handleClosePopup}>
          <div
            className="popup-page show-toolbar popup-page--active popup-page--align-top"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-page__main popup-page-main popup-page-main--show">
              <div className="popup-page-main__header new-login-tab">
                <div className="popup-page-main__title">KingBaji</div>
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



{/* <div className="popup-page-wrapper active" onClick={handleClosePopup}>
          <div
            className="popup-page show-toolbar popup-page--active popup-page--align-top"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-page__main popup-page-main popup-page-main--show">
              <div className="popup-page-main__header new-login-tab">
                <div className="popup-page-main__title">KingBaji</div>
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
        </div> */}