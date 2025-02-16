import React from 'react';
import { Navigate } from 'react-router-dom';
export default ({
  modalName
}) => {

  const {  activeModal, openModal, closeModal  } = useModal();
  if (activeModal !== modalName) return null;
  const isAuthenticated = localStorage.getItem('token'); // Check token for auth
  return isAuthenticated ? children : openModal("LoginModel");
};
