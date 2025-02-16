import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "../Component/ModelContext";

export default ({ modalName}) => {
      const {  activeModal, openModal, closeModal  } = useModal();
      if (activeModal !== modalName) return null;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
        <div className="modal-overlay" onClick={closeModal}>
            <div onClick={(e) => e.stopPropagation()}>
                <div className="popup-page__main popup-page-main popup-page-main--show">
                    <div className="popup-page-main__header">
                        <div className="popup-page-main__title">Reset Password</div>
                        <div className="popup-page-main__close" onClick={closeModal}></div>
                    </div>
                    <div className="popup-page-main__container">

                        <div className="Passwordcontent member-content">
                            <form onSubmit={handleSubmit} className="">
                                <div className="member-box radius">
                                    <div className="inputbox password">
                                        <div className="eyes"></div>
                                        <label style={{ display: 'block' }}>বর্তমান পাসওয়ার্ড</label>
                                        <input
                                            type="password"
                                            placeholder="বর্তমান পাসওয়ার্ড"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="input"
                                        />
                                    </div>

                                    <div className="inputbox password">
                                        <div className="eyes"></div>
                                        <label style={{ display: 'block' }}>নতুন পাসওয়ার্ড</label>
                                        <input
                                            type="password"
                                            placeholder="নতুন পাসওয়ার্ড"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="input"
                                        />
                                    </div>

                                    <div className="inputbox password">
                                        <div className="eyes"></div>
                                        <label style={{ display: 'block' }}>নিশ্চিত করুন নতুন পাসওয়ার্ড</label>
                                        <input
                                            type="password"
                                            placeholder="নিশ্চিত করুন নতুন পাসওয়ার্ড"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="tips-info">
                                    <div className="title-box">
                                        <h5><span>পাসওয়ার্ডের রিকোয়ারমেন্ট</span></h5>
                                    </div>
                                    <ol>
                                        <li>৬ থেকে ২০ অক্ষর</li>
                                        <li>কমপক্ষে একটি ইংরেজি অক্ষর এবং একটি সংখ্যাসূচক থাকতে হবে</li>
                                        <li>বড় হাতের এবং ছোট হাতের অক্ষরের অনুমতি</li>
                                        <li>সংখ্যার অনুমতি</li>
                                        <li>বিশেষ অক্ষরের অনুমতি দিন (@$!%#)</li>
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
