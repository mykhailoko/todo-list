import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from "react-router-dom";

function Navbar() {
    const [theme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "dark";
    });
      

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
                <NavLink to="/list" style={({isActive}) => ({
                    color: isActive ? theme === "dark" ? '#ffbb33' : '#3366ff' 
                                    : theme === "dark" ? 'white' : '#202124'
                })}>
                    <i 
                        className="fa-solid fa-list-check"
                    ></i>
                </NavLink>
            </div>
            <div className='navItem'>
            <NavLink to="/week-list" style={({isActive}) => ({
                    color: isActive ? theme === "dark" ? '#ffbb33' : '#3366ff' 
                                    : theme === "dark" ? 'white' : '#202124'
                })}>
                    <i 
                        className="fa-solid fa-calendar-week"
                    ></i>
                </NavLink>
            </div>
            <div className='navItem'>
                <NavLink to="/tracker" style={({isActive}) => ({
                    color: isActive ? theme === "dark" ? '#ffbb33' : '#3366ff' 
                                    : theme === "dark" ? 'white' : '#202124'
                })}>
                    <i 
                        className="fa-solid fa-book-open"
                    ></i>
                </NavLink>
            </div>
            <div className='navItem'>
                <NavLink to="/config" style={({isActive}) => ({
                    color: isActive ? theme === "dark" ? '#ffbb33' : '#3366ff' 
                                    : theme === "dark" ? 'white' : '#202124'
                })}>
                    <i 
                        className="fa-solid fa-gear"
                    ></i>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;