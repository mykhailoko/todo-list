import React, { useState, useEffect } from "react";
import Cat from "../assets/checkedcat.png";
import Usual from "../assets/checked.png";

export const Settings = ({ isVisible, toggleSettings, setCheckStyle, checkStyle }) => {
  const [selectedStyle, setSelectedStyle] = useState("usual");

  useEffect(() => {
    const savedStyle = localStorage.getItem("selectedStyle");
    if (savedStyle) {
      setSelectedStyle(savedStyle);
      setCheckStyle(savedStyle);
    }
  }, [setCheckStyle]);

  const handleStyleChange = (style) => {
    setCheckStyle(style);
    setSelectedStyle(style);
    localStorage.setItem("selectedStyle", style);
  };

  return (
    <div>
      <i
        className={isVisible ? "fa-solid fa-xmark" : "fa-solid fa-gear"}
        id="settings-icon"
        onClick={toggleSettings}
        style={{ color: isVisible ? "#202124" : "white" }}
      ></i>
      {isVisible && (
        <div className={`settings-menu ${isVisible ? "visible" : ""}`}>
          <div className="buttons-style">
            <button
              className={`stylecat ${checkStyle === 'cat' ? 'active' : ''}`}
              onClick={() => handleStyleChange('cat')}
              style={{
                backgroundColor: selectedStyle === 'cat' ? '#9f9f9f' : 'transparent'
              }}
            >
              <img className="styleicon" src={Cat} alt="cats" />
            </button>
    
            <button
              className={`styleusual ${checkStyle === 'usual' ? 'active' : ''}`}
              onClick={() => handleStyleChange('usual')}
              style={{
                backgroundColor: selectedStyle === 'usual' ? '#9f9f9f' : 'transparent'
              }}
            >
              <img className="styleicon" src={Usual} alt="usual" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
