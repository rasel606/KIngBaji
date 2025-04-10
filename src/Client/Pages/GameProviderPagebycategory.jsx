import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Component/AuthContext";
import axios from "axios";
import { UserAllDetails } from "../Component/Axios-API-Service/AxiosAPIService";

export default () => {
  const [data, setData] = useState([]);
  const [GameData, setGameData] = useState([]);
  const [playGameData, setPlayGameData] = useState();
  const [loading, setLoading] = useState(true);
  const { category_name, providercode } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const { userDeatils, userId } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState([providercode]);
  const [categories, setCategories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [balance, setBalance] = useState(userDeatils.balance || 0);
  const [userData, setUserData] = useState(userId);

  console.log("User ID:", userId);

  /** 🚀 Fetch Category Data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://35.207.202.6:5000/api/v1/New-table-Games-with-Providers?category=${category_name}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        setLoading(false);
        setData(data[0].uniqueProviders, data[0].categories);
        setCategories(data[0].categories[0].p_type);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [category_name]);

  /** 🚀 Fetch Games Based on Category */
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `http://35.207.202.6:5000/api/v1/New-Games-with-Providers-By-Category?category=${category_name}&provider=${active}&p_type=${categories}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        setLoading(false);
        setGameData(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [active, categories]);

  /** 🚀 Handle Game Click */
  const handlePlay = async (userId, game_id, p_type, p_code) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setLoading(true);

    try {
      const response = await fetch(
        "http://35.207.202.6:5000/api/v1/launch_gamePlayer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, game_id, p_type, p_code }),
        }
      );
      console.log(response);
      const data = await response.json();
      setPlayGameData(data);
      console.log(data);
      if (data?.gameUrl) {
        const gameUrl = data.gameUrl;

        // Extract cert and key from the URL using regex
        const certMatch = gameUrl.match(/cert=([^&]+)/);
        const keyMatch = gameUrl.match(/key=([^&]+)/);

        if (certMatch && keyMatch) {
          const cert = certMatch[1];
          const key = keyMatch[1];

          console.log("Extracted cert:", cert);
          console.log("Extracted key:", key);

          // Navigate to a new page with cert and key as query params
          window.location.href = data.gameUrl;
        } else if (data?.gameUrl) {
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error("Error launching game:", error);
    } finally {
      setIsPlaying(false);
      setLoading(false);
    }
  };

  /** 🚀 Refresh Balance */
  const handleRefresh = async (userId) => {
    try {
      await handelUserDetails(userId);
      const response = await axios.post(
        "http://35.207.202.6:5000/api/v1/user_balance",
        { userId }
      );
      console.log("Balance Data:", response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  /** 🚀 Fetch User Details */
  const handelUserDetails = async (userId) => {
    const result = await UserAllDetails(userId);
    setBalance(result.data.user.balance);
    setUserData(result.data.user.userId);
  };

  /** 🚀 Handle Popup Close */
  const handleClosePopup = () => {
    setShowPopup(false);
    handleRefresh(userId);
  };

  useEffect(() => {
    if (!showPopup) {
      handleRefresh(userId);
    }
  }, [showPopup, userData, userId, active, category_name]);

  return (
    <div className="wrap">
      <div className="content">
        <div className="main-content">
          <div className="content-box">
            <div className="games">
              <div
                className="nav nav-category nav-auto"
                style={{ height: "35px", marginTop: "2px" }}
              >
                {data.map((item, index) => (
                  <div
                    className={`btn ${index === activeIndex ? "selected" : ""}`}
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      setActive(item.providercode);
                    }}
                  >
                    <div className="icon">
                      <p>{item.providercode}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="games-main">
                {GameData?.map((game, index) => (
                  <div className="games-box" key={index}>
                    <div
                      className="pic"
                      onClick={() =>
                        handlePlay(
                          userId,
                          game.g_code,
                          game.p_type,
                          game.p_code
                        )
                      }
                    >
                      <p>
                        <img
                          src={game?.imgFileName}
                          alt={game.name}
                          loading="lazy"
                        />
                      </p>
                    </div>
                    <div className="text">
                      <h3>{game.gameName.gameName_enus}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && playGameData?.gameUrl && (
        <div className="popup-page-wrapper active" onClick={handleClosePopup}>
          <div    className="popup-page show-toolbar popup-page--active popup-page--align-top" onClick={(e) => e.stopPropagation()}>
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
                  height="500px"
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
