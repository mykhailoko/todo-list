import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import Checked from "../../assets/checked.png";
import Unchecked from "../../assets/unchecked.png";
import CatChecked from "../../assets/checkedcat.png";
import CatUnchecked from "../../assets/uncheckedcat.png";
import SharkChecked from "../../assets/checkedshark.png";
import SharkUnchecked from "../../assets/uncheckedshark.png";
import DogChecked from "../../assets/checkeddog.png";
import DogUnchecked from "../../assets/uncheckeddog.png";
import ChillCat from "../../assets/chillcat.png";
import { useTranslation  } from 'react-i18next';

function TodoList({ selectedList, todos, onUpdateTodos }) {
  const [showInput, setShowInput] = useState(false);
  const [todoValue, setTodoValue] = useState("");
  const [editTodo, setEditTodo] = useState({ index: null, value: ""});
  const [showReminder, setShowReminder] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [t] = useTranslation("global");

  useEffect(() => {
    const allChecked = todos.length > 0 && todos.every((todo) => todo.checked);
    const reminderShown = localStorage.getItem("reminderShown");
  
    if (allChecked && !reminderShown) {
      setShowReminder(true);
      localStorage.setItem("reminderShown", "true");
    } else if (!allChecked) {
      localStorage.removeItem("reminderShown");
    }
  }, [todos]);

  const [theme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });
  

  const [checkStyle] = useState(() => {
    const storedCheckStyle = localStorage.getItem('checkStyle');
    return storedCheckStyle ? storedCheckStyle : "usual";
  });

  const handleAddTodo = () => {
    if (todoValue.trim()) {
      onUpdateTodos([...todos, { text: todoValue, checked: false, flagColor: 'black', flagStyle: 'fa-regular'}]);
      setTodoValue("");
      setShowInput(false);
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodoList = [...todos];
    updatedTodoList.splice(index, 1);
    onUpdateTodos(updatedTodoList);
    setShowDeleteConfirm(false);
  };

  const handleEditTodo = () => {
    const updatedTodoList = todos.map((todo, i) => 
      i === editTodo.index ? { ...todo, text: editTodo.value } : todo
    );
    onUpdateTodos(updatedTodoList);
    setEditTodo({ index: null, value: "" })
  };

  const handleEditInputChange = (e) => {
    setEditTodo({ ...editTodo, value: e.target.value })
  };

  const handleCheck = (index) => {
    const updatedTodoList = todos.map((todo, i) => 
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    onUpdateTodos(updatedTodoList);
  };

  const handleFlag = (index) => {
    const updatedTodoList = todos.map((todo, i) =>
      i === index ? {
        ...todo,
        flagColor: todo.flagColor === "red" ? "black" : "red",
        flagStyle: todo.flagColor === "red" ? "fa-regular" : "fa-solid"
      } : todo
    );
    onUpdateTodos(updatedTodoList);
  }

  return (
    <div className='todo-list'>
        <h1 
          className='title' 
          id='todo-list-title'
          style={{ color: theme === "dark" ? "white" : "black" }}
        >{selectedList}</h1>

        {showInput && (
          <div 
            className="input-container"
            style={{ 
              background: theme === "dark" ? '#edeef0' : 'white',
              boxShadow: theme === "dark"
                ? "0px 0px 10px 0px rgba(255, 255, 255, 0)"
                : "0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
            }}  
          >
            <input 
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              placeholder={t("input.placeholder")}
              style={{
                background: theme === "dark" ? 'transparent' : 'white',
                borderRadius: theme === "dark" ? '0px' : '100px'
              }}
            />
            <button 
              onClick={handleAddTodo}
              style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
            >{t("input.button")}</button>
          </div>
        )}

        <ul className='all-todos'>
          {todos.map((todo, index) => {
            return (
              <li 
                key={index} 
                className='todo-item'
                style={{
                  boxShadow: theme === "dark" 
                    ? "0px 0px 10px 0px rgba(0, 0, 0, 0)"  
                    : "0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
                }}
              >
                <button className='check-button' onClick={() => handleCheck(index)}>
                  <img 
                    className='check-image' 
                    src={checkStyle === 'usual' ? todo.checked ? Checked : Unchecked 
                      : checkStyle === 'cat' ? todo.checked ? CatChecked : CatUnchecked 
                      : checkStyle === 'shark' ? todo.checked ? SharkChecked : SharkUnchecked 
                      : todo.checked ? DogChecked : DogUnchecked} 
                    alt={todo.checked ? 'checked' : 'unchecked'} 
                  />
                </button>
                {editTodo.index === index ? (
                  <input 
                    className='edit-input'
                    value={editTodo.value}
                    onChange={handleEditInputChange}
                    onBlur={handleEditTodo}
                    autoFocus
                  />
                  ) : (
                  <p
                    style={{ textDecoration: todo.checked ? "line-through" : "none"}}
                  >{todo.text}</p>
                )}
                <div className='actions-container'>
                  <button onClick={() => handleFlag(index)}>
                    <i 
                      className={`${todo.flagStyle} fa-flag`}
                      style={{ color: todo.flagColor}}
                    ></i>
                  </button>
                  <button onClick={() => setEditTodo({ index, value: todo.text })}>
                    <i className='fa-solid fa-pencil'></i>
                  </button>
                  <button onClick={() => setShowDeleteConfirm(prev => !prev)}>
                    <i className='fa-regular fa-trash-can'></i>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        <div className='add-button-container'>
          <p>add-button</p>
          <button 
            className='add-button'
            onClick={() => setShowInput(!showInput)}
            style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
          >
            <i className={showInput ? 'fa-solid fa-xmark' : 'fa-solid fa-plus'}></i>
          </button>
        </div>

        {showReminder && (
          <div className="reminder-container">
            <div className="reminder-main">
              <p>{t("chill.reminder")}</p>
              <img src={ChillCat} alt="cute-cat" />
              <button 
                onClick={() => setShowReminder(false)}
                style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}  
              >OK</button>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="delete-confirm">
            <div className="delete-confirm-content">
              <p>{t("answer.answer")}</p>
              <button 
                onClick={handleDeleteTodo}
                style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
              >{t("answer.yes")}</button>
              <button 
                onClick={() => setShowDeleteConfirm(prev => !prev)}
                style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
              >{t("answer.no")}</button>
            </div>
          </div>
        )}    
    </div>
  )
}

TodoList.propTypes = {
  selectedList: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    flagColor: PropTypes.string.isRequired,
    flagStyle: PropTypes.string.isRequired,
  })).isRequired,
  onUpdateTodos: PropTypes.func.isRequired,
};

export default TodoList