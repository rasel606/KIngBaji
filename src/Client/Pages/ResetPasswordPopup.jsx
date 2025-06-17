import React, { useState } from 'react';
import { useModal } from '../Component/ModelContext';
import axios from 'axios';
import { useAuth } from "../Component/AuthContext";
export default  ({ modalName }) => {
      const { activeModal, openModal, closeModal } = useModal();
        const { userDeatils, isLoginNotify, setIsLoginNotify,isPasswordresetNotify, setIsPasswordresetNotifyNotify,logout } = useAuth();
  if (activeModal !== modalName) return null;
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
    const userId = userDeatils?.userId;
 
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);


console.log(formData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });


  console.log(formData);

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 6 || password.length > 20) {
      errors.push('Must be between 6-20 characters');
    }
    if (!/[a-zA-Z]/.test(password)) {
      errors.push('Must contain at least one letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Must contain at least one number');
    }
    if (!/[@$%¨!%*#]/.test(password)) {
      errors.push('Must contain special characters (@$%¨!%*#)');
    }
    
    return errors;
  };



  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate only new password as user types
    if (name === 'newPassword') {
      const passwordErrors = validatePassword(value);
      setErrors(prev => ({ ...prev, newPassword: passwordErrors }));
    }
  };


  
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      newPassword: validatePassword(formData.newPassword),
      confirmPassword: []
    };
console.log(newErrors )
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = ['Passwords do not match'];
    }

    if (!formData.currentPassword) {
      newErrors.currentPassword = ['Current password is required'];
    }

    setErrors(newErrors);

    // Check if form is valid
    const isValid = Object.values(newErrors).every(
      error => error.length === 0
    );
console.log(newErrors )




  console.log(formData);














    
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/v1/reset_and_update_password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          userId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
console.log(response);
      if (response.data.success ===true) {
        console.log('Password updated successfully');
        setIsPasswordresetNotifyNotify("Password reset successfully, please re-login.")
        logout();
        closeModal();
      }
    } catch (error) {
      
    alert("Something went wrong.");
      console.error('Password update error:', error);
    } finally {
      setLoading(false);
    }
  };







//     console.log( userId,  "or get from token/context",
//        formData.currentPassword,
//        formData.newPassword)
//  if (isValid) {
//    axios.post('http://localhost:5000/api/v1/reset_password', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       userId, // or get from token/context
//       currentPassword: formData.currentPassword,
//       newPassword: formData.newPassword
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.message === 'Password updated successfully') {
//       console.log(data)
// setIsPasswordresetNotifyNotify("Password reset successfully, please re-login.")

 
//       // closeModal();
//     } else {
//       alert(data.message);
//       setIsPasswordresetNotifyNotify(data.message)
//     }
//   })
//   .catch(err => {
//     console.error(err);
//     alert("Something went wrong.");
//   });
// }

  

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Reset Password</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          
          <div className="popup-page-main__container">
            <div className="content mcd-style member-content">
              <form >
                <div className="member-box radius">
                  {/* Current Password */}
                  <div className="inputbox password">
                    <div 
                      className={`eyes ${showPassword.current ? 'visible' : ''}`} 
                      onClick={() => togglePasswordVisibility('current')}
                    ></div>
                    <label>Current password</label>
                    <input
                      name="currentPassword"
                      type={showPassword.current ? "text" : "password"}
                      placeholder="Current password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className={errors.currentPassword ? 'error' : ''}
                    />
                    {errors.currentPassword && (
                      <div className="error-message">{errors.currentPassword[0]}</div>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="inputbox password">
                    <div 
                      className={`eyes ${showPassword.new ? 'visible' : ''}`} 
                      onClick={() => togglePasswordVisibility('new')}
                    ></div>
                    <label>New password</label>
                    <input
                      name="newPassword"
                      type={showPassword.new ? "text" : "password"}
                      placeholder="New password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={errors.newPassword ? 'error' : ''}
                    />
                    {errors.newPassword && (
                      <div className="error-message">{errors.newPassword[0]}</div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="inputbox password">
                    <div 
                      className={`eyes ${showPassword.confirm ? 'visible' : ''}`} 
                      onClick={() => togglePasswordVisibility('confirm')}
                    ></div>
                    <label>Confirm new password</label>
                    <input
                      name="confirmPassword"
                      type={showPassword.confirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    {errors.confirmPassword && (
                      <div className="error-message">{errors.confirmPassword[0]}</div>
                    )}
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="tips-info">
                  <div className="title-box">
                    <h5><span>Password requirements</span></h5>
                  </div>
                  <ol>
                    <li>Must be between 6 to 20 characters</li>
                    <li>Must contain at least one letter and one number</li>
                    <li>Allow uppercase and lowercase letters</li>
                    <li>Must contain at least 1 number (0-9)</li>
                    <li className="tips-password-special-characters">
                      Must contain special characters (@$%¨!%*#)
                    </li>
                  </ol>
                </div>

                {/* Submit Button */}
                <div className="button submit" type="submit" onSubmit={()=>handleSubmit()}>
                  <div type="submit" >Confirm</div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

