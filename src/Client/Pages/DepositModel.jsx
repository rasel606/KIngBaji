import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import {
  GatWaySystem,
  GetPaymentMethodsUser,
} from "../Component/Axios-API-Service/AxiosAPIService";
import { usePayNow } from "../PaymentContext/PaymenyContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
  const Depositdata = [
    {
      id: 1,
      DepositTitle: "Deposit",
      DepositDATA: "",
    },
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


  const Amount = [
    { id: "0", value: 2000, label: "2,000" },
    { id: "1", value: 5000, label: "5,000" },
    { id: "2", value: 10000, label: "10,000" },
    { id: "3", value: 15000, label: "15,000" },
    { id: "4", value: 20000, label: "20,000" },
    { id: "5", value: 25000, label: "25,000" },
    { id: "6", value: 1000, label: "1,000" },
    { id: "7", value: 200, label: "200" },
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
    verifyUserToken,
    verifyUser,
    token,
    userDeatils,
    userId,
  } = useAuth();

  const data = {
    userId: userDeatils.userId,
  };

  const {
    gateway_name,
    gateway_Number,
    payment_type,
    newAmount, setNewAmountPay,
    setGateway_name,
    setGateway_Number,
    setPayment_type,
    Payment, setPayment
  } = usePayNow();

  const [paymentMethods, setpaymentMethods] = useState([]);
  // const [payment_type, setPayments_type] = useState(paymentMethods[0]?.payment_type);
  const [activeTab, setActiveTab] = useState("deposit");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState(0);
  // const [updatedAmount, setUpdatedAmount] = useState(0);
  // const [Payment, setPayment] = useState(paymentMethods[0]); //paymentMethods[0]
console.log(Payment)

  console.log(selectedPaymentAmount);
  const handelAmount = (blance) => {
    // let = updatedAmount = parseInt(selectedPaymentAmount) + parseInt(blance);
    const updatedAmount = parseInt(selectedPaymentAmount) + parseInt(blance);
    setSelectedPaymentAmount(updatedAmount);
   
  };

  console.log(payment_type);

  useEffect(() => {
    // Fetch gateway list from backend on component mount
    const fetchGateways = async () => {
      console.log(data);
      try {
        const response = await GatWaySystem(data);
        setpaymentMethods(response?.data?.paymentMethods);
        // setGatewaysCount(response.data.Getwaycount);
        console.log(response.data.paymentMethods);
        if (response.data.paymentMethods.length > 0) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching gateways:", error);
      }
    };
    


    if (activeModal === modalName) {
      fetchGateways();
    }
  }, [userDeatils.userId, token ,modalName ]);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChangeAmount = (e) => {
    selectedPaymentAmount = e.target.value;
    setSelectedPaymentAmount(selectedPaymentAmount);
  };
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };


  // userId: userId,

    
      setNewAmountPay(selectedPaymentAmount);
    
 
  console.log(newAmount);

  setGateway_name( paymentMethods[0]?.gateway_name);
  setGateway_Number( paymentMethods[0]?.gateway_Number);
  setPayment_type( paymentMethods[0]?.payment_type );
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
      setGateway_Number( paymentMethods[0]?.gateway_Number);
    }
  }, [paymentMethods,modalName]);



  useEffect(() => {
    if (paymentMethods.length) {
      setPayment( paymentMethods[0]);
    }
  }, [paymentMethods,modalName]);



  useEffect(() => {
    if (paymentMethods .length>0) {
      setPayment_type(  paymentMethods[0]?.payment_type );
    }
  }, [paymentMethods,modalName]);




  
  const navigate = useNavigate();
  console.log(gateway_name)
  console.log(payment_type)

  const handlePaymentSubmit = () => {
    
    if (!userId || !selectedPaymentAmount || !token) {
      alert("Please fill in all required fields.");
      return;
    }
console.log(gateway_name)
    
      openModal(`${gateway_name}`);
    
    
      
    
  };

  const handlePaymentAmount = async () => {
    
    
    // Force context update before opening modal
    setNewAmountPay(selectedPaymentAmount); 
    
  };

  const userVarifayed = false;

  console.log(paymentMethods);
  console.log(Payment);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedPayment(null);
    setShowVerification(false);
  };
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  // const [activeTab, setActiveTab] = useState('deposit');

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header wallet-header">
            <div className="popup-page-main__title">Funds</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="popup-page-main__container">
            <div className="content mcd-style fixed-tab player-content">
              <div className="tab-btn-section tab-btn-wrap">
                <div className="tab-btn tab-btn-bar">
                  <div
                    className="line"
                    style={{ width: "50%", transform: "translate(0%, 0px)" }}
                  ></div>

                  <div className="btn">
                    <div className="text">
                      Deposit
                      <div className="badge"></div>
                    </div>
                  </div>

                  <div className="btn">
                    <div
                      className="text"
                      onClick={() => openModal("WidthrawModel")}
                    >
                      Withdrawal
                      <div className="badge"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-content tab-content-page">
                <div className="inner-wrap">
                  <div className="inner-box deposit-wallet">
                    <div className="player-deposit-step1">
                      <div className="option-group select-bar">
                        <label>
                          <span
                            className="item-icon"
                            style={{
                              backgroundImage:
                                "url(https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-selectpromotion.svg?v=1742895464610)",
                            }}
                          ></span>
                          <div>Select Promotion</div>
                        </label>
                        <select value={selectedOption} onChange={handleChange}>
                          {options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {!isVerified && (
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

                      <div className="menu-box">
                        {!isVerified && (
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
                            {paymentMethods.map((paymentMethod, index) => (
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
                                  

                                  <div className="tag-rebate-money ng-star-inserted">
                                    <p>
                                      <span>+</span>3<span>%</span>
                                    </p>
                                  </div>
                                  {/* <span
                                className="item-icon"
                                style={{
                                  maskImage:
                                    'url("https://img.c88rx.com/cx/h5/assets/images/player/select-check.svg?v=1739862678809")',
                                }}
                              ></span> */}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                       
                        <div className="select-group">
                          <ul className="col2 ">
                            <li className="ng-star-inserted">
                              <input
                                type="radio"
                                name="paymentType"
                                id="paymentType_0"
                                value="বিকাশ পেমেন্ট"
                                checked={Payment?._id === Payment?._id}
                              />
                              <label htmlFor="paymentType_0">
                                {/* <span>{Payment?.gateway_name}</span> */}
                                <span>
                                  {Payment === null
                                    ? paymentMethods[0]?.gateway_name
                                    : Payment?.gateway_name}
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="menu-box">
                        <div className="title">
                          <h2>
                            <span>Deposit Channel</span>
                          </h2>
                        </div>
                        <div className="select-group checkbox-style">
                          <ul className="col2">
                            
                              <li >
                                <input
                                  type="radio"
                                  name="depositSetting"
                                  id={`depositSetting_`}
                                  // checked={Mood == Mathod.name}
                                />
                                <label htmlFor={`depositSetting`}>
                                  <span>{payment_type}</span>
                                </label>
                              </li>
                            
                            {/* {paymentTypes.map((type) => (
                                    <li key={type.id} className="payment-type">
                                      <input
                                        type="radio"
                                        name="paymentType"
                                        id={`paymentType_${type.id}`}
                                        checked={paymentType === type.id}
                                        onChange={() => setPaymentType(type.id)}
                                      />
                                      <label htmlFor={`paymentType_${type.id}`}>
                                        <span>{type.name}</span>
                                        <span
                                          className="item-icon"
                                          style={{
                                            maskImage:
                                              "url(https://img.s628b.com/sb/h5/assets/images/player/select-check.svg?v=1745315543147)",
                                          }}
                                        ></span>
                                      </label>
                                    </li>
                                  ))} */}
                          </ul>
                        </div>
                      </div>

                      <div className="menu-box active">
                        <div className="title">
                          <h2>
                            <span>Amount</span>
                            <i>৳ 200.00 - ৳ 30,000.00</i>
                          </h2>
                        </div>
                        <div className="select-group style-add-amount">
                          <ul className="col4">
                            {Amount && Amount.map((amount, index) => (
                              <li key={index}>
                                <input
                                  type="radio"
                                  name="depositAmount"
                                  value={amount.value}
                                  checked={selectedPaymentAmount == amount.value}
                                  id={`depositAmount_${amount.id}`}
                                  placeholder = {amount?.value}
                                  onClick={() => handelAmount(amount.value)}
                                />
                                {/* {console.log("selectedPaymentAmount",selectedPaymentAmount)}
                                {console.log("amount.value",amount.value)} */}
                                <label htmlFor={`depositAmount_${index ? index : ""}`}>
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
                            onChange={(e) => setSelectedPaymentAmount(e.target.value)}
                          />
                            {selectedPaymentAmount && (
                              <Link
                                className={`delete-btn ${
                                  selectedPaymentAmount ? "" : "active"
                                }`}
                                onClick={() => setSelectedPaymentAmount(0)}
                                // style={{
                                //   maskImage:
                                //     "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type09.svg?v=1745315543147)",
                                // }}
                              ></Link>
                            )}
                          </div>
                        </div>
                        
                        <h5>
                        <div className="tips-info note">
                          <i className="tips-icon"></i>
                          <span style={{ whiteSpace: "pre-wrap",color:"white" }}>
                            ১/ব্যক্তিগত তথ্য"-এর অধীনে ক্যাশ আউট করার আগে
                            সর্বোচ্চ ৩টি মোবাইল নম্বর যোগ করুন এবং ভেরিফাই করুন।
                            ২/আপনার ডিপোজিট প্রক্রিয়ার দ্রুত সফল করতে সঠিক
                            ক্যাশ আউট নাম্বার , এমাউন্ট এবং ট্রানজেকশন আইডি সহ
                            সাবমিট দিন। ৩/যেকোনো ডিপোজিট করার আগে সবসময় আমাদের
                            ডিপোজিট পেইজে নাম্বার চেক করুন । ৪/ডিপোজিট পেন্ডিং
                            অবস্থায় আপনি ২টি ডিপোজিট এর জন্য ট্রাই করতে পারবেন।
                            আপনি কোনো সমস্যার সম্মুখীন হলে লাইভচ্যাট সহায়তা নিতে
                            পারেন। ৫ ১.৩০-এর নিচের ODDs বাজি, উইথড্র টার্নওভারের
                            প্রয়োজনীয়তার জন্য গণনা করা হবে না।
                          </span>
                          </div>
                        </h5>
                      
                      </div>
                      
                      <div className="member-content">
                        <div className="button submit" onClick={()=>handlePaymentSubmit()}>
                          <a>Submit</a>
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
