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

export const WeekDay = ({ checkStyle, dayTitle, setAddedTodosCountWeek, setCompletedTodosCountWeek, completedTodosSet, setCompletedTodosSet, theme }) => {
  const LOCAL_STORAGE_KEY = `todosWeek_${dayTitle}`;
  const FLAG_COLORS_KEY = `flagColors_${dayTitle}`;

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
  const [flagColors, setFlagColors] = useState(() => {
    const savedFlagColors = JSON.parse(localStorage.getItem(FLAG_COLORS_KEY)) || {};
    return savedFlagColors;
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos, LOCAL_STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(FLAG_COLORS_KEY, JSON.stringify(flagColors)); 
  }, [flagColors, FLAG_COLORS_KEY]);

  const handleAddTodos = () => {
    if (todoValue.trim()) {
      const newTodos = [...todos, { text: todoValue, checked: false }];
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

  const handleFlagColorChange = (index, color) => {
    setFlagColors((prevColors) => ({
      ...prevColors,
      [index]: { color, icon: "fa-solid" },
    }));
    setShowColorPicker(false);
  };

  const handleResetFlagColor = (index) => {
    setFlagColors((prevColors) => ({
      ...prevColors,
      [index]: { color: "black", icon: "fa-regular" },
    }));
    setShowColorPicker(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("color-modal")) {
      setShowColorPicker(false);
    }
  };

  return (
    <div onClick={handleOutsideClick}>
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
            const flagColor = flagColors[index] ? flagColors[index].color : "black";
            const flagIcon = flagColors[index] ? flagColors[index].icon : "fa-regular";
            
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
                <button className="checkbutton" onClick={() => toggleCheck(index)}>
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
                  <button
                    onClick={() => {
                      setSelectedTodoIndex(index);
                      setShowColorPicker(true);
                    }}
                  >
                    <i className={`${flagIcon} fa-flag`} style={{ color: flagColor }}></i>
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

        {showColorPicker && (
          <div className="color-modal">
            <div className="color-modal-content">
              <button onClick={() => handleFlagColorChange(selectedTodoIndex, "#e42d1a")}>
                <i className="fa-solid fa-flag" style={{ color: "#e42d1a" }}></i>
              </button>
              <button onClick={() => handleFlagColorChange(selectedTodoIndex, "#f3e83e")}>
                <i className="fa-solid fa-flag" style={{ color: "#f3e83e" }}></i>
              </button>
              <button onClick={() => handleFlagColorChange(selectedTodoIndex, "#48d452")}>
                <i className="fa-solid fa-flag" style={{ color: "#48d452" }}></i>
              </button>
              <button onClick={() => handleResetFlagColor(selectedTodoIndex)}>
                <i className="fa-regular fa-flag" style={{ color: "black" }}></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
