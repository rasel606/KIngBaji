import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useModal } from './ModelContext';
export default ({
  modalName, children
}) => {
    const {
      isAuthenticated,
      loginUser,
      logoutUser,
      verifyUserToken,
      verifyUser,
      token,
      userDeatils,
      userId,
      loading,
      setLoading,
    } = useAuth();
    const { activeModal,openModal, closeModal } = useModal();
  // const {  activeModal, openModal, closeModal  } = useModal();
  const [showPopup, setShowPopup] = useState(false);

  // const isAuthenticated = () => {
  //   return !!localStorage.getItem('token');
  // };

  if (!isAuthenticated) {
    
    return openModal('login');
  }

  return children;
};

