import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Component/AuthContext";
import { useModal } from "../Component/ModelContext";
import axios from "axios";
import { UserAllDetails } from "../Component/Axios-API-Service/AxiosAPIService";
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
  const [categories, setCategories] = useState([]);


  console.log("user", userId);

  const handleOpenPopup = () => {


    window.open(
      `${playGameData.gameUrl}`, // URL of the popup page
      "_blank", // Open in new tab/popup
      "width=600,height=400"
    );
  };



  console.log(playGameData);

  useEffect(() => {
    const url = `https://kingbajiback.onrender.com/api/v1/New-table-Games-with-Providers?category=${category_name}`;
    const response = fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setData(data[0].uniqueProviders,data[0].categories);
        setCategories(data[0].categories[0].p_type);
        console.log(data[0].uniqueProviders,data[0].categories[0].p_type);
        
      });
  }, []);
  console.log(categories);
  useEffect(() => {
    const url = `https://kingbajiback.onrender.com/api/v1/New-Games-with-Providers-By-Category?category=${category_name}&provider=${active}&p_type=${categories}`;
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
        console.log(data);
      });
  }, [active, categories]);

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    setActive(item);
  };


  const [isPlaying, setIsPlaying] = useState(false);
    const [balance, setBalance] = useState(userDeatils.balance || 0);
const [userData, setUserData] = useState(userId);
const handleplay = async (userId, game_id, p_type, p_code) => {
  if (isPlaying) return; // Prevent multiple clicks
  
  setIsPlaying(true);
  setLoading(true);

  try {
    const response = await fetch("https://kingbajiback.onrender.com/api/v1/launch_gamePlayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, game_id, p_type, p_code }),
    });

    const data = await response.json();
    setplayGameData(data);
    console.log(data);

    if (data?.gameUrl) {
      setShowPopup(true);
    }
  } catch (error) {
    console.error("Error launching game:", error);
  } finally {
    setIsPlaying(false); // Reset after API call is complete
    setLoading(false);
  }
};
  
  

  // if(GameData?.length !== 0){
  //   setShowPopup(true);
  // }

  const handleRefresh = async (userId) => {
    
    try {
      handelUserDetails(userId)
      const response = await axios.post("https://kingbajiback.onrender.com/api/v1/user_balance", { userId });
      console.log(response.data);

    } catch (error) {
      console.error("Error fetching balance:", error);
    }
    
  };

  const handelUserDetails = async (userId) => {
      const result = await UserAllDetails(userId);
      // console.log( result = await UserAllDetails(userId))
      console.log(result.data.user.balance);
      setBalance(result.data.user.balance);
      setUserData(result.data.user.userId);
    }
const handelShowPopup =()=>{

  
  setShowPopup(false);
}
useEffect(() => {
  if (showPopup === false) {
    handleRefresh(userId);
  }
}, [showPopup,userData, userId,active,category_name]);

  // console.log(playGameData);

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
                    onClick={() => handleItemClick(index, item.providercode,item.category_name,item.p_type)}
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
                        handleplay(userId, game.g_code,game.p_type,game.p_code)
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
