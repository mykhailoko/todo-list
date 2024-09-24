import React, { useState } from 'react';

export const Menu = ({ isVisible, toggleMenu, setCurrentView, currentView, todoLists, setTodoLists }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newList = { name: inputValue, todos: [] };
      setTodoLists((prevLists) => [...prevLists, newList]);
      setCurrentView(inputValue);
      setInputValue('');
    }
  };

  const handleDeleteItem = (index) => {
    const newLists = todoLists.filter((_, i) => i !== index);
    setTodoLists(newLists);
    if (currentView === todoLists[index].name) {
      setCurrentView('today');
    }
  };

  return (
    <div>
      <i className={isVisible ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
         id='bar-icon'
         onClick={toggleMenu}
         style={{ color: isVisible ? '#202124' : 'white' }}
      ></i>
      {isVisible && (
        <div className={`container-menu ${isVisible ? 'visible' : ''}`}>
          <div className='menu'>
            <div className='menu-item'>
              <a
                href="#"
                onClick={() => setCurrentView("today")}
                className={currentView === "today" ? "active" : ""}
              >
               нy today
              </a>
            </div>
            {todoLists.map((list, index) => (
              <div key={index} className='menu-item'>
                <a href="#" onClick={() => setCurrentView(list.name)} className={currentView === list.name ? "active" : ""}>
                  {list.name}
                </a>
                <button className='delete-list' onClick={() => handleDeleteItem(index)}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
          <div className='container-list'>
            <input
              className='input-list'
              placeholder="Enter list"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='button-list' onClick={handleAddItem}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};
