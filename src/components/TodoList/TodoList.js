import { useState, useEffect } from "react";
import Checked from "../../assets/checked.png";
import Unchecked from "../../assets/unchecked.png";
import CheckedCat from "../../assets/checkedcat.png";
import UncheckedCat from "../../assets/uncheckedcat.png";
import CheckedShark from "../../assets/checkedshark.png";
import UncheckedShark from "../../assets/uncheckedshark.png";
import CheckedDog from "../../assets/checkeddog.png";
import UncheckedDog from "../../assets/uncheckeddog.png";
import ChillCat from "../../assets/chillcat.png";
import './TodoList.css';

export default function TodoList({
  currentView,
  todoLists,
  checkStyle,
  setTodoLists,
  theme
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
    const savedTodoLists = JSON.parse(localStorage.getItem("todoLists"));
    if (savedTodoLists) {
      setTodoLists(savedTodoLists);
    }
  }, [setTodoLists]);

  const handleDeleteTodo = (currentView, index) => {
    const updatedTodoLists = todoLists.map((list) => {
      if (list.name === currentView) {
        return {
          ...list,
          todos: list.todos.filter((_, i) => i !== index)
        };
      }
      return list;
    });
  
    setTodoLists(updatedTodoLists);
    localStorage.setItem("todoLists", JSON.stringify(updatedTodoLists));
    setAddedTodosCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleAddTodos = () => {
    if (todoValue.trim()) {
      const newTodos = [
        ...currentList.todos, 
        { text: todoValue, checked: false, flagColor: 'black', flagStyle: 'fa-regular' }
      ];
      const updatedLists = todoLists.map((list) =>
        list.name === currentView ? { ...list, todos: newTodos } : list
      );
      setTodoLists(updatedLists);
      setTodoValue("");
      setShowInput(false);
      setAddedTodosCount((prevCount) => prevCount + 1);
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
      localStorage.setItem("todoLists", JSON.stringify(updatedLists));
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
    localStorage.setItem("todoLists", JSON.stringify(updatedLists));

    const completedTasksCount = newTodos.filter(todo => todo.checked).length;
    setCompletedTodosCount(completedTasksCount);
  };

  const getCheckImages = (checked) => {
    if (checkStyle === "cat") {
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

  const toggleFlagColor = (index) => {
    const newTodos = currentList.todos.map((todo, i) => {
      if (i === index) {
        const newColor = todo.flagColor === "red" ? "black" : "red";
        const newStyle = todo.flagColor === "red" ? "fa-regular" : "fa-solid";
        return { ...todo, flagColor: newColor, flagStyle: newStyle };
      }
      return todo;
    });
    
    const updatedLists = todoLists.map((list) =>
      list.name === currentView ? { ...list, todos: newTodos } : list
    );
    
    setTodoLists(updatedLists);
  };

  return (
    <div>
      <h1 
        className="title"
        style={{
          color: theme === "dark" 
            ? "white"
            : "#202124"
        }}
      >{currentView}</h1>

      {showReminder && (
        <div className="reminder-container">
          <div className="reminder-main">
            <p className="reminder">Не забудьте отдохнуть!</p>
            <img src={ChillCat} alt="cute-cat" />
            <button 
              onClick={() => {
                setShowReminder(false);
                setAddedTodosCount(0);
                setCompletedTodosCount(0);
              }}
              style={{
                background: theme === "dark" 
                  ? '#ffbb33'  
                  : '#3366ff'
              }}
            >OK</button>
          </div>
        </div>
      )}

      <div className="add-button-container">
        <p>add-button</p>
        <button
          className="add-header-button"
          onClick={() => setShowInput(!showInput)}
          style={{
            background: theme === "dark" 
              ? '#ffbb33'  
              : '#3366ff'
          }}
        >
          <i 
            className={showInput ? "fa-solid fa-xmark" : "fa-solid fa-plus"} 
            style={{ color: 'white', fontSize: '24px'}}
          ></i>
        </button>
      </div>

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
        {currentList.todos.map((todo, index) => {
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
                  filter: checkStyle === "dog" ? "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.3))" : "none"
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
                <button onClick={() => toggleFlagColor(index)}>
                  <i 
                    className={`${todo.flagStyle} fa-flag`}
                    style={{ color: todo.flagColor }}
                  ></i>
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
          <div className="modal">
            <div className="modal-content">
              <p>Delete todo?</p>
              <button 
                onClick={handleConfirmDelete}
                style={{
                  background: theme === "dark" 
                    ? '#ffbb33'  
                    : '#3366ff'
                }}
              >Да</button>
              <button 
                onClick={handleCancelDelete}
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
      </div>
  );
};

