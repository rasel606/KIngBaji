import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import { GatWaySystem } from "../Component/Axios-API-Service/AxiosAPIService";
import { usePayNow } from "../PaymentContext/PaymenyContext";
import axios from "axios";

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

  // const Amount = [
  //   { id: "0", value: "2000", label: "2,000" },
  //   { id: "1", value: "5000", label: "5,000" },
  //   { id: "2", value: "10000", label: "10,000" },
  //   { id: "3", value: "15000", label: "15,000" },
  //   { id: "4", value: "20000", label: "20,000" },
  //   { id: "5", value: "25000", label: "25,000" },
  //   { id: "6", value: "1000", label: "1,000" },
  //   { id: "7", value: "200", label: "200" },
  // ];

  const Amounts = [
    { id: "0", value: "2000", label: "2,000" },
    { id: "1", value: "5000", label: "5,000" },
    { id: "2", value: "10000", label: "10,000" },
    { id: "3", value: "15000", label: "15,000" },
    { id: "4", value: "20000", label: "20,000" },
    { id: "5", value: "25000", label: "25,000" },
    { id: "6", value: "1000", label: "1,000" },
    { id: "7", value: "200", label: "200" },
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
    userId: userId,
  };

  const {
    gateway_name,
    gateway_Number,
    payment_type,
    newAmount, setNewAmountPay,
    setGateway_name,
    setGateway_Number,
    setPayment_type,
  } = usePayNow();

  const [paymentMethods, setpaymentMethods] = useState([]);

  // const [activeTab, setActiveTab] = useState("DepositModel");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  let [payAbleAmount, setPayAbleAmount] = useState(0);
  let [selectedPaymentAmount, setSelectedPaymentAmount] = useState();
  let [updatedAmount, setUpdatedAmount] = useState();
  const [Payment, setPayment] = useState(paymentMethods[0]); //paymentMethods[0]
  const [PaymentAct, setPaymentAct] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [Mood, setMood] = useState(); //paymentMethods[0]
  const [isVerified, setIsVerified] = useState(true);
  // let selectedPaymentAmount =0
  const handelAmount = (blance) => {
    setUpdatedAmount(parseInt(blance));
    const updatedAmount =
      parseInt(selectedPaymentAmount || 0) + parseInt(blance);
    setSelectedPaymentAmount(parseInt(updatedAmount));
    console.log(updatedAmount);
  };
  console.log(paymentMethods);
  useEffect(() => {
    if (paymentMethods.length > 0) {
      setPayment(Payment === null ? paymentMethods[0]?.gateway_name : Payment?.gateway_name);
    }
  }, [paymentMethods]);

  useEffect(() => {
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
        setError(error);
      }
    };
    fetchGateways();
  }, [userDeatils.userId, token]);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  // const inputRef = useRef(null);

  const handleChangeAmount = (e) => {
    selectedPaymentAmount = e.target.value;
    setSelectedPaymentAmount(selectedPaymentAmount);
  };

  // userId: userId,
 setNewAmountPay(selectedPaymentAmount);
  // useEffect(() => {
  //    if (paymentMethods.length > 0) {
  //     setGateway_name(Payment === null ? paymentMethods[0]?.gateway_name : Payment?.gateway_name)
  //    }
  //  }, [paymentMethods]);
  // setGateway_name(
  //   Payment === null ? paymentMethods[0]?.gateway_name : Payment?.gateway_name
  // );
 // setGateway_Number(
  //   Payment === null
  //     ? paymentMethods[0]?.gateway_Number
  //     : Payment?.gateway_Number
  // );
  setPayment_type(
    Payment === null ? paymentMethods[0]?.payment_type : Payment?.payment_type
  );

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (selectedPaymentAmount <= 0) {
      return;
    }
    try {
      const response = await axios.post(
        `https://api.kingbaji.live/api/v1/widthdraw_with_transaction`,
        {
          userId: userDeatils.userId,
          gateway_name:Payment === null ? paymentMethods[0]?.gateway_name : Payment?.gateway_name,
          referredBy: userDeatils.referredBy,
          mobile: userDeatils.phone[0].number,
          type: parseInt(1),
          amount: selectedPaymentAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.transactionID.length > 0) {
        console.log(response.data.transactionID);

        setTimeout(() => {
          closeModal();
        }, 1000);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };
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
                    style={{ width: "50%", transform: "translate(100%, 0px)" }}
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
                        <h4>0</h4>
                      </div>
                      <span className="item-bg"></span>
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
                                {/* <span className="item-icon"></span> */}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Amount Section */}
                    {isVerified  &&(<div className="menu-box">
                      <div className="title">
                        <h2>
                          <span>Amount</span>
                          <i>৳ 300.00 - ৳ 25,000.00</i>
                        </h2>
                      </div>
                      <div className="select-group style-add-amount">
                        <ul className="col4">
                          {Amounts &&
                            Amounts.map((amount, index) => (
                              <li key={index}>
                                <input
                                  type="radio"
                                  name="depositAmount"
                                  checked={updatedAmount == amount.value}
                                  id={`depositAmount_${amount.id}`}
                                  // placeholder = {amount?.value}
                                  onClick={() => handelAmount(amount.value)}
                                />
                                {console.log(
                                  "selectedPaymentAmount",
                                  selectedPaymentAmount
                                )}
                                {console.log("amount.value", amount.value)}
                                <label
                                  htmlFor={`depositAmount_${
                                    index ? index : ""
                                  }`}
                                >
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
                            onChange={handleChangeAmount}
                            inputMode="numeric"
                            value={selectedPaymentAmount}
                          />
                          {selectedPaymentAmount && (
                            <Link
                              className={`delete-btn ${
                                selectedPaymentAmount ? "" : "active"
                              }`}
                              onClick={() => setSelectedPaymentAmount("")}
                              // style={{
                              //   maskImage:
                              //     "url(https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type09.svg?v=1745315543147)",
                              // }}
                            ></Link>
                          )}
                        </div>
                      </div>
                    </div>)}

                    {/* Phone Number Section */}
                    {isVerified  &&( <div className="menu-box withdraw-menu-phone">
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
                                    {userDeatils.phone[0].number}
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
                    </div>)}

                    {/* Submit Button */}
                    <div className="member-content">
                      <div className="button submit">
                        <a onClick={handlePayment}>Submit</a>
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
    // <div className="modal-overlay" onClick={closeModal}>
    //   <div onClick={(e) => e.stopPropagation()}>
    //     <div className="popup-page__main popup-page-main popup-page-main--show">
    //       <div className="popup-page-main__header">
    //         <div className="popup-page-main__title">My wallet</div>
    //         <div className="popup-page-main__close" onClick={closeModal}></div>
    //       </div>
    //       <div className="popup-page-main__container">
    //         <div className="content fixed-tab player-content">
    //           <div className="tab-btn-section tab-btn-wrap">
    //             <div className="tab-btn tab-btn-bar">
    //               <div
    //                 className="line"
    //                 style={{
    //                   width: "calc(50%)",
    //                   transform: "translate(0%, 0px)",
    //                 }}
    //               ></div>

    //               <div className="btn ">
    //                 <div className="text">
    //                   Withdrawal
    //                   <div className="badge"></div>
    //                 </div>
    //               </div>
    //               <div className="btn ">
    //                 <div
    //                   className="text"
    //                   onClick={() => openModal("DepositModel")}
    //                 >
    //                   Deposit
    //                   <div className="badge"></div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="tab-content tab-content-page">
    //             <div className="inner-wrap">
    //               <div className="inner-box deposit-wallet">
    //                 <div className="player-deposit-wrap">
    //                   <div className="player-deposit-step1">
    //                     {/* <div className="option-group select-bar"></div> */}
    //                     <div className="menu-box">
    //                       <div className="title">
    //                         <h2>
    //                           <span>Payment Method</span>
    //                         </h2>
    //                       </div>

    //                       <div className="select-group checkbox-style">
    //                         <ul className="col3">
    //                           {paymentMethods.map((payment, index) => (
    //                             <li
    //                               key={payment._id}
    //                               className="ng-star-inserted"
    //                             >
    //                               <input
    //                                 type="radio"
    //                                 name="paymentMethod"
    //                                 id={payment._id}
    //                                 checked={Payment?._id === payment._id}
    //                                 onChange={() => setPayment(payment)}
    //                                 // setPaymentAct(index)
    //                               />
    //                               <label htmlFor={payment._id}>
    //                                 <div className="bank ng-star-inserted">
    //                                   <img
    //                                     src={payment.image_url}
    //                                     alt={payment.gateway_name}
    //                                     loading="lazy"
    //                                   />
    //                                 </div>
    //                                 <span>{payment.gateway_name}</span>
    //                                 <div className="tag-rebate-money ng-star-inserted">
    //                                   <p>
    //                                     <span>+</span>3<span>%</span>
    //                                   </p>
    //                                 </div>
    //                                 <span
    //                                   className="item-icon"
    //                                   style={{
    //                                     maskImage: `url(https://img.c88rx.com/cx/h5/assets/images/player/select-check.svg?v=1739862678809)`,
    //                                   }}
    //                                 ></span>
    //                               </label>
    //                             </li>
    //                           ))}
    //                         </ul>
    //                       </div>
    //                     </div>

    //                     <div className="menu-box">
    //                       <div className="title">
    //                         <h2>
    //                           <span>Amount</span>
    //                         </h2>
    //                       </div>

    //                       <div className="check-group">
    //                         <div className="check-group">
    //                           <ul className="col4">
    //                             {Amount.map((Mathod, index) => (
    //                               <li
    //                                 class=""
    //                                 onClick={() => handelAmount(Mathod.value)}
    //                               >
    //                                 <input
    //                                   type="radio"
    //                                   name="paymentType"
    //                                   id="paymentType_0"
    //                                 />
    //                                 <label>
    //                                   <span>+ {Mathod.value}</span>
    //                                 </label>
    //                               </li>
    //                             ))}
    //                           </ul>
    //                         </div>
    //                       </div>
    //                       <div className="check-group">
    //                         <div className="check-group">
    //                           <ul className="cal1">
    //                             <li class="">
    //                               <input
    //                                 type="radio"
    //                                 name="paymentType"
    //                                 id="paymentType_0"
    //                                 value={error}
    //                               />
    //                               <label>
    //                                 <span>
    //                                   <div className="input-group money" style={{display:"flex"}}>
    //                                     <label htmlFor="amount" style={{flexDirection:"column"}}>৳</label>

    //                                     <input
    //                                       className="mcdinputnumberwithcomma"
    //                                       placeholder="0.00"
    //                                       type="number"
    //                                       inputMode=""
    //                                       value={amount}
    //                                       onChange={handleChangeamount}
    //                                       style={{width:"70%",flexDirection:"column",textAlign:"right"}}
    //                                     />
    //                                     {amount && (
    //                                       <Link
    //                                         type="button"
    //                                         className={`clear ${
    //                                           amount ? "active" : ""
    //                                         }`}
    //                                         style={{flexDirection:"column",flexFlow:"column-reverse"}}
    //                                         onClick={handleClearsetAmount}
    //                                       ></Link>
    //                                     )}
    //                                     {/* <a className="clear"></a> */}
    //                                   </div>
    //                                 </span>
    //                               </label>
    //                             </li>
    //                           </ul>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="menu-box">
    //                       <div className="title">
    //                         <h2>
    //                           <span>Please select phone number</span>
    //                         </h2>
    //                       </div>

    //                       <div className="select-group style-bank">
    //                         <ul className="col2">
    //                           <li class="">
    //                             <input
    //                               type="radio"
    //                               name="paymentType"
    //                               id="paymentType_0"
    //                             />
    //                             <label>
    //                               <div className="select-card">
    //                                 <div className="select-card-inner">
    //                                   <div className="card-number">{userDeatils.phone}</div>
    //                                 </div>
    //                                 <i
    //                                   className="ng-tns-c2291427531-10"
    //                                   style={{
    //                                     backgroundImage: `url("https://img.m2911p.com/mp/h5/assets/images/slotgame/check.svg?v=1736240166505")`,
    //                                   }}
    //                                 ></i>
    //                               </div>
    //                             </label>
    //                           </li>
    //                         </ul>
    //                       </div>
    //                     </div>
    //                     <div className="deposit-content" type="submit" onClick={handlePayment}>
    //                       <div className="button btn-primary">
    //                         <Link type="submit" >submit</Link>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
