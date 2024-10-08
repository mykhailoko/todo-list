import React, { useState, useEffect } from "react";
import Cat from "../../assets/checkedcat.png";
import Usual from "../../assets/checked.png";
import Shark from "../../assets/checkedshark.png";
import Dog from "../../assets/checkeddog.png";
import './Settings.css';

export const Settings = ({ isVisible, toggleSettings, setCheckStyle, checkStyle, completedCount, deletedTodos, setDeletedTodos }) => {
  const [selectedStyle, setSelectedStyle] = useState("usual");

  useEffect(() => {
    const handleClickOutsideSet = (e) => {
      const settings = document.querySelector('.settings-menu');
      const settingsIcon = document.getElementById('settingsIcon');
      if (isVisible && settings && !settings.contains(e.target) && !settingsIcon.contains(e.target)) {
        toggleSettings();
      }
    };

    document.addEventListener('mousedown', handleClickOutsideSet);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSet);
    };
  }, [isVisible, toggleSettings]);

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
              className={`styleshark ${checkStyle === 'shark' ? 'active' : ''}`}
              onClick={() => handleStyleChange('shark')}
              style={{
                backgroundColor: selectedStyle === 'shark' ? '#9f9f9f' : 'transparent'
              }}
            >
              <img className="styleicon" src={Shark} alt="shark" />
            </button>

            <button
              className={`styledog ${checkStyle === 'dog' ? 'active' : ''}`}
              onClick={() => handleStyleChange('dog')}
              style={{
                backgroundColor: selectedStyle === 'dog' ? '#9f9f9f' : 'transparent'
              }}
            >
              <img className="styleicon" src={Dog} alt="dog" />
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
