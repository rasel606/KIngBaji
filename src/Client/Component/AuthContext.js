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
  const [userId, setUserId] = useState("");
  const [userDeatils, setUserDeatils] = useState(null || "");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoginNotify, setIsLoginNotify] = useState(false);
  const [isPasswordresetNotify, setIsPasswordresetNotifyNotify] = useState(false);
  const [isAmountAlertError,setIsAmountAlertError] = useState(false);
  const [email, setEmail] = useState(null || "");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");



  console.log("isAuthenticated", userDeatils, userId, token);
  console.log("isAuthenticated -1 ", userDeatils,);
  console.log("isAuthenticated - 2", userId);
  console.log("isAuthenticated - 3", token);





 useEffect(() => {
  const  verifyUser= async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        await verify(token);
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      }
    }
    setLoading(false);
  };
  
  verifyUser();
}, [loading,name,birthday]);

  const Token = async (token) => {
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
    if (token) {
      Token(token);
    } else {
      setLoading(false);
    }
  }, [token,name,birthday]); // Fix: Depend on token // Empty dependency array ensures this runs only once on mount

  // Login function




  const login = async (userId, password) => {
    try {
      console.log(userId, password);
      const response = await LoginUser(userId, password);
      console.log(response);
      const token = response.data.token;
      const userData = response.data.user; // Get user object directly from response

      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      setUserId(userData.userId);
      setToken(token);

      // Set complete user details from response
      setUserDeatils({
        userId: userData.userId,
        phone: userData.phone,
        balance: userData.balance,
        referralCode: userData.referralCode,
        // ... include other necessary fields ...
      });

      closeModal();
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Propagate error for handling in components
    }
  };

  const userRegistar = async (data) => {
    console.log(data)
    try {
      console.log(data)
      const response = await CreateUser(data);
      console.log(response.data)
      const token = response.data.token;
      const userData = response.data.user;
      localStorage.setItem('authToken', response.data.token);
      if (response.data.token) {
        localStorage.removeItem('referralCode');
      }
      setIsAuthenticated(true);
      setUserId(response.data.user.userId);
      setToken(response.data.token);
      setUserDeatils({
        userId: userData.userId,
        phone: userData.phone,
        balance: userData.balance,
        referralCode: userData.referralCode,
        // ... include other necessary fields ...
      });
// setIsRegistrationSuccess(false)
   
      return response;

      // return response
    } catch (error) {
      console.error(error);

    }
  };


  console.log("isAuthenticated", userDeatils);

  const logout = async () => {
    await localStorage.removeItem('authToken');

    setIsAuthenticated(false);
    setUserDeatils(null);
    setToken(null);
    setUserId(null);
    setEmail(null);
    closeModal()
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRegistar, token, userId, userDeatils, loading, setLoading,isAmountAlertError,setIsAmountAlertError,isLoginNotify, setIsLoginNotify,isPasswordresetNotify, setIsPasswordresetNotifyNotify,name, setName ,birthday, setBirthday

    }}>
      {children}

    </AuthContext.Provider>
  );
}

export default AuthContextProvider;