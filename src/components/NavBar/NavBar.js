import React from 'react';
import './NavBar.css';

export const NavBar = ({ 
  isMenuVisible, 
  toggleMenu, 
  isSettingsVisible, 
  toggleSettings, 
  setCurrentView, 
  currentView, 
  todoLists, 
  setTodoLists, 
  checkStyle, 
  setCheckStyle, 
  theme,
}) => {
  return (
    <div 
      className='navbar'
      style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, #153677, #4e085f)"
          : "linear-gradient(135deg, #e0f7fa, #ffb3b3)",
        boxShadow: theme === "dark"
          ? "0px 0px 10px 0px rgba(255, 255, 255, 0.3)"
          : "0px 0px 10px 0px rgba(0, 0, 0, 0.3)"
      }}
    >
      <div className='navItem'>
        <i 
          className="fa-solid fa-list"
          id='barIcon'
          onClick={toggleMenu}
          style={{ color: isMenuVisible || (currentView !== "Week" && currentView !== "Tracker") 
            ? theme === "dark" ? '#ffbb33' : '#3366ff' 
            : theme === "dark" ? 'white' : '#202124' 
          }}
        ></i>
      </div>
      <div className='navItem'>
        <i 
          className="fa-solid fa-calendar-week" 
          id="weekIcon" 
          style={{ 
            color: currentView === "Week" 
              ? theme === "dark" ? '#ffbb33' : '#3366ff'  
              : theme === "dark" ? 'white' : '#202124' 
          }}
          onClick={() => setCurrentView("Week")}
        ></i>
      </div>
      <div className='navItem'>
        <i 
          className="fa-solid fa-book-open"
          id="trackerIcon" 
          style={{ 
            color: currentView === "Tracker" 
              ? theme === "dark" ? '#ffbb33' : '#3366ff'  
              : theme === "dark" ? 'white' : '#202124' 
          }}
          onClick={() => setCurrentView("Tracker")}
        ></i>
      </div>
      <div className='navItem'>
        <i 
          className="fa-solid fa-gear"
          id="settingsIcon" 
          onClick={toggleSettings}
          style={{ 
            color: isSettingsVisible 
              ? theme === "dark" ? '#ffbb33' : '#3366ff' 
              : theme === "dark" ? 'white' : '#202124' 
          }}
        ></i>
      </div>
    </div>
  );
};
