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

  const { gateway_name, gateway_Number, payment_type, amount } = usePayNow();

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

  // console.log(

  //   userId,
  //   gateway_name,
  //   amount,
  //   referredBy,
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
    referredBy: userDeatils.referredBy,
    payment_type,
    gateway_Number,
    transactionID,
    type,
  };
  console.log(params);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/submitTransaction/`,
        {
          userId: userDeatils.userId,
          gateway_name: gateway_name,
          amount: amount,
          referredBy: userDeatils.referredBy,
          payment_type: payment_type,
          gateway_Number: gateway_Number,
          transactionID,
          mobile: userDeatils.phone,
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
                          <div
                            className="custom-timer-container"
                            style={{ background: "#F7941D" }}
                          >
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
                                  src="https://d1rkzpcrq2qmwv.cloudfront.net/banks/rocket.png"
                                />
                              </div>
                            </div>
                            <form className="custom-payment-form">
                              <p className="custom-instruction-text">
                                {payment_type} to the account below and fill in
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
                                    placeholder={amount}
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
                                    disabled={!isTransactionValid}
                                    className="custom-form-input"
                                    placeholder={gateway_Number}
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
                                    value={transactionID}
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
          </div>
        </div>
      </div>
    </div>
  );
};
