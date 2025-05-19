import React, { useState } from "react";
import { LoginUser, loginUser, verifyEmail } from "../Component/Axios-API-Service/AxiosAPIService";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
export default ({
  modalName
}) => {

  const {  activeModal, openModal, closeModal  } = useModal();
  if (activeModal !== modalName) return null;

const { isAuthenticated, login, logoutUser ,userId  } = useAuth();


  const [isSuccess, setIsSuccess] = useState(false);
  const [Error, setError] = useState("");
  const [email, setEmail] = useState("");
console.log(email)
 
const handleSubmit = async () => {
  
 

  
    openModal("VerifyOptPageEmail")
    const result = await verifyEmail(email);
    console.log("result");
    openModal("VerifyOptPage")
    if(result){
        setIsSuccess(true);
        
    }
    

    
 else {
    alert("Please enter a valid email.");
  }
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login-tab">
            <div className="popup-page-main__title"> Opt VerifyO</div>
            <div className="popup-page-main__close" onClick={closeModal}>
              
            </div>
          </div>
          <div className="popup-page-main__container">
      <div className="content  third-party-login member-content new-profile">
        
          <div className="content player-content">
            <form
              className=""
              
            >
              <div className="menu-box">
                <div className="input-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your email ..."
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </form>
            <div className={`button ${email ? "" : "btn"}`} >
              <a href="#"  onClick={handleSubmit && openModal("SendEmailOtp")}>
                Send verification code
              </a>
            </div>
            <p className="button-tips player">
              For your privacy, the information cannot be modified after
              confirmation. If you need help, please contact{" "}
              <i>Customer Service.</i>
            </p>
          </div>
        
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};
