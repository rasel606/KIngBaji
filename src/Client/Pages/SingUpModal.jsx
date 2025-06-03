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

  const banners = [
    {
      id: 0,
      imageUrl:
        "https://img.s628b.com/upload/registerH5Slider/image_211264.jpg",
    },
    {
      id: 1,
      imageUrl:
        "https://img.s628b.com/upload/registerH5Slider/image_199015.jpg",
    },
    {
      id: 2,
      imageUrl:
        "https://img.s628b.com/upload/registerH5Slider/image_231436.jpg",
    },
    {
      id: 3,
      imageUrl:
        "https://img.s628b.com/upload/registerH5Slider/image_227304.jpg",
    },
    {
      id: 4,
      imageUrl:
        "https://img.s628b.com/upload/registerH5Slider/image_199005.jpg",
    },
  ];

  const [activeBanner, setActiveBanner] = useState(3);
  const currencies = [
    {
      Id: "Option 1",
      Currency: "BDT",
      code: "+880",
      flag: "BD",
    },
  ];

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setSelectedCurrency(option);
  //   setSelectedCountry(option?.code);
  // };

  const [selectedOption, setSelectedOption] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedCountry, setSelectedCountry] = useState(
    selectedCurrency?.code
  );
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
  const { isAuthenticated, loginUser, logoutUser, userRegistar } = useAuth();
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
    } else if (value.length <= 6 && value.length >= 20) {
      setErrorPassword("Password must be 6-20 characters long.");
    } else {
      setErrorPassword(""); // Clear message when valid
    }

    setPassword(value);
  };

  const referralCode = localStorage.getItem("referralCode");

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

  let referredBy = referralCode;
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(true);
  // const referralCode = localStorage.getItem("referralCode");
  // referredBy += referralCode;
  // console.log(referralCode);
  const handleSubmit = async () => {
    console.log(referralCode);
    // if (!userId || !password || !phoneNumber) {
    // const referralCode = localStorage.setItem("referralCode", referralCode)
    console.log(referredBy);
    console.log(referralCode);
    console.log(userId, password, selectedCountry, phoneNumber);
    const userData = {
      userId,
      password,
      countryCode: "+880",
      phone: phoneNumber,
      referredBy: referralCode,
    };

    try {
      await userRegistar(userData);
      setIsRegistrationSuccess(false)
      // alert("Registration successful");
      handleClearUsername();
      handleClearPassword();
      handleClearphoneNumber();
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      <div
        className="popup-page popup-page--active popup-page--align-top"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login">
            <div className="popup-page-main__title">সাইন আপ</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="popup-page-main__container">
            <div className="content mcd-style member-content third-party-login">
              <div className="register-entry">
                <div
                  className="logo-box"
                  style={{
                    backgroundImage:
                      'url("https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png")',
                  }}
                ></div>

                {/* <div className="banner banner-v1">
                  <div className="carousel-wrap style-init siblings">
                    <div className="cdk-drag item-drag">
                      <div className="item-left">
                        <div className="item-wrap">
                          {banners.map((banner) => (
                            <div
                              key={banner.id}
                              className="item"
                              style={{ width: "224px" }}
                            >
                              <div
                                className="item-pic"
                                style={{
                                  backgroundImage: `url(${banner.imageUrl})`,
                                }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ul className="dot-group style-bar">
                      {banners.map((banner, idx) => (
                        <li
                          key={banner.id}
                          className={activeBanner === idx ? "active" : ""}
                        >
                          <span
                            className="dot-progress"
                            style={{ animationDuration: "3000ms" }}
                          ></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}

                <Carousel></Carousel>

                <div className="menu-box"></div>
              </div>


 

              {isRegistrationSuccess ? (
                <>



              <div className="entry-outlet">
                <form className="ng-invalid ng-dirty ng-touched">
                  <div className="menu-box">
                    {/* <div className="input-group third-party-input-group-title">
                <label>Referral Code</label>

                <input
                  type="text"
                  className="input ng-dirty ng-valid ng-touched"
                  placeholder={referralCode}
                  value={referralCode}
                  style={{
                    cursor: "not-allowed",
                    color: "white",
                    display: "block",
                    opacity: "1",
                    background: "blue",
                  }}
                />
                {userId && (
                  <input
                    className="clear active"
                    onClick={() => handleClearUsername("")}
                  />
                )}
              </div> */}
                    <div className="input-group third-party-input-group-title">
                      <label>ব্যবহারকারীর নাম</label>
                      <input
                        type="text"
                        className="input ng-dirty ng-valid ng-touched"
                        placeholder="৪-১৫ অক্ষর নাম্বার এলাউ"
                        value={userId.toLocaleLowerCase()}
                        onChange={handleUsername}
                      />
                      {userId && (
                        <input
                          className="clear active"
                          onClick={() => handleClearUsername("")}
                        />
                      )}
                      {error && (
                        <div className="error-message">
                          <span>{error}</span>
                        </div>
                      )}
                    </div>

                    <div className="input-group password third-party-input-group-title">
                      <div
                        className={`eyes ${password ? "show" : ""}`}
                        onClick={togglePasswordVisibility}
                      ></div>
                      <label>পাসওয়ার্ড</label>
                      <input
                        type={password ? "text" : "password"}
                        className="input ng-dirty ng-valid ng-touched"
                        placeholder="৬-২০ অক্ষর বা সংখ্যা"
                        value={password}
                        onChange={handlePassword}
                      />
                      {password && (
                        <input
                          className="clear active"
                          onClick={() => handleClearPassword("")}
                        />
                      )}
                      {errorPassword && (
                        <div className="error-message">
                          <span>{errorPassword}</span>
                        </div>
                      )}
                    </div>

                    <div className="input-group phone-number third-party-input-group-title">
                      <label>ফোন নাম্বার</label>
                      <div className="input-wrap phone-wrap">
                        <div className="phone-area-code">
                          <div className="lang-select">
                            <button className="btn-select only">
                              {/* <li>
                              <img 
                                value="BD" 
                                alt="BD" 
                                src="https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1744705246740&source=mcdsrc" 
                                loading="lazy" 
                              />
                              <span>+880</span>
                            </li> */}
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
                            </button>
                          </div>
                        </div>
                        <input
                          type="number"
                          inputMode="tel"
                          className="input"
                          placeholder="ফোন নাম্বার"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                        />
                        {phoneNumber && (
                          <input
                            className="clear"
                            onClick={handleClearphoneNumber}
                          />
                        )}
                      </div>
                      {errorNum && (
                        <div className="error-message">
                          <span>{errorNum}</span>
                        </div>
                      )}
                    </div>

                    <div id="turnstile-container">
                      <div>
                        <input type="hidden" name="" value="" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div
                className={`button ${
                  userId && password && phoneNumber?.length === 10
                    ? ""
                    : "btn-disabled"
                } `}
                type="submit"
                onClick={() => handleSubmit()}
              >
                <Link>সাবমিট</Link>
              </div>
              <p className="button-tips">
                <span>ইতোমধ্যে একজন সদস্য ? </span>
                <Link>প্রবেশ করুন</Link>
              </p>

              <p className="footer-tips">
                <span>
                  নিবন্ধন করার অর্থ হল আপনার বয়স 18 বছরের বেশি, আপনি পড়েছেন
                  এবং এতে সম্মত হয়েছেন{" "}
                </span>
                <Link>শর্তাবলী </Link>
                <span>.</span>
              </p>
              </>)
              :
              
                (
                <div className="register-success-wrap">
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
                      <h3>Congratulations on being a KingBaji member!</h3>
                      <p>Congratulations on your successful registration.</p>
                    </div>
                    <div className="register-success-btn" onClick={() => openModal("DepositModel")}>
                      <Link className="button btn-default" >
                        Deposit now
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

