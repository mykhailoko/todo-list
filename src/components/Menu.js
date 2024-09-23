import React from 'react';

export const Menu = ({ isVisible, toggleMenu, setCurrentView, currentView }) => {
  return (
    <div>
        <i  className="fa-solid fa-bars"
            id='bar-icon'
            onClick={toggleMenu}
            style={{ color: isVisible ? '#202124' : 'white' }}
        ></i>
      {isVisible && (
        <div className={`container-menu ${isVisible ? 'visible' : ''}`}>
          <div className='menu'>
            <a
              href="#"
              onClick={() => setCurrentView("today")}
              className={currentView === "today" ? "active" : ""}
            >
              For Today
            </a>
            <a
              href="#"
              onClick={() => setCurrentView("week")}
              className={currentView === "week" ? "active" : ""}
            >
              For the Week
            </a>
            <a
              href="#"
              onClick={() => setCurrentView("future")}
              className={currentView === "future" ? "active" : ""}
            >
              For the Future
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
