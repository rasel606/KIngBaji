import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useModal } from '../Component/ModelContext';
// import { CreateUser, LoginUser, verify } from './Axios-API-Service/AxiosAPIService';
import { use } from 'react';
import { useAuth } from '../Component/AuthContext';
import { GatWaySystem } from '../Component/Axios-API-Service/AxiosAPIService';

const PaymentContext = createContext();

export const usePayNow = () => useContext(PaymentContext);

const PaymenyContextProvider = ({ children }) => {
  const { openModal, closeModal } = useModal();
  const [paymentMethods, setpaymentMethods] = useState([]);
  console.log(paymentMethods);
  const [showAmountLimit, setShowAmountLimit] = useState(false);

  const {
    isAuthenticated,
    userDeatils,

    token
  } = useAuth();

  const userId = userDeatils?.userId || "";
  // const referredBy = userDeatils?.referredBy || "";


  const data = {
    userId: userId,
  };


  const [paymentMethodDeglaration, setpaymentMethodsdeglaration] = useState(paymentMethods[0]);

  useEffect(() => {
    setpaymentMethodsdeglaration(paymentMethods[0])
  }, [paymentMethods]);
  console.log(paymentMethodDeglaration)
  useEffect(() => {
    // Fetch gateway list from backend on component mount
    const fetchGateways = async () => {

      try {
        if (isAuthenticated) {
          const response = await GatWaySystem(data);
          setpaymentMethods(response?.data?.paymentMethods);
          // setGatewaysCount(response.data.Getwaycount);
          console.log(response.data.paymentMethods);
          if (response?.data.paymentMethods?.length > 0) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching gateways:", error);
      }
    };




    fetchGateways();

  }, [isAuthenticated, token]);



  const [Payment, setPayment] = useState(paymentMethods[0])
  console.log(Payment);
  const [newAmount, setNewAmountPay] = useState(0);
  const [gateway_name, setGateway_name] = useState([]);
  const [gateway_Number, setGateway_Number] = useState(null);
  const [payment_type, setPayment_type] = useState("");
  console.log(payment_type)
  // const [selectedPayment, setSelectedPayment] = useState(null );
  // const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(true)


  // const paydata = {
  //   userId: userId,
  //   amount: amount,
  //   gateway_name: Payment === null  ? paymentMethods[0]?.gateway_name :  Payment?.gateway_name,
  //   gateway_Number: Payment === null  ? paymentMethods[0]?.gateway_Number :  Payment?.gateway_Number,
  //   payment_type: Payment === null  ? paymentMethods[0]?.payment_type :  Payment?.payment_type,
  //   referredBy: userDeatils.referredBy

  // };
  // if(setNewAmountPay < 25000 || setNewAmountPay > 300 ){
  //   setShowAmountLimit(true)
  // }



  return (
    <PaymentContext.Provider value={{
      gateway_name,
      gateway_Number,
      payment_type,
      newAmount,
      Payment,
      showAmountLimit,
      setShowAmountLimit,
      setNewAmountPay,
      setGateway_name,
      setGateway_Number,
      setPayment_type,
      setPayment
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export default PaymenyContextProvider;
