import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Component/AuthContext";
import { useModal } from "../Component/ModelContext";
import { CreateUser } from "../Component/Axios-API-Service/AxiosAPIService";

export default ({ modalName }) => {
  const { activeModal, closeModal } = useModal();
  const { userRegistar } = useAuth();

  // Return null if this isn't the active modal
  if (activeModal !== modalName) return null;

  // Banner images for carousel
  const banners = [
    {
      id: 0,
      imageUrl: "https://img.s628b.com/upload/registerH5Slider/image_211264.jpg",
    },
    {
      id: 1,
      imageUrl: "https://img.s628b.com/upload/registerH5Slider/image_199015.jpg",
    },
    {
      id: 2,
      imageUrl: "https://img.s628b.com/upload/registerH5Slider/image_231436.jpg",
    },
    {
      id: 3,
      imageUrl: "https://img.s628b.com/upload/registerH5Slider/image_227304.jpg",
    },
    {
      id: 4,
      imageUrl: "https://img.s628b.com/upload/registerH5Slider/image_199005.jpg",
    },
  ];

  // State management
  const [activeBanner, setActiveBanner] = useState(3);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    phoneNumber: "",
  });
  console.log(formData)
  const [errors, setErrors] = useState({
    userId: "",
    password: "",
    phoneNumber: "",
  });
  console.log
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const currencies = [
    {
      Id: "Option 1",
      Currency: "BDT",
      code: "+880",
      flag: "BD",
    },
  ];
  const referralCode = localStorage.getItem("referralCode");

  // Validation functions
  const validateUsername = useCallback((username) => {
    if (username.length < 4) return "Username must be at least 4 characters";
    if (username.length > 15) return "Username must be 15 characters or less";
    return "";
  }, []);

  const validatePassword = useCallback((password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password.length > 20) return "Password must be 20 characters or less";
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#])[A-Za-z\d@$!%#]{6,}$/;
    if (!regex.test(password)) {
      return "Password must contain uppercase, lowercase, number, and special character";
    }
    
    // Check for repeated characters
    const charCount = {};
    for (let char of password) {
      charCount[char] = (charCount[char] || 0) + 1;
      if (charCount[char] > 5) {
        return "No character should repeat more than 5 times";
      }
    }
    
    return "";
  }, []);

  const validatePhoneNumber = useCallback((phone) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) return "Phone number must be 11 digits";
    return "";
  }, []);

  // Handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate on change
    if (field === "userId") {
      setErrors(prev => ({ ...prev, userId: validateUsername(value) }));
    } else if (field === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    } else if (field === "phoneNumber") {
      setErrors(prev => ({ ...prev, phoneNumber: validatePhoneNumber(value) }));
    }
  };


  const handleClearField = (field) => {
    setFormData(prev => ({ ...prev, [field]: "" }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Final validation
    const validationErrors = {
      userId: validateUsername(formData.userId),
      password: validatePassword(formData.password),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
    };

    setErrors(validationErrors);

    // Check if any errors exist
    if (Object.values(validationErrors).some(error => error !== "")) {
      setIsSubmitting(false);
      return;
    }

    
    try {
      console.log(formData)
      const userData = {
        userId: formData.userId.toLowerCase(),
        password: formData.password,
        countryCode: "+880", // Using the selected currency code
        phone: formData.phoneNumber,
        referredBy: referralCode,
      };
console.log("userdata",userData)
      const datas = await userRegistar(userData);
      console.log(datas)
      setIsRegistrationSuccess(false); // Show success screen
    } catch (err) {
      alert("Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = 
    formData.userId && 
    formData.password && 
    formData.phoneNumber &&
    Object.values(errors).every(error => error === "") &&
    formData.phoneNumber.replace(/\D/g, "").length === 11;

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

                <div className="banner banner-v1">
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
                </div>

                <div className="menu-box"></div>
              </div>

              {isRegistrationSuccess ? (
                <>
                  <div className="entry-outlet">
                    <form onSubmit={handleSubmit}>
                      <div className="menu-box">
                        <div className="input-group third-party-input-group-title">
                          <label>ব্যবহারকারীর নাম</label>
                          <input
                            type="text"
                            className={`input ${errors.userId ? "error" : ""}`}
                            placeholder="৪-১৫ অক্ষর নাম্বার এলাউ"
                            value={formData.userId}
                            onChange={(e) => handleInputChange("userId", e.target.value)}
                          />
                          {formData.userId && (
                            <button
                              type="button"
                              className="clear active"
                              onClick={() => handleClearField("userId")}
                            />
                          )}
                          {errors.userId && (
                            <div className="error-message">
                              <span>{errors.userId}</span>
                            </div>
                          )}
                        </div>

                        <div className="input-group password third-party-input-group-title">
                          <div
                            className={`eyes ${formData.password ? "show" : ""}`}
                            onClick={togglePasswordVisibility}
                          ></div>
                          <label>পাসওয়ার্ড</label>
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            className={`input ${errors.password ? "error" : ""}`}
                            placeholder="৬-২০ অক্ষর বা সংখ্যা"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                          />
                          {formData.password && (
                            <button
                              type="button"
                              className="clear active"
                              onClick={() => handleClearField("password")}
                            />
                          )}
                          {errors.password && (
                            <div className="error-message">
                              <span>{errors.password}</span>
                            </div>
                          )}
                        </div>

                        <div className="input-group phone-number third-party-input-group-title">
                          <label>ফোন নাম্বার</label>
                          <div className="input-wrap phone-wrap">
                            <div className="phone-area-code">
                              <div className="lang-select">
                                <button type="button" className="btn-select only">
                                  {currencies.map((currency, index) => (
                                    <li key={index}>
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
                              type="tel"
                              inputMode="tel"
                              className={`input ${errors.phoneNumber ? "error" : ""}`}
                              placeholder="ফোন নাম্বার"
                              value={formData.phoneNumber}
                              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            />
                            {formData.phoneNumber && (
                              <button
                                type="button"
                                className="clear"
                                onClick={() => handleClearField("phoneNumber")}
                              />
                            )}
                          </div>
                          {errors.phoneNumber && (
                            <div className="error-message">
                              <span>{errors.phoneNumber}</span>
                            </div>
                          )}
                        </div>

                        <div id="turnstile-container">
                          <div>
                            <input type="hidden" name="" value="" />
                          </div>
                        </div>
                      </div>
                      
                      <div
                        type="submit"
                        className={`button ${!isFormValid ? "btn-disabled" : ""}`}
                        disabled={!isFormValid || isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "সাবমিট"}
                      </div>
                    </form>
                  </div>
                  
                  <p className="button-tips">
                    <span>ইতোমধ্যে একজন সদস্য ? </span>
                    <Link >প্রবেশ করুন</Link>
                  </p>

                  <p className="footer-tips">
                    <span>
                      নিবন্ধন করার অর্থ হল আপনার বয়স 18 বছরের বেশি, আপনি
                      পড়েছেন এবং এতে সম্মত হয়েছেন{" "}
                    </span>
                    <Link >শর্তাবলী </Link>
                    <span>.</span>
                  </p>
                </>
              ) : (
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
                      <h3>Congratulations on being a SuperBaji member!</h3>
                      <p>Congratulations on your successful registration.</p>
                    </div>
                    <div className="register-success-btn">
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

