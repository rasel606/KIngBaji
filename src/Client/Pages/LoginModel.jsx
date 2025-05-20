import React, { useState } from "react";
import {
  LoginUser,
  loginUser,
} from "../Component/Axios-API-Service/AxiosAPIService";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
// import { iconeyeopentype03 } from "../../assets/icon-eye-close-type03.svg";
export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const { isAuthenticated, login, logoutUser } = useAuth();

  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [error, setError] = useState("");
  const handleClearUsername = () => setUserId("");
  const handleClearPassword = () => setPassword("");
  const [errorNum, setErrorNum] = useState("");
  const [errorPassword, seterrorPassword] = useState("");

  const handlePassword = (e) => {
    const value = e.target.value;
    const min = "1234"; // 3 characters
    const max = "12345678901"; // 12 characters

    const regex =
      "/...^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%#])[A-Za-zd@$!%#]{8,}$.../";
    if (value.length < min.length) {
      seterrorPassword("Password minimum length is 4");
    } else if (value.length > max.length) {
      seterrorPassword("Password maximum length is 12");
    } else if (!validatePassword(value)) {
      seterrorPassword("Password must be 6-20 characters long.");
    } else {
      seterrorPassword(""); // Clear message when valid
    }

    setPassword(value);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && password.length <= 20;
  };

  console.log(userId, password);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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

  console.log(userId, password);

  const handleLogin = async () => {
    console.log(userId, password);
    // Add your login logic here (API calls, etc.)
    const newLocal = await login(userId, password);
    console.log(newLocal);
    closeModal();
  };

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login-tab">
            <div className="popup-page-main__title">Login</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style member-content new-login third-party-login">
              <div className="quick-login-wrapper">
                <div
                  className="logo-box"
                  style={{
                    backgroundImage:
                      'url("https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png")',
                  }}
                ></div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="quick-login-form"
                >
                  <div className="menu-box">
                    <div className="input-group third-party-input-group-title">
                      <label htmlFor="userId">Username</label>
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        className={`input ${userId ? "error" : ""}`}
                        placeholder="4-15 char, allow number"
                        value={userId}
                        onChange={handleUsername}
                      />
                      {userId && (
                        <input
                          type="button"
                          className="clear active"
                          onClick={() => handleClearUsername("userId")}
                        />
                      )}
                      {setError && (
                        <div className="member-error-box">{setError}</div>
                      )}
                    </div>

                    <div className="input-group password third-party-input-group-title">
                      <div
                        className={`eyes ${isPasswordVisible ? "show" : ""}`}
                        onClick={togglePasswordVisibility}
                      ></div>
                      <label htmlFor="password">Password</label>
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        className={`input ${password ? "error" : ""}`}
                        placeholder="6-20 Characters and Numbers"
                        value={password}
                        onChange={handlePassword}
                      />
                      {password && (
                        <input
                          type="button"
                          className="clear active"
                          onClick={() => handleClearPassword("password")}
                        />
                      )}
                      {errorPassword && (
                        <div className="member-error-box">{errorPassword}</div>
                      )}
                    </div>

                    <div className="login-info-box">
                      <div className="forgetpassword-buttn">
                        <a onClick={() => openModal("ResetmypasswordModal")}>
                          Forgot password?
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="button" onClick={() => handleLogin()}>
                    <a>Login</a>
                    
                  </div>
                </form>

                <p
                  className="button-tips"
                  
                >
                  <span onClick={() => openModal("SingUpModal")}>Do not have an account? </span>
                  <a href="/register">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <mcd-popup-page className="popup-page-wrapper active">
    //   <div className="popup-page popup-page--active popup-page--align-top">
    // <div className="" onClick={closeModal}>
    //   <div
    //     onClick={(e) => e.stopPropagation()}
    //     className="popup-page__backdrop"
    //   >
    //     <div className="popup-page__main popup-page-main popup-page-main--show">
    //       <div className="popup-page-main__header new-login-tab">
    //         <div className="popup-page-main__title"> Login </div>
    //         <div className="popup-page-main__close" onClick={closeModal}></div>
    //       </div>
    //       <div className="content  member-content new-login third-party-login">
    //         <div className="popup-page-main__container">
    //           <div className="quick-login-wrapper">
    //             <div
    //               className="logo-box"
    //               style={{
    //                 backgroundImage:
    //                   "url('https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png')",
    //               }}
    //             ></div>
    //             <form className="menu-box" onSubmit={(e) => e.preventDefault()}>
    //               <div className="input-group">
    //                 <label htmlFor="userId">Username</label>
    //                 <input
    //                   type="text"
    //                   id="userId"
    //                   name="userId"
    //                   placeholder="4-15 char, allow numbers, no space"
    //                   value={userId}
    //                   onChange={handleUsername}
    //                   className="input"
    //                 />
    //                 {userId && (
    //                   <input
    //                     type="button"
    //                     className={`clear ${userId ? "active" : ""}`}
    //                     onClick={handleClearUsername}
    //                   />
    //                 )}
    //               </div>
    //               {error && (
    //                 <div className="error-message">
    //                   <span>{error}</span>
    //                 </div>
    //               )}
    //               <div className="input-group password">
    //                 {/* <div className="input-group password">
    //                     <div type="button"
    //                        className={`eyes ${password ? "active" : "not"}`}

    //                       onClick={togglePasswordVisibility}
    //                     ></div>
    //                     <label htmlFor="password">Password</label>
    //                     <input
    //                       type={isPasswordVisible ? "text" : "password"}
    //                       id="password"
    //                       name="password"
    //                       placeholder="6-20 Characters and Numbers"
    //                       value={password}
    //                       onChange={(e) => setPassword(e.target.value)}
    //                       className="input"
    //                     />
    //                     {password && (
    //                       <input
    //                         type="button"
    //                         className={`clear ${password ? "active" : "" }`}
    //                         onClick={() => handleClearPassword}
    //                       />
    //                     )}
    //                   </div> */}
    //                 {/* {error && (
    //                     <div className="error-message">
    //                       <label>{error}</label>
    //                     </div>
    //                   )} */}

    //                 <div className="input-group password">
    //                   <div
    //                     type="button"
    //                     className={`eyes ${password ? "active" : "not"}`}
    //                     onClick={togglePasswordVisibility}
    //                   ></div>
    //                   <label htmlFor="password">Password</label>
    //                   <input
    //                     type={isPasswordVisible ? "text" : "password"}
    //                     id="password"
    //                     name="password"
    //                     placeholder="6-20 Characters and Numbers"
    //                     value={password}
    //                     onChange={handlePassword}
    //                     className="input"
    //                   />
    //                   {password && (
    //                     <input
    //                       type="button"
    //                       className={`clear ${password ? "active" : ""}`}
    //                       onClick={handleClearPassword}
    //                     />
    //                   )}
    //                 </div>
    //                 {errorPassword && (
    //                   <div className="error-message">
    //                     <label>{errorPassword}</label>
    //                   </div>
    //                 )}
    //               </div>

    //               <div className="login-info-box">
    //                 <div className="member-error-box"></div>
    //                 <div className="forgetpassword-buttn">
    //                   <a onClick={() => openModal("ResetmypasswordModal")}>
    //                     Forgot password?
    //                   </a>
    //                 </div>
    //               </div>

    //               <button
    //                 type="submit"
    //                 className="button"
    //                 onClick={() => handleLogin()}
    //               >
    //                 লগ ইন
    //               </button>
    //             </form>

    //             <p className="button-tips">
    //               <span>একাউন্ট নেই ? </span>
    //               <a onClick={() => openModal("SingUpModal")}>
    //                 নিবন্ধন করুন
    //               </a>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </div>
    // </mcd-popup-page>
  );
};
