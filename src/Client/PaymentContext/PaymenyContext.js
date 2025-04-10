import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useModal } from '../Component/ModelContext';
// import { CreateUser, LoginUser, verify } from './Axios-API-Service/AxiosAPIService';
import { use } from 'react';
import { useAuth } from '../Component/AuthContext';

const PaymentContext = createContext();

export const usePayNow = () => useContext(PaymentContext);

const PaymenyContextProvider = ({ children }) => {
  const { openModal, closeModal } = useModal();

  let [amount, setAmountPay] = useState(0);
    const {
      isAuthenticated,
      userDeatils,
      userId,
    } = useAuth();

  const [gateway_name, setGateway_name] = useState([]);
  const [gateway_Number, setGateway_Number] = useState(null );
  const [payment_type, setPayment_type] = useState("deposit");
  const [referredbyCode, setreferredbyCode] = useState(userDeatils.referredbyCode);
  
  // const [selectedPayment, setSelectedPayment] = useState(null );
  // const [showVerification, setShowVerification] = useState(false);
  const[loading,setLoading]=useState(true)

  
  // const paydata = {
  //   userId: userId,
  //   amount: amount,
  //   gateway_name: Payment === null  ? paymentMethods[0]?.gateway_name :  Payment?.gateway_name,
  //   gateway_Number: Payment === null  ? paymentMethods[0]?.gateway_Number :  Payment?.gateway_Number,
  //   payment_type: Payment === null  ? paymentMethods[0]?.payment_type :  Payment?.payment_type,
  //   referredbyCode: userDeatils.referredbyCode
    
  // };



  return (
    <PaymentContext.Provider value={{
      gateway_name,
      gateway_Number,
      payment_type,
      amount,
      setAmountPay,
      setGateway_name,
      setGateway_Number,
      setPayment_type,
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export default PaymenyContextProvider;
