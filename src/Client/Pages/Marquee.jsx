import React from 'react'

export default () => {
  return (
    <div className="announcement-row">
            {/* <span
            className="item-icon"
            style={{
              maskImage:
                "url('https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/index-announcement-icon.svg?v=1736849889723')",
            }}
          ></span> */}
            <div className="announcement-row">
              <div className="marquee">
                <ul>
                  <li
                    dangerouslySetInnerHTML={{
                      __html: `<p><span style="font-size:14px;">
                    <strong>🏏You are on Asia's trusted cricket trading... 🏏You are on Asia's trusted cricket trading...</strong>
                  </span></p>`,
                    }}
                  />
                </ul>
              </div>
            </div>
          </div>
  )
}
