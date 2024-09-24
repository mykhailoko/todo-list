import { useState } from "react";
import Checked from '../assets/checked.png';
import Unchecked from '../assets/unchecked.png';
import CheckedCat from '../assets/checkedcat.png';
import UncheckedCat from '../assets/uncheckedcat.png';

export default function TodoListFuture({ checkStyle, setCheckStyle }) {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todosFuture");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [todoValue, setTodoValue] = useState("");

  const handleAddTodos = () => {
    if (todoValue.trim()) {
      const newTodos = [...todos, { text: todoValue, checked: false }];
      setTodos(newTodos);
      localStorage.setItem("todosFuture", JSON.stringify(newTodos));
      setTodoValue("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todosFuture", JSON.stringify(newTodos));
  };

  const toggleCheck = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todosFuture", JSON.stringify(newTodos));
  };

  const getCheckImages = (checked) => {
    if (checkStyle === 'cat') {
      return { checkedImg: CheckedCat, uncheckedImg: UncheckedCat };
    }
    return { checkedImg: Checked, uncheckedImg: Unchecked };
  };

  return (
    <div>
      <h1 className="title">To-Do list for the Future</h1>
      <header>
        <input
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
              <p style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>
                {todo.text}
              </p>
              <div className="actionsContainer">
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
