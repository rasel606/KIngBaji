import React, { useState, useEffect } from 'react';
import { useModal } from '../Component/ModelContext';
import { useAuth } from '../Component/AuthContext';
import axios from 'axios';
import { GetAllBonuses } from '../Component/Axios-API-Service/AxiosAPIService';

export default ({ modalName}) => {
    const { activeModal, openModal, closeModal } = useModal();
    if (activeModal !== modalName) return null;
      const { isAuthenticated, loginUser, logoutUser ,userDeatils,birthday,userId, setBirthday} =
        useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [showPromoDetails, setShowPromoDetails] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
const [promotions, setPromotions] = useState([]);
 const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const tabs = [
    { id: 'all', name: 'অল' },
    { id: 'slots', name: 'স্লটস' },
    { id: 'live-casino', name: 'লাইভ ক্যাসিনো' },
    { id: 'sport', name: 'স্পোর্ট' },
    { id: 'fishing', name: 'ফিশিং' },
    { id: 'card', name: 'কার্ড' },
    { id: 'esports', name: 'E-sports' },
    { id: 'lottery', name: 'লটারি' },
    { id: 'p2p', name: 'P2P' },
    { id: 'table', name: 'টেবিল' },
    { id: 'arcade', name: 'আর্কেড' },
    { id: 'cock-fight', name: 'মোরগ লড়াই' },
    { id: 'rain', name: 'Rain' },
    { id: 'crash', name: 'ক্র্যাশ' },
  ];

  // const promotions = [
  //   {
  //     id: 1,
  //     title: '৳৯৯৯ JDB ফ্রি ক্রেডিট',
  //     description: 'আপনার KYC সম্পূর্ণ করুন এবং তাৎক্ষণিক ফ্রি ক্রেডিট পান!',
  //     timeText: 'JDB স্পেশাল ঈদ অফার',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_242946.png',
  //     details: {
  //       description: 'আপনার KYC সম্পূর্ণ করুন এবং JDB-তে তাৎক্ষণিক ফ্রি ক্রেডিট ৳৯৯৯ পান!',
  //       howToJoin: [
  //         'SuperBaji -তে একটি অ্যাকাউন্ট রেজিস্টার করুন।',
  //         'আপনার KYC সম্পন্ন করার পর, "মাই অ্যাকাউন্ট" এ যান, "আমার প্রচার" নির্বাচন করুন এবং "দাবি করুন" এ ক্লিক করুন। এরপর বিনামূল্যের ক্রেডিট আপনার বোনাস ওয়ালেটে স্থানান্তরিত হবে।',
  //         'সফল KYC যাচাইয়ের পর ৳৯৯৯ ফ্রি ক্রেডিট যোগ করা হবে।'
  //       ],
  //       bonusDetails: [
  //         { label: 'পণ্য', value: 'JDB' },
  //         { label: 'ফ্রি ক্রেডিট', value: '৳৯৯৯' },
  //         { label: 'সর্বোচ্চ উত্তোলন', value: '৳২৫০' },
  //         { label: 'টার্নওভার', value: '৩০x' },
  //         { label: 'বোনাস দাবি', value: 'একবার' },
  //       ],
  //       terms: [
  //         'এই প্রমোশন শুধুমাত্র SuperBaji -তে নতুন নিবন্ধিত সদস্যদের জন্য।',
  //         'সফল KYC যাচাইয়ের পর ফ্রি ক্রেডিট যোগ করা হবে।',
  //         'এই ফ্রি ক্রেডিট শুধুমাত্র JDB গেমগুলোর জন্য প্রযোজ্য।',
  //         'বোনাস স্থানান্তর বা উত্তোলনের জন্য খেলোয়াড়দের ন্যূনতম ১টি ডিপোজিট সহ ৩০x টার্নওভার পূরণ করতে হবে।',
  //         'ফ্রি ক্রেডিট এবং এর সাথে অর্জিত যেকোনো জয়ী অর্থ ২৪ ঘণ্টার মধ্যে মেয়াদোত্তীর্ণ হবে।',
  //         'ফোন নম্বর যাচাই করা বাধ্যতামূলক।',
  //         'এই প্রমোশন অন্য কোনো অফারের সাথে একত্রিত করা যাবে না।',
  //         'সর্বোচ্চ উত্তোলন পরিমাণ হলো ৳২৫০।',
  //         'প্রতিটি সদস্যের শুধুমাত্র একটি অ্যাকাউন্ট অনুমোদিত হয়. একাধিক বা প্রতারণামূলক অ্যাকাউন্ট তৈরি করার যেকোনো প্রচেষ্টা প্রচার থেকে অযোগ্যতার কারণ হবে। কোনো অবশিষ্ট তহবিল বাজেয়াপ্ত হতে পারে, এবং অ্যাকাউন্ট স্থগিত করা হবে।',
  //         'যদি অ্যাকাউন্টটি অপব্যবহারের সন্দেহ হয় এবং/অথবা প্রাপ্ত সুবিধাগুলি মেনে না নেয় তবে Superbaji কোনও ব্যাখ্যা ছাড়াই সদস্যের বোনাস প্রত্যাহার করার অধিকার সংরক্ষণ করে।',
  //         'Superbaji কোনো পূর্ব বিজ্ঞপ্তি ছাড়াই তার বিবেচনার ভিত্তিতে চূড়ান্ত সিদ্ধান্ত নেওয়ার এবং এই প্রচারটি সংশোধন, পরিবর্তন, বন্ধ, বাতিল, প্রত্যাখ্যান বা বাতিল করার অধিকার সংরক্ষণ করে।',
  //         'অংশগ্রহণকারী সদস্যদের অবশ্যই এই প্রচারের শর্তাবলী গ্রহণ করতে হবে এবং মেনে চলতে হবে।',
  //         'Superbaji-এর নিয়ম ও শর্তাবলী প্রযোজ্য।'
  //       ]
  //     }
  //   },
  //   {
  //     id: 2,
  //     title: '৪% আনলিমিটেড + ফ্রি স্পিন',
  //     description: 'এক্সট্রা বোনাস ও ফ্রি স্পিন',
  //     timeText: 'সীমিত অফার',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_219726.jpg'
  //   },
  //   {
  //     id: 3,
  //     title: '১০০% HEYVIP + Superbaji এক্সক্লুসিভ বোনাস',
  //     description: 'ওয়েলকাম বোনাস',
  //     timeText: 'সীমিত অফার',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_243026.jpg'
  //   },
  //   {
  //     id: 4,
  //     title: '৳১০,৮০০ সাপ্তাহিক স্লটস রিলোড বোনাস',
  //     description: 'সাপ্তাহিক অফার',
  //     timeText: 'সীমিত অফার',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_211164.jpg'
  //   },
  //   {
  //     id: 5,
  //     title: '৳২,৮৫০ সাপ্তাহিক ক্যাসিনো রিলোড বোনাস',
  //     description: 'সাপ্তাহিক অফার',
  //     timeText: 'সীমিত অফার',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_198653.jpg'
  //   },
  //   {
  //     id: 6,
  //     title: 'ভিআইপি পয়েন্ট আসল অর্থের জন্য',
  //     description: 'পয়েন্ট পুরস্কার ক্যাশ',
  //     timeText: 'তৎক্ষণাৎ VIP আপগ্রেড',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_198829.jpg'
  //   },
  //   {
  //     id: 7,
  //     title: '৳২,০০০ বিনামূল্যে জন্মদিন বোনাস',
  //     description: 'বার্ষিক বোনাস',
  //     timeText: 'সীমিত অফার',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_198669.jpg'
  //   },
  //   {
  //     id: 8,
  //     title: 'আইফোন ১৬ প্রো ম্যাক্স সাপ্তাহিক লাকি ড্র',
  //     description: 'সাপ্তাহিক অফার',
  //     timeText: 'সীমিত অফার',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_198684.jpg'
  //   },
  //   {
  //     id: 9,
  //     title: '৳৬০,০০,০০০ অ্যাচিভমেন্ট বোনাস লাইফ টাইম',
  //     description: 'লাইফ টাইম বোনাস',
  //     timeText: 'আনলিমিটেড বোনাস',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_198693.jpg',
  //     joined: true
  //   },
  //   {
  //     id: 10,
  //     title: 'আজই রেফার করুন, প্রতিদিন আনলিমিটেড আয় করুন!',
  //     description: 'অন্তহীন কমিশন',
  //     timeText: 'প্রতিদিন',
  //     image: 'https://img.s628b.com/upload/h5Announcement/image_200102.jpg'
  //   }
  // ];


   useEffect(() => {
        const fetchPromotions = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint
                const response = await GetAllBonuses();
                console.log(response.data.data);
                setPromotions(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching promotions:', err);
            }
        };

        fetchPromotions();
    }, []);
  const handlePromoClick = (promo) => {
    setSelectedPromo(promo);
    setShowPromoDetails(true);
  };

  console.log("promotions", promotions);

  const closePromoDetails = () => {
    setShowPromoDetails(false);
    setSelectedPromo(null);
  };

  return (
    <div className="mcd-popup-page popup-page-wrapper active" onClick={closeModal}>
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">প্রমোশন</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style">
              <div className="content-main">
                <div className="content-box">
                  <div className="promotion">
                    <div className="tab search-tab">
                      <ul className="item-ani">
                        {tabs.map(tab => (
                          <li 
                            key={tab.id}
                            className={activeTab === tab.id ? 'active' : ''}
                            onClick={() => setActiveTab(tab.id)}
                          >
                            {tab.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <form className="promo-code-form">
                      <div className="input-group">
                        <input 
                          type="text" 
                          maxLength="30" 
                          placeholder="প্রোমো কোড" 
                          className="password" 
                        />
                        <div className="promo-code-add-btn">অ্যাড</div>
                      </div>
                    </form>
                    
                    <div className="promotion-main">
                      <div className="promotion-list">
                        {promotions.map(promo => (
                          <div key={promo.id} className="promotion-box new promotion-toggle">
                            <div className="pic">
                              <img src={promo.image} alt={promo.title} loading="lazy" />
                              <span className="item-bg"></span>
                            </div>
                            <div className="promotion-box-inner content-style">
                              <div className="text-main">
                                <h3>{promo.name}</h3>
                                <p>{promo.description}</p>
                              </div>
                              <div className="times">
                                <span className="item-icon"></span>
                                <span>{promo.createdAt}</span>
                              </div>
                              <div className="button-box">
                                {promo.joined ? (
                                  <div className="button button__joined active">
                                    <span>যোগদান করেছেন</span>
                                  </div>
                                ) : (
                                  <div className="button button__apply">
                                    <span>এখন আবেদন কর</span>
                                  </div>
                                )}
                                <div 
                                  className="button btn-primary"
                                  onClick={() => handlePromoClick(promo)}
                                >
                                  <span>বিস্তারিত</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="prompt">－পৃষ্ঠার শেষ－</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Details Dialog */}
      {showPromoDetails && selectedPromo && (
        <div className="cdk-overlay-container">
          <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing" onClick={closePromoDetails}></div>
          <div className="cdk-global-overlay-wrapper" dir="ltr" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="cdk-overlay-pane dialog-panel" style={{ position: 'static' }}>
              <div className="popup" id="dialog-0">
                <div className="popup__content">
                  <div className="pop-wrap promotion-pop new show">
                    <a className="btn-close" onClick={closePromoDetails}>
                      <span className="item-icon"></span>
                    </a>
                    <div className="detail-banner">
                      <img src={selectedPromo.image} alt={selectedPromo.title} loading="lazy" />
                    </div>
                    <div className="pop-title">
                      <h3>{selectedPromo.title}</h3>
                    </div>
                    <div className="pop-inner content-style">
                      <div>
                        <h2>
                          <span style={{ color: '#3498db' }}>
                            <strong>{selectedPromo.details.description}</strong>
                          </span>
                        </h2>

                        <h3>
                          <span style={{ color: '#e74c3c' }}>
                            <strong>কিভাবে যোগ দিতে হবে:</strong>
                          </span>
                        </h3>

                        <ul>
                          {selectedPromo.details.howToJoin.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>

                        <h3>
                          <span style={{ color: '#e74c3c' }}>
                            <strong>বোনাসের বিবরণ:</strong>
                          </span>
                        </h3>

                        <table>
                          <tbody>
                            {selectedPromo.details.bonusDetails.map((detail, index) => (
                              <tr key={index}>
                                <th scope="row">{detail.label}</th>
                                <td>{detail.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <h3>
                          <span style={{ color: '#e74c3c' }}>
                            <strong>শর্তাবলী ও নিয়মাবলি:</strong>
                          </span>
                        </h3>

                        <ul>
                          {selectedPromo.details.terms.map((term, index) => (
                            <li key={index}>{term}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

