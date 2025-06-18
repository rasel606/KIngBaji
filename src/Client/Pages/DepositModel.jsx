import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import {
  GatWaySystem,
  GetAllBonuses,
} from "../Component/Axios-API-Service/AxiosAPIService";
import { usePayNow } from "../PaymentContext/PaymenyContext";

const DepositModal = ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  const { userDeatils, token } = useAuth();
  const {
    gateway_name,
    gateway_Number,
    payment_type,
    newAmount,
    setNewAmountPay,
    showAmountLimit,
    setShowAmountLimit,
    setGateway_name,
    setGateway_Number,
    setPayment_type,
    Payment,
    setPayment,
    selectedOption,
    setSelectedOption,
  } = usePayNow();

  // State management
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [bonuses, setBonuses] = useState([]);
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified] = useState(true);
const [lastClickedAmount, setLastClickedAmount] = useState(null);
  // Default amounts for quick selection
  const quickAmounts = [
    { id: "0", value: 2000, label: "2,000" },
    { id: "1", value: 5000, label: "5,000" },
    { id: "2", value: 10000, label: "10,000" },
    { id: "3", value: 15000, label: "15,000" },
    { id: "4", value: 20000, label: "20,000" },
    { id: "5", value: 25000, label: "25,000" },
    { id: "6", value: 1000, label: "1,000" },
    { id: "7", value:selectedOption ? selectedOption.minDeposit : 200, label: selectedOption ? selectedOption.minDeposit : "200" },
  ];

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await GatWaySystem({ userId: userDeatils.userId });
        if (response.data?.paymentMethods) {
          setPaymentMethods(response.data.paymentMethods);
          // Set default payment method if available
          if (response.data.paymentMethods.length > 0) {
            setPayment(response.data.paymentMethods[0]);
            setGateway_name(response.data.paymentMethods[0].gateway_name);
            setGateway_Number(response.data.paymentMethods[0].gateway_Number);
            setPayment_type(response.data.paymentMethods[0].payment_type);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setIsLoading(false);
      }
    };

    if (activeModal === modalName) {
      fetchPaymentMethods();
    }
  }, [userDeatils.userId, token, modalName, activeModal]);

  // Fetch bonuses
  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const response = await GetAllBonuses();
        if (response.data?.data) {
          setBonuses(response.data.data);
          // Set default bonus if available
          if (response.data.data.length > 0) {
            setSelectedOption(response.data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching bonuses:", error);
      }
    };

    if (activeModal === modalName) {
      fetchBonuses();
    }
  }, [modalName, activeModal]);

  console.log("bonuses", selectedOption);
  // Handle amount selection
  const handleAmountSelection = (amount) => {
   let updatedAmount = amount;
    updatedAmount = parseInt(selectedPaymentAmount) + parseInt(amount);

    setSelectedPaymentAmount(updatedAmount);
  };

  // Handle manual amount input
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSelectedPaymentAmount(value ? parseInt(value) : 0);
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setPayment(method);
    setGateway_name(method.gateway_name);
    setGateway_Number(method.gateway_Number);
    setPayment_type(method.payment_type);
  };

  // Handle bonus selection
  const handleBonusSelect = (e) => {
    const selectedBonusId = e.target.value;
    const bonus = bonuses.find((b) => b._id === selectedBonusId);
    setSelectedOption(bonus);
  };
  setNewAmountPay(selectedPaymentAmount);
  // Validate and submit payment
  const handlePaymentSubmit = () => {
    if (selectedPaymentAmount < 199 || selectedPaymentAmount > 25000) {
      setShowAmountLimit(
        "Sorry! Your amount is invalid. Please enter an amount between ৳200 and ৳25,000."
      );
      return;
    }

    openModal(`${gateway_name}`);
  };

  if (activeModal !== modalName) return null;
  if (isLoading) return <div className="loading-spinner">Loading...</div>;

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
                      {/* Bonus Selection */}
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
                        <select
                          value={selectedOption?._id || ""}
                          onChange={handleBonusSelect}
                        >
                          {bonuses.map((bonus) => (
                            <option key={bonus._id} value={bonus._id}>
                              {bonus.name}
                              {bonus.maxBonus
                                ? ` with max bonus ${bonus.maxBonus}`
                                : ""}
                              {bonus.percentage
                                ? ` (${bonus.percentage}%)`
                                : ""}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Verification Notice (if needed) */}
                      {!isVerified && (
                        <div className="tips-info verify-tips tips-info-toggle">
                          <div className="title-box">
                            <h5>
                              <i className="tips-icon"></i>
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
                                  <li>Phone Number</li>
                                </ul>
                              </a>
                            </li>
                          </ol>
                        </div>
                      )}

                      {/* Payment Methods */}
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
                            {paymentMethods.map((method) => (
                              <li key={method._id}>
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  id={`paymentMethod_${method._id}`}
                                  checked={Payment?._id === method._id}
                                  onChange={() =>
                                    handlePaymentMethodSelect(method)
                                  }
                                />
                                <label htmlFor={`paymentMethod_${method._id}`}>
                                  <div className="bank">
                                    <img
                                      alt={method.gateway_name}
                                      src={method.image_url}
                                      loading="lazy"
                                    />
                                  </div>
                                  <span>{method.gateway_name}</span>
                                  {selectedOption?.percentage && (
                                    <div className="tag-rebate-money">
                                      <p>
                                        <span>+</span>
                                        {selectedOption.percentage}
                                        <span>%</span>
                                      </p>
                                    </div>
                                  )}
                                  <span
                                    className={`${
                                      Payment?._id === method._id
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
                            ))}
                          </ul>
                        </div>

                        {/* Payment Type */}
                        <div className="select-group">
                          <ul className="col2">
                            <li>
                              <input
                                type="radio"
                                name="paymentType"
                                id="paymentType_0"
                                checked={true}
                                readOnly
                              />
                              <label htmlFor="paymentType_0">
                                <span>
                                  {payment_type || Payment?.payment_type}
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Amount Selection */}
                      <div className="menu-box active">
                        <div className="title">
                          <h2>
                            <span>Amount</span>
                            <i>৳ {selectedOption ? selectedOption.minDeposit :"200.00"} - ৳ 25,000.00</i>
                          </h2>
                        </div>
                        <div className="select-group style-add-amount">
                          <ul className="col4">
                            {quickAmounts.map((amount) => (
                              <li key={amount.id}>
                                <input
                                  type="radio"
                                  name="depositAmount"
                                  value={amount.value}
                                  checked={
                                    selectedPaymentAmount === amount.value
                                  }
                                  id={`depositAmount_${amount.id}`}
                                  onChange={() =>
                                    handleAmountSelection(amount.value)
                                  }
                                />
                                <label htmlFor={`depositAmount_${amount.id}`}>
                                  <span>{amount.label}</span>
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
                              value={selectedPaymentAmount || ""}
                              onChange={handleAmountChange}
                            />
                            {selectedPaymentAmount > 0 && (
                              <Link
                                className="delete-btn"
                                onClick={() => setSelectedPaymentAmount(0)}
                              ></Link>
                            )}
                          </div>
                        </div>

                        {/* Important Notes */}
                        <h5>
                          <div className="tips-info note">
                            <i className="tips-icon"></i>
                            <span
                              style={{ whiteSpace: "pre-wrap", color: "white" }}
                            >
                              ১/ব্যক্তিগত তথ্য"-এর অধীনে ক্যাশ আউট করার আগে
                              সর্বোচ্চ ৩টি মোবাইল নম্বর যোগ করুন এবং ভেরিফাই
                              করুন। ২/আপনার ডিপোজিট প্রক্রিয়ার দ্রুত সফল করতে
                              সঠিক ক্যাশ আউট নাম্বার , এমাউন্ট এবং ট্রানজেকশন
                              আইডি সহ সাবমিট দিন। ৩/যেকোনো ডিপোজিট করার আগে
                              সবসময় আমাদের ডিপোজিট পেইজে নাম্বার চেক করুন ।
                              ৪/ডিপোজিট পেন্ডিং অবস্থায় আপনি ২টি ডিপোজিট এর জন্য
                              ট্রাই করতে পারবেন। আপনি কোনো সমস্যার সম্মুখীন হলে
                              লাইভচ্যাট সহায়তা নিতে পারেন। ৫ ১.৩০-এর নিচের ODDs
                              বাজি, উইথড্র টার্নওভারের প্রয়োজনীয়তার জন্য গণনা
                              করা হবে না।
                            </span>
                          </div>
                        </h5>
                      </div>

                      {/* Submit Button */}
                      <div className="member-content">
                        <div
                          className="button submit"
                          onClick={handlePaymentSubmit}
                        >
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

export default DepositModal;
