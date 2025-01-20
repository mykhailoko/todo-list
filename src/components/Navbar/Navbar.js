import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

function Navbar({ theme, setCurrentPage, currentPage }) {
    const getStyle = (page) => ({
        color: currentPage === page 
            ? theme === "dark" ? '#ffbb33' : '#3366ff'
            : theme === "dark" ? 'white' : '#202124',
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
            <div className="navItem" onClick={() => setCurrentPage("list")} style={getStyle("list")}>
                <i className="fa-solid fa-list-check"></i>
            </div>
            <div className="navItem" onClick={() => setCurrentPage("week-list")} style={getStyle("week-list")}>
                <i className="fa-solid fa-calendar-week"></i>
            </div>
            <div className="navItem" onClick={() => setCurrentPage("help")} style={getStyle("help")}>
                <i className="fa-solid fa-comments"></i>
            </div>
            <div className="navItem" onClick={() => setCurrentPage("tracker")} style={getStyle("tracker")}>
                <i className="fa-solid fa-book-open"></i>
            </div>
            <div className="navItem" onClick={() => setCurrentPage("settings")} style={getStyle("settings")}>
                <i className="fa-solid fa-gear"></i>
            </div>
        </div>
    )
}

Navbar.propTypes = {
    theme: PropTypes.string.isRequired,
    currentPage: PropTypes.string.isRequired,
    setCurrentPage: PropTypes.func.isRequired
};

export default Navbar;