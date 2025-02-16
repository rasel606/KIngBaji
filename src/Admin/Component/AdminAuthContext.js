import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { CreateUser, LoginUser, verify } from '../Component/AdminAxiosAPIService';

const AdminAuthContext = createContext();

export const useAuthenticAdmin = () => useContext(AdminAuthContext);

const AuthAdminContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authAdminToken') || null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);




  const verifyAdminUser = async (token) => {
    if (!token) return;
    const data = await verify(token);
    if (data.message === 'User authenticated') {
      setIsAuthenticated(true);
     
      console.log(data)
    } else {
      setIsAuthenticated(false);
    }
}
  
  // Effect to handle token verification on app load
  useEffect(() => {
    const token = localStorage.getItem('authAdminToken');
    if (token) {
      setLoading(true); // Ensure loading state is managed properly
      axios
        .get('http://localhost:5000/api/v1/verify', {
          headers: { Authorization: `${token}`, 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setIsAuthenticated(true);
          setEmail(response.data.userId);
          
        })
        .catch(() => {
          setIsAuthenticated(false);
          setEmail(null);
          setLoading(true)
          
        })
        .finally(() => setLoading(false)); // End loading after verification
    } else {

      setLoading(false); // No token case
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Login function
  



  
  const adminlogin = async (userId, password) => {
    
    try {
      
      const response = await LoginUser( userId, password);
      console.log(response)
      localStorage.setItem('authAdminToken', response.data.token);
      console.log(response.data)
      console.log(response.data.user[0].userId)
      setIsAuthenticated(true);
      setEmail(response.data.userId[0].userId);
      console.log(response.data.userId[0].userId);

      setToken(token)
      if(localStorage.getItem('authAdminToken')){
        return response.data.token
      }
      
      
      
    } catch (error) {
      console.error(error);
      
    }
  };
  // const userRegistar = async (data) => {
  //   console.log(data)
  //   try {
  //     console.log(data)
  //     const response = await CreateUser(data);
  //     console.log(response)
      
  //     localStorage.setItem('authToken', response.data.token);
  //     setIsAuthenticated(true);
  //     setUserId(response.data.userId[0].userId);
  //     setToken(token)
  //     closeModal()
  //   } catch (error) {
  //     console.error(error);
  //     openModal("LoginModel")
  //   }
  // };

  

  const logout = () => {
    localStorage.removeItem('authAdminToken');
    setIsAuthenticated(false);
    setEmail(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated,  adminlogin, logout ,verifyAdminUser,token,email , loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export default AuthAdminContextProvider;
