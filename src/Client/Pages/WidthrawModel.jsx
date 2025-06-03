import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import {
  GatWaySystem,
  GatWaySystemWidthrow,
} from "../Component/Axios-API-Service/AxiosAPIService";
import { usePayNow } from "../PaymentContext/PaymenyContext";
import axios from "axios";
import { useWidthrowNow } from "../PaymentContext/WidthrawPaymentContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();

  const Depositdata = [
    {
      id: 1,
      DepositTitle: "Deposit",
      DepositDATA: "",
    },
  ];

  const options = [
    "৩.২৫% আনলিমিটেড ডিপোজিট বোনাস",
    "অন্য বিকল্প",
    "আরও একটি বিকল্প",
  ];

  // const PaymentMathod = [
  //   {
  //     id: "depositSetting_3253",
  //     name: "depositSetting",
  //     value: "EXPAY",
  //   },
  //   {
  //     id: "depositSetting_1768",
  //     name: "depositSetting",
  //     value: "JustPay",
  //     tag: "Recommended",
  //     tagIconUrl:
  //       "https://img.m2911p.com/mp/h5/assets/images/icon-set/icon-recommond.svg?v=1736240166505",
  //   },
  //   {
  //     id: "depositSetting_3177",
  //     name: "depositSetting",
  //     value: "Autopay",
  //   },
  //   {
  //     id: "depositSetting_2959",
  //     name: "depositSetting",
  //     value: "সেন্ড মানি",
  //   },
  // ];

  const Amount = [
    { id: "0", value: 2000, label: "2,000" },
    { id: "1", value: 5000, label: "5,000" },
    { id: "2", value: 10000, label: "10,000" },
    { id: "3", value: 15000, label: "15,000" },
    { id: "4", value: 20000, label: "20,000" },
    { id: "5", value: 25000, label: "25,000" },
    { id: "6", value: 1000, label: "1,000" },
    { id: "7", value: 500, label: "500" },
  ];

  const promotions = [
    { id: 0, name: "৪% সীমাহীন বোনাস+ফ্রি স্পিন" },
    { id: 1, name: "২০০% HEYVIP বোনাস" },
    { id: 2, name: "৩০০% IPL দৈনিক স্পোর্টস বোনাস" },
    { id: 3, name: "১০৮০% স্লটস সাপ্তাহিক বোনাস" },
    { id: 4, name: "৫৭০% সাপ্তাহিক ক্যাসিনো বোনাস" },
    { id: 5, name: "নরমাল ডিপোজিট" },
  ];

  // const paymentTypes = [{ _id: "0", name: "Send Money" },{ _id: "1", name: "Cash Out" },{ id: "2", name: "Payment" }];

  const {
    isAuthenticated,
    loginUser,
    logoutUser,
    token,
    userDeatils,

  } = useAuth();

