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

  const { isAuthenticated, userDeatils, token } = useAuth();

  const userId = userDeatils?.userId || "";

  const {
    gateway_name,
    gateway_Number,
    payment_type,
    newAmount,
    Payment,
    setNewAmountPay,
    setGateway_name,
    setGateway_Number,
  } = usePayNow();

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

  const type = 0;

  const [gateways, setGateways] = useState();
  const [ShowSuccess, setShowSuccess] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleTransactionIDChange = (e) => {
    const value = e.target.value;
    setTransactionID(value);
    setIsTransactionValid(/^[a-zA-Z0-9]{8}$/.test(value));
  };
  const params = {
    userId: userDeatils.userId,
    gateway_name: gateway_name,
    amount: newAmount,
    referredBy: userDeatils.referredBy,
    payment_type: payment_type,
    gateway_Number: gateway_Number,
    transactionID,
    mobile: userDeatils.phone[0].number,
    type: parseInt(0),
  };
  console.log(payment_type);
  const [PayType, setPayType] = useState(payment_type);
  const mainAmount = newAmount;
  // const PayType = payment_type;
  console.log(mainAmount);
  console.log(PayType);
  const [amountnew, setAmountNew] = useState(newAmount);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  console.log("1", amountnew);

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amountnew);
    alert("Invitation code copied!");
  };
  const handleCopyGatewayNumber = () => {
    navigator.clipboard.writeText(amountnew);
    alert("Invitation code copied!");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api.kingbaji.live/api/v1/submitTransaction`,
        {
          userId: userDeatils.userId,
          gateway_name: gateway_name,
          base_amount: amountnew,
          referredBy: userDeatils.referredBy,
          payment_type: PayType,
          gateway_Number: gateway_Number,
          transactionID,
          mobile: userDeatils.phone[0].number,
          type: parseInt(0),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGateways(response.data.paymentMethods);
      console.log(response.data);
      setShowSuccess(false);
      if (response.data.success === true) {
        console.log(response.data.success);
        setTimeout(() => {
          closeModal(); // Optionally close the modal after showing success
          navigate("/"); // or your success redirect
          window.location.reload(); // If you want to reload after redirect
        }, 5000);
      }
      if (response.data.success === false) {
        console.log(response.data.success);
        setTransactionID("");
        setIsTransactionValid(false);
        setNewAmountPay();
        setGateway_name();
        setGateway_Number();
        navigate("/failds"); // Redirect to success page
        setTimeout(() => {
          window.location.reload(); // Reload the page after navigation
        }, 300);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  useEffect(() => {
    if (newAmount <= 0) {
      closeModal(); // Close if amount is invalid
    }
  }, [newAmount]);

  
    useEffect(() => {
    if (!ShowSuccess) {
      const interval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.location.reload();
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [ShowSuccess]);

  return (
    <div
      className="mcd-popup-page popup-page-wrapper active"
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="" onClick={closeModal}></div>

          <div className="custom-popup-container">
            <div className="custom-content-container">
              <div className="custom-fullscreen-bg">
                <div className="custom-row">
                  <div className="custom-col-md-6">
                        {ShowSuccess ? (
                    <div className="custom-center-content">
                      <div className="custom-text-center">
                          <div className="custom-content-lg">
                            <div className="custom-timer-container"  style={{ background: "#F7941D" }}>
                              <h1 className="custom-timer-display">
                                {formatTime(timeRemaining)}
                              </h1>
                              <span className="custom-timer-label">
                                Time Remaining
                              </span>
                            </div>
                            <div className="custom-form-container">
                              <div className="custom-form-header">
                                <div className="custom-logo-container">
                                  <img
                                  style={{ width: "100px" }}
                                  alt="logo"
                                  src="https://img.m2911p.com/mp/h5/assets/images/payment/nagad.png?"
                                />
                                </div>
                              </div>
                              <form className="custom-payment-form">
                                <p className="custom-instruction-text">
                                  {Payment?.payment_type} to the account below
                                  and fill in the required information
                                  <br />
                                </p>
                                {/* <span className="custom-instruction-subtext">
                                নীচের অ্যাকাউন্টে অর্থ {payment_type} করুন এবং প্রয়োজনীয় তথ্য পূরণ করুন।
                              </span> */}

                                <div className="custom-form-group">
                                  <label className="custom-form-label">
                                    Amount
                                  </label>
                                  <div className="custom-input-container">
                                    <input
                                      type="text"
                                      disabled
                                      className="custom-form-input"
                                      placeholder={newAmount}
                                      value={newAmount}
                                    />
                                    <ImCopy
                                      className="custom-input-icon"
                                      onClick={handleCopyAmount}
                                    />
                                  </div>
                                </div>
                                <div className="custom-form-group">
                                  <label className="custom-form-label">
                                    Your Process system
                                  </label>
                                  <div className="custom-input-container">
                                    <input
                                      type="text"
                                      disabled
                                      className="custom-form-input"
                                      placeholder={Payment?.payment_type}
                                      value={Payment?.payment_type}
                                    />
                                    <ImCopy className="custom-input-icon" />
                                  </div>
                                </div>

                                <div className="custom-form-group">
                                  <label className="custom-form-label">
                                    Nagad {payment_type}
                                  </label>
                                  <div className="custom-input-container">
                                    <input
                                      type="text"
                                      disabled
                                      className="custom-form-input"
                                      placeholder={"0" + gateway_Number}
                                      value={"0" + gateway_Number}
                                    />
                                    <ImCopy
                                      className="custom-input-icon"
                                      onClick={handleCopyGatewayNumber}
                                    />
                                  </div>
                                </div>

                                <div className="custom-form-group">
                                  <label className="custom-form-label">
                                    Transaction ID
                                  </label>
                                  <div className="custom-input-container">
                                    <input
                                      type="text"
                                      required
                                      className="custom-form-input"
                                      style={{ appearance: "auto" }}
                                      value={transactionID}
                                      placeholder={transactionID}
                                      onChange={handleTransactionIDChange}
                                      maxLength="8"
                                      minLength="8"
                                    />
                                    <FaQuestionCircle className="custom-input-icon" />
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className="custom-submit-btn"
                                  onClick={handlePayment}
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                            </div>
                          </div>
                        ) : (
                          <div className="gateway-name-main-container">
                            {/* <div className="gateway-name-check-icon"></div> */}
                            <img 
                             style={{width:"50px",height:"50px",justifyContent:"center",alignItems:"center"}}
                             src="data:image/png;base64,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" alt="" />
                            <div className="gateway-name-content">
                              <div className=" gateway-name-heading">
                                সফলভাবে জমা দেওয়া হয়েছে
                              </div>
                              <div className="gateway-name-paragraph">
                                লেনদেন সফলভাবে জমা দেওয়া হয়েছে।
                                <br />
                                লেনদেন অনুমোদিত হওয়ার জন্য অনুগ্রহ করে কয়েক
                                মিনিট অপেক্ষা করুন।
                                <br />
                                আপনি এখন এই পপ আপ ব্রাউজারটি বন্ধ করে মূল সাইটে
                                ফিরে যেতে পারেন।
                              </div>
                                 <strong
                              style={{
                                fontSize: "20px",
                                color: "#fff",
                                fontWeight: "bold",
                              }}
                              
                              >{redirectCountdown} সেকেন্ড পরে রিডাইরেক্ট হবে...</strong>
                              {/* <button class="gateway-name-button">বন্ধ</button> */}
                            </div>
                          </div>
                        )}
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
