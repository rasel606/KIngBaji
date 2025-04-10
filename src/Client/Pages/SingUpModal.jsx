import React, { useState } from "react";
import Carousel from "./Carousel";
import DropdownWithScroll from "./DropdownWithScroll";
import { Link, useNavigate } from "react-router-dom";
import { CreateUser } from "../Component/Axios-API-Service/AxiosAPIService";
import { useAuth } from "../Component/AuthContext";
import { useModal } from "../Component/ModelContext";
import SingupSlider from "./SingupSlider";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const images = [
    "https://i.ibb.co.com/DChN5S5/img-1.jpg",
    "https://i.ibb.co.com/VqtD7Tq/img-2.jpg",
    "https://i.ibb.co.com/7Kkr63k/img-3.jpg",
    "https://i.ibb.co.com/LQB0VW7/img-4.jpg",
    "https://i.ibb.co.com/gdQVX9d/image-5.jpg",
  ];
  const currencies = [
    {
      Id: "Option 1",
      Currency: "BDT",
      code: "+880",
      flag: "BD",
    },
    {
      Id: "Option 2",
      Currency: "INR",
      code: "+091",
      flag: "IN",
    },
    {
      Id: "Option 3",
      Currency: "PKR",
      code: "+092",
      flag: "PK",
    },
  ];

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setSelectedCurrency(option);
  //   setSelectedCountry(option?.code);
  // };

  const [selectedOption, setSelectedOption] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedCountry, setSelectedCountry] = useState(selectedCurrency.code);
  const [phoneNumber, setPhoneNumber] = useState();
  // const [referredbyCode, setreferredbyCode] = useState(referralCode);

  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorNum, setErrorNum] = useState("");

  const handleUsername = (e) => {
    const value = e.target.value;
    const min = "1234"; // 3 characters
    const max = "12345678901"; // 12 characters

    if (value.length < min.length) {
      setError("UserName minimum length is 4");
    } else if (value.length > max.length) {
      setError("UserName maximum length is 12");
    } else {
      setError(""); // Clear message when valid
    }

    setUserId(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
    if (value.length > 11) {
      setErrorNum("Phone number must be 11 digits.");
    }
    setPhoneNumber(validateInput(value));
  };

  const validateInput = (value) => {
    const min = "1234567890"; // 3 characters
    const max = "1234567890"; // 12 characters

    if (value.length < min.length) {
      setErrorNum("Phone Number Invalid");
    } else if (value.length > max.length) {
      setErrorNum("Phone Number Invalid");
    } else {
      setErrorNum(""); // Clear message when valid
    }

    return value;
  };

  const handleClearUsername = () => setUserId("");
  const handleClearPassword = () => setPassword("");
  const handleClearphoneNumber = () => setPhoneNumber("");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const { isAuthenticated, loginUser, logoutUser, verifyUser, userRegistar } =
    useAuth();
  const validateUsername = (userId) => {
    return userId.length >= 4 && userId.length <= 15;
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    const minLength = 6; // Minimum length: 4 characters
    const maxLength = 20; // Maximum length: 12 characters

    if (value.length < minLength) {
      setErrorPassword("Password minimum length is 6");
    } else if (value.length > maxLength) {
      setErrorPassword("Password maximum length is 20");
    } else if (!validatePassword(value)) {
      setErrorPassword(
        "Password must be 6-20 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character."
      );
    } else if (value.length <= 6 && value.length >= 20) {
      setErrorPassword("Password must be 6-20 characters long.");
    } else {
      setErrorPassword(""); // Clear message when valid
    }

    setPassword(value);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#])[A-Za-z\d@$!%#]{6,}$/;

    if (!regex.test(password)) {
      return false;
    }

    // Count occurrences of each character
    const charCount = {};
    for (let char of password) {
      charCount[char] = (charCount[char] || 0) + 1;
      if (charCount[char] > 5) {
        return false; // If any character appears more than 6 times, return false
      }
    }

    return true;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  let referredbyCode = "";
  const referralCode = localStorage.getItem("referralCode");
  referredbyCode += referralCode;
  console.log(referralCode);
  const handleSubmit = async () => {
    const referralCode = localStorage.getItem("referralCode");
    console.log(referralCode);
    // if (!userId || !password || !phoneNumber) {
      // const referralCode = localStorage.setItem("referralCode", referralCode)
      console.log(referredbyCode);
      console.log(referralCode);
      console.log(userId, password, selectedCountry, phoneNumber);
      const data = {
        userId,
        password,
        countryCode: selectedCountry,
        phone: phoneNumber,
        referredbyCode: referralCode,
      };

      console.log(data);
      const result = await userRegistar(data);
      console.log(result);
     
  };

  return (
    <mcd-popup-page className="popup-page-wrapper active">
      <div className="popup-page popup-page--active popup-page--align-top">
    <div className="" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login-tab">
            <div className="popup-page-main__title"> SignUp </div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content member-content new-login third-party-login">
              <div className="register-entry ">
                <div
                  className="logo-box"
                  style={{
                    backgroundImage: `url(https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png)`,
                  }}
                >
                  {/* <img 
                      src=""
                      alt=""
                    /> */}
                </div>
                {isAuthenticated ? (
                  <div className="register-success-wrap ">
                    <div className="register-success-cont">
                      <div className="register-success-txt top-inner">
                        <div className="success-checkmark">
                          <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                          </div>
                        </div>
                        <h3 className="">
                          একজন KINGBAJI সদস্য হওয়ার জন্য অভিনন্দন!
                        </h3>
                        <p>
                          Congratulations! To start playing, please perform a
                          deposit.
                        </p>
                      </div>
                      <div
                        className="register-success-btn"
                        onClick={() => openModal("Deposit")}
                      >
                        <a className="button btn-default">এখনি ডিপোজিট করুন</a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="menu-box">
                      <Carousel images={images}></Carousel>
                      {/* <SingupSlider></SingupSlider> */}
                      <div className="input-group currency-number third-party-input-group-title">
                        <label>Choose currency</label>
                        <div className="input-wrap currency-wrap">
                          <div className="currency-area-code">
                            <div className="lang-select">
                              <div
                                className="button btn-select currency-list-area"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                <li>
                                  <img
                                    alt={selectedCurrency.flag}
                                    src={`https://img.c88rx.com/cx/h5/assets/images/flag/${selectedCurrency.flag}.png?v=1737700422219&source=mcdsrc`}
                                    loading="lazy"
                                  />
                                  <span>{selectedCurrency.Currency}</span>
                                </li>
                              </div>
                              <div
                                className="currency-code-list-group"
                                style={{ display: isOpen ? "block" : "none" }}
                              >
                                <ul className="currency-code-list currency-list-area">
                                  {currencies.map((currency, index) => (
                                    <li
                                      key={index}
                                      onClick={() =>
                                        setSelectedCurrency(currency.code)
                                      }
                                    >
                                      <img
                                        alt={currency.code}
                                        src={`https://img.c88rx.com/cx/h5/assets/images/flag/${currency.flag}.png?v=1737700422219&source=mcdsrc`}
                                        loading="lazy"
                                      />
                                      <span>{currency.code}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=""></div>
                    </div>

                    <div className="entry_outlet">
                      <form novalidate="" className="">
                        <div className="menu-box">
                          <div className="input-group">
                            <label htmlFor="userId">Username</label>
                            <input
                              type="text"
                              id="userId"
                              name="userId"
                              placeholder="4-15 char, allow numbers, no space"
                              value={userId}
                              onChange={handleUsername}
                              className="input"
                            />
                            {userId && (
                              <input
                                type="button"
                                className={`clear ${userId ? "active" : ""}`}
                                onClick={handleClearUsername}
                              />
                            )}
                          </div>
                          {error && (
                            <div className="error-message">
                              <span>{error}</span>
                            </div>
                          )}

                          <div className="input-group password">
                            <div
                              type="button"
                              className={`eyes ${password ? "active" : "not"}`}
                              onClick={togglePasswordVisibility}
                            ></div>
                            <label htmlFor="password">Password</label>
                            <input
                              type={isPasswordVisible ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="6-20 Characters and Numbers"
                              value={password}
                              onChange={handlePassword}
                              className="input"
                            />
                            {password && (
                              <input
                                type="button"
                                className={`clear ${password ? "active" : ""}`}
                                onClick={handleClearPassword}
                              />
                            )}
                          </div>
                          {errorPassword && (
                            <div className="error-message">
                              <label>{errorPassword}</label>
                            </div>
                          )}

                          <div className="input-group phone-number third-party-input-group-title">
                            <label>Phone Number</label>
                            <div className="input-wrap phone-wrap">
                              <div className="phone-area-code">
                                <div className="lang-select">
                                  <button className="btn-select only">
                                    <li>
                                      <img
                                        alt="BD"
                                        src="https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1737700422219&source=mcdsrc"
                                        loading="lazy"
                                      />
                                      <span>+880</span>
                                    </li>
                                  </button>
                                </div>
                              </div>
                              <input
                                type="tel"
                                inputMode="tel"
                                className="input invalid"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                              />
                              {phoneNumber && (
                                <input
                                  type="button"
                                  className={`clear ${
                                    phoneNumber ? "active" : ""
                                  }`}
                                  onClick={handleClearphoneNumber}
                                />
                              )}
                              {/* <input className="clear" /> */}
                            </div>
                          </div>
                          {errorNum && (
                            <div className="error-message">
                              <label>{errorNum}</label>
                            </div>
                          )}
                          <div
                            className={`button ${
                              userId && password && phoneNumber > 1234567591
                                ? "active"
                                : "btn-disabled"
                            }`}
                            type="submit"
                            onClick={() => handleSubmit()}
                          >
                            Sign Up
                          </div>
                        </div>
                      </form>

                      <p className="button-tips">
                        <span className="">Already a member ?</span>
                        <Link
                          className=""
                          onClick={() => openModal("LoginModel")}
                        >
                          Log in
                        </Link>
                      </p>
                      <div className="ng-star-inserted">
                        <p className="footer-tips ng-star-inserted">
                          <span>
                            Registering means you are over 18 years old, have
                            read and agree to the
                            <Link className="footer-tips ">
                              Terms &amp; Conditions.
                            </Link>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </mcd-popup-page>
  );
};
