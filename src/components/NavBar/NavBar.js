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
  setCheckStyle 
}) => {
  return (
    <div className='navbar'>
      <div className='navItem'>
        <i 
          className="fa-solid fa-list"
          id='barIcon'
          onClick={toggleMenu}
          style={{ color: isMenuVisible || (currentView !== "Week" && currentView !== "Tracker") ? '#ffbb33' : 'white' }}
        ></i>
      </div>
      <div className='navItem'>
        <i 
          className="fa-solid fa-calendar-week" 
          id="weekIcon" 
          style={{ color: currentView === "Week" ? '#ffbb33' : 'white' }}
          onClick={() => setCurrentView("Week")}
        ></i>
      </div>
      <div className='navItem'>
        <i 
          className="fa-solid fa-book-open"
          id="trackerIcon" 
          style={{ color: currentView === "Tracker" ? '#ffbb33' : 'white' }}
          onClick={() => setCurrentView("Tracker")}
        ></i>
      </div>
      <div className='navItem'>
        <i 
          className="fa-solid fa-gear"
          id="settingsIcon" 
          onClick={toggleSettings}
          style={{ color: isSettingsVisible ? '#ffbb33' : 'white' }}
        ></i>
      </div>
    </div>
  );
};
