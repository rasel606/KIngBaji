import { useState } from "react";
import { useModal } from "./ModelContext";

export default ({ modalName }) => {
  const { activeModal, openModal, closeModal } = useModal();
  if (activeModal !== modalName) return null;
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const currencies = [
    { code: "INR", symbol: "₹", flag: "IN.png", languages: ["English", "हिंदी"] },
    { code: "BDT", symbol: "৳", flag: "BD.png", languages: ["বাংলা", "English"] },
    { code: "PKR", symbol: "₨", flag: "PK.png", languages: ["English"] },
    { code: "USD", symbol: "", flag: "US.png", languages: ["English"] },
    { code: "NPR", symbol: "Rs", flag: "NP.png", languages: ["नेपाली", "English"] },
    { code: "LKR", symbol: "Rs", flag: "LK.png", languages: ["English"] },
  ];

  return (
    <div className="pop-wrap show ani pop-language" onClick={closeModal}>
      <div className="pop-title">
        <h3>Currency and Language</h3>
        <button className="btn-close"  onClick={closeModal}><span className="item-icon"   onClick={closeModal} ></span></button>
      </div>
      <div className="pop-inner">
        <ul className="language-list">
          {currencies.map((currency, index) => (
            <li key={index}>
              <div className="left-language-area">
                <img
                  src={`https://img.c88rx.com/cx/h5/assets/images/flag/${currency.flag}`}
                  alt={currency.code}
                  loading="lazy"
                />
                <p>
                  <span>{currency.symbol}</span> {currency.code}
                </p>
              </div>
              <div className="right-language-area">
                {currency.languages.map((lang, langIndex) => (
                  <div className="radio-box" key={langIndex}>
                    <input
                      type="radio"
                      name="language"
                      id={`${currency.code}${langIndex}`}
                      checked={selectedLanguage === `${currency.code}${langIndex}`}
                      onChange={() => setSelectedLanguage(`${currency.code}${langIndex}`)}
                    />
                    <label htmlFor={`${currency.code}${langIndex}`}>{lang}</label>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


