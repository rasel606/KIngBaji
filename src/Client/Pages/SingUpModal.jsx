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
    { id: 0, imageUrl: 'https://img.s628b.com/upload/registerH5Slider/image_211264.jpg' },
    { id: 1, imageUrl: 'https://img.s628b.com/upload/registerH5Slider/image_199015.jpg' },
    { id: 2, imageUrl: 'https://img.s628b.com/upload/registerH5Slider/image_231436.jpg' },
    { id: 3, imageUrl: 'https://img.s628b.com/upload/registerH5Slider/image_227304.jpg' },
    { id: 4, imageUrl: 'https://img.s628b.com/upload/registerH5Slider/image_199005.jpg' },
  ];

  const [activeBanner, setActiveBanner] = useState(3);
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
    <div className="mcd-popup-page popup-page-wrapper active">
    <div className="popup-page popup-page--active popup-page--align-top" onClick={(e) => e.stopPropagation()}>
      <div className="popup-page__backdrop" onClick={closeModal}></div>
      <div className="popup-page__main popup-page-main popup-page-main--show">
        <div className="popup-page-main__header new-login">
          <div className="popup-page-main__title">সাইন আপ</div>
          <div className="popup-page-main__close" onClick={closeModal}></div>
        </div>
        
        <div className="popup-page-main__container">
          <div className="content mcd-style member-content third-party-login">
            <div className="register-entry">
              <div className="logo-box" style={{ backgroundImage: 'url(https://img.s628b.com/sb/h5/assets/images/member-logo.png?v=1744705246740)' }}></div>
              
              <div className="banner banner-v1">
                <div className="carousel-wrap style-init siblings">
                  <div className="cdk-drag item-drag">
                    <div className="item-left">
                      <div className="item-wrap">
                        {banners.map((banner) => (
                          <div key={banner.id} className="item" style={{ width: '224px' }}>
                            <div 
                              className="item-pic" 
                              style={{ backgroundImage: `url(${banner.imageUrl})` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <ul className="dot-group style-bar">
                    {banners.map((banner, idx) => (
                      <li key={banner.id} className={activeBanner === idx ? 'active' : ''}>
                        <span className="dot-progress" style={{ animationDuration: '3000ms' }}></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="menu-box"></div>
            </div>
            
            <div className="entry-outlet">
              <form className="ng-invalid ng-dirty ng-touched">
                <div className="menu-box">
                  <div className="input-group third-party-input-group-title">
                    <label>ব্যবহারকারীর নাম</label>
                    <input 
                      type="text" 
                      className="input ng-dirty ng-valid ng-touched" 
                      placeholder="৪-১৫ অক্ষর নাম্বার এলাউ"
                      value={userId}
                      onChange={handleUsername}
                    />
                    {userId && <input className="clear active" onClick={() => handleClearUsername('')} />}
                  </div>
                  
                  <div className="input-group password third-party-input-group-title">
                    <div 
                      className={`eyes ${password ? 'show' : ''}`} 
                      onClick={togglePasswordVisibility}
                    ></div>
                    <label>পাসওয়ার্ড</label>
                    <input 
                      type={password  ? 'text' : 'password'} 
                      className="input ng-dirty ng-valid ng-touched" 
                      placeholder="৬-২০ অক্ষর বা সংখ্যা"
                      value={password}
                      onChange={handlePassword}
                    />
                    {password && <input className="clear active" onClick={() => handleClearPassword('')} />}
                  </div>
                  
                  <div className="input-group phone-number third-party-input-group-title">
                    <label>ফোন নাম্বার</label>
                    <div className="input-wrap phone-wrap">
                      <div className="phone-area-code">
                        <div className="lang-select">
                          <button className="btn-select only">
                            <li>
                              <img 
                                value="BD" 
                                alt="BD" 
                                src="https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1744705246740&source=mcdsrc" 
                                loading="lazy" 
                              />
                              <span>+880</span>
                            </li>
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
                      {phoneNumber && <input className="clear" onClick={handleClearphoneNumber} />}
                    </div>
                  </div>
                  
                  <div id="turnstile-container">
                    <div>
                      <input type="hidden" name="" value="" />
                    </div>
                  </div>
                </div>
              </form>
              
              <div className="button btn-disabled">
                <a>সাবমিট</a>
              </div>
            </div>
            
            <p className="button-tips">
              <span>ইতোমধ্যে একজন সদস্য ? </span>
              <a href="/bd/bn/account-login-quick(popup:new-register-entry/account)">প্রবেশ করুন</a>
            </p>
            
            <p className="footer-tips">
              <span>নিবন্ধন করার অর্থ হল আপনার বয়স 18 বছরের বেশি, আপনি পড়েছেন এবং এতে সম্মত হয়েছেন </span>
              <a href="/bd/bn/terms/conditions(popup:new-register-entry/account)">শর্তাবলী </a>
              <span>.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};



{/* <mcd-popup-page className="popup-page-wrapper active">
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
                // </div>
                
              
                
                  // <div>
                  //   <div className="menu-box">
                  //     <Carousel images={images}></Carousel>
                  //     {/* <SingupSlider></SingupSlider> */}
                  //     <div className="input-group currency-number third-party-input-group-title">
                  //       <label>Choose currency</label>
                  //       <div className="input-wrap currency-wrap">
                  //         <div className="currency-area-code">
                  //           <div className="lang-select">
                  //             <div
                  //               className="button btn-select currency-list-area"
                  //               onClick={() => setIsOpen(!isOpen)}
                  //             >
                  //               <li>
                  //                 <img
                  //                   alt={selectedCurrency.flag}
                  //                   src={`https://img.c88rx.com/cx/h5/assets/images/flag/${selectedCurrency.flag}.png?v=1737700422219&source=mcdsrc`}
                  //                   loading="lazy"
                  //                 />
                  //                 <span>{selectedCurrency.Currency}</span>
                  //               </li>
                  //             </div>
                  //             <div
                  //               className="currency-code-list-group"
                  //               style={{ display: isOpen ? "block" : "none" }}
                  //             >
                  //               <ul className="currency-code-list currency-list-area">
                  //                 {currencies.map((currency, index) => (
                  //                   <li
                  //                     key={index}
                  //                     onClick={() =>
                  //                       setSelectedCurrency(currency.code)
                  //                     }
                  //                   >
                  //                     <img
                  //                       alt={currency.code}
                  //                       src={`https://img.c88rx.com/cx/h5/assets/images/flag/${currency.flag}.png?v=1737700422219&source=mcdsrc`}
                  //                       loading="lazy"
                  //                     />
                  //                     <span>{currency.code}</span>
                  //                   </li>
                  //                 ))}
                  //               </ul>
                  //             </div>
                  //           </div>
                  //         </div>
                  //       </div>
                  //     </div>
                  //     <div className=""></div>
                  //   </div>

                  //   <div className="entry_outlet">
                  //     <form novalidate="" className="">
                  //       <div className="menu-box">
                  //         <div className="input-group">
                  //           <label htmlFor="userId">Username</label>
                  //           <input
                  //             type="text"
                  //             id="userId"
                  //             name="userId"
                  //             placeholder="4-15 char, allow numbers, no space"
                  //             value={userId}
                  //             onChange={handleUsername}
                  //             className="input"
                  //           />
                  //           {userId && (
                  //             <input
                  //               type="button"
                  //               className={`clear ${userId ? "active" : ""}`}
                  //               onClick={handleClearUsername}
                  //             />
                  //           )}
                  //         </div>
                  //         {error && (
                  //           <div className="error-message">
                  //             <span>{error}</span>
                  //           </div>
                  //         )}

                  //         <div className="input-group password">
                  //           <div
                  //             type="button"
                  //             className={`eyes ${password ? "active" : "not"}`}
                  //             onClick={togglePasswordVisibility}
                  //           ></div>
                  //           <label htmlFor="password">Password</label>
                  //           <input
                  //             type={isPasswordVisible ? "text" : "password"}
                  //             id="password"
                  //             name="password"
                  //             placeholder="6-20 Characters and Numbers"
                  //             value={password}
                  //             onChange={handlePassword}
                  //             className="input"
                  //           />
                  //           {password && (
                  //             <input
                  //               type="button"
                  //               className={`clear ${password ? "active" : ""}`}
                  //               onClick={handleClearPassword}
                  //             />
                  //           )}
                  //         </div>
                  //         {errorPassword && (
                  //           <div className="error-message">
                  //             <label>{errorPassword}</label>
                  //           </div>
                  //         )}

                  //         <div className="input-group phone-number third-party-input-group-title">
                  //           <label>Phone Number</label>
                  //           <div className="input-wrap phone-wrap">
                  //             <div className="phone-area-code">
                  //               <div className="lang-select">
                  //                 <button className="btn-select only">
                  //                   <li>
                  //                     <img
                  //                       alt="BD"
                  //                       src="https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1737700422219&source=mcdsrc"
                  //                       loading="lazy"
                  //                     />
                  //                     <span>+880</span>
                  //                   </li>
                  //                 </button>
                  //               </div>
                  //             </div>
                  //             <input
                  //               type="tel"
                  //               inputMode="tel"
                  //               className="input invalid"
                  //               placeholder="Phone Number"
                  //               value={phoneNumber}
                  //               onChange={handlePhoneNumberChange}
                  //             />
                  //             {phoneNumber && (
                  //               <input
                  //                 type="button"
                  //                 className={`clear ${
                  //                   phoneNumber ? "active" : ""
                  //                 }`}
                  //                 onClick={handleClearphoneNumber}
                  //               />
                  //             )}
                  //             {/* <input className="clear" /> */}
                  //           </div>
                  //         </div>
                  //         {errorNum && (
                  //           <div className="error-message">
                  //             <label>{errorNum}</label>
                  //           </div>
                  //         )}
                  //         <div
                  //           className={`button ${
                  //             userId && password && phoneNumber > 1234567591
                  //               ? "active"
                  //               : "btn-disabled"
                  //           }`}
                  //           type="submit"
                  //           onClick={() => handleSubmit()}
                  //         >
                  //           Sign Up
                  //         </div>
                  //       </div>
                  //     </form>

                  //     <p className="button-tips">
                  //       <span className="">Already a member ?</span>
                  //       <Link
                  //         className=""
                  //         onClick={() => openModal("LoginModel")}
                  //       >
                  //         Log in
                  //       </Link>
                  //     </p>
                  //     <div className="ng-star-inserted">
                  //       <p className="footer-tips ng-star-inserted">
                  //         <span>
                  //           Registering means you are over 18 years old, have
                  //           read and agree to the
                  //           <Link className="footer-tips ">
                  //             Terms &amp; Conditions.
                  //           </Link>
                  //         </span>
                  //       </p>
                  //     </div>
                  //   </div>
                  // </div>
                
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </div>
    // </mcd-popup-page>