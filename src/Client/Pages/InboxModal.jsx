import React, { useState } from 'react';
import { useModal } from '../Component/ModelContext';


const InboxPopup = ({modalName}) => {

    const { activeModal, openModal, closeModal } = useModal();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
    if (activeModal !== modalName) return null;
    // Sample message data
    const messages = [
      {
        date: '2025/04/30',
        timeZone: 'GMT+6',
        items: [
          {
            id: '1852549145',
            read: true,
            time: '19:23:37',
            title: '🏏 Kingbaji সাথে আপনার IPL জয়কে আরও বাড়িয়ে তুলুন! 🏆',
            content: `<p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;"><span style="color:#3498db;"><strong>🏆IPL অ্যাকশনে স্বাগতম! যুদ্ধ এখনই শুরু! 🏆</strong></span></span></span></p>
              <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;"><strong><span style="color:#e74c3c;">🏆Chennai Super Kings 🆚 Punjab Kings</span><br>
              📅 রাত ৮:০০ PM টায় (BST) লাইভ অ্যাকশন দেখুন</strong></span></span></p>
              <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">💥<a href="https://Kingbaji.vip/bd/bn">৩০০% বোনাস পান এবং ৳৬,০০০ পর্যন্ত দাবি করুন!</a>💸<br>
              💥<a JILI খেলুন, iPhones এবং iPads-এর জন্য স্পিন করুন এবং বড় জয়লাভ করুন! </a>📱<br>
              💥<a href="https://Kingbaji.live">IPL লিডারবোর্ডে শীর্ষে থাকুন এবং আশ্চর্যজনক পুরষ্কার দাবি করুন! </a>🏆 </span></span></p>
              <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">🔥 আজ থেকে শুরু হচ্ছে যুদ্ধ— &nbsp;<em><strong><span style="color:#e74c3c;">Chennai Super Kings 🆚 Punjab Kings🎉</span></strong></em></span></span></p>
              <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">🎯 বাজি ধরুন, জিতুন এবং আপনার জয়ের তাড়া অনুভব করুন! 🥳</span></span></p>`
          },
          {
            id: '1852549147',
            read: false,
            time: '11:19:04',
            title: '🎉 ৫৭০% সাপ্তাহিক রিলোড বোনাস আপনার জন্য অপেক্ষা করছে!',
            content: `<p><span style="font-size:14px;"><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><strong><span style="color:#2980b9;">সমস্ত ক্যাসিনো প্রেমীদের কল!</span></strong></span></span></p>
              <p><span style="font-size:14px;"><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><strong><span style="color:#2980b9;">&nbsp;</span></strong></span></span><span style="font-size:14px;"><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><em><span style="color:#e74c3c;">৫৭০% সাপ্তাহিক রিলোড বোনাস </span></em>সহ আপনার গেমিংকে উন্নত করুন এবং ১১,৪০০ পুরষ্কার পান!&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br>
              💎 ৳২০০ বা তার বেশি জমা করুন এবং তাৎক্ষণিকভাবে আপনার খেলাকে উন্নত করতে ৫৭০% বুস্ট পান।&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br>
              &nbsp;🔥 এই সুযোগটি মিস করবেন না—এখনই রিলোড করুন এবং পরবর্তী স্তরের গেমিংয়ের রোমাঞ্চের অভিজ্ঞতা নিন!&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br>
              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span></span></p>`
          }
        ]
      },
      {
        date: '2025/04/29',
        timeZone: 'GMT+6',
        items: [
          {
            id: '1852549151',
            read: false,
            time: '10:46:29',
            title: '🎉 অতিরিক্ত ৪% ডিপোজিট বোনাস + বিনামূল্যে জিলি স্পিন পান! 🎉',
            content: `<p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;"><strong><span style="color:#3498db;"><em>আপনার জমাকে আরও উত্তেজনাপূর্ণ করে তুলুন! সীমিত সময়ের জন্য, উপভোগ করুন:</em></span></strong></span></span></p>
              <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">💰 প্রতিটি জমাতে </span><span style="font-size:18px;"><em><strong><span style="color:#e74c3c;">৪%</span></strong></em></span><span style="font-size:14px;"> অতিরিক্ত<br>
              💳 কোনও সীমা নেই—যে কোনও পরিমাণ জমা করুন, যেকোনো সময়!</span></span></p>
              <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">🎰 আপনার ভাগ্য বাড়াতে বিনামূল্যে জিলি স্পিন!</span></span></p>
              <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">⏳<em><span style="color:#c0392b;"> অপেক্ষা করবেন না—এখনইa জমা করুন এবং আপনার সীমাহীন বোনাস দাবি করুন! </span></em>🚀</span></span></p>`
          }
        ]
      }
    ];
  
    const toggleEditor = () => {
      setIsEditorOpen(!isEditorOpen);
    };
  
    const toggleMessageSelection = (id) => {
      setSelectedMessages(prev => 
        prev.includes(id) 
          ? prev.filter(msgId => msgId !== id) 
          : [...prev, id]
      );
    };
  
    const markAllAsRead = () => {
      // In a real app, you would update the messages state to mark all as read
      setIsEditorOpen(false);
    };
  
    const deleteSelected = () => {
      // In a real app, you would update the messages state to remove selected messages
      setSelectedMessages([]);
      setIsEditorOpen(false);
    };

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop"onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Inbox</div>
            <div className="popup-page-main__close"></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style player-content">
              <div className="tab-content tab-content-page">
                <div className="inner-box">
                  <div className="inbox-list__editor editor">
                    <div 
                      className="editor__btn" 
                      onClick={toggleEditor}
                      style={{ 
                        display: 'block', 
                        maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-editor.svg?v=1745912667270")' 
                      }}
                    ></div>
                  </div>
                  
                  <div className="list-container">
                    {messages.map((group, groupIndex) => (
                      <div className="list list-message" key={groupIndex}>
                        <div className="date-title">
                          <div className="date">
                            <span 
                              className="item-icon" 
                              style={{ 
                                maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1745912667270")' 
                              }}
                            ></span>
                            {group.date}
                          </div>
                          <div className="time-zone">{group.timeZone}</div>
                        </div>
                        <div className="list-content">
                          {group.items.map((message, msgIndex) => (
                            <ul key={msgIndex}>
                              <li className={`message-item ${message.read ? 'read' : ''}`}>
                                <div 
                                  className={`chose-btn ${selectedMessages.includes(message.id) ? 'selected' : ''}`}
                                  onClick={() => toggleMessageSelection(message.id)}
                                  style={{ 
                                    maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type04.svg?v=1745912667270")' 
                                  }}
                                ></div>
                                <div className="icon">
                                  <img 
                                    alt="icon-speaker" 
                                    src="https://img.s628b.com/sb/h5/assets/images/icon-set/icon-speaker.svg?v=1745912667270&source=mcdsrc" 
                                    loading="lazy" 
                                  />
                                </div>
                                <div className="content-wrap">
                                  <div className="title">
                                    <span>{message.title}</span>
                                    <div className="msg-time">{message.time}</div>
                                  </div>
                                  <div 
                                    className="text" 
                                    dangerouslySetInnerHTML={{ __html: message.content }}
                                  ></div>
                                </div>
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="prompt">－end of page－</div>
                  </div>
                  
                  {isEditorOpen && (
                    <>
                      <div className="pop-bg" onClick={() => setIsEditorOpen(false)}></div>
                      <div className="pop-wrap pop-editor">
                        <ul className="editor-menu show">
                          <li>Edit</li>
                          <li onClick={markAllAsRead}>Read All</li>
                          <li onClick={() => setIsEditorOpen(false)}>Cancel</li>
                        </ul>
                        <ul className="editor-check">
                          <li onClick={() => {}}>Mark</li>
                          <li onClick={deleteSelected}>Delete</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPopup;