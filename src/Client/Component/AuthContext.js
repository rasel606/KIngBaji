import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useModal } from './ModelContext';
import { CreateUser, LoginUser, verify } from './Axios-API-Service/AxiosAPIService';



const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const { openModal, closeModal } = useModal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [userId, setUserId] = useState(null || "");
  const [userDeatils, setUserDeatils] = useState(null || "");
  const [loading, setLoading] = useState(true);

const [email, setEmail] = useState(null||"");
const [showPopup, setShowPopup] = useState(false);


console.log("isAuthenticated", userDeatils, userId, token);
console.log("isAuthenticated -1 ", userDeatils, );
console.log("isAuthenticated - 2", userId);
console.log("isAuthenticated - 3", token);





  const verifyUser = async (token) => {
    if (!token) return;
    console.log(token)
    const data = await verify(token);
    console.log(data)
    if (data.message === 'User authenticated') {
      setIsAuthenticated(true);
      setUserId(data.user.userId);
      setUserDeatils(data.user);
     
      console.log(data)
      return data
    } else {
      setIsAuthenticated(false);
    }
}

const verifyUserToken = async (token) => {
  if (!token) {
    console.log('No token found');
    setIsAuthenticated(false);
    setLoading(false);
    return;
  }

  setLoading(true);
  axios.get('https://api.kingbaji.live/api/v1/verify', {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
    .then((response) => {
      setIsAuthenticated(true);
      setUserId(response.data.userId);
      setUserDeatils(response.data.user);
      console.log(response.data.user);
    })
    .catch(() => {
      setIsAuthenticated(false);
      setUserId(null);
    })
    .finally(() => setLoading(false));
}


  useEffect(() => {
    verifyUserToken(token);
  }, [token,userId>0]); // Fix: Depend on token // Empty dependency array ensures this runs only once on mount

  // Login function
  



  const login = async (userId, password) => {
    try {
      console.log(userId, password);
      const response = await LoginUser(userId, password);
      console.log(response);
  
      const token = response.data.token;
      localStorage.setItem('token', token);
  
      console.log("Token",response,response.data)
      
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
      setUserId(response.data.user[0].userId);
      setToken(response.data.token);
      closeModal()
      return response
    } catch (error) {
      console.error(error);
    }
  };
  
  const userRegistar = async (data) => {
    console.log(data)
    try {
      console.log(data)
      const response = await CreateUser(data);
      console.log(response)
      
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
      setUserId(response.data.user.userId);
      setToken(response.data.token);
      closeModal()
      localStorage.removeItem('referralCode');
      // return response
    } catch (error) {
      console.error(error);
      
    }
  };


  console.log("isAuthenticated", userDeatils);

  const logout = async () => {
    await localStorage.removeItem('authToken');
   
    setIsAuthenticated(false);
    
    setUserId(null);
    setEmail(null);
    closeModal()
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,verifyUser,userRegistar,token, userId, userDeatils , loading,setLoading}}>
      {children}

    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
