import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DepositModel from "./DepositModel";

export default ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  const PaymentMathod = [
    {
      id: 1,
      PaymentTitle: "bkash",
      image: "",
      extra: 3.25,
    },
    {
      id: 1,
      PaymentTitle: "Nagad",
      image: "",
      extra: 3.25,
    },
    {
      id: 1,
      PaymentTitle: "Rocket",
      image: "",
      extra: 3.25,
    },
    {
      id: 1,
      PaymentTitle: "UPay",
      image: "",
      extra: 3.25,
    },
    {
      id: 1,
      PaymentTitle: "Bank",
      image: "",
      extra: 3.25,
    },
    {
      id: 1,
      PaymentTitle: "Bank",
      image: "",
      extra: 3.25,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Deposit",
      datas: (
        <div className="quick-login-wrapper">
          <div className="option-group select-bar">
            <lable>
              <span className="item-icon"></span>
            </lable>
          </div>
          <div className="payment">
            <div className="content-title">
              <h2>
                <span>Payment Mathod</span>
              </h2>
            </div>
            <div className="payment-content-wrap">
              <div className="payment-content-wrap">
                <div className="payment-content-box">
                  <div className="layout-brand">
                    <div className="payment-card1">
                      <ul>
                        {PaymentMathod?.map((item, index) => {
                          return (
                            <li>
                              <Link>
                                <img src={item.icon} alt="" />
                                <p>{item?.PaymentTitle}</p>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Widthrow",
      datas: (
        <div className="quick-login-wrapper">
          <form novalidate="" class="">
            <div class="menu-box">
              <div class="input-group third-party-input-group-title ">
                <label for="userId">Username</label>
                <input
                  type="text"
                  class="input "
                  name="userId"
                  placeholder="4-15 char, allow numbers, no space"
                />
                <input type="button" class="clear active" />
              </div>
            </div>
          </form>
          <div className="button">Login</div>
          <p class="button-tips">
            <span>Do not have an account? </span>
            <a href="">Sign Up</a>
          </p>
        </div>
      ),
    },
  ];

  const [SelectFands, setSelectFands] = useState(data[0]);
  const [SelectFandsindex, setSelectFandsindex] = useState(data[0]);

  const handleSetfand = (Title, index) => {
    setSelectFands(index);
    setSelectFands(Title);
  };
  console.log(SelectFandsindex);

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login-tab">
            <div className="popup-page-main__title"> Fands </div>
            <div className="popup-page-main__close" onClick={closeModal}>
              X
            </div>
          </div>
          <div className="popup-page-main__container">
            <div className="model-content member-content new-login third-party-login">
              <div className="popup-page-main__container">
                <div className="model-content member-content new-login third-party-login">
                  <div className="quick-login-wrapper">
                    <div className="fand-model">
                      <div className="deposit-button">
                        {data.map((Title, index) => {
                          return (
                            <div>
                              <div class="tab-btn ">
                                <div
                                  className={`border-0
                                    ${
                                      SelectFands.id === index + 1
                                        ? "btn-selected"
                                        : ""
                                    }
                                  `}
                                  onClick={() => handleSetfand(Title, index)}
                                >
                                  <div class="text ">{Title.title}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>{SelectFands.datas}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
