import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

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

  const paymentMethods = [
    {
      id: "paymentMethod_2048",
      name: "bKash",
      image:
        "https://img.m2911p.com/mp/h5/assets/images/payment/bkash.png?v=1736848792125&source=mcdsrc",
      rebate: "+3.25%",
    },
    {
      id: "paymentMethod_8192",
      name: "Nagad",
      image:
        "https://img.m2911p.com/mp/h5/assets/images/payment/nagad.png?v=1736848792125&source=mcdsrc",
      rebate: "+3.25%",
    },
    {
      id: "paymentMethod_4096",
      name: "Rocket",
      image:
        "https://img.m2911p.com/mp/h5/assets/images/payment/rocket.png?v=1736848792125&source=mcdsrc",
      rebate: "+3.25%",
    },
    {
      id: "paymentMethod_16777216",
      name: "UPay",
      image:
        "https://img.m2911p.com/mp/h5/assets/images/payment/upay.png?v=1736848792125&source=mcdsrc",
      rebate: "+3.25%",
    },
    {
      id: "paymentMethod_1",
      name: "Local Bank",
      image:
        "https://img.m2911p.com/mp/h5/assets/images/payment/bank-card.png?v=1736848792125&source=mcdsrc",
      status: "under maintenance",
      maintenanceUntil: "08:00",
      rebate: "+3.25%",
    },
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

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [amount, setAmount] = useState("");
  const [Payment, setPayment] = useState(paymentMethods[0]);
  const [PaymentAct, setPaymentAct] = useState("");
  const [Mood, setMood] = useState(paymentMethods[0]);
  // const inputRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {}, []);

  const handleClearsetAmount = () => setAmount("");
  const handleChangeamount = (e) => {
    setAmount(e.target.value);
  };

  const clearInput = () => {
    setAmount("");
  };

  const userVarifayed = false;

  const [activeTab, setActiveTab] = useState("deposit");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showVerification, setShowVerification] = useState(false);

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
          <div className="popup-page-main__container">
          {/* userVarifayed ?( */}
          
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
                      <div className="player-deposit-step1">
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
                          <div className="check-group">
                            <ul className="col3">
                              {paymentMethods.map((payment, index) => (
                                <li
                                  onClick={() =>
                                    setPayment(payment) && setPaymentAct(index)
                                  }
                                  className={` alt ${
                                    index === PaymentAct ? "active" : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="paymentMethod_2048"
                                  />
                                  <label>
                                    <div className="payment-img">
                                      <img
                                        alt="bkash"
                                        src={payment.image}
                                        loading="lazy"
                                      />
                                    </div>
                                    <span>{payment.name}</span>
                                  </label>
                                  <div className="tag-rebate-money">
                                    <p>
                                      <span>+</span>3.25 <span>%</span>
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="check-group">
                            <ul className="col2">
                              <li class="">
                                <input
                                  type="radio"
                                  name="paymentType"
                                  id="paymentType_0"
                                />
                                <label>
                                  <span>{Payment.name}</span>
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
                                {PaymentMood.map((Mathod, index) => (
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
                                ))}
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
                                    onClick={() => setAmount(Mathod.value)}
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
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="check-group money">
                            <ul className="cal1">
                              <li
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                              >
                                <label htmlFor="amount">৳</label>
                                <input
                                  id="amount"
                                  className=""
                                  placeholder="0.00"
                                  type="number"
                                  inputMode="decimal"
                                  value={amount}
                                  // ref={inputRef}
                                  onChange={handleChangeamount}
                                />
                                {amount && (
                                  <input
                                    type="button"
                                    className={`clear ${
                                      amount ? "active" : ""
                                    }`}
                                    onClick={handleClearsetAmount}
                                  />
                                )}
                              </li>
                            </ul>
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
                              <p>
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
                            <Link>submit</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
          {/* ): (
          <div className="deposit-withdraw-container">
            <div className="tab-header">
              <button
                className={activeTab === "deposit" ? "active" : ""}
                onClick={() => handleTabChange("deposit")}
              >
                ডিপোজিট (Deposit)
              </button>
              <button
                className={activeTab === "withdraw" ? "active" : ""}
                onClick={() => handleTabChange("withdraw")}
              >
                উত্তোলন (Withdraw)
              </button>
            </div>

            <div className="content">
              <div className="promotion-section">
                <label>অগ্রিম প্রচার নির্বাচন করুন</label>
                <select>
                  <option value="">-- নির্বাচন করুন --</option>
                  <option value="promo1">প্রচার ১</option>
                  <option value="promo2">প্রচার ২</option>
                </select>
              </div>

              <div className="payment-methods">
                <label>পেমেন্ট পদ্ধতি নির্বাচন করুন</label>
                <div className="methods">
                  {["bKash", "Nagad", "Rocket", "UPay", "Local Bank"].map(
                    (method) => (
                      <button
                        key={method}
                        className={selectedPayment === method ? "selected" : ""}
                        onClick={() => handlePaymentSelect(method)}
                      >
                        {method}
                      </button>
                    )
                  )}
                </div>
              </div>

              {selectedPayment && (
                <div className="verification-section">
                  <p>
                    আপনি কি নিশ্চিত যে আপনি {selectedPayment} ব্যবহার করতে চান?
                  </p>
                  <button onClick={() => setShowVerification(true)}>
                    হ্যাঁ
                  </button>
                  <button onClick={() => setSelectedPayment(null)}>না</button>
                </div>
              )}
            </div>
          </div>
          ) */}
          </div>
        </div>
      </div>
    </div>
  );
};
