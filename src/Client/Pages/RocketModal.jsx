import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import DropdownWithScroll from "./DropdownWithScroll";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";
import { useModal } from "../Component/ModelContext";
import SingupSlider from "./SingupSlider";
import { usePayNow } from "../PaymentContext/PaymenyContext";
import axios from "axios";
import { ImCopy } from "react-icons/im";
import { FaQuestionCircle } from "react-icons/fa";
export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;


    const {
      isAuthenticated,
      userDeatils,
      userId,
      token
    } = useAuth();

const {gateway_name,
    gateway_Number,
    payment_type,
    amount,}=usePayNow()

  const [timeRemaining, setTimeRemaining] = useState(900);
   const [transactionID, setTransactionID] = useState("");
   const [isTransactionValid, setIsTransactionValid] = useState(false);
 
   useEffect(() => {
     
     const timer = setInterval(() => {
       setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
     }, 1000);
     return () => clearInterval(timer);
   }, []);
   const navigate = useNavigate();
   const formatTime = (seconds) => {
     const minutes = Math.floor(seconds / 60);
     const secs = seconds % 60;
     return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
       2,
       "0"
     )}`;
   };




   const type = 0
 
   // console.log(
     
   //   userId,
   //   gateway_name,
   //   amount,
   //   referredbyCode,
   //   payment_type,
   //   gateway_number,
   //   type,
   //   "transactionID",transactionID
   // );
 
   const [gateways, setGateways] = useState();
 
   const [loading, setLoading] = useState(true);
 
   const handleTransactionIDChange = (e) => {
     const value = e.target.value;
     setTransactionID(value);
     setIsTransactionValid(/^[a-zA-Z0-9]{10}$/.test(value));
   };
   const params = {
     userId,
     gateway_name,
     amount,
     referredbyCode:userDeatils.referredbyCode,
     payment_type,
     gateway_Number,
     transactionID,
     type,
   }
   console.log(params)
 
   const handlePayment = async (e) => {
     e.preventDefault();
     try {
       const response = await axios.post(
         `http://localhost:5000/api/v1/submitTransaction/`,
         {
            userId:userDeatils.userId,
            gateway_name:gateway_name,
            amount:amount,
            referredbyCode:userDeatils.referredbyCode,
            payment_type:payment_type,
            gateway_Number:gateway_Number,
            transactionID,
            mobile:userDeatils.phone,
            type:parseInt(0),
          },
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
   
       setGateways(response.data.paymentMethods);
       console.log(response.data);
   
       if (response.data.success === true) {
         console.log(response.data.success);
   
          
         setTimeout(() => {
           window.location.reload(); // Reload the page after navigation
         }, 500);
       }
       if (response.data.success === false) {
         console.log(response.data.success);
         setTransactionID("");
         setIsTransactionValid(false);
         navigate("/failds"); // Redirect to success page
         setTimeout(() => {
           window.location.reload(); // Reload the page after navigation
         }, 500);
       }
     } catch (error) {
       console.error("Error making payment:", error);
     }
   };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login-tab">
            <div className="popup-page-main__title"> Rocket </div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content member-content new-login third-party-login">
              <div
                    className="full-screen-background"
                    style={{
                      background: "#380582",
                      opacity: "1",
                    }}
                  >
                    <div className="row no-gutters h-100">
                      <div className="col-md-6 half-width left-section">
                        <div className="center-content">
                          <div className="text-center text-white">
                            <div className="content lg-Image-right">
                              <div
                                className="my-2 timer-sm BKash"
                                style={{
                                  padding: "5px",
                                  borderRadius: "15px",
                                  alignItems: "center",
                                  justifyContent: "center",
              
                                  background:
                                    "linear-gradient( #8b2490, #631467)",
                                  opacity: "1",
                                }}
                              >
                                <h1 className="clockSection cw pt-1 mb-0">
                                  {formatTime(timeRemaining)}
                                </h1>
                                <span className="clockSectionSpan">Time Remaining</span>
                              </div>
                              <div
                                className="bpb-login-flex-wrapper text mb-3"
                                style={{
                                  padding: "20px",
                                  borderRadius: "20px",
                                  alignItems: "center",
                                  justifyContent: "center",
              
                                  background: "#fff",
                                  opacity: "1",
                                }}
                              >
                                <div className="right-block">
                                  <div className="mb-1">
                                    <div className="logo logo-flex text-center ">
                                      <img
                                        alt="logo"
                                        src="https://d1rkzpcrq2qmwv.cloudfront.net/banks/rocket.png"
                                      />
                                    </div>
                                  </div>
                                  <div className="txnSection">
                                    <form novalidate style={{ color: "black" }} className="">
                                      <div>
                                        <p className="fs-10 text-center HeaderText HeaderTextBKash mx-3">
                                          Cash Out to the account below and fill in the
                                          required information
                                          <br />
                                          <span>
                                            নীচের অ্যাকাউন্টে অর্থ {payment_type} করুন এবং
                                            প্রয়োজনীয় তথ্য পূরণ করুন।
                                          </span>
                                        </p>
                                      </div>
                                      <div className="row align-items-center px-3 InfoDisplay mx-1">
                                        <div className="col-12" style={{ fontSize: "14px" }}>
                                          Amount{" "}
                                          <span>
                                            <span>৳</span>
                                          </span>
                                        </div>
                                        <div className="col-12">
                                          <div className="position-relative">
                                            <input
                                              type="text"
                                              name="copyAmount"
                                              disabled
                                              className="form-control "
                                              placeholder={amount}
                                            />
                                            <ImCopy
                                              className="fa fa-copy fa-question-circle BKash-color"
                                              style={{ color: "#38094D" }}
                                            />
                                          </div>
                                        </div>
                                      </div>
              
                                      <div className="row align-items-center p-3 InfoDisplay mx-1">
                                        <div className="col-12" style={{ fontSize: "14px" }}>
                                          <span>Rocket {payment_type}</span>
                                        </div>
                                        <div className="col-12">
                                          <div className="position-relative">
                                            <input
                                              type="text"
                                              name="AccountNumber"
                                              disabled={!isTransactionValid}
                                              className="form-control "
                                              placeholder={gateway_Number}
                                            />
                                            <ImCopy
                                              className="fa fa-copy fa-question-circle BKash-color"
                                              style={{ color: "#38094D" }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row align-items-center p-3 InfoDisplay mx-1">
                                        <div className="col-12" style={{ fontSize: "14px" }}>
                                          <span>Transaction ID </span>
                                          <span>{payment_type}</span>
                                        </div>
                                        <div className="col-12">
                                          <div className="position-relative">
                                            <input
                                              type="text"
                                              name="rrnNumber"
                                              required
                                              pattern="^[a-zA-Z0-9]*$"
                                              className="form-control"
                                              value={transactionID}
                                              onChange={handleTransactionIDChange}
                                              placeholder=""
                                              maxLength="10"
                                              minLength="10"
                                            />
              
                                            <FaQuestionCircle className="fa fa-question-circle BKash-color" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-3 buttonDiv mx-3">
                                        <button
                                          style={{
                                            width: "100%",
                                            borderRadius: "25px",
                                            background: "#38094D",
                                            color: "#fff ",
                                          }}
                                          type="button"
                                          className=" py-2  NewSubmit BKash"
                                          onClick={handlePayment}
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
