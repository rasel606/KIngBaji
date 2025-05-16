import React, { useEffect, useState } from "react";
import { useModal } from "../Component/ModelContext";
import { useAuth } from "../Component/AuthContext";
import { GetMessages } from "../Component/Axios-API-Service/AxiosAPIService";
import ringtone from "../Pages/tune/airtel-kannada-full-2656.mp3";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  // const [modal, setModal] = useModal(modalName);
  const { userDeatils, token, updateUserDetails } = useAuth();
  // Sample message data
  if (activeModal !== modalName) return null;
  const [activeMessage, setActiveMessage] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(true);
  const [messagesByDate, setMessagesByDate] = useState([]);

  // Sample message data
  // const messagesByDate = [
  //   {
  //     date: "2025/05/14",
  //     timeZone: "GMT+6",
  //     messages: [
  //       {
  //         id: "1917671045",
  //         title: "🎉 ৫৭০% সাপ্তাহিক রিলোড বোনাস আপনার জন্য অপেক্ষা করছে!",
  //         time: "17:01:13",
  //         content: `<p><span style="font-size:14px;"><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><strong><span style="color:#2980b9;">সমস্ত ক্যাসিনো প্রেমীদের কল!</span></strong></span></span></p>
  //         <p><span style="font-size:14px;"><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><em><span style="color:#e74c3c;">৫৭০% সাপ্তাহিক রিলোড বোনাস </span></em>সহ আপনার গেমিংকে উন্নত করুন এবং ১১,৪০০ পুরষ্কার পান!</p>`,
  //         read: true,
  //       },
  //       {
  //         id: "1917659675",
  //         title: "🚁 ক্র্যাশ এভিয়েটর অবতরণ করেছে – SuperBaji, উড়ার সময়!🚀",
  //         time: "17:00:38",
  //         content: `<p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">ননস্টপ অ্যাকশনের জন্য প্রস্তুত হোন! উপরে উঠুন, দ্রুত ডিপোজিট করুন, এবং প্রতিটি ফ্লাইটে রোমাঞ্চ উপভোগ করুন।</span></span></p>`,
  //         read: false,
  //       },
  //     ],
  //   },
  //   {
  //     date: "2025/05/13",
  //     timeZone: "GMT+6",
  //     messages: [
  //       {
  //         id: "1913741173",
  //         title:
  //           "🎰🎣 স্লট এবং ফিশিং এর উপর দৈনিক ৳৫,০০,০০০ ক্যাশব্যাক পান 🎰🎣",
  //         time: "19:53:32",
  //         content: `<p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">🚀 স্পিন করুন, জিতুন এবং পুরষ্কার পান! 🚀</span></span></p>`,
  //         read: false,
  //       },
  //     ],
  //   },
  // ];

 
    const fetchMessages = async () => {
      try {
        const response = await GetMessages(userDeatils.userId);
        console.log(response.data.groupedNotifications);

       response.data.groupedNotifications[0].notifications.forEach(notification => {
        console.log(notification);
      if (!notification.read) {
        playNotificationSound(notification.type);
      }
    });
        setMessagesByDate(response.data.groupedNotifications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };


// useEffect(() => {
//   const intervalId = setInterval(() => {
//     if (userDeatils?.userId) fetchMessages();
//   }, 30000);

//   return () => clearInterval(intervalId); // Cleanup on unmount
// }, [userDeatils?.userId]);

    useEffect(() => {
      fetchMessages();
    }, [userDeatils.userId, token]);

  function playNotificationSound(type) {
  const soundMap = {
    deposit_request: ringtone,
    deposit_approved: ringtone,
    withdrawal_processed: '/sounds/withdrawal.mp3',
    balance_added: '/sounds/balance.mp3',
    general: '/sounds/default.mp3'
  };

  const audio = new Audio(soundMap[type] || soundMap.general);
  audio.play();
}

// Poll for new notifications every 30 seconds
setInterval(() => {
  const userId = userDeatils.userId; // Implement your user ID retrieval
  if (userId) fetchMessages(userId);
}, 30000);




  const toggleMessageSelection = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter((msgId) => msgId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const openMessage = (message) => {
    setActiveMessage(message);
  };

  const closeMessage = () => {
    setActiveMessage(null);
  };

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top"    onClick={(e) => e.stopPropagation()}>
        <div className="popup-page__backdrop"></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Inbox</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>

          <div className="popup-page-main__container">
            <div className="content mcd-style player-content">
              <>
                <div className="tab-btn-section"></div>
                <div className="tab-content tab-content-page">
                  <div className="inner-box">
                    <div className="inbox-list__editor editor">
                      <div
                        className="editor__btn"
                        onClick={() => setShowEditor(!showEditor)}
                        style={{
                          display: "block",
                          maskImage:
                            'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-editor.svg?v=1746502743071")',
                        }}
                      ></div>
                    </div>

                    {showEditor && (
                      <div className="pop-wrap pop-editor">
                        <ul className="editor-menu show">
                          <li>Edit</li>
                          <li>Read All</li>
                          <li>Cancel</li>
                        </ul>
                        <ul className="editor-check">
                          <li>Mark</li>
                          <li>Delete</li>
                        </ul>
                      </div>
                    )}

                    <div className="mcd-waterfall-scroll">
                      {messagesByDate.length > 0 ? (
                        messagesByDate.map((dateGroup, index) => (
                          <div key={index} className="list list-message ">
                            <div className="date-title">
                              <div className="date">
                                <span
                                  className="item-icon"
                                  style={{
                                    maskImage:
                                      'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1746502743071")',
                                  }}
                                ></span>
                                {dateGroup._id.date}
                              </div>
                              <div className="time-zone">
                                GMT+6
                              </div>
                            </div>

                            <div className="list-content">
                              {dateGroup.notifications.map((message) => (
                                <ul
                                  key={message.id}
                                  className=""
                                  style={{ marginBottom: "0.5px" }}
                                >
                                  <li
                                    className={`message-item ${message.read} ? "read" : ""`}
                                  >
                                    <div
                                      className="chose-btn"
                                      onClick={() =>
                                        toggleMessageSelection(message.id)
                                      }
                                      style={{
                                        maskImage:
                                          'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type04.svg?v=1746502743071")',
                                      }}
                                    ></div>
                                    <div className="icon">
                                      <img
                                        alt="icon-speaker"
                                        src="https://img.s628b.com/sb/h5/assets/images/icon-set/icon-speaker.svg?v=1746502743071"
                                        loading="lazy"
                                      />
                                    </div>
                                    <div
                                      className="content-wrap"
                                      onClick={() => openMessage(message)}
                                    >
                                      <div className="title">
                                        <span>{message.title}</span>
                                        <div className="msg-time">
                                          {message.time}
                                        </div>
                                      </div>
                                      <div
                                        className="text"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            message.content.substring(0, 100) +
                                            "...",
                                        }}
                                      />
                                    </div>
                                  </li>
                                </ul>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-result">
                          <div className="pic">
                            <img
                              src="https://img.s628b.com/sb/h5/assets/images/no-data.png?v=1746502743071"
                              alt="no-data"
                            />
                          </div>
                          <div className="text">No Data</div>
                        </div>
                      )}

                      <div className="prompt">－end of page－</div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      {activeMessage && (
        <div id="popInbox" className="pop-wrap ani show">
          <a className="btn-close" onClick={closeMessage}>
            <span
              className="item-icon"
              style={{
                backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1746502743071")`,
              }}
            ></span>
          </a>
          <div className="pop-title">
            <h3>{activeMessage.title}</h3>
          </div>
          <div className="pop-inner content-style">
            <div
              dangerouslySetInnerHTML={{ __html: activeMessage.content }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