/*   const data = {
    userId: userDeatils?.userId,
  };
 */
  const {
    paymentMethods,
    setpaymentMethods,
    gateway_name,
    gateway_Number,
    payment_type,
    newWidthrowAmount,
    setNewWidthrowAmountPay,
    setGateway_name,
    setGateway_Number,
    setPayment_type,
    Payment,
    setPayment,

    showAmountLimitw,
    setShowAmountLimitw,
  } = useWidthrowNow();



  const [selectedPayment, setSelectedPayment] = useState(null);
  const [ShowSuccess, setShowSuccess] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState("0");
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  console.log(Payment);

  console.log(selectedPaymentAmount);
  const handelAmount = (blance) => {
    let updatedAmount = 0;
    updatedAmount = parseInt(selectedPaymentAmount) + parseInt(blance);

    setSelectedPaymentAmount(updatedAmount);
  };
  // const [Payment, setPayment] = useState(paymentMethods[0]); //paymentMethods[0]
  console.log(Payment);

  console.log(selectedPaymentAmount);
  // const handelAmount = (blance) => {
  //   // let = updatedAmount = parseInt(selectedPaymentAmount) + parseInt(blance);
  //   const updatedAmount = parseInt(selectedPaymentAmount) + parseInt(blance);

  //   setSelectedPaymentAmount(updatedAmount);
  // };

  console.log(payment_type);

  // useEffect(() => {
  //   // Fetch gateway list from backend on component mount
  //   const fetchGateways = async () => {
  //     console.log(data);
  //     try {
  //       const response = await GatWaySystem(data);
  //       setpaymentMethods(response?.data?.paymentMethods);
  //       // setGatewaysCount(response.data.Getwaycount);
  //       console.log(response.data.paymentMethods);
  //       if (response.data.paymentMethods.length > 0) {
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching gateways:", error);
  //     }
  //   };

  //   if (activeModal === modalName) {
  //     fetchGateways();
  //   }
  // }, [userDeatils.userId, token, modalName]);
  // const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChangeAmount = (e) => {
    selectedPaymentAmount = e.target.value;
    setSelectedPaymentAmount(selectedPaymentAmount);
  };
  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // userId: userId,

  // console.log(newAmount);

  setGateway_name(
    Payment === null ? paymentMethods[0]?.gateway_name : Payment?.gateway_name
  );
  setGateway_Number(
    Payment === null
      ? paymentMethods[0]?.gateway_Number
      : Payment?.gateway_Number
  );
  setPayment_type(
    Payment === null ? paymentMethods[0]?.payment_type : Payment?.payment_type
  );
  // referredbyCode: userDeatils.referredbyCode
  useEffect(() => {
    if (paymentMethods.length > 0) {
      // setPayment(Payment === null ? paymentMethods[0]?.gateway_name : Payment?.gateway_name);
      if (activeModal === modalName) {
        setGateway_name(paymentMethods[0]?.gateway_name);
      }
    }
  }, [paymentMethods]);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      setGateway_Number(paymentMethods[0]?.gateway_Number);
    }
  }, [paymentMethods, modalName]);

  useEffect(() => {
    if (paymentMethods.length) {
      setPayment(paymentMethods[0] || Payment);
    }
  }, [paymentMethods, modalName]);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      setPayment_type(paymentMethods[0]?.payment_type);
    }
  }, [paymentMethods, modalName]);

  const navigate = useNavigate();
  console.log(gateway_name);
  console.log(payment_type);

  // const handlePaymentAmount = async () => {
  //   // Force context update before opening modal
  //   setNewAmountPay(selectedPaymentAmount);
  // };

  const userVarifayed = false;

  console.log(paymentMethods);
  console.log(Payment);

  // useEffect(() => {
  //   const fetchGateways = async () => {
  //     console.log(data);
  //     try {
  //       const response = await GatWaySystemWidthrow(data);
  //       setpaymentMethods(response?.data?.paymentMethods);
  //       // setGatewaysCount(response.data.Getwaycount);
  //       console.log(response.data.paymentMethods);
  //       if (response.data.paymentMethods.length > 0) {
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching gateways:", error);
  //       // setError(error);
  //     }
  //   };
  //   fetchGateways();
  // }, []);
  // const [selectedOption, setSelectedOption] = useState(options[0]);

  // const inputRef = useRef(null);

  // const handleChangeAmount = (e) => {
  //   selectedPaymentAmount = e.target.value;
  //   setSelectedPaymentAmount(selectedPaymentAmount);
  // };

  // // userId: userId,
  setNewWidthrowAmountPay(selectedPaymentAmount);
  useEffect(() => {
    if (paymentMethods.length > 0) {
      setGateway_name(
        Payment === null
          ? paymentMethods[0]?.gateway_name
          : Payment?.gateway_name
      );
    }
  }, [paymentMethods]);
  setGateway_name(
    Payment === null ? paymentMethods[0]?.gateway_name : Payment?.gateway_name
  );
  setGateway_Number(
    Payment === null
      ? paymentMethods[0]?.gateway_Number
      : Payment?.gateway_Number
  );
  setPayment_type(
    Payment === null ? paymentMethods[0]?.payment_type : Payment?.payment_type
  );


  const handlePayment = async () => {
    // alert("Please fill in all required fields.");
      if(!userDeatils) return null || ""
    try {
      if (selectedPaymentAmount > 499 && selectedPaymentAmount < 25001) {
        // console.log(userId, selectedPaymentAmount,gateway_name,userDeatils.referredBy,userDeatils.phone[0].number);
        const response = await axios.post(
          `https://api.kingbaji.live/api/v1/widthdraw_with_transaction`,
          {
            userId: userDeatils?.userId,
            gateway_name:
              Payment === null
                ? paymentMethods[0]?.gateway_name
                : Payment?.gateway_name,
            referredBy: userDeatils?.referredBy,
            mobile: userDeatils?.phone[0].number,
            type: parseInt(1),
            amount: newWidthrowAmount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setShowSuccess(false);
        if (response.data.transactionID.length > 0) {
          console.log(response.data.transactionID);
          
          setTimeout(() => {
            // closeModal(); // Optionally close the modal after showing success
            navigate("/"); // or your success redirect
            window.location.reload(); // If you want to reload after redirect
          }, 5000);
        }
      } else {
        setShowAmountLimitw(
          "Sorry! your amount Invalid. Please enter amount between ৳ 500 and ৳ 25,000."
        );
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

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

  const TAB_NAMES = {
    DepositModel: "Deposit",
    WidthdrawModel: "Withdrawal",
  };

  const [activeTab, setActiveTab] = useState(TAB_NAMES[modalName] || "Deposit");

  // Update activeTab when modalName changes
  useEffect(() => {
    setActiveTab(TAB_NAMES[modalName] || "Deposit");
  }, [modalName]);
  const handleTabChange = (tabName) => {
    if (tabName === "DepositModel") {
      openModal("DepositModel");
    } else {
      openModal("WidthdrawModel");
    }
    setActiveTab(tabName);
  };

  if (activeModal !== modalName) return null;

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      {ShowSuccess ? (
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page__backdrop" onClick={closeModal}></div>
          <div className="popup-page__main popup-page-main popup-page-main--show">
            <div className="popup-page-main__header wallet-header">
              <div className="popup-page-main__title">Funds</div>
              <div
                className="popup-page-main__close"
                onClick={closeModal}
              ></div>
            </div>
            <div className="popup-page-main__container">
              <div className="content mcd-style fixed-tab player-content">
                <div className="tab-btn-section tab-btn-wrap">
                  <div className="tab-btn tab-btn-bar">
                    <div
                      className="line"
                      style={{
                        width: "50%",
                        transform: "translate(100%, 0px)",
                      }}
                    ></div>

                    <div className="btn">
                      <div
                        className="text"
                        onClick={() => openModal("DepositModel")}
                      >
                        Deposit
                        <div className="badge"></div>
                      </div>
                    </div>

                    <div className="btn">
                      <div className="text">
                        Withdrawal
                        <div className="badge"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-content">
                  <div className="inner-wrap">
                    <div className="inner-box withdraw-wallet">
                      {/* Wallet Balance Section */}
                      <div className="player-top player-withdraw">
                        <div className="main-wallet-info">
                          <div className="renew-main-wallet">
                            <span>Main Wallet</span>
                            <div className="icon-refresh"></div>
                          </div>
                          <h4>{userDeatils.balance.toFixed(2)}</h4>
                        </div>
                        <span className="item-bg"></span>
                      </div>
                      {userDeatils?.isVerified.phone !== true && (
                        <div className="tips-info verify-tips tips-info-toggle">
                          <div className="title-box">
                            <h5>
                              <i
                                className="tips-icon"
                                style={{
                                  maskImage:
                                    "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-tips-type02.svg?v=1745315543147)",
                                }}
                              ></i>
                              <span>
                                Below info are required to proceed deposit
                                request.
                              </span>
                            </h5>
                          </div>
                          <ol className="tips-info-block active">
                            <li className="contact-info">
                              <a onClick={() => openModal("MyProfileModel")}>
                                <label>Contact Info</label>
                                <ul>
                                  <li>FULL NAME</li>
                                </ul>
                              </a>
                            </li>
                          </ol>

                          <ol className="tips-info-block active">
                            <li className="contact-info">
                              <a onClick={() => openModal("modal2")}>
                                <label>Contact Info</label>
                                <ul>
                                  <li>Phone Number</li>
                                </ul>
                              </a>
                            </li>
                          </ol>
                        </div>
                      )}
                      {/* Payment Method Section */}
                      <div className="menu-box">
                        {userDeatils?.isVerified.phone !== true && (
                          <div className="kyc-verify-mask">
                            <div className="kyc-verify-mask-icon"></div>
                            <div className="kyc-verify-mask-message">
                              Please complete the verification.
                            </div>
                            <div className="kyc-verify-mask-blur"></div>
                          </div>
                        )}
                        <div className="title">
                          <h2>
                            <span>Payment Method</span>
                          </h2>
                        </div>
                        <div className="select-group checkbox-style">
                          <ul className="col3">
                            {paymentMethods.length > 0 ? (
                              paymentMethods.map((paymentMethod, index) => (
                                <li key={paymentMethod._id}>
                                  <input
                                    type="radio"
                                    name="paymentMethod"
                                    id={`paymentMethod_${paymentMethod._id}`}
                                    checked={Payment === paymentMethod}
                                    onChange={() => setPayment(paymentMethod)}
                                  />
                                  <label
                                    htmlFor={`paymentMethod_${paymentMethod._id}`}
                                  >
                                    <div className="bank">
                                      <img
                                        alt={paymentMethod.gateway_name}
                                        src={paymentMethod.image_url}
                                        loading="lazy"
                                      />
                                    </div>
                                    <span>{paymentMethod.gateway_name}</span>
                                    <span
                                      className={`${
                                        Payment === paymentMethod
                                          ? "item-icon"
                                          : ""
                                      }`}
                                      style={{
                                        maskImage:
                                          'url("https://img.c88rx.com/cx/h5/assets/images/player/select-check.svg?v=1739862678809")',
                                      }}
                                    ></span>
                                  </label>
                                </li>
                              ))
                            ) : (
                              <p>No Payment Method</p>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Amount Section */}
                      {userDeatils?.isVerified.phone === true && (
                        <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Amount</span>
                              <i>৳ 500.00 - ৳ 25,000.00</i>
                            </h2>
                          </div>
                          <div className="select-group style-add-amount">
                            <ul className="col4">
                              {Amount &&
                                Amount.map((amount, index) => (
                                  <li key={index}>
                                    <input
                                      type="radio"
                                      name="depositAmount"
                                      value={amount.value}
                                      checked={
                                        selectedPaymentAmount == amount.value
                                      }
                                      id={`depositAmount_${amount.id}`}
                                      placeholder={amount?.value}
                                      onClick={() => handelAmount(amount.value)}
                                    />
                                    {/* {console.log("selectedPaymentAmount",selectedPaymentAmount)}
                                {console.log("amount.value",amount.value)} */}
                                    <label
                                      htmlFor={`depositAmount_${
                                        index ? index : ""
                                      }`}
                                    >
                                      <span>{amount.value}</span>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="input-group money">
                            <label htmlFor="amount">৳</label>
                            <div className="input-wrap">
                              <input
                                type="text"
                                placeholder="0.00"
                                inputMode="numeric"
                                value={selectedPaymentAmount}
                                onChange={(e) =>
                                  setSelectedPaymentAmount(e.target.value)
                                }
                              />
                              {selectedPaymentAmount && (
                                <Link
                                  className={`delete-btn ${
                                    selectedPaymentAmount ? "" : "active"
                                  }`}
                                  onClick={() => setSelectedPaymentAmount()}
                                  // style={{
                                  //   maskImage:
                                  //     "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type09.svg?v=1745315543147)",
                                  // }}
                                ></Link>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Phone Number Section */}
                      {userDeatils?.isVerified.phone === true && (
                        <div className="menu-box withdraw-menu-phone">
                          <div className="title">
                            <h2>
                              <span>Please select phone number</span>
                            </h2>
                          </div>
                          <div className="select-group style-bank">
                            <ul>
                              {/* {userDeatils.phone.map((phone, index) => (
                            <li key={index}>
                              <input
                                type="radio"
                                name="accountPhone"
                                id={`accountPhone_${index}`}
                                checked={selectedPhone === phone}
                                onChange={() => setSelectedPhone(phone)}
                              />
                              <label htmlFor={`accountPhone_${index}`}>
                                <div className="item-bg"></div>
                                <div className="select-card">
                                  <div className="select-card-inner">
                                    <div className="card-number">{phone}</div>
                                  </div>
                                </div>
                                <span className="item-icon"></span>
                              </label>
                            </li>
                          ))} */}

                              <li>
                                <input
                                  type="radio"
                                  name="accountPhone"
                                  // id={`accountPhone_${index}`}
                                  // checked={selectedPhone === phone}
                                  // onChange={() => setSelectedPhone(phone)}
                                />
                                <label htmlFor={`accountPhone_`}>
                                  <div className="item-bg"></div>
                                  <div className="select-card">
                                    <div className="select-card-inner">
                                      <div className="card-number">
                                        0{userDeatils.phone[0].number}
                                      </div>
                                    </div>
                                  </div>
                                  <span
                                    className="item-icon"
                                    style={{
                                      backgroundImage: `url("https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-check-type01.svg")`,
                                    }}
                                  ></span>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="member-content">
                        <div className="button submit">
                          <a onClick={() => handlePayment()}>Submit</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page__backdrop" ></div>
          <div className="popup-page__main popup-page-main popup-page-main--show">
            <div className="popup-page-main__header wallet-header">
              <div className="popup-page-main__title">Funds</div>
              <div
                className="popup-page-main__close"
                
              ></div>
            </div>
            <div className="popup-page-main__container">
              <div className="content mcd-style fixed-tab player-content"></div>
              <div className="gateway-name-main-container">
                <div className="gateway-name-check-icon"></div>
                <div className="gateway-name-content">
                  <div className=" gateway-name-heading">
                    সফলভাবে জমা দেওয়া হয়েছে
                  </div>
                  <div className="gateway-name-paragraph">
                    লেনদেন সফলভাবে জমা দেওয়া হয়েছে।
                    <br />
                    লেনদেন অনুমোদিত হওয়ার জন্য অনুগ্রহ করে কয়েক মিনিট অপেক্ষা
                    করুন।
                    <br />
                    আপনি এখন এই পপ আপ ব্রাউজারটি বন্ধ করে মূল সাইটে ফিরে যেতে
                    পারেন।
                  </div>

                  <strong
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {redirectCountdown} সেকেন্ড পরে রিডাইরেক্ট হবে...
                  </strong>
                  {/* <button class="gateway-name-button">বন্ধ</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
