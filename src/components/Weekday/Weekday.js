import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Weekday.css';
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

function Weekday({dayTitle, dayIndex}) {
  const LOCAL_STORAGE_KEY = `todoListWeek_${dayIndex}`;
  const [t] = useTranslation("global");
  const [showReminderDay, setShowReminderDay] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [theme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  const [checkStyle] = useState(() => {
    const storedCheckStyle = localStorage.getItem('checkStyle');
    return storedCheckStyle ? JSON.parse(storedCheckStyle) : "";
  });

  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  });
  const [showInput, setShowInput] = useState(false);
  const [todoValue, setTodoValue] = useState("");
  const [editTodo, setEditTodo] = useState({ index: null, value: ""});

  useEffect(() => {
    const allChecked = todoList.length > 0 && todoList.every((todo) => todo.checked);
    const reminderShownKey = `${LOCAL_STORAGE_KEY}_reminderShown`;
    const reminderShown = localStorage.getItem(reminderShownKey);
  
    if (allChecked && !reminderShown) {
      setShowReminderDay(true);
      localStorage.setItem(reminderShownKey, "true");
    } else if (!allChecked && reminderShown) {
      localStorage.removeItem(reminderShownKey);
    }
  }, [todoList, LOCAL_STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList, LOCAL_STORAGE_KEY]);

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodoList) {
      setTodoList(storedTodoList);
    }
  }, [LOCAL_STORAGE_KEY]);

  const handleAddTodo = () => {
    if (todoValue.trim()) {
      setTodoList([...todoList, { text: todoValue, checked: false, flagColor: 'black', flagStyle: 'fa-regular'}]);
      setTodoValue("");
      setShowInput(false);
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
    setShowDeleteConfirm(false);
  };

  const handleEditTodo = () => {
    const updatedTodoList = todoList.map((todo, i) => 
      i === editTodo.index ? { ...todo, text: editTodo.value } : todo
    );
    setTodoList(updatedTodoList);
    setEditTodo({ index: null, value: "" })
  };

  const handleEditInputChange = (e) => {
    setEditTodo({ ...editTodo, value: e.target.value })
  };

  const handleCheck = (index) => {
    const updatedTodoList = todoList.map((todo, i) => 
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodoList(updatedTodoList);
  };

  const handleFlag = (index) => {
    const updatedTodoList = todoList.map((todo, i) =>
      i === index ? {
        ...todo,
        flagColor: todo.flagColor === "red" ? "black" : "red",
        flagStyle: todo.flagColor === "red" ? "fa-regular" : "fa-solid"
      } : todo
    );
    setTodoList(updatedTodoList);
  }

  return (
    <div className='day'>
        <div className='day-container'>
            <h1 
              className='day-title'
              style={{ color: theme === "dark" ? "white" : "#202124" }}
            >{dayTitle}</h1>
            <button 
                className='add-button'
                onClick={() => setShowInput(!showInput)}
                style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
            >
                <i 
                    className={showInput ? 'fa-solid fa-xmark' : 'fa-solid fa-plus'} 
                    style={{ color: 'white', fontSize: '22px'}}
                ></i>
            </button>
        </div>

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
                borderRadius: theme === "dark"? '0px' : '100px'
              }}
            />
            <button 
              onClick={handleAddTodo}
              style={{
                background: theme === "dark" ? '#ffbb33' : '#3366ff'
              }}
            >{t("input.button")}</button>
          </div>
        )}

        <ul className='all-todos'>
          {todoList.map((todo, index) => {
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

        {showReminderDay && (
          <div className="reminder-container">
            <div className="reminder-main">
              <p>{t("chill.reminderday")}</p>
              <img src={ChillCat} alt="cute-cat" />
              <button 
                onClick={() => setShowReminderDay(false)}
                style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
              >OK</button>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="delete-confirm">
            <div className="delete-confirm-content">
              <p>Delete todo?</p>
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

Weekday.propTypes = {
  dayTitle: PropTypes.string.isRequired, 
  dayIndex: PropTypes.number.isRequired, 
};

export default Weekday