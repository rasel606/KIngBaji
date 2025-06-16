// import React, { useEffect, useRef } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";

// export default ({ showAmountLimit, setShowAmountLimit, title }) => {
//   const navigate = useNavigate();
//   const popupRef = useRef();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (popupRef.current && !popupRef.current.contains(event.target)) {
//         setShowAmountLimit(false);
//       }
//     };

//     if (showAmountLimit) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showAmountLimit, setShowAmountLimit]);

//   if (!showAmountLimit) return null;

//   return (
//     <div className="cdk-overlay-container">
//       <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"></div>
//       <div className="cdk-global-overlay-wrapper">
//         <div className="cdk-overlay-pane dialog-pane">
//           <div className="popup" ref={popupRef}>
//             <div className="popup__header" onClick={() => navigate(-1)}>
//               <div
//                 className="popup__close"
//                 onClick={() => setShowAmountLimit(false)}
//               ></div>
//             </div>

//             <div className="popup-content">
//               <div
//                 className="pop-bg"
//                 onClick={() => setShowAmountLimit(false)}
//               />

//               <div
//                 class="pop-bg"
//                 style={{ display: showAmountLimit ? "block" : "none" }}
//                 onClick={() => setShowAmountLimit(false)}
//               ></div>
//               <div className="popup__content">
//                 <div className="pop-wrap pop-check show ani">
//                   <button className="btn-close" onClick={handleCloseDetails}>
//                     <span
//                       className="item-icon"
//                       style={{
//                         backgroundImage:
//                           'url("https://img.m167cw.com/mcw/h5/assets/images/icon-set/icon-cross-type01.svg?v=1749548260105")',
//                       }}
//                     ></span>
//                   </button>

//                   <div className="pop-title">
//                     <h3>{selectedTicket.bonusInfo.name}</h3>
//                   </div>

//                   <div className="pop-inner content-style">
//                     <div className="form-wrap">
//                       <div className="arrow" style={{ opacity: 0.8 }}>
//                         <span
//                           className="item-icon"
//                           style={{
//                             backgroundImage:
//                               'url("https://img.m167cw.com/mcw/h5/assets/images/icon-set/icon-arrow-type01.svg?v=1749548260105")',
//                           }}
//                         ></span>
//                       </div>

//                       <div className="form-wrap-col">
//                         <div>Transaction Amount</div>
//                         <div>{selectedTicket.amount.toFixed(2)}</div>
//                       </div>

//                       <div className="form-wrap-col">
//                         <div>Bonus</div>
//                         <div>
//                           {(
//                             selectedTicket.amount *
//                             (selectedTicket.bonusInfo.percentage / 100)
//                           ).toFixed(2)}
//                         </div>
//                       </div>

//                       <div className="form-wrap-col">
//                         <div>Turnover Requirement</div>
//                         <div>
//                           {selectedTicket.turnoverRequirement.toFixed(2)}
//                         </div>
//                       </div>

//                       <div className="form-wrap-col">
//                         <div>Turnover Completed</div>
//                         <div>{selectedTicket.completedTurnover.toFixed(2)}</div>
//                       </div>

//                       <div className="form-wrap-col">
//                         <div>Completed Ratio</div>
//                         <div>{calculateProgress(selectedTicket)}%</div>
//                       </div>

//                       <div className="form-wrap-col">
//                         <div>Turnover Create Time</div>
//                         <div>{formatDate(selectedTicket.createdAt)}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
