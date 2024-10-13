import { useState, useEffect } from "react";
import './WeekDay.css'
import Checked from '../../assets/checked.png';
import Unchecked from '../../assets/unchecked.png';
import CheckedCat from '../../assets/checkedcat.png';
import UncheckedCat from '../../assets/uncheckedcat.png';
import CheckedShark from "../../assets/checkedshark.png";
import UncheckedShark from "../../assets/uncheckedshark.png";
import CheckedDog from "../../assets/checkeddog.png";
import UncheckedDog from "../../assets/uncheckeddog.png";

export const WeekDay = ({ checkStyle, dayTitle, setAddedTodosCountWeek, setCompletedTodosCountWeek, setCompletedTodosSet, theme }) => {
  const LOCAL_STORAGE_KEY = `todosWeek_${dayTitle}`;

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [todoValue, setTodoValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const [showCleanerDeleteModal, setShowCleanerDeleteModal] = useState(false);

  const openCleanerDeleteModal = () => {
    setShowCleanerDeleteModal(true);
  };
  
  const closeCleanerDeleteModal = () => {
    setShowCleanerDeleteModal(false);
  };
  
  const handleCleanerDelete = () => {
    setTodos([]);
    setCompletedTodosSet(new Set()); 
    setAddedTodosCountWeek(0); 
    setCompletedTodosCountWeek(0);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    closeCleanerDeleteModal();
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos, LOCAL_STORAGE_KEY]);

  const handleAddTodos = () => {
    if (todoValue.trim()) {
      const newTodos = [...todos, { text: todoValue, checked: false, flagColor: 'black', flagStyle: 'fa-regular' }];
      setTodos(newTodos);
      setTodoValue("");
      setShowInput(false);
      setAddedTodosCountWeek(prevCount => prevCount + 1);
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
  
    setTodos(newTodos);
    setShowDeleteModal(false);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditTodoValue(todos[index].text);
  };

  const handleSaveTodo = (index) => {
    if (editTodoValue.trim()) {
      const updatedTodos = todos.map((todo, i) =>
        i === index ? { ...todo, text: editTodoValue } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    }
  };

  const toggleCheck = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        const newCheckedStatus = !todo.checked;
        return { ...todo, checked: newCheckedStatus };
      }
      return todo;
    });

    setTodos(newTodos);

    if (!todos[index].checked) {
      setCompletedTodosSet(prevSet => new Set(prevSet).add(`${dayTitle}_${index}`)); 
    } else {
      setCompletedTodosSet(prevSet => {
        const newSet = new Set(prevSet);
        newSet.delete(`${dayTitle}_${index}`);
        return newSet;
      });
    }
  };

  const getCheckImages = (checked) => {
    if (checkStyle === 'cat') {
      return { checkedImg: CheckedCat, uncheckedImg: UncheckedCat };
    }
    if (checkStyle === "shark") {
      return { checkedImg: CheckedShark, uncheckedImg: UncheckedShark };
    }
    if (checkStyle === "dog") {
      return { checkedImg: CheckedDog, uncheckedImg: UncheckedDog };
    }
    return { checkedImg: Checked, uncheckedImg: Unchecked };
  };

  const openDeleteModal = (index) => {
    setTodoToDelete(index);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTodoToDelete(null);
  };

  const toggleFlagColor = (index) => {
    const newTodos = todos.map((todo, i) => {
        if (i === index) {
            const newColor = todo.flagColor === "red" ? "black" : "red";
            const newStyle = todo.flagStyle = todo.flagColor === "red" ? "fa-regular" : "fa-solid";
            return { ...todo, flagColor: newColor, flagStyle: newStyle };
        }
        return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div>
      <div className="day">
        <header className="week-header">
          <h1 
            className="week-title"
            style={{
              color: theme === "dark" 
                ? "white"
                : "#202124"
            }}
          >{dayTitle}</h1>
          <div className="button-container">
            <button 
              className="cleaner" 
              onClick={openCleanerDeleteModal}
              style={{
                background: theme === "dark" 
                  ? '#ffbb33'  
                  : '#3366ff'
              }}
            >
              <i className="fa-solid fa-broom" style={{ color: 'white', fontSize: '22px' }}></i>
            </button>
            <button 
              className="week-header-button" 
              onClick={() => setShowInput(!showInput)}
              style={{
                background: theme === "dark" 
                  ? '#ffbb33'  
                  : '#3366ff'
              }}
            >
              <i className={showInput ? "fa-solid fa-xmark" : "fa-solid fa-plus"} style={{ color: 'white', fontSize: '24px' }}></i>
            </button>
          </div>
        </header>
        
        {showInput && (
          <div 
            className="usual-header"
            style={{
              background: theme === "dark" 
                ? '#edeef0'  
                : 'white',
              boxShadow: theme === "dark"
                ? "0px 0px 10px 0px rgba(255, 255, 255, 0)"
                : "0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
            }}
          >
            <input
              className="input-header"
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
              placeholder="Enter todo"
              style={{
                background: theme === "dark" 
                  ? 'transparent'  
                  : 'white',
                borderRadius: theme === "dark"
                  ? '0px'
                  : '100px'
              }}
            />
            <button 
              className="header-button" 
              onClick={handleAddTodos}
              style={{
                background: theme === "dark" 
                  ? '#ffbb33'  
                  : '#3366ff'
              }}
            >Add</button>
          </div>
        )}
        
        <ul className="main">
          {todos.map((todo, index) => {
            const { checkedImg, uncheckedImg } = getCheckImages(todo.checked);
            
            return (
              <li 
                key={index} 
                className="todoItem"
                style={{
                  boxShadow: theme === "dark" 
                    ? "0px 0px 10px 0px rgba(0, 0, 0, 0)"  
                    : "0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
                }}
              >
                <button 
                  className="checkbutton" 
                  onClick={() => toggleCheck(index)}
                  style={{
                    filter: checkStyle === "dog" ? "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2))" : "none"
                  }}
                >
                  <img
                    className="check"
                    src={todo.checked ? checkedImg : uncheckedImg}
                    alt={todo.checked ? "checked" : "unchecked"}
                  />
                </button>

                {editIndex === index ? (
                  <input
                    className="edit-input"
                    value={editTodoValue}
                    onChange={(e) => setEditTodoValue(e.target.value)}
                    onBlur={() => handleSaveTodo(index)}
                    autoFocus
                  />
                ) : (
                  <p
                    style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}
                    onClick={() => handleEditTodo(index)}
                  >
                    {todo.text}
                  </p>
                )}
                
                <div className="actionsContainer">
                  <button onClick={() => toggleFlagColor(index)}>
                    <i 
                      className={`${todo.flagStyle} fa-flag`}
                      style={{ color: todo.flagColor }}
                    ></i>
                  </button>
                  <button onClick={() => handleEditTodo(index)}>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button onClick={() => openDeleteModal(index)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {showDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Delete todo?</p>
              <button 
                onClick={() => handleDeleteTodo(todoToDelete)}
                style={{
                  background: theme === "dark" 
                    ? '#ffbb33'  
                    : '#3366ff'
                }}
              >Да</button>
              <button 
                onClick={closeDeleteModal}
                style={{
                  background: theme === "dark" 
                    ? '#ffbb33'  
                    : '#3366ff'
                }}
              >Нет</button>
            </div>
          </div>
        )}

        {/*<div className="color-modal">
          <div className="color-modal-content">
            <button>
              <i className="fa-solid fa-flag" style={{ color: "#e42d1a" }}></i>
            </button>
            <button>
              <i className="fa-solid fa-flag" style={{ color: "#f3e83e" }}></i>
            </button>
            <button>
              <i className="fa-solid fa-flag" style={{ color: "#48d452" }}></i>
            </button>
            <button>
              <i className="fa-regular fa-flag" style={{ color: "black" }}></i>
            </button>
          </div>
        </div>*/}

        {showCleanerDeleteModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Delete all todos?</p>
              <button 
                onClick={handleCleanerDelete}
                style={{
                  background: theme === "dark" 
                    ? '#ffbb33'  
                    : '#3366ff'
                }}
              >Да</button>
              <button 
                onClick={closeCleanerDeleteModal}
                style={{
                  background: theme === "dark" 
                    ? '#ffbb33'  
                    : '#3366ff'
                }}
              >Нет</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
