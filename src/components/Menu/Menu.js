import React, { useState, useEffect } from 'react';
import './Menu.css';

export const Menu = ({ isVisible, toggleMenu, setCurrentView, currentView, todoLists, setTodoLists }) => {
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editItemValue, setEditItemValue] = useState('');

  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.querySelector('.menu');
      const containerMenu = document.querySelector('.container-menu');
      const barIcon = document.getElementById('barIcon');

      if (
        isVisible &&
        menu &&
        !menu.contains(e.target) &&
        !containerMenu.contains(e.target) &&
        !barIcon.contains(e.target)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, toggleMenu]);

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
      setCurrentView(todoLists[0]?.name || "To-Do List 1");
    }
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setEditItemValue(todoLists[index].name);
  };

  const handleSaveItem = (index) => {
    if (editItemValue.trim()) {
      const updatedLists = todoLists.map((list, i) =>
        i === index ? { ...list, name: editItemValue } : list
      );
      setTodoLists(updatedLists);
      setEditIndex(null);
      setEditItemValue('');
    }
  };

  return (
    <div>
      {isVisible && (
        <div className={`container-menu ${isVisible ? 'visible' : ''}`}>
          <div className='menu'>
            {todoLists.map((list, index) => (
              <div key={index} className='menu-item'>
                {editIndex === index ? (
                  <input
                    className="edit-input"
                    value={editItemValue}
                    onChange={(e) => setEditItemValue(e.target.value)}
                    onBlur={() => handleSaveItem(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveItem(index);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <a onClick={() => setCurrentView(list.name)} 
                     className={currentView === list.name ? "active" : ""}>
                    {list.name}
                  </a>
                )}
                <button 
                  className='edit-list' 
                  onClick={() => handleEditItem(index)}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
                <button 
                  className='delete-list' 
                  onClick={() => handleDeleteItem(index)}
                  style={{ display: todoLists.length > 1 ? 'inline' : 'none' }}
                >
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
