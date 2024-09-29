import { useState, useEffect } from "react";
import Checked from '../assets/checked.png';
import Unchecked from '../assets/unchecked.png';
import CheckedCat from '../assets/checkedcat.png';
import UncheckedCat from '../assets/uncheckedcat.png';
import { Settings } from './Settings';

export default function TodoList({ currentView, checkStyle, setCheckStyle }) {
  const LOCAL_STORAGE_KEY = `todos_${currentView}`;
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    setTodos(storedTodos ? JSON.parse(storedTodos) : []);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos, LOCAL_STORAGE_KEY]);
  

  const handleAddTodos = () => {
    if (todoValue.trim()) {
      const newTodos = [...todos, { text: todoValue, checked: false }];
      setTodos(newTodos);
      setTodoValue("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
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

  return (
    <div>
      <h1 className="title">To-Do list {currentView}</h1>

      <Settings 
        isVisible={settingsVisible} 
        toggleSettings={() => setSettingsVisible(!settingsVisible)} 
        setCheckStyle={setCheckStyle}
      />
      
      <header>
        <input
          className="input-header"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          placeholder="Enter todo"
        />
        <button onClick={handleAddTodos}>Add</button>
      </header>
      
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveTodo(index);
                    }
                  }}
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
                <button onClick={() => handleDeleteTodo(index)}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
