import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useModal } from './ModelContext';
import { CreateUser, LoginUser, verify } from './Axios-API-Service/AxiosAPIService';

const GameContext = createContext();

export const useGames = () => useContext(GameContext);

const GameContextProvider = ({ children }) => {
  const [CategoryProvider, setCategoryProvider] = useState();
  const [Loading, setLoading] = useState(true);



  

    const FaceApi = async (url, updateBody, setLoading) => {
      try {
        setLoading(true);
  
        const data = null;
  
        if(updateBody){
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateBody),
          });
    
          const data = await response.json();
    console.log(data);
          setLoading(false);
          console.log(data);
          return data
        }
        else{
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          setLoading(false);
          console.log(data);
          return data
        }
  
        return data;
      } catch (error) {
        console.error("Error fetching games:", error);
        setLoading(false);
        return null;
      }
    };
  
  
    const FaceApiComponent = ({ url, updateBody, }) => {
      const [data, setData] = useState(null);
      
    
      console.log(url,updateBody)
      console.log(data)
      useEffect(() => {
        const fetchData = async () => {
          const result = await FaceApi(url, updateBody, setLoading);
          setData(result);
        };
    
        fetchData();
        
      }, [url, updateBody]);
  
      return data
    }
 
  return (
    <GameContext.Provider value={{FaceApiComponent,Loading }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
