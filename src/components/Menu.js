import React, { useState } from 'react';

export const Menu = ({ isVisible, toggleMenu, setCurrentView, currentView, todoLists, setTodoLists, setCurrentViewPage }) => {
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editItemValue, setEditItemValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newList = { name: inputValue, todos: [] };
      setTodoLists((prevLists) => [...prevLists, newList]);
      setCurrentView(inputValue);
      setCurrentViewPage(inputValue);
      setInputValue('');
    }
  };

  const handleDeleteItem = (index) => {
    const newLists = todoLists.filter((_, i) => i !== index);
    setTodoLists(newLists);
    if (currentView === todoLists[index].name) {
      setCurrentView(todoLists[0]?.name);
      setCurrentViewPage(todoLists[0]?.name);
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
      <i className={isVisible ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
         id='bar-icon'
         onClick={toggleMenu}
         style={{ color: isVisible ? '#202124' : 'white' }}
      ></i>
      {isVisible && (
        <div className={`container-menu ${isVisible ? 'visible' : ''}`}>
          <div className='menu'>
            <div className='menu-item'>
              <a onClick={() => {
                setCurrentView("Week");
                setCurrentViewPage("Week");
              }} 
              className={currentView === "Week" ? "active" : ""}>
                Week
              </a>
            </div>
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
                  <a onClick={() => {
                    setCurrentView(list.name); 
                    setCurrentViewPage(list.name);
                  }} 
                  className={currentView === list.name ? "active" : ""}>
                    {list.name}
                  </a>
                )}
                <button 
                  className='edit-list' 
                  onClick={() => handleEditItem(index)}
                  style={{ paddingRight: editIndex === index ? '80px' : '40px' }}
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
