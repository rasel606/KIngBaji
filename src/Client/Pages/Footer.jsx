import React from "react";
import "../Component/SideBar.css";
import { Link } from "react-router-dom";
import { TbRating18Plus } from "react-icons/tb";
export default () => {
  return (
    <footer>
      <div className="footer ">
        <div className="footer-top">
          <div className="pay">
            <h2>Payment Methods</h2>
            <ul>
              {[
                "https://img.c88rx.com/cx/h5/assets/images/footer/color-black/pay16.png?v=1735554244437&source=mcdsrc",
                "https://img.c88rx.com/cx/h5/assets/images/footer/color-black/pay22.png?v=1735554244437&source=mcdsrc",
                "https://img.c88rx.com/cx/h5/assets/images/footer/color-black/pay34.png?v=1735554244437&source=mcdsrc",
                "https://img.c88rx.com/cx/h5/assets/images/footer/color-black/pay33.png?v=1735554244437&source=mcdsrc",
                "https://img.c88rx.com/cx/h5/assets/images/footer/color-black/pay45.png?v=1735554244437&source=mcdsrc",
              ].map((pay, index) => (
                <li key={index}>
                  <img alt={pay} src={pay} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
          <div className="safe">
            <h2>Social Networks</h2>
            <ul>
              {[
                {
                  name: "facebook",
                  link: "",
                },
                {
                  name: "instagram",
                  link: "",
                },
                { name: "twitter", link: "" },
                {
                  name: "telegram-channel",
                  link: "",
                },
                {
                  name: "pinterest",
                  link: "",
                },
                {
                  name: "youtube",
                  link: "",
                },
              ].map((social, index) => (
                <li key={index}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt={social.name}
                      src={`https://img.c88rx.com/cx/h5/assets/images/footer/color-black/social/${social.name}.png`}
                      loading="lazy"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="sponsor-ambassadors">
            {/* Sponsor Section */}
            <div className="sponsor">
              <h2>Responsiable Gambling</h2>
              <ul>
                <li>
                  <img
                    alt="Chepauk Super Gilles"
                    src="https://img.k516g.com/kg/h5/assets/images/footer/gaming_license.png?v=1735554286625"
                    loading="lazy"
                  />
                  {/* <p>Chepauk Super Gillies</p>
                  <strong>Certification</strong> */}
                </li>
                {/* <li>
                  <img
                    alt="Saint Lucia Kings"
                    src="https://bagh8.com:888/game_bd_live/footer/certificate3.png"
                    loading="lazy"
                  />
                  
                </li> */}
              </ul>
            </div>
            <div className="sponsor">
              <h2>Certification</h2>
              <ul>
                <li>
                  <img
                    alt="Chepauk Super Gilles"
                    src="https://bagh8.com:888/game_bd_live/footer/certificate3.png"
                    loading="lazy"
                  />
                </li>
              </ul>
            </div>
            {/* <div className="sponsor">
              <h2>Android App Download</h2>
              <ul>
                <li>
                  <img
                    alt="Chepauk Super Gilles"
                    src="https://i.ibb.co.com/mh9hT4L/f60d701e-09b8-454b-aa3c-fb4c6e8ec1fa.png"
                    loading="lazy"
                  />
                </li>
              </ul>
            </div> */}

            {/* Brand Ambassadors Section */}
            {/* <div className="ambassadors">
        
          <h2>Brand Ambassador</h2>
          <ul>
            <li>
              <img
                alt="Robin Uthappa"
                src="https://img.c88rx.com/cx/h5/assets/images/footer/ambassadors1.png?v=1736849889723&source=mcdsrc"
                loading="lazy"
              />
              <p>Robin Uthappa</p>
              <strong>Indian Cricket Legend</strong>
            </li>
            <li>
              <img
                alt="Srabanti Chatterjee"
                src="https://img.c88rx.com/cx/h5/assets/images/footer/ambassadors2.png?v=1736849889723&source=mcdsrc"
                loading="lazy"
              />
              <p>Srabanti Chatterjee</p>
              <strong>Heart of Bengali Cinema</strong>
            </li>
            <li>
              <img
                alt="Pori Moni"
                src="https://img.c88rx.com/cx/h5/assets/images/footer/ambassadors3.png?v=1736849889723&source=mcdsrc"
                loading="lazy"
              />
              <p>Pori Moni</p>
              <strong>Star of Dhallywood</strong>
            </li>
          </ul>
        
      </div> */}

            {/* Official Partner Section */}
            {/* <div className="official-partner">
        
          <h2>Official Partner</h2>
          <ul>
            <li>
              <a target="_blank" href="https://www.heyvip.com" rel="noopener noreferrer">
                <img
                  alt="Heyvip Official Partner"
                  src="https://img.c88rx.com/cx/h5/assets/images/footer/color-black/official-partner-heyvip.png?v=1736849889723&source=mcdsrc"
                  loading="lazy"
                />
              </a>
            </li>
          </ul>
        
      </div> */}
          </div>
        </div>

        <div className="footer-logo-wrap">
          <div className="link-wrap">
            <ul>
              <li>
                <a
                  
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                 
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  
                >
                  Affiliate
                </a>
              </li>
              <li>
                <a
                 
                 
                >
                  Sponsor
                </a>
              </li>
              <li>
                <a
                  
                >
                  KingBaji Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div
            className="logo"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png')",
            }}
          ></div>
          <div className="text">
            <div className="title">Best Quality Platform</div>
            <p>© 2025 KINGBAJI Copyrights. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
