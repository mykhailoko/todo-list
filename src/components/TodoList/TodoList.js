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

  useEffect(() => {
    localStorage.setItem("addedTodosCount", addedTodosCount);
    
    if (addedTodosCount === 5 || completedTodosCount === 5) {
      setShowReminder(true);
    }
  }, [addedTodosCount, completedTodosCount]);

  useEffect(() => {
    localStorage.setItem("completedTodosCount", completedTodosCount);
  }, [completedTodosCount]);

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
      currentList.todos[index].text = editTodoValue;
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

  return (
    <div>
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
                <button onClick={() => handleEditTodo(index)}>
                  <i className="fa-solid fa-pencil"></i>
                </button>
                <button onClick={() => confirmDeleteTodo(index)}>
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
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
