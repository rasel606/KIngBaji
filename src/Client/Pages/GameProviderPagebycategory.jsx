import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Component/AuthContext";
import { useModal } from "../Component/ModelContext";
import axios from "axios";
export default ({ modalName }) => {
  // const { activeModal, openModal, closeModal } = useModal();
  // if (activeModal !== modalName) return null;
  const [activeTab, setActiveTab] = useState("All");
  const [data, setData] = useState([]);
  const [GameData, setGameData] = useState([]);
  const [playGameData, setplayGameData] = useState();
  const [Loading, setLoading] = useState(true);
  const { category_name, providercode } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated, loginUser, logoutUser, verifyUser,token,userDeatils ,userId } =
  useAuth();
  const decodedCategory = decodeURIComponent(category_name);
  const decodedProvider = decodeURIComponent(providercode);

  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState([providercode]);

  console.log("user", userId);

  const handleOpenPopup = () => {


    window.open(
      `${playGameData.gameUrl}`, // URL of the popup page
      "_blank", // Open in new tab/popup
      "width=600,height=400"
    );
  };

  useEffect(() => {
    const url = `http://localhost:6000/api/v1/New-table-Games-with-Providers?category=${category_name}`;
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setData(data[0].uniqueProviders);
        console.log(data[0].uniqueProviders);
      });
  }, []);

  useEffect(() => {
    const url = `http://localhost:6000/api/v1/New-Games-with-Providers-By-Category?category=${category_name}&provider=${active}`;
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setGameData(data);
        // console.log(data);
      });
  }, [active, category_name]);

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    setActive(item);
  };

  const handleplay = (userId, game_id) => {
    console.log(userId, game_id);

    const url = `http://localhost:6000/api/v1/launch_game`;
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, game_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setplayGameData(data);
        // openModal("GamePlay");
        console.log(data);
        setShowPopup(true);
      });
  };
  const [balance, setBalance] = useState(userDeatils.balance);


  const handleRefresh = async (userId) => {
    
    try {
      const response = await axios.post("http://localhost:6000/api/v1/user_balance", { userId });
      setBalance(response.data.balance);
      if(response.data.balance){
        verifyUser(token)
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
    
  };

const handelShowPopup =()=>{

  
  setShowPopup(false);
}
useEffect(() => {
  if (!showPopup) {
    handleRefresh(userId);
  }
}, []);

  console.log(playGameData);

  return (
    <div className="wrap">
      <div className="content">
        <div className="main-content">
          <div className="content-box">
            <div className="games">
              {/* <div
                className="jackpot"
                style={{
                  backgroundImage:
                    "url(https://img.c88rx.com/cx/h5/assets/images/games-jackpot-bg.jpg?v=1739269017539)",
                }}
              >
                <div className="text">
                  <h2>মোট জ্যাকপট</h2>
                  <span>৳ ৫৩,৯৬,১৮,৭৩২.৭৩</span>
                </div>
              </div> */}

              {/* <div className="search_tabs">

                <ul className="nav nav-tabs nav-auto">
                  {providers.map((provider, index) => (
                    <li className="nav-item" key={index}>
                      <button
                        className={`nav-link ${
                          activeTab === provider ? "active" : ""
                        }`}
                        onClick={() => handleTabClick(provider)}
                      >
                        {provider}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    <div className="search_game">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search game here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
              <div
                className={` nav nav-category  nav-auto`}
                style={{ height: "35px", marginTop: "2px" }}
              >
                {data.map((item, index) => (
                  <div
                    className={`btn ${index === activeIndex ? "selected" : ""}`}
                    key={index}
                    onClick={() => handleItemClick(index, item.providercode)}
                  >
                    <div className="icon">
                      <p>{item.providercode}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="game-list"> */}
              <div className="games-main">
                {GameData?.map((game, index) => (
                  <div className="games-box" key={index}>
                    <div
                      className="pic"
                      onClick={() =>
                        handleplay(userId, game.g_code) && { handleOpenPopup }
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
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      {showPopup && playGameData?.gameUrl && (
        <div className="modal-overlay" onClick={()=>handelShowPopup()}>
          <div onClick={(e) => e.stopPropagation()}>
            <div className="popup-page__main popup-page-main popup-page-main--show">
              <div className="popup-page-main__header new-login-tab">
                <div className="popup-page-main__title"> KingBaji </div>
                <div
                  className="popup-page-main__close"
                  onClick={()=>handelShowPopup()}
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
