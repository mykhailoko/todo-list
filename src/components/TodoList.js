import { useState } from "react";
import Checked from "../assets/checked.png";
import Unchecked from "../assets/unchecked.png";
import CheckedCat from "../assets/checkedcat.png";
import UncheckedCat from "../assets/uncheckedcat.png";

export default function TodoList({
  currentView,
  todoLists,
  handleAddTodo,
  handleDeleteTodo,
  checkStyle,
}) {
  const currentList = todoLists.find((list) => list.name === currentView);
  const [todoValue, setTodoValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState("");
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAdd = () => {
    if (todoValue.trim()) {
      handleAddTodo(currentView, { text: todoValue, checked: false });
      setTodoValue("");
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
    handleAddTodo(currentView, newTodos);
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
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setTodoToDelete(null);
  };

  return (
    <div>
      <h1 className="title">To-Do list {currentView}</h1>
      <header className="usual-header">
        <input
          className="input-header"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          placeholder="Enter todo"
        />
        <button className="header-button" onClick={handleAdd}>
          Add
        </button>
      </header>

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
