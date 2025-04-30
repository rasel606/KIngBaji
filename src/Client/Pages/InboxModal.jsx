import React, { useState } from 'react';
import { useModal } from '../Component/ModelContext';


const InboxPopup = ({modalName}) => {

    const { activeModal, openModal, closeModal } = useModal();
    
  const [activeTab, setActiveTab] = useState('inbox');
  const [editMode, setEditMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: '1852549145',
      date: '2025/04/30',
      time: '19:23:37',
      read: true,
      title: '🏏 SuperBaji সাথে আপনার IPL জয়কে আরও বাড়িয়ে তুলুন! 🏆',
      content: `<p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;"><span style="color:#3498db;"><strong>🏆IPL অ্যাকশনে স্বাগতম! যুদ্ধ এখনই শুরু! 🏆</strong></span></span></span></p>
      <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;"><strong><span style="color:#e74c3c;">🏆Chennai Super Kings 🆚 Punjab Kings</span><br>
      📅 রাত ৮:০০ PM টায় (BST) লাইভ অ্যাকশন দেখুন</strong></span></span></p>
      <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">💥<a href="https://superbaji.vip/bd/bn">৩০০% বোনাস পান এবং ৳৬,০০০ পর্যন্ত দাবি করুন!</a>💸<br>
      💥<a href="https://history.jlfafafa3.com/bn-IN/event/20250325_HEYVIP">JILI খেলুন, iPhones এবং iPads-এর জন্য স্পিন করুন এবং বড় জয়লাভ করুন! </a>📱<br>
      💥<a href="https://superbaji.vip/bd/bn">IPL লিডারবোর্ডে শীর্ষে থাকুন এবং আশ্চর্যজনক পুরষ্কার দাবি করুন! </a>🏆 </span></span></p>
      <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">🔥 আজ থেকে শুরু হচ্ছে যুদ্ধ— &nbsp;<em><strong><span style="color:#e74c3c;">Chennai Super Kings 🆚 Punjab Kings🎉</span></strong></em></span></span></p>
      <p><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><span style="font-size:14px;">🎯 বাজি ধরুন, জিতুন এবং আপনার জয়ের তাড়া অনুভব করুন! 🥳</span></span></p>`,
      icon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/icon-speaker.svg?v=1745912667270'
    },
    {
      id: '1852549147',
      date: '2025/04/30',
      time: '11:19:04',
      read: false,
      title: '🎉 ৫৭০% সাপ্তাহিক রিলোড বোনাস আপনার জন্য অপেক্ষা করছে! ',
      content: `<p><span style="font-size:14px;"><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><strong><span style="color:#2980b9;">সমস্ত ক্যাসিনো প্রেমীদের কল!</span></strong></span></span></p>
      <p><span style="font-size:14px;"><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><strong><span style="color:#2980b9;">&nbsp;</span></strong></span></span><span style="font-size:14px;"><span style="font-family:Trebuchet MS,Helvetica,sans-serif;"><em><span style="color:#e74c3c;">৫৭০% সাপ্তাহিক রিলোড বোনাস </span></em>সহ আপনার গেমিংকে উন্নত করুন এবং ১১,৪০০ পুরষ্কার পান!&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br>
      💎 ৳২০০ বা তার বেশি জমা করুন এবং তাৎক্ষণিকভাবে আপনার খেলাকে উন্নত করতে ৫৭০% বুস্ট পান।&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br>
      &nbsp;🔥 এই সুযোগটি মিস করবেন না—এখনই রিলোড করুন এবং পরবর্তী স্তরের গেমিংয়ের রোমাঞ্চের অভিজ্ঞতা নিন!&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br>
      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;</span></span></p>`,
      icon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/icon-speaker.svg?v=1745912667270'
    },
    // Add more messages as needed
  ]);
  if (activeModal !== modalName) return null;
  const groupedMessages = messages.reduce((acc, message) => {
    if (!acc[message.date]) {
      acc[message.date] = [];
    }
    acc[message.date].push(message);
    return acc;
  }, {});

  const toggleSelectMessage = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter(msgId => msgId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const markAsRead = () => {
    setMessages(messages.map(msg => 
      selectedMessages.includes(msg.id) ? {...msg, read: true} : msg
    ));
    setEditMode(false);
  };

  const deleteMessages = () => {
    setMessages(messages.filter(msg => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setEditMode(false);
  };

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop"onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title"onClick={closeModal}>Inbox</div>
            <div className="popup-page-main__close"></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style player-content">
              <div className="tab-btn-section">
                <div className="tab-button-nav"></div>
              </div>
              <div className="tab-content tab-content-page">
                <div className="inner-box">
                  <div className="inbox-list__editor editor">
                    <div 
                      className="editor__btn" 
                      onClick={() => setEditMode(!editMode)}
                      style={{ 
                        display: 'block', 
                        maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-editor.svg?v=1745912667270")' 
                      }}
                    ></div>
                  </div>
                  
                  {editMode && (
                    <div className="pop-wrap pop-editor">
                      <ul className="editor-menu">
                        <li>Edit</li>
                        <li onClick={markAsRead}>Read All</li>
                        <li onClick={() => setEditMode(false)}>Cancel</li>
                      </ul>
                      <ul className="editor-check">
                        <li>Mark</li>
                        <li onClick={deleteMessages}>Delete</li>
                      </ul>
                    </div>
                  )}
                  
                  <div className="list-container">
                    {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                      <div key={date} className="list list-message">
                        <div className="date-title">
                          <div className="date">
                            <span 
                              className="item-icon" 
                              style={{ 
                                maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-calendar-type02.svg?v=1745912667270")' 
                              }}
                            ></span>
                            {date}
                          </div>
                          <div className="time-zone">GMT+6</div>
                        </div>
                        <div className="list-content">
                          {dateMessages.map(message => (
                            <ul key={message.id} className="message-list" style={{ display: 'block',marginBottom: '1px' }}>
                              <li className={`message-item ${message.read ? 'read' : ''}`}>
                                {editMode && (
                                  <div 
                                    className="chose-btn" 
                                    onClick={() => toggleSelectMessage(message.id)}
                                    style={{ 
                                      maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type04.svg?v=1745912667270")',
                                      backgroundColor: selectedMessages.includes(message.id) ? '#3498db' : '#ccc'
                                    }}
                                  ></div>
                                )}
                                <div className="icon">
                                  <img 
                                    alt="icon-speaker" 
                                    src={message.icon} 
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