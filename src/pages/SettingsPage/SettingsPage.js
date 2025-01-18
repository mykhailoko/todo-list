import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SettingsPage.css';
import Cat from "../../assets/checkedcat.png";
import Usual from "../../assets/checked.png";
import Shark from "../../assets/checkedshark.png";
import Dog from "../../assets/checkeddog.png";
import { useTranslation  } from 'react-i18next';

function SettingsPage({ theme, setTheme }) {
  const [t, i18n] = useTranslation("global");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const [checkStyle, setCheckStyle] = useState(() => {
    const storedCheckStyle = localStorage.getItem('checkStyle');
    return storedCheckStyle ? JSON.parse(storedCheckStyle) : "usual";
  });

  useEffect(() => {
      localStorage.setItem('checkStyle', JSON.stringify(checkStyle));
    }, [checkStyle]);
  
    useEffect(() => {
      const storedCheckStyle = JSON.parse(localStorage.getItem('checkStyle'));
      if (storedCheckStyle) {
        setCheckStyle(storedCheckStyle);
      }
    }, []);

  const handleStyleChange = (style) => {
    setCheckStyle(style);
  };

  return (
    <div className='settings'>
      <div className='settings-item'>
        <h2 
          style={{ color: theme === "dark" ? "white" : "black" }}
        >{t("settings.check")}</h2>
        <div className='check-style'>
          <div className='check-style-row'>
            <button 
              className='check-style-item' 
              onClick={() => handleStyleChange('usual')}
              style={{backgroundColor: checkStyle === 'usual' ? 'rgba(178, 178, 178, 0.3)' : 'transparent'}}
            >
              <img className='styleicon' src={Usual} alt='usual' />
            </button>

            <button 
              className='check-style-item' 
              onClick={() => handleStyleChange('cat')}
              style={{backgroundColor: checkStyle === 'cat' ? 'rgba(178, 178, 178, 0.3)' : 'transparent'}}
            >
              <img className='styleicon' src={Cat} alt='cat' />
            </button>
          </div>

          <div className='check-style-row'>
            <button 
              className='check-style-item' 
              onClick={() => handleStyleChange('shark')}
              style={{backgroundColor: checkStyle === 'shark' ? 'rgba(178, 178, 178, 0.3)' : 'transparent'}}
            >
              <img className='styleicon' src={Shark} alt='shark' />
            </button>
            
            <button 
              className='check-style-item' 
              onClick={() => handleStyleChange('dog')}
              style={{backgroundColor: checkStyle === 'dog' ? 'rgba(178, 178, 178, 0.3)' : 'transparent'}}
            >
              <img className='styleicon' src={Dog} alt='dog' />
            </button>
          </div>
        </div>
      </div>

      <div className='settings-item'>
        <h2
          style={{ color: theme === "dark" ? "white" : "black" }}
        >{t("settings.language")}</h2>
        <div className='select-language'>
          <select className='select' value={i18n.language} onChange={(e) => handleChangeLanguage(e.target.value)}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>

      <div className='settings-item'>
        <h2
          style={{ color: theme === "dark" ? "white" : "black" }}
        >{t("settings.theme")}</h2>
        <label className="switch">
          <input 
            onChange={toggleTheme}
            type="checkbox" 
            checked={theme === "light"}
          />
          <span className="slider">
            <span className="sun"></span>
            <span className="moon"></span>
          </span>
        </label>
      </div>
    </div>
  )
}

SettingsPage.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default SettingsPage