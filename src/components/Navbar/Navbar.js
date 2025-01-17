import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar({ theme }) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

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
                className="fa-solid fa-list-check"
                onClick={() => navigate("/")}
                style={{ color: currentPath === "/" 
                    ? theme === "dark" ? '#ffbb33' : '#3366ff' 
                    : theme === "dark" ? 'white' : '#202124' }}
            ></i>
        </div>
        <div className='navItem'>
            <i 
                className="fa-solid fa-calendar-week"
                onClick={() => navigate("/week-list")}
                style={{ color: currentPath === "/week-list"
                    ? theme === "dark" ? '#ffbb33' : '#3366ff' 
                    : theme === "dark" ? 'white' : '#202124' }}
            ></i>
        </div>
        <div className='navItem'>
            <i 
                className="fa-solid fa-book-open"
                onClick={() => navigate("/tracker")}
                style={{ color: currentPath === "/tracker"
                    ? theme === "dark" ? '#ffbb33' : '#3366ff' 
                    : theme === "dark" ? 'white' : '#202124' }}
            ></i>
        </div>
        <div className='navItem'>
            <i 
                className="fa-solid fa-gear"
                onClick={() => navigate("/settings")}
                style={{ color: currentPath === "/settings"
                    ? theme === "dark" ? '#ffbb33' : '#3366ff' 
                    : theme === "dark" ? 'white' : '#202124' }}
            ></i>
        </div>
    </div>
  )
}

Navbar.propTypes = {
    theme: PropTypes.string.isRequired
};

export default Navbar;