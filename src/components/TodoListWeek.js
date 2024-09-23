import { useState } from "react";

export default function TodoListWeek() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todosWeek");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [todoValue, setTodoValue] = useState("");

  const handleAddTodos = () => {
    if (todoValue.trim()) {
      const newTodos = [...todos, todoValue];
      setTodos(newTodos);
      localStorage.setItem("todosWeek", JSON.stringify(newTodos));
      setTodoValue("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem("todosWeek", JSON.stringify(newTodos));
  };

  return (
    <div>
      <h1 className="title">To-Do list for the Week</h1>
      <header>
        <input
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          placeholder="Enter todo"
        />
        <button onClick={handleAddTodos}>Add</button>
      </header>
      <ul className="main">
        {todos.map((todo, index) => (
          <li key={index} className="todoItem">
            <p>{todo}</p>
            <div className="actionsContainer">
              <button onClick={() => handleDeleteTodo(index)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
