import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useModal } from './ModelContext';
import { CreateUser, LoginUser, UserAllDetails, verify } from './Axios-API-Service/AxiosAPIService';
import { useAuth } from './AuthContext';

const GameContext = createContext();

export const useGames = () => useContext(GameContext);

const GameContextProvider = ({ children }) => {
  // const { userDeatils, isLoginNotify, setIsLoginNotify } = useAuth();
  const [CategoryProvider, setCategoryProvider] = useState();
  const [Loading, setLoading] = useState(true);

//  const userId = userDeatils?.userId;

  //  const [data, setData] = useState([]);
  //  const [gameData, setGameData] = useState([]);
  //  const [isPlaying, setIsPlaying] = useState(false);
  //  const [balance, setBalance] = useState(0);
  //  const [gameWindow, setGameWindow] = useState(null);
  //  const [playGameData, setPlayGameData] = useState(null);
  // //  const [loading, setLoading] = useState(true);
  //  const [showPopup, setShowPopup] = useState(false);

  // /** 🚀 Handle Game Click */
  // const handlePlay = async (game) => {
  //   if (isPlaying) return;
  //   // if (!userDeatils?.userId) {
  //   //   setIsLoginNotify(true);
  //   //   return;
  //   // }

  //   setIsPlaying(true);
  //   setLoading(true);

  //   try {
  //     if (userId) {
  //       const response = await fetch(
  //         "https://api.kingbaji.live/api/v1/launch_gamePlayer",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //           body: JSON.stringify({
  //             userId,
  //             game_id: game.g_code,
  //             p_type: game.p_type,
  //             p_code: game.p_code,
  //           }),
  //         }
  //       );

  //       const data = await response.json();

  //       if (data.errMsg === "Success" && userId) {
  //         console.log(data);
  //         setPlayGameData(data);
  //         setShowPopup(true);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error launching game:", error);
  //     // setError(error);
  //   } finally {
  //     setIsPlaying(false);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   return () => {
  //     if (gameWindow && !gameWindow.closed) {
  //       gameWindow.close();
  //     }
  //   };
  // }, [gameWindow]);

  // /** 🚀 Refresh Balance */
  // const handleRefresh = async (userId) => {
  //     //  if (!userDeatils?.userId) {
  //     // setIsLoginNotify(true);
  //     // return;
  //   }
  //   try {
  //     await handelUserDetails(userId);
  //     // if(userId){
  //     const response = await axios.post(
  //       "https://api.kingbaji.live/api/v1/user_balance",
  //       { userId }
  //     );
  //     setBalance(response.data.balance);
  //     console.log("Balance Data:", response.data);
  //     // }
  //   } catch (error) {
  //     console.error("Error fetching balance:", error);
  //   }
  // };

  // /** 🚀 Fetch User Details */
  // const handelUserDetails = async (userId) => {
  //   const result = await UserAllDetails(userId);
  //   setBalance(result.data.user.balance);
  // };

  // /** 🚀 Handle Popup Close */
  // const handleClosePopup = () => {
  //   setShowPopup(false);
  //   handleRefresh(userId);
  // };

  // useEffect(() => {
  //   if (!showPopup && userId) {
  //     handleRefresh(userId);
  //   }
  // }, [showPopup, userId]);
 
  return (
    <GameContext.Provider value={{ }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
