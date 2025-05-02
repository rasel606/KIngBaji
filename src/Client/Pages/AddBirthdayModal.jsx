import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import { UpdateBirthDate } from "../Component/Axios-API-Service/AxiosAPIService";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;

  const { isAuthenticated, loginUser, logoutUser, verifyUser, userId } =
    useAuth();

  const [formData, setFormData] = useState({
    userId: userId,
    birthday: "",
  });
  const [message, setMessage] = useState("");
  const [ShowSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Helper function to calculate age
  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  console.log(formData);
  const handleSubmit = async () => {
    // Age validation
    const age = calculateAge(formData.birthday);
    if (age < 18) {
      setMessage("You must be at least 18 years old to verify your birthday.");
      return;
    }

    try {
      console.log(formData);
      const response = await UpdateBirthDate(formData);
      console.log(response);
      setMessage(response.data.message);
      setTimeout(() => {
        setShowSuccess(false);
        openModal('MyProfilemodal');
      }, 1000)
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="mcd-popup-page popup-page-wrapper active" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Add Birthday</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content member-content new-login third-party-login">
              <div className="content player-content">
                <form>
                  <div className="menu-box">
                    <div className="input-group">
                      <label>জন্মদিন</label>
                      <div
                        className="popup-page-wrapper"
                        style={{ position: "block" }}
                      >
                        <input
                          type="date"
                          className="mat-datepicker-input mat-mdc-input-element ng-untouched ng-pristine ng-invalid cdk-text-field-autofill-monitored"
                          placeholder="YYYY/MM/DD"
                          max="2007-01-12T11:30:44+06:00"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleChange}
                          required
                        />

                        <input
                          className="clear"
                          style={{ top: 0, right: "40px" }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <div className={`button ${formData.birthday ? "" : "btn-disabled"}`} onClick={() => handleSubmit()}>
                  <a>Submit</a>
                </div>
                <p className="button-tips player">
                  আপনার গোপনীয়তার জন্য, নিশ্চিতকরণের পরে তথ্য পরিবর্তন করা যাবে
                  না। আপনার যদি সাহায্যের প্রয়োজন হয়, তাহলে অনুগ্রহ করে{" "}
                  <i>গ্রাহক পরিষেবাতে</i> যোগাযোগ করুন।
                </p>
                {ShowSuccess && (
                  <div className="pop-wrap pop-success">
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
                          <h4>Success</h4>
                        </div>
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
  );
};
