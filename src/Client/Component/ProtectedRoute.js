import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
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
      userDetails,
setIsLoginNotify,
      token,
      userDeatils,
      userId,
      loading,
      setLoading,
    } = useAuth();
    const { activeModal,openModal, closeModal } = useModal();


  // const { userDetails, setIsLoginNotify } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!userDetails) {
       setIsLoginNotify("আপনাকে লগইন করতে হবে খেলার জন্য যদি এখনো আপনার একাউন্ট না থাকে আমাদের সাথে। শুধু সাইন আপ করুন আমাদের সাথে। এটা একেবারেই ফ্রী!");
    }
  }, [userDetails, setIsLoginNotify]);

  return userDetails ? children : <Navigate to="/" state={{ from: location }} replace />;
};

