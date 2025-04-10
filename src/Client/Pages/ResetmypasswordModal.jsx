import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match!");
    } else {
      alert("Password changed successfully!");
    }
  };

  return (
    <div className="popup-page-wrapper active" onClick={closeModal}>
      <div
        className="popup-page show-toolbar popup-page--active popup-page--align-top"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Reset Password</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="Passwordcontent member-content">
              <form
                onSubmit={handleSubmit}
                className="ng-untouched ng-pristine ng-invalid"
              >
                <div className="member-box radius">
                  <div className="inputbox password">
                    <div
                      className="eyes"
                      onClick={() => setShowPassword(!showPassword)}
                    ></div>
                    <label>Current password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="input"
                    />
                    <input
                      type="button"
                      className="clear"
                      onClick={() => setCurrentPassword("")}
                    />
                  </div>

                  <div className="inputbox password">
                    <div
                      className="eyes"
                      onClick={() => setShowPassword(!showPassword)}
                    ></div>
                    <label>New password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input"
                    />
                    <input
                      type="button"
                      className="clear"
                      onClick={() => setNewPassword("")}
                    />
                  </div>

                  <div className="inputbox password">
                    <div
                      className="eyes"
                      onClick={() => setShowPassword(!showPassword)}
                    ></div>
                    <label>Confirm new password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input"
                    />
                    <input
                      type="button"
                      className="clear"
                      onClick={() => setConfirmPassword("")}
                    />
                  </div>
                </div>

                
                <div className="tips-info">
                  <div className="title-box">
                    <h5>
                      <span>Password requirements</span>
                    </h5>
                  </div>
                  <ol>
                    <li>6-20 characters</li>
                    <li>
                      Must contain at least one English letter and one numeric
                    </li>
                    <li>Allow uppercase and lowercase letters</li>
                    <li>Allow numbers</li>
                    <li className="tips-password-special-characters">
                      Allow special characters (@$!%#)
                    </li>
                  </ol>
                </div>
              <div className="button submit">
                <Link>নিশ্চিত করুন</Link>
              </div>
                
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
