import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import { GatWaySystem } from "../Component/Axios-API-Service/AxiosAPIService";
import { usePayNow } from "../PaymentContext/PaymenyContext";
import axios from "axios";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
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
  const [Payment, setPayment] = useState(null);
  // const [activeTab, setActiveTab] = useState("deposit");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  let [amount, setAmount] = useState(0);


  const handelAmount = (blance) => {
    const newAmount = parseInt(amount) + parseInt(blance);
    setAmount(parseInt(userDeatils.balance) >= parseInt(newAmount) ? parseInt(newAmount) : parseInt(userDeatils.balance));
  };

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





  const handleClearsetAmount = () => setAmount(0);
  const handleChangeamount = (e) => {
    amount = e.target.value;
    setAmount(amount);
  };
  setAmountPay(amount);
 const navigate = useNavigate();


  const [selectedOption, setSelectedOption] = useState(options[0]);



  const handlePayment = async (e) => {
       e.preventDefault();
       if ( amount <= 0) {
        return;
      }
       try {
         const response = await axios.post(
           `http://35.207.202.6:5000/api/v1/widthdraw_with_transaction`,
           {
              userId:userDeatils.userId,
              gateway_name:Payment === null ? paymentMethods[0]?.gateway_name : Payment?.gateway_name,
              referredbyCode:userDeatils.referredbyCode,
              mobile:userDeatils.phone,
              type:parseInt(1),
              amount
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
  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const clearInput = () => {
    setAmount("");
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">My wallet</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content fixed-tab player-content">
              <div className="tab-btn-section tab-btn-wrap">
                <div className="tab-btn tab-btn-bar">
                  <div
                    className="line"
                    style={{
                      width: "calc(50%)",
                      transform: "translate(0%, 0px)",
                    }}
                  ></div>

                  <div className="btn ">
                    <div className="text">
                      Withdrawal
                      <div className="badge"></div>
                    </div>
                  </div>
                  <div className="btn ">
                    <div
                      className="text"
                      onClick={() => openModal("DepositModel")}
                    >
                      Deposit
                      <div className="badge"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-content tab-content-page">
                <div className="inner-wrap">
                  <div className="inner-box deposit-wallet">
                    <div className="player-deposit-wrap">
                      <div className="player-deposit-step1">
                        {/* <div className="option-group select-bar"></div> */}
                        <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Payment Method</span>
                            </h2>
                          </div>

                          <div className="select-group checkbox-style">
                            <ul className="col3">
                              {paymentMethods.map((payment, index) => (
                                <li
                                  key={payment._id}
                                  className="ng-star-inserted"
                                >
                                  <input
                                    type="radio"
                                    name="paymentMethod"
                                    id={payment._id}
                                    checked={Payment?._id === payment._id}
                                    onChange={() => setPayment(payment)}
                                    // setPaymentAct(index)
                                  />
                                  <label htmlFor={payment._id}>
                                    <div className="bank ng-star-inserted">
                                      <img
                                        src={payment.image_url}
                                        alt={payment.gateway_name}
                                        loading="lazy"
                                      />
                                    </div>
                                    <span>{payment.gateway_name}</span>
                                    <div className="tag-rebate-money ng-star-inserted">
                                      <p>
                                        <span>+</span>3<span>%</span>
                                      </p>
                                    </div>
                                    <span
                                      className="item-icon"
                                      style={{
                                        maskImage: `url(https://img.c88rx.com/cx/h5/assets/images/player/select-check.svg?v=1739862678809)`,
                                      }}
                                    ></span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Amount</span>
                            </h2>
                          </div>

                          <div className="check-group">
                            <div className="check-group">
                              <ul className="col4">
                                {Amount.map((Mathod, index) => (
                                  <li
                                    class=""
                                    onClick={() => handelAmount(Mathod.value)}
                                  >
                                    <input
                                      type="radio"
                                      name="paymentType"
                                      id="paymentType_0"
                                    />
                                    <label>
                                      <span>+ {Mathod.value}</span>
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="check-group">
                            <div className="check-group">
                              <ul className="cal1">
                                <li class="">
                                  <input
                                    type="radio"
                                    name="paymentType"
                                    id="paymentType_0"
                                    value={error}
                                  />
                                  <label>
                                    <span>
                                      <div className="input-group money" style={{display:"flex"}}>
                                        <label htmlFor="amount" style={{flexDirection:"column"}}>৳</label>
                                        
                                        <input
                                          className="mcdinputnumberwithcomma"
                                          placeholder="0.00"
                                          type="number"
                                          inputMode=""
                                          value={amount}
                                          onChange={handleChangeamount}
                                          style={{width:"70%",flexDirection:"column",textAlign:"right"}}
                                        />
                                        {amount && (
                                          <Link
                                            type="button"
                                            className={`clear ${
                                              amount ? "active" : ""
                                            }`}
                                            style={{flexDirection:"column",flexFlow:"column-reverse"}}
                                            onClick={handleClearsetAmount}
                                          ></Link>
                                        )}
                                        {/* <a className="clear"></a> */}
                                      </div>
                                    </span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Please select phone number</span>
                            </h2>
                          </div>

                          <div className="select-group style-bank">
                            <ul className="col2">
                              <li class="">
                                <input
                                  type="radio"
                                  name="paymentType"
                                  id="paymentType_0"
                                />
                                <label>
                                  <div className="select-card">
                                    <div className="select-card-inner">
                                      <div className="card-number">{userDeatils.phone}</div>
                                    </div>
                                    <i
                                      className="ng-tns-c2291427531-10"
                                      style={{
                                        backgroundImage: `url("https://img.m2911p.com/mp/h5/assets/images/slotgame/check.svg?v=1736240166505")`,
                                      }}
                                    ></i>
                                  </div>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="deposit-content" type="submit" onClick={handlePayment}>
                          <div className="button btn-primary">
                            <Link type="submit" >submit</Link>
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
