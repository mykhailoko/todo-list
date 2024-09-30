import { useState, useEffect } from "react";
import Checked from '../assets/checked.png';
import Unchecked from '../assets/unchecked.png';
import CheckedCat from '../assets/checkedcat.png';
import UncheckedCat from '../assets/uncheckedcat.png';

export const WeekDay = ({ checkStyle, setCheckStyle, dayTitle }) => {
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

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos, LOCAL_STORAGE_KEY]);

  const handleAddTodos = () => {
    if (todoValue.trim()) {
      const newTodos = [...todos, { text: todoValue, checked: false }];
      setTodos(newTodos);
      setTodoValue("");
      setShowInput(false);
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
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(newTodos);
  };

  const getCheckImages = (checked) => {
    if (checkStyle === 'cat') {
      return { checkedImg: CheckedCat, uncheckedImg: UncheckedCat };
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

  return (
    <div className="day">
      <header className="week-header">
        <h1 className="week-title">{dayTitle}</h1>
        <button 
          className="week-header-button" 
          onClick={() => setShowInput(!showInput)}
        >
          <i className={showInput ? "fa-solid fa-xmark" : "fa-solid fa-plus"} style={{ color: 'white', fontSize: '24px' }}></i>
        </button>
      </header>
      
      {showInput && (
        <div className="usual-header">
          <input
            className="input-header"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
            placeholder="Enter todo"
          />
          <button className="header-button" onClick={handleAddTodos}>Add</button>
        </div>
      )}
      
      <ul className="main">
        {todos.map((todo, index) => {
          const { checkedImg, uncheckedImg } = getCheckImages(todo.checked);
          
          return (
            <li key={index} className="todoItem">
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
            <button onClick={() => handleDeleteTodo(todoToDelete)}>Да</button>
            <button onClick={closeDeleteModal}>Нет</button>
          </div>
        </div>
      )}
    </div>
  );
}
