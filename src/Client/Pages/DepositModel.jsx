import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import { GatWaySystem, GetPaymentMethodsUser } from "../Component/Axios-API-Service/AxiosAPIService";
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

const {setAmountPay,
  gateway_name,
  setGateway_name,
  setGateway_Number,
  setPayment_type} = usePayNow();
  
  const [paymentMethods, setpaymentMethods] = useState([]);
  const [Payment, setPayment] = useState(null );
  const [activeTab, setActiveTab] = useState("deposit");
  const [selectedPayment, setSelectedPayment] = useState(null );
  const [showVerification, setShowVerification] = useState(false);
  const[loading,setLoading]=useState(true)

  let [amount, setAmount] = useState(0);
  // const [Payment, setPayment] = useState(paymentMethods[0]); //paymentMethods[0]
  const [PaymentAct, setPaymentAct] = useState("");
  const [Mood, setMood] = useState(); //paymentMethods[0]
  // let amount =0
  const handelAmount = (blance) => {
    amount += parseInt(blance);
    setAmount(amount);
    console.log(amount);
  };



  useEffect(() => {
    // Fetch gateway list from backend on component mount
    const fetchGateways = async () => {
      console.log(data);
      try {
        const response = await GatWaySystem(data);
        setpaymentMethods(response?.data?.paymentMethods);
        // setGatewaysCount(response.data.Getwaycount);
        console.log(response.data.paymentMethods);
        if(response.data.paymentMethods.length>0){
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching gateways:", error);
      }
    };
    fetchGateways();
  }, [userDeatils.userId,token]);
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

  const handleClearsetAmount = () => (amount = "");
  const handleChangeamount = (e) => {
    amount = e.target.value;
  };


    // userId: userId,
    setAmountPay(amount)
    setGateway_name( Payment === null  ? paymentMethods[0]?.gateway_name :  Payment?.gateway_name)
    setGateway_Number( Payment === null  ? paymentMethods[0]?.gateway_Number :  Payment?.gateway_Number)
    setPayment_type( Payment === null  ? paymentMethods[0]?.payment_type :  Payment?.payment_type)
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

  // const clearInput = () => {
  //   setAmount("");
  // };

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

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">My wallet</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          {loading?<p style={{color:"#fff"}}>gateway not available</p>:
          (paymentMethods.length) &&(
          <div className="popup-page-main__container">
            <div className="content fixed-tab player-content">
              <div className="tab-btn-section tab-btn-wrap">
                <div className="Mytab-btn tab-btn-bar">
                  <div
                    className="line"
                    // style={{
                    //   width: "calc(50%)",
                    //   transform: "translate(0%, 0px)",
                    // }}
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
                    <div className="player-deposit-wrap">
                      <div className="player-deposit-step">
                        <div className="option-group select-bar">
                          
                          <h2>Promotion</h2>
                          <div className="option-wrap">
                            <select
                              value={selectedOption}
                              onChange={handleChange}
                            >
                              {options.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
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

                          <div className="select-group ng-tns-c324864554-10 ng-star-inserted">
                            <ul className="col2 ng-tns-c324864554-10">
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
                                  <span>{Payment === null  ? paymentMethods[0]?.gateway_name : Payment?.gateway_name  }</span>
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
                          </div>
                        </div>
                        <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Deposit Channel</span>
                            </h2>
                          </div>
                          <div className="check-group">
                            <div className="check-group">
                              <ul className="col2">
                                {/* {PaymentMood.map((Mathod, index) => (
                                  <li
                                    class=""
                                    onClick={() => setMood(Mathod, index)}
                                  >
                                    <input
                                      type="radio"
                                      name="paymentType"
                                      id="paymentType_0"
                                    />
                                    <label>
                                      <span>{Mathod.value}</span>
                                    </label>
                                  </li>
                                ))} */}
                                <li
                                  class=""
                                  // onClick={() => setMood(Mathod, index)}
                                >
                                  <input
                                    type="radio"
                                    name="paymentType"
                                    id="paymentType_0"
                                  />
                                  <label>
                                    <span>{Payment === null  ? paymentMethods[0]?.payment_type :  Payment?.payment_type}</span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Deposit Amount</span>
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

                          <div className="check-group money">
                          <label htmlFor="amount">৳</label>
                            <input
                              type="text"
                              id="userId"
                              name="userId"
                              placeholder="4-15 char, allow numbers, no space"
                              className="input"
                              value={amount}
                              onChange={handleChangeamount}
                              />
                              {amount && (
                                <Link
                                  type="button"
                                  className={`clear ${
                                    amount ? "active" : ""
                                  }`}
                                  onClick={handleClearsetAmount}
                                ></Link>
                            )}
                          </div>
                        </div>
                        <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Deposit Amount</span>
                            </h2>
                          </div>

                          <div className="check-group">
                            <div className="check-group">
                              <p style={{color:"#000"}}>
                                1/Personal Information” before cashing out Add
                                up to 3 mobile numbers and verify do
                                <br />
                                2/ To speed up your deposit process Correct cash
                                out number, amount and transaction Submit with
                                ID.
                                <br />
                                3/ Before making any deposit Always check the
                                number on our deposit page.
                                <br />
                                4/ You can try for 2 deposits while the deposit
                                is pending. You can take livechat support if you
                                face any problem.
                                <br />
                                5/ Bet on ODDs below 1.30, withdraw turnover
                                will not count toward the requirement.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="deposit-content">
                          <div className="button btn-primary">
                            <Link onClick={()=> handlePaymentSubmit()}>submit</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
}
        </div>
      </div>

    </div>
  );
};
