import { useState, useEffect } from "react";
import { Menu } from "./components/Menu";
import { Settings } from "./components/Settings";
import TodoList from "./components/TodoList";
import TodoListWeek from "./components/TodoListWeek";

function App() {
  const [todoLists, setTodoLists] = useState(() => {
    const storedLists = localStorage.getItem("todoLists");
    return storedLists
      ? JSON.parse(storedLists)
      : [{ name: "List 1", todos: [] }, { name: "List 2", todos: [] }];
  });

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const [currentView, setCurrentView] = useState(() => {
    const storedView = localStorage.getItem("currentView");
    return storedView || "List 1";
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
      <Menu
        isVisible={isMenuVisible}
        toggleMenu={toggleMenu}
        setCurrentView={setCurrentView}
        currentView={currentView}
        todoLists={todoLists}
        setTodoLists={setTodoLists}
      />
      <Settings
        isVisible={isSettingsVisible}
        toggleSettings={toggleSettings}
        setCheckStyle={setCheckStyle}
        checkStyle={checkStyle}
      />

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
        />
      )}
    </div>
  );
}

export default App;
