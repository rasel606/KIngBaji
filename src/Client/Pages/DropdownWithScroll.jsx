import React, { useState } from "react";

export default ({
  selectedOption,
  setSelectedOption,
  options,
  handleOptionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="input-group third-party-input-group-title">
      <div
        onClick={toggleDropdown}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: " 10px 10px 10px 10px",
          cursor: "pointer",
          background: " rgba(131, 157, 193, 0.83)",
          height: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            height: "40px",
            maxHeight: "100%",
          }}
        >
          <img
            src={selectedOption.flag}
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
          <p
            style={{
              marginLeft: "20px",
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
              paddingTop: "10px",
            }}
          >
            {selectedOption.Currency}
          </p>
        </div>
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            margin: "5px 0 5 px 5px",
            top: "100%",
            left: "0",
            width: "100%",
            maxHeight: "100px",
            border: "1px solid #cccccc",
            borderRadius: "4px",
            background: "rgba(131, 157, 193, 0.83)",
            overflowY: "auto",
            zIndex: "1000",
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "10px 10px 10px 10px",
                cursor: "pointer",
                background: " rgba(131, 157, 193, 0.83)",
                borderBottom: " 1px solid rgba(178, 192, 210, 0.83)",
                height: "40px",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  height: "40px",
                  maxHeight: "100%",
                }}
              >
                <img
                  src={option.flag}
                  alt=""
                  style={{ width: "20px", height: "20px" }}
                />
                <p
                  style={{
                    marginLeft: "20px",
                    fontSize: "20px",
                    fontWeight: "500",
                    textAlign: "center",
                    paddingTop: "10px",
                  }}
                >
                  {option.Currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
