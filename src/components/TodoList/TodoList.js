import { useState, useEffect } from "react";
import Checked from "../../assets/checked.png";
import Unchecked from "../../assets/unchecked.png";
import CheckedCat from "../../assets/checkedcat.png";
import UncheckedCat from "../../assets/uncheckedcat.png";
import ChillCat from "../../assets/chillcat.png";
import './TodoList.css';

export default function TodoList({
  currentView,
  todoLists,
  handleAddTodo,
  handleDeleteTodo,
  checkStyle,
  setTodoLists,
}) {
  const currentList = todoLists.find((list) => list.name === currentView);
  const [todoValue, setTodoValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [addedTodosCount, setAddedTodosCount] = useState(() => {
    return parseInt(localStorage.getItem("addedTodosCount")) || 0;
  });
  const [completedTodosCount, setCompletedTodosCount] = useState(() => {
    return parseInt(localStorage.getItem("completedTodosCount")) || 0;
  });

  const [flagColors, setFlagColors] = useState(() => {
    const savedFlagColors = JSON.parse(localStorage.getItem("flagColors")) || {};
    return savedFlagColors;
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("addedTodosCount", addedTodosCount);
    
    if (addedTodosCount === 5 || completedTodosCount === 5) {
      setShowReminder(true);
    }
  }, [addedTodosCount, completedTodosCount]);

  useEffect(() => {
    localStorage.setItem("completedTodosCount", completedTodosCount);
  }, [completedTodosCount]);

  useEffect(() => {
    localStorage.setItem("flagColors", JSON.stringify(flagColors));
  }, [flagColors]);

  // Загрузка списка задач из localStorage при загрузке компонента
  useEffect(() => {
    const savedTodoLists = JSON.parse(localStorage.getItem("todoLists"));
    if (savedTodoLists) {
      setTodoLists(savedTodoLists);
    }
  }, [setTodoLists]);

  const handleAdd = () => {
    if (todoValue.trim()) {
      handleAddTodo(currentView, { text: todoValue, checked: false });
      setTodoValue("");
      setShowInput(false);
      setAddedTodosCount(addedTodosCount + 1);
    }
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditTodoValue(currentList.todos[index].text);
  };

  const handleSaveTodo = (index) => {
    if (editTodoValue.trim()) {
      const newTodos = currentList.todos.map((todo, i) =>
        i === index ? { ...todo, text: editTodoValue } : todo
      );

      const updatedLists = todoLists.map((list) => {
        if (list.name === currentView) {
          return { ...list, todos: newTodos };
        }
        return list;
      });

      setTodoLists(updatedLists);
      localStorage.setItem("todoLists", JSON.stringify(updatedLists)); // Сохранение в localStorage
      setEditIndex(null);
    }
  };

  const toggleCheck = (index) => {
    const newTodos = currentList.todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );

    const updatedLists = todoLists.map((list) => {
      if (list.name === currentView) {
        return { ...list, todos: newTodos };
      }
      return list;
    });

    setTodoLists(updatedLists);
    localStorage.setItem("todoLists", JSON.stringify(updatedLists)); // Сохранение в localStorage

    const completedTasksCount = newTodos.filter(todo => todo.checked).length;
    setCompletedTodosCount(completedTasksCount);
  };

  const getCheckImages = (checked) => {
    if (checkStyle === "cat") {
      return { checkedImg: CheckedCat, uncheckedImg: UncheckedCat };
    }
    return { checkedImg: Checked, uncheckedImg: Unchecked };
  };

  const confirmDeleteTodo = (index) => {
    setTodoToDelete(index);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteTodo(currentView, todoToDelete);
    setShowDeleteConfirm(false);
    setTodoToDelete(null);
    setAddedTodosCount((prevCount) => prevCount > 0 ? prevCount - 1 : 0);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
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
      <h1 className="title">{currentView}</h1>

      {showReminder && (
        <div className="reminder-container">
          <div className="reminder-main">
            <p className="reminder">Не забудьте отдохнуть!</p>
            <img src={ChillCat} alt="cute-cat" />
            <button onClick={() => {
              setShowReminder(false);
              setAddedTodosCount(0);
              setCompletedTodosCount(0);
            }}>OK</button>
          </div>
        </div>
      )}

      <div className="add-button-container">
        <p>add-button</p>
        <button
          className="add-header-button"
          onClick={() => setShowInput(!showInput)}
        >
          <i className={showInput ? "fa-solid fa-xmark" : "fa-solid fa-plus"} style={{ color: 'white', fontSize: '24px' }}></i>
        </button>
      </div>

      {showInput && (
        <div className="usual-header">
          <input
            className="input-header"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            placeholder="Enter todo"
          />
          <button className="header-button" onClick={handleAdd}>Add</button>
        </div>
      )}

      <ul className="main">
        {currentList.todos.map((todo, index) => {
          const { checkedImg, uncheckedImg } = getCheckImages(todo.checked);
          const flagColor = flagColors[index] ? flagColors[index].color : "black";
          const flagIcon = flagColors[index] ? flagColors[index].icon : "fa-regular";

          return (
            <li key={index} className="todoItem">
              <button
                className="checkbutton"
                onClick={() => toggleCheck(index)}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveTodo(index);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <p
                  style={{
                    textDecoration: todo.checked ? "line-through" : "none",
                  }}
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

                <button
                  onClick={() => handleEditTodo(index)}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>

                <button
                  onClick={() => confirmDeleteTodo(index)}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {showDeleteConfirm && (
        <div className="confirm-container">
          <div className="confirm-window">
            <p>Are you sure?</p>
            <div className="confirm-actions">
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
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
  );
};

