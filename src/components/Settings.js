import React from "react";
import Cat from "../assets/checkedcat.png";
import Usual from "../assets/checked.png";

export const Settings = ({ isVisible, toggleSettings, setCheckStyle, checkStyle  }) => {
    const handleStyleChange = (style) => {
        setCheckStyle(style);
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
            >
              <img className="styleicon" src={Cat} alt="cats" />
            </button>
            <button
              className={`styleusual ${checkStyle === 'usual' ? 'active' : ''}`}
              onClick={() => handleStyleChange('usual')}
            >
              <img className="styleicon" src={Usual} alt="usual" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
