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
      Token,

      token,
      userDeatils,
      userId,
      loading,
      setLoading,
    } = useAuth();
    const { activeModal,openModal, closeModal } = useModal();
  // const {  activeModal, openModal, closeModal  } = useModal();
  const [showPopup, setShowPopup] = useState(false);

 if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!isAuthenticated && !loading) {
    openModal('login');
    return <Navigate to="/" />;
  }
  

  return children;
};

