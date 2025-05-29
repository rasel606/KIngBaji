import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
  // const { activeModal, openModal, closeModal } = useModal();
  // if (activeModal !== modalName) return null;

  // const [currentPassword, setCurrentPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle password change logic
  //   if (newPassword !== confirmPassword) {
  //     alert("New password and confirmation do not match!");
  //   } else {
  //     alert("Password changed successfully!");
  //   }
  // };
  const { activeModal, openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState('email');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    phoneCode: '+880'
  });
  const [errors, setErrors] = useState({});



  if (activeModal !== modalName) return null;


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneCodeChange = (code) => {
    setFormData(prev => ({ ...prev, phoneCode: code }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (activeTab === 'email' && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (activeTab === 'email' && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (activeTab === 'sms' && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit logic here
    console.log('Submitting:', { ...formData, method: activeTab });
    // You would typically call an API here
  };

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Forgot password?</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style fixed-tab register-content">
              <div className="tab-btn-section">
                <div className="tab-btn tab-btn-page">
                  <div 
                    className="line" 
                    style={{ 
                      width: '50%', 
                      transform: `translate(${activeTab === 'email' ? '0%' : '100%'}, 0px)`
                    }}
                  ></div>
                  <div 
                    className={`btn ${activeTab === 'email' ? 'active' : ''}`}
                    onClick={() => handleTabChange('email')}
                  >
                    <div className="text">Email</div>
                  </div>
                  <div 
                    className={`btn ${activeTab === 'sms' ? 'active' : ''}`}
                    onClick={() => handleTabChange('sms')}
                  >
                    <div className="text">SMS</div>
                  </div>
                </div>
              </div>
              
              <div className="tab-content tab-content-page forgetpassword">
                <div 
                  className="logo-box" 
                  style={{ backgroundImage: 'url(https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png)' }}
                ></div>
                
                <form className="inner-box" onSubmit={handleSubmit}>
                  <div className="member-box radius">
                    <div className="inputbox-wrapper">
                      <div className={`inputbox ${errors.username ? 'error' : ''}`}>
                        <label>Username</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="input"
                          placeholder="Username"
                        />
                        <input className="clear" type="button" />
                        {errors.username && <div className="error-message">{errors.username}</div>}
                      </div>
                    </div>
                    
                    {activeTab === 'email' ? (
                      <div className="inputbox-wrapper">
                        <div className={`inputbox ${errors.email ? 'error' : ''}`}>
                          <label>E-mail</label>
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            placeholder="Input valid email"
                          />
                          <input className="clear" type="button" />
                          {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                      </div>
                    ) : (
                      <div className="inputbox-wrapper">
                        <div className={`inputbox phone-number ${errors.phone ? 'error' : ''}`}>
                          <label>Phone Number</label>
                          <div className="input-wrap phone-wrap">
                            <div className="phone-area-code">
                              <div className="lang-select">
                                <button type="button" className="btn-select">
                                  <img 
                                    value="BD" 
                                    alt="BD" 
                                    src="https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1745912667270&source=mcdsrc" 
                                    loading="lazy"
                                  />
                                  <span>{formData.phoneCode}</span>
                                </button>
                              </div>
                            </div>
                            <input
                              type="number"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="input"
                              placeholder="Phone"
                            />
                            <input className="clear" type="button" />
                          </div>
                          {errors.phone && <div className="error-message">{errors.phone}</div>}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="button" >
                    <Link type="submit">Confirm</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="popup-page-wrapper active" onClick={closeModal}>
    //   <div
    //     className="popup-page show-toolbar popup-page--active popup-page--align-top"
    //     onClick={(e) => e.stopPropagation()}
    //   >
    //     <div className="popup-page__main popup-page-main popup-page-main--show">
    //       <div className="popup-page-main__header">
    //         <div className="popup-page-main__title">Reset Password</div>
    //         <div className="popup-page-main__close" onClick={closeModal}></div>
    //       </div>
    //       <div className="popup-page-main__container">
    //         <div className="Passwordcontent member-content">
    //           <form
    //             onSubmit={handleSubmit}
    //             className="ng-untouched ng-pristine ng-invalid"
    //           >
    //             <div className="member-box radius">
    //               <div className="inputbox password">
    //                 <div
    //                   className="eyes"
    //                   onClick={() => setShowPassword(!showPassword)}
    //                 ></div>
    //                 <label>Current password</label>
    //                 <input
    //                   type={showPassword ? "text" : "password"}
    //                   placeholder="Current password"
    //                   value={currentPassword}
    //                   onChange={(e) => setCurrentPassword(e.target.value)}
    //                   className="input"
    //                 />
    //                 <input
    //                   type="button"
    //                   className="clear"
    //                   onClick={() => setCurrentPassword("")}
    //                 />
    //               </div>

    //               <div className="inputbox password">
    //                 <div
    //                   className="eyes"
    //                   onClick={() => setShowPassword(!showPassword)}
    //                 ></div>
    //                 <label>New password</label>
    //                 <input
    //                   type={showPassword ? "text" : "password"}
    //                   placeholder="New password"
    //                   value={newPassword}
    //                   onChange={(e) => setNewPassword(e.target.value)}
    //                   className="input"
    //                 />
    //                 <input
    //                   type="button"
    //                   className="clear"
    //                   onClick={() => setNewPassword("")}
    //                 />
    //               </div>

    //               <div className="inputbox password">
    //                 <div
    //                   className="eyes"
    //                   onClick={() => setShowPassword(!showPassword)}
    //                 ></div>
    //                 <label>Confirm new password</label>
    //                 <input
    //                   type={showPassword ? "text" : "password"}
    //                   placeholder="Confirm new password"
    //                   value={confirmPassword}
    //                   onChange={(e) => setConfirmPassword(e.target.value)}
    //                   className="input"
    //                 />
    //                 <input
    //                   type="button"
    //                   className="clear"
    //                   onClick={() => setConfirmPassword("")}
    //                 />
    //               </div>
    //             </div>

                
    //             <div className="tips-info">
    //               <div className="title-box">
    //                 <h5>
    //                   <span>Password requirements</span>
    //                 </h5>
    //               </div>
    //               <ol>
    //                 <li>6-20 characters</li>
    //                 <li>
    //                   Must contain at least one English letter and one numeric
    //                 </li>
    //                 <li>Allow uppercase and lowercase letters</li>
    //                 <li>Allow numbers</li>
    //                 <li className="tips-password-special-characters">
    //                   Allow special characters (@$!%#)
    //                 </li>
    //               </ol>
    //             </div>
    //           <div className="button submit">
    //             <Link>নিশ্চিত করুন</Link>
    //           </div>
                
    //           </form>
              
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
