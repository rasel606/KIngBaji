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

  const { isAuthenticated, userDeatils, userId, token } = useAuth();

  const { gateway_name, gateway_Number, payment_type, newAmount,Payment } = usePayNow();

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
  const [ShowSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleTransactionIDChange = (e) => {
    const value = e.target.value;
    setTransactionID(value);
    setIsTransactionValid(/^[a-zA-Z0-9]{10}$/.test(value));
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

  console.log("1", amountnew);

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

      if (response.data.success === true) {
        console.log(response.data.success);
        setTimeout(() => {
          setShowSuccess(false);
          closeModal(); // Optionally close the modal after showing success
          navigate("/"); // or your success redirect
          window.location.reload(); // If you want to reload after redirect
        }, 2000);
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

  useEffect(() => {
    if (newAmount <= 0) {
      closeModal(); // Close if amount is invalid
    }
  }, [newAmount]);

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
                    <div className="custom-center-content">
                      <div className="custom-text-center">
                        <div className="custom-content-lg">
                          <div className="custom-timer-container">
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
                                  alt="logo"
                                  src="https://d1rkzpcrq2qmwv.cloudfront.net/banks/Bkash.png"
                                  className="custom-logo-img"
                                />
                              </div>
                              
                            </div>
                            <form className="custom-payment-form">
                              <p className="custom-instruction-text">
                                {Payment?.payment_type} to the account below and fill in
                                the required information
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
                                  <ImCopy className="custom-input-icon" />
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
                                  Bkash {payment_type}
                                </label>
                                <div className="custom-input-container">
                                  <input
                                    type="text"
                                    disabled
                                    className="custom-form-input"
                                    placeholder={"0" + gateway_Number}
                                    value={"0" + gateway_Number}
                                  />
                                  <ImCopy className="custom-input-icon" />
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
                                    maxLength="10"
                                    minLength="10"
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
                  </div>
                </div>
              </div>
            </div>
            {ShowSuccess === true ?  (
              <div className="pop-wrap pop-success">
                <div className="register-success-wrap">
                  <div className="register-success-cont">
                    <div className="register-success-txt top-inner">
                      <div className="success-checkmark">
                        <div className="check-icon">
                          <span className="icon-line line-tip"></span>
                          <span className="icon-line line-long"></span>
                          <div className="icon-circle"></div>
                          <div className="icon-fix"></div>
                        </div>
                      </div>
                      <h4>Success</h4>
                    </div>
                  </div>
                </div>
              </div>
            ) :(
              <div className="pop-wrap pop-success">
                <div className="register-success-wrap">
                  <div className="register-success-cont">
                    <div className="register-success-txt top-inner">
                      <div className="success-checkmark">
                        <div className="check-icon">
                          <span className="icon-line line-tip"></span>
                          <span className="icon-line line-long"></span>
                          <div className="icon-circle"></div>
                          <div className="icon-fix"></div>
                        </div>
                      </div>
                      <h4>Success</h4>
                    </div>
                  </div>
                </div>
              </div>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
