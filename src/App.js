import { useState, useEffect } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Menu } from "./components/Menu/Menu";
import { Settings } from "./components/Settings/Settings";
import TodoList from "./components/TodoList/TodoList";
import TodoListWeek from "./components/TodoListWeek/TodoListWeek";
import { Tracker } from "./components/Tracker/Tracker";
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

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

  const [deletedTodos, setDeletedTodos] = useState(() => {
    const storedDeleted = localStorage.getItem("deletedTodos");
    return storedDeleted ? JSON.parse(storedDeleted) : [];
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

  useEffect(() => {
    localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
  }, [deletedTodos]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div
      className="container"
      style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, #153677, #4e085f)" 
          : "linear-gradient(135deg, #e0f7fa, #ffb3b3)"
      }}
    >
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
        theme={theme}
      />
  
      {isMenuVisible && (
        <Menu
          isVisible={isMenuVisible}
          toggleMenu={toggleMenu}
          setCurrentView={setCurrentView}
          currentView={currentView}
          todoLists={todoLists}
          setTodoLists={setTodoLists}
          theme={theme}
        />
      )}

      {isSettingsVisible && (
        <Settings
          isVisible={isSettingsVisible}
          toggleSettings={toggleSettings}
          setCheckStyle={setCheckStyle}
          checkStyle={checkStyle}
          deletedTodos={deletedTodos}
          setDeletedTodos={setDeletedTodos}
          onThemeChange={handleThemeChange}
        />
      )}

      {currentView === "Week" ? (
        <TodoListWeek
          checkStyle={checkStyle}
          setCheckStyle={setCheckStyle}
          theme={theme}
        />
      ) : currentView === "Tracker" ? (
        <Tracker 
          theme={theme}
        />
      ) : (
        <TodoList
          currentView={currentView}
          todoLists={todoLists}
          checkStyle={checkStyle}
          setCheckStyle={setCheckStyle}
          setTodoLists={setTodoLists}
          theme={theme}
        />
      )}
    </div>
  );
}

export default App;
