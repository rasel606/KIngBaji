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

  const PaymentMood = [
    {
      id: "depositSetting_3253",
      name: "depositSetting",
      value: "EXPAY",
    },
    {
      id: "depositSetting_1768",
      name: "depositSetting",
      value: "JustPay",
      tag: "Recommended",
      tagIconUrl:
        "https://img.m2911p.com/mp/h5/assets/images/icon-set/icon-recommond.svg?v=1736240166505",
    },
    {
      id: "depositSetting_3177",
      name: "depositSetting",
      value: "Autopay",
    },
    {
      id: "depositSetting_2959",
      name: "depositSetting",
      value: "Sand Money",
    },
  ];

  const Amount = [
    { id: "0", value: "2000", label: "2,000" },
    { id: "1", value: "5000", label: "5,000" },
    { id: "2", value: "10000", label: "10,000" },
    { id: "3", value: "15000", label: "15,000" },
    { id: "4", value: "20000", label: "20,000" },
    { id: "5", value: "25000", label: "25,000" },
    { id: "6", value: "1000", label: "1,000" },
    { id: "7", value: "200", label: "200" },
  ];

  const promotions = [
    { id: 0, name: "৪% সীমাহীন বোনাস+ফ্রি স্পিন" },
    { id: 1, name: "২০০% HEYVIP বোনাস" },
    { id: 2, name: "৩০০% IPL দৈনিক স্পোর্টস বোনাস" },
    { id: 3, name: "১০৮০% স্লটস সাপ্তাহিক বোনাস" },
    { id: 4, name: "৫৭০% সাপ্তাহিক ক্যাসিনো বোনাস" },
    { id: 5, name: "নরমাল ডিপোজিট" },
  ];

  // const paymentMethods = [
  //   { id: "2048", name: "bKash", icon: "bkash.png", bonus: 4 },
  //   { id: "8192", name: "Nagad", icon: "nagad.png", bonus: 4 },
  //   { id: "4096", name: "Rocket", icon: "rocket.png", bonus: 4 },
  //   { id: "16777216", name: "UPay", icon: "upay.png", bonus: 4 },
  //   { id: "trc20", name: "USDT TRC20", icon: "trc20.svg", bonus: 0 },
  //   { id: "erc20", name: "USDT ERC20", icon: "erc20.svg", bonus: 0 },
  //   { id: "1", name: "Local Bank", icon: "bank-card.png", bonus: 4 },
  // ];

  const paymentTypes = [{ id: "0", name: "bKash Payment" }];

  const depositSettings = [
    { id: "3367", name: "EP-ক্যাশ আউট" },
    { id: "3705", name: "SP-ক্যাশ আউট" },
    { id: "3371", name: "AP-ক্যাশ আউট" },
    { id: "3508", name: "সেন্ড মানি" },
  ];

  const depositAmounts = [
    { id: "0", amount: "2,000" },
    { id: "1", amount: "5,000" },
    { id: "2", amount: "10,000" },
    { id: "3", amount: "15,000" },
    { id: "4", amount: "20,000" },
    { id: "5", amount: "30,000" },
    { id: "6", amount: "1,000" },
    { id: "7", amount: "200" },
  ];

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
    setAmountPay,
    gateway_name,
    setGateway_name,
    setGateway_Number,
    setPayment_type,
  } = usePayNow();

  const [paymentMethods, setpaymentMethods] = useState([]);
  // const [Payment, setPayment] = useState(null);
  const [activeTab, setActiveTab] = useState("deposit");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  let [amount, setAmount] = useState(0);
  const [Payment, setPayment] = useState(paymentMethods[0]); //paymentMethods[0]
  const [PaymentAct, setPaymentAct] = useState("");
  const [Mood, setMood] = useState(); //paymentMethods[0]
  // let amount =0
  const handelAmount = (blance) => {
    const updatedAmount = parseInt(amount || 0) + parseInt(blance);
    setAmount(parseInt(updatedAmount));
    console.log(updatedAmount);
  };
  console.log(paymentMethods);
  useEffect(() => {
    if (paymentMethods.length > 0) {
      setPayment(paymentMethods[0]);
    }
  }, [paymentMethods]);
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
    fetchGateways();
  }, [userDeatils.userId, token]);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handlePaySubmit = (event) => {
    setSelectedOption(event.target.value);
  };

  // const inputRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {}, []);

  const handleClearsetAmount = () => setAmount("");
  const handleChangeamount = (e) => {
    amount = e.target.value;
    setAmount(amount);
  };

  // userId: userId,
  setAmountPay(amount);
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

  const navigate = useNavigate();

  // console.log(paydata.payment_type)

  const handlePaymentSubmit = () => {
    if (!userId || !amount || !token) {
      alert("Please fill in all required fields.");
      return;
    }

    if (amount > 0) {
      // console.log("Submitting Payment Data:", paydata);
      // GetPaymentMethodsUser(paydata)
      //     .then((res) => {
      //         console.log("API Response:", res.data);
      //         if (res.data && typeof res.data === "string" && res.data.startsWith("http")) {
      //           window.open(res.data, "_self")
      //         } else {
      //             console.error("Invalid redirect URL:", res.data);
      //         }
      //     })
      //     .catch((error) => {
      //         console.error("Error in payment API:", error);
      //     });
      openModal(`${gateway_name}`);
    }
  };

  const clearInput = () => {
    setAmount("");
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
                                checked={paymentMethod === paymentMethod._id}
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
                                {/* {method.rebate > 0 && (
                                  <div className="tag-rebate-money">
                                    <p>
                                      <span>+</span>
                                      {method.rebate}
                                      <span>%</span>
                                    </p>
                                  </div>
                                )} */}

                                <div className="tag-rebate-money ng-star-inserted">
                                  <p>
                                    <span>+</span>
                                    3
                                    <span>%</span>
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
                      {/* <div className="select-group">
                        <ul className="col2 ">
                          <li className="ng-star-inserted">
                            <input
                              type="radio"
                              name="paymentType"
                              id="paymentType_0"
                              value="বিকাশ পেমেন্ট"
                              // checked={Payment?._id === Payment?._id}
                              // onChange={handlePaymentTypeChange}
                            />
                            <label htmlFor="paymentType_0">
                              {/* <span>{Payment?.gateway_name}</span> */}
                      {/* <span>
                                {Payment === null
                                  ? paymentMethods[0]?.gateway_name
                                  : Payment?.gateway_name}
                              </span>
                              <span
                                className="item-icon"
                                style={{
                                  maskImage:
                                    'url("https://img.c88rx.com/cx/h5/assets/images/player/select-check.svg?v=1739862678809")',
                                }}
                              ></span>
                            </label>
                          </li>
                        </ul>
                      </div>  */}
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
                          {PaymentMood.map((Mathod, index) => (
                            <li key={Mathod._id}>
                              <input
                                type="radio"
                                name="depositSetting"
                                id={`depositSetting_${Mathod._id}`}
                                onChange={() => setMood(Mathod._id)}
                              />
                              <label htmlFor={`depositSetting_${Mathod._id}`}>
                                <span>{Mathod.value}</span>
                              </label>
                            </li>
                          ))}
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
                          {Amount.map((amount, index) => (
                            <li key={index}>
                              <input
                                type="radio"
                                name="depositAmount"
                                id={`depositAmount_${index}`}
                                onChange={() => handelAmount(amount.value)}
                              />
                              {/* {console.log(amount.value)} */}
                              <label htmlFor={`depositAmount_${index}`}>
                                <span>{amount.value.toLocaleString()}</span>
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
                            value={amount}
                            onChange={ handleChangeamount}
                          />
                          {amount && (
                            <Link
                              type="button"
                              className={`clear ${amount ? "active" : ""}`}
                              onClick={handleClearsetAmount}
                            ></Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="tips-info note">
                      <h5>
                        <i
                          className="tips-icon"
                          style={{
                            maskImage:
                              "url('../../assets/images/icon-set/icon-tips-type02.svg')",
                            WebkitMaskImage:
                              "url('/assets/images/icon-set/icon-tips-type02.svg')",
                          }}
                        ></i>
                        <span>
                          ১/ব্যক্তিগত তথ্য"-এর অধীনে ক্যাশ আউট করার আগে সর্বোচ্চ
                          ৩টি মোবাইল নম্বর যোগ করুন এবং ভেরিফাই করুন।
                          <br />
                          ২/আপনার ডিপোজিট প্রক্রিয়ার দ্রুত সফল করতে সঠিক ক্যাশ
                          আউট নাম্বার , এমাউন্ট এবং ট্রানজেকশন আইডি সহ সাবমিট
                          দিন।
                          <br />
                          ৩/যেকোনো ডিপোজিট করার আগে সবসময় আমাদের ডিপোজিট পেইজে
                          নাম্বার চেক করুন ।
                          <br />
                          ৪/ডিপোজিট পেন্ডিং অবস্থায় আপনি ২টি ডিপোজিট এর জন্য
                          ট্রাই করতে পারবেন। আপনি কোনো সমস্যার সম্মুখীন হলে
                          লাইভচ্যাট সহায়তা নিতে পারেন।
                          <br />
                          ৫/ ১.৩০-এর নিচের ODDs বাজি, উইথড্র টার্নওভারের
                          প্রয়োজনীয়তার জন্য গণনা করা হবে না।
                        </span>
                      </h5>
                    </div>
                    <div className="member-content">
                      <button className="button">
                        <a>Submit</a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>

    // <div className="mcd-popup-page popup-page-wrapper active">
    //   <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
    //     <div className="popup-page__backdrop" onClick={closeModal}></div>
    //     <div className="popup-page__main popup-page-main popup-page-main--show">
    //       <div className="popup-page-main__header wallet-header">
    //         <div className="popup-page-main__title">Funds</div>
    //         <div className="popup-page-main__close" onClick={closeModal}></div>
    //       </div>
    //       <div className="popup-page-main__container">
    //         <div className="content mcd-style fixed-tab player-content">
    //           <div className="tab-btn-section tab-btn-wrap">
    //             <div className="tab-btn tab-btn-bar">
    //               <div
    //                 className="line"
    //                 style={{
    //                   width: "50%",
    //                   transform:
    //                     activeTab === "deposit"
    //                       ? "translate(0%, 0px)"
    //                       : "translate(100%, 0px)",
    //                 }}
    //               ></div>
    //               <div
    //                 className={`btn ${activeTab === "deposit" ? "active" : ""}`}
    //                 onClick={() => setActiveTab("deposit")}
    //               >
    //                 <div className="text">Deposit</div>
    //               </div>
    //               <div
    //                 className={`btn ${
    //                   activeTab === "withdrawal" ? "active" : ""
    //                 }`}
    //                 onClick={() => setActiveTab("withdrawal")}
    //               >
    //                 <div className="text">Withdrawal</div>
    //               </div>
    //             </div>
    //           </div>

    //           {activeTab === "deposit" && (
    //             <div className="tab-content tab-content-page">
    //               <div className="inner-wrap">
    //                 <div className="inner-box deposit-wallet">
    //                   <div className="player-deposit-wrap">
    //                     <div className="player-deposit-step1">
    //                       <div className="option-group select-bar">
    //                         <label>
    //                           <span
    //                             className="item-icon"
    //                             style={{
    //                               backgroundImage:
    //                                 "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-selectpromotion.svg?v=1745315543147)",
    //                             }}
    //                           ></span>
    //                           <div>Select Promotion</div>
    //                         </label>
    //                         <div className="option-wrap">
    //                           <select
    //                             value={selectedPromotion}
    //                             onChange={(e) =>
    //                               setSelectedPromotion(e.target.value)
    //                             }
    //                           >
    //                             {promotions.map((promo, index) => (
    //                               <option key={promo.id} value={index}>
    //                                 {promo.name}
    //                               </option>
    //                             ))}
    //                           </select>
    //                         </div>
    //                       </div>

    //                       {!isVerified && (
    //                         <div className="tips-info verify-tips tips-info-toggle">
    //                           <div className="title-box">
    //                             <h5>
    //                               <i
    //                                 className="tips-icon"
    //                                 style={{
    //                                   maskImage:
    //                                     "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-tips-type02.svg?v=1745315543147)",
    //                                 }}
    //                               ></i>
    //                               <span>
    //                                 Below info are required to proceed deposit
    //                                 request.
    //                               </span>
    //                             </h5>
    //                           </div>
    //                           <ol className="tips-info-block active">
    //                             <li className="contact-info">
    //                               <a onClick={() => openModal("modal2")}>
    //                                 <label>Contact Info</label>
    //                                 <ul>
    //                                   <li>Phone Number</li>
    //                                 </ul>
    //                               </a>
    //                             </li>
    //                           </ol>
    //                         </div>
    //                       )}

    //                       <div className="menu-box">
    //                         {!isVerified && (
    //                           <div className="kyc-verify-mask">
    //                             <div className="kyc-verify-mask-icon"></div>
    //                             <div className="kyc-verify-mask-message">
    //                               Please complete the verification.
    //                             </div>
    //                             <div className="kyc-verify-mask-blur"></div>
    //                           </div>
    //                         )}

    //                         <div className="title">
    //                           <h2>
    //                             <span>Payment Method</span>
    //                           </h2>
    //                         </div>

    //                         <div className="select-group checkbox-style">
    //                           <ul className="col3">
    //                             {paymentMethods.map((method) => (
    //                               <li
    //                                 key={method.id}
    //                                 className="payment-method"
    //                               >
    //                                 <input
    //                                   type="radio"
    //                                   name="paymentMethod"
    //                                   id={`paymentMethod_${method.id}`}
    //                                   checked={paymentMethod === method.id}
    //                                   onChange={() =>
    //                                     setPaymentMethod(method.id)
    //                                   }
    //                                 />
    //                                 <label
    //                                   htmlFor={`paymentMethod_${method.id}`}
    //                                 >
    //                                   <div className="bank">
    //                                     <img
    //                                       alt={method.name}
    //                                       src={`https://img.s628b.com/sb/h5/assets/images/payment/${method.icon}?v=1745315543147`}
    //                                       loading="lazy"
    //                                     />
    //                                   </div>
    //                                   <span>{method.name}</span>
    //                                   {method.bonus > 0 && (
    //                                     <div className="tag-rebate-money">
    //                                       <p>
    //                                         <span>+</span>
    //                                         {method.bonus}
    //                                         <span>%</span>
    //                                       </p>
    //                                     </div>
    //                                   )}
    //                                   <span
    //                                     className="item-icon"
    //                                     style={{
    //                                       maskImage:
    //                                         "url(https://img.s628b.com/sb/h5/assets/images/player/select-check.svg?v=1745315543147)",
    //                                     }}
    //                                   ></span>
    //                                 </label>
    //                               </li>
    //                             ))}
    //                           </ul>
    //                         </div>

    //                           <div className="select-group">
    //                             <ul className="col2">
    //                               {paymentTypes.map((type) => (
    //                                 <li key={type.id} className="payment-type">
    //                                   <input
    //                                     type="radio"
    //                                     name="paymentType"
    //                                     id={`paymentType_${type.id}`}
    //                                     checked={paymentType === type.id}
    //                                     onChange={() => setPaymentType(type.id)}
    //                                   />
    //                                   <label htmlFor={`paymentType_${type.id}`}>
    //                                     <span>{type.name}</span>
    //                                     <span
    //                                       className="item-icon"
    //                                       style={{
    //                                         maskImage:
    //                                           "url(https://img.s628b.com/sb/h5/assets/images/player/select-check.svg?v=1745315543147)",
    //                                       }}
    //                                     ></span>
    //                                   </label>
    //                                 </li>
    //                               ))}
    //                             </ul>
    //                           </div>

    //                       </div>

    //                         <div className="deposit-normal">
    //                           <div className="menu-box">
    //                             <div className="title">
    //                               <h2>
    //                                 <span>Deposit Channel</span>
    //                               </h2>
    //                             </div>
    //                             <div className="select-group checkbox-style checkbox-height-set">
    //                               <ul className="col2">
    //                                 {depositSettings.map((setting) => (
    //                                   <li
    //                                     key={setting.id}
    //                                     className="deposit-setting"
    //                                   >
    //                                     <input
    //                                       type="radio"
    //                                       name="depositSetting"
    //                                       id={`depositSetting_${setting.id}`}
    //                                       checked={
    //                                         depositSetting === setting.id
    //                                       }
    //                                       onChange={() =>
    //                                         setDepositSetting(setting.id)
    //                                       }
    //                                     />
    //                                     <label
    //                                       htmlFor={`depositSetting_${setting.id}`}
    //                                     >
    //                                       <span>{setting.name}</span>
    //                                       <span
    //                                         className="item-icon"
    //                                         style={{
    //                                           maskImage:
    //                                             "url(https://img.s628b.com/sb/h5/assets/images/player/select-check.svg?v=1745315543147)",
    //                                         }}
    //                                       ></span>
    //                                     </label>
    //                                   </li>
    //                                 ))}
    //                               </ul>
    //                             </div>
    //                           </div>
    //                         </div>

    //                         <div className="menu-box active">
    //                           <div className="title">
    //                             <h2>
    //                               <span>Amount</span>
    //                               <i>৳ 200.00 - ৳ 30,000.00</i>
    //                             </h2>
    //                           </div>
    //                           <div className="select-group style-add-amount">
    //                             <ul className="col4">
    //                               {depositAmounts.map((amount) => (
    //                                 <li
    //                                   key={amount.id}
    //                                   className="deposit-amount"
    //                                 >
    //                                   <input
    //                                     type="radio"
    //                                     name="depositAmount"
    //                                     id={`depositAmount_${amount.id}`}
    //                                     checked={depositAmount === amount.id}
    //                                     onChange={() => {
    //                                       setDepositAmount(amount.id);
    //                                       setCustomAmount("");
    //                                     }}
    //                                   />
    //                                   <label
    //                                     htmlFor={`depositAmount_${amount.id}`}
    //                                   >
    //                                     <span>{amount.amount}</span>
    //                                   </label>
    //                                 </li>
    //                               ))}
    //                             </ul>
    //                           </div>
    //                           <div className="input-group money">
    //                             <label htmlFor="amount">৳</label>
    //                             <div className="input-wrap">
    //                               <input
    //                                 type="text"
    //                                 value={customAmount}
    //                                 onChange={handleAmountChange}
    //                                 placeholder="0.00"
    //                                 inputMode="numeric"
    //                               />
    //                               {customAmount && (
    //                                 <a
    //                                   className="delete-btn"
    //                                   onClick={() => setCustomAmount("")}
    //                                   style={{
    //                                     maskImage:
    //                                       "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type09.svg?v=1745315543147)",
    //                                   }}
    //                                 ></a>
    //                               )}
    //                             </div>
    //                           </div>
    //                           <div className="tips-info note">
    //                             <h5>
    //                               <i className="tips-icon"></i>
    //                               <span>
    //                                 ১/ব্যক্তিগত তথ্য"-এর অধীনে ক্যাশ আউট করার
    //                                 আগে সর্বোচ্চ ৩টি মোবাইল নম্বর যোগ করুন এবং
    //                                 ভেরিফাই করুন। ২/আপনার ডিপোজিট প্রক্রিয়ার
    //                                 দ্রুত সফল করতে সঠিক ক্যাশ আউট নাম্বার ,
    //                                 এমাউন্ট এবং ট্রানজেকশন আইডি সহ সাবমিট দিন।
    //                                 ৩/যেকোনো ডিপোজিট করার আগে সবসময় আমাদের
    //                                 ডিপোজিট পেইজে নাম্বার চেক করুন । ৪/ডিপোজিট
    //                                 পেন্ডিং অবস্থায় আপনি ২টি ডিপোজিট এর জন্য
    //                                 ট্রাই করতে পারবেন। আপনি কোনো সমস্যার
    //                                 সম্মুখীন হলে লাইভচ্যাট সহায়তা নিতে পারেন। ৫
    //                                 ১.৩০-এর নিচের ODDs বাজি, উইথড্র টার্নওভারের
    //                                 প্রয়োজনীয়তার জন্য গণনা করা হবে না।
    //                               </span>
    //                             </h5>
    //                           </div>
    //                         </div>

    //                       <div className="member-content">
    //                         <div className="button">
    //                           <a onClick={handleSubmit}>Submit</a>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           )}

    //           {activeTab === "withdrawal" && (
    //             <div className="tab-content tab-content-page">
    //               {/* Withdrawal content would go here */}
    //               <div className="inner-wrap">
    //                 <div className="inner-box">
    //                   <p>Withdrawal content would be implemented similarly</p>
    //                 </div>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
