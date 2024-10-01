import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Menu } from "./components/Menu/Menu";
import { Settings } from "./components/Settings/Settings";
import TodoList from "./components/TodoList/TodoList";
import TodoListWeek from "./components/TodoListWeek/TodoListWeek";
import './App.css';

function App() {
  const [todoLists, setTodoLists] = useState(() => {
    const storedLists = localStorage.getItem("todoLists");
    return storedLists
      ? JSON.parse(storedLists)
      : [{ name: "To-Do List 1", todos: [] }, { name: "To-Do List 2", todos: [] }];
  });

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const [currentView, setCurrentView] = useState(() => {
    const storedView = localStorage.getItem("currentView");
    return storedView || "To-Do List 1";
  });

  const [checkStyle, setCheckStyle] = useState(() => {
    const savedStyle = localStorage.getItem("checkStyle");
    return savedStyle ? savedStyle : "usual";
  });

  useEffect(() => {
    localStorage.setItem("checkStyle", checkStyle);
  }, [checkStyle]);

  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  }, [todoLists]);

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const handleAddTodo = (listName, newTodo) => {
    const updatedLists = todoLists.map((list) => {
      if (list.name === listName) {
        return { ...list, todos: [...list.todos, newTodo] };
      }
      return list;
    });
    setTodoLists(updatedLists);
  };

  const handleDeleteTodo = (listName, todoIndex) => {
    const updatedLists = todoLists.map((list) => {
      if (list.name === listName) {
        const updatedTodos = list.todos.filter((_, index) => index !== todoIndex);
        return { ...list, todos: updatedTodos };
      }
      return list;
    });
    setTodoLists(updatedLists);
  };

  return (
    <div className="container">
      <NavBar 
        isMenuVisible={isMenuVisible}
        toggleMenu={toggleMenu}
        isSettingsVisible={isSettingsVisible}
        toggleSettings={toggleSettings}
        setCurrentView={setCurrentView}
        currentView={currentView}
        todoLists={todoLists}
        setTodoLists={setTodoLists}
        checkStyle={checkStyle}
        setCheckStyle={setCheckStyle}
      />
  
      {isMenuVisible && (
        <Menu
          isVisible={isMenuVisible}
          toggleMenu={toggleMenu}
          setCurrentView={setCurrentView}
          currentView={currentView}
          todoLists={todoLists}
          setTodoLists={setTodoLists}
        />
      )}

      {isSettingsVisible && (
        <Settings
          isVisible={isSettingsVisible}
          toggleSettings={toggleSettings}
          setCheckStyle={setCheckStyle}
          checkStyle={checkStyle}
        />
      )}

      {currentView === "Week" ? (
        <TodoListWeek
          checkStyle={checkStyle}
          setCheckStyle={setCheckStyle}
        />
      ) : (
        <TodoList
          currentView={currentView}
          todoLists={todoLists}
          handleAddTodo={handleAddTodo}
          handleDeleteTodo={handleDeleteTodo}
          checkStyle={checkStyle}
          setCheckStyle={setCheckStyle}
          setTodoLists={setTodoLists}
        />
      )}
    </div>
  );
}

export default App;
