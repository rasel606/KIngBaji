import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({
  modalName
}) => {

  const {  activeModal, openModal, closeModal  } = useModal();
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

  const PaymentMathod = [
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
      value: "সেন্ড মানি",
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
                    <div className="text"  onClick={()=>openModal("DepositModel")}>
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
                        {/* <div className="option-group select-bar">
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
                        </div> */}
                        <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Payment Method</span>
                            </h2>
                          </div>
                          <div className="check-group">
                            <ul className="col3">
                              <li>
                                <label>
                                  <div className="payment-img">
                                    <img
                                      alt="bkash"
                                      src="https://img.m2911p.com/mp/h5/assets/images/payment/bkash.png?v=1736240166505&amp;source=mcdsrc"
                                      loading="lazy"
                                    />
                                  </div>
                                  <span>bKash</span>
                                </label>
                              </li>
                              <li>
                                <label>
                                  <div className="payment-img">
                                    <img
                                      alt="bkash"
                                      src="https://img.m2911p.com/mp/h5/assets/images/payment/bkash.png?v=1736240166505&amp;source=mcdsrc"
                                      loading="lazy"
                                    />
                                  </div>
                                  <span>bKash</span>
                                </label>
                              </li>
                              <li>
                                <label>
                                  <div className="payment-img">
                                    <img
                                      alt="bkash"
                                      src="https://img.m2911p.com/mp/h5/assets/images/payment/bkash.png?v=1736240166505&amp;source=mcdsrc"
                                      loading="lazy"
                                    />
                                  </div>
                                  <span>bKash</span>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* <div className="menu-box">
                          <div className="title">
                            <h2>
                              <span>Deposit Channel</span>
                            </h2>
                          </div>
                          <div className="check-group">
                            <div className="check-group">
                              <ul className="col2">
                                {PaymentMathod.map((Mathod, index) => (
                                  <li class="">
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
                        </div> */}
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
                                  <li class="">
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
                          <div className="check-group">
                            <div className="check-group">
                              <ul className="cal1">
                                <li class="">
                                  <input
                                    type="radio"
                                    name="paymentType"
                                    id="paymentType_0"
                                  />
                                  <label>
                                    <span>
                                      <div className="input-group money">
                                        <label htmlFor="amount">৳</label>
                                        <input
                                          className="mcdinputnumberwithcomma"
                                          placeholder="0.00"
                                          type="number"
                                          inputMode=""
                                        />
                                        <a className="clear"></a>
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
                                      <div className="card-number">
                                        
                                      </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
