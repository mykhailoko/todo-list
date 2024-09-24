import { useState, useEffect } from "react";
import { Menu } from "./components/Menu";
import { Settings } from "./components/Settings";
import TodoList from "./components/TodoList";

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentView, setCurrentView] = useState("today");
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [checkStyle, setCheckStyle] = useState(() => {
    const savedStyle = localStorage.getItem("checkStyle");
    return savedStyle ? savedStyle : "usual";
  });

  const [todoLists, setTodoLists] = useState(() => {
    const storedLists = localStorage.getItem("todoLists");
    return storedLists ? JSON.parse(storedLists) : [];
  });

  useEffect(() => {
    localStorage.setItem("checkStyle", checkStyle);
  }, [checkStyle]);

  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  }, [todoLists]);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const toggleSettings = () => {
    setIsSettingsVisible((prev) => !prev);
  };

  const renderTodoList = () => {
    const currentTodoList = todoLists.find(list => list.name === currentView);
    return (
      <TodoList 
        currentView={currentView} 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle} 
        todos={currentTodoList ? currentTodoList.todos : []}
        setTodos={(newTodos) => {
          if (currentTodoList) {
            const updatedLists = todoLists.map(list => 
              list.name === currentView ? { ...list, todos: newTodos } : list
            );
            setTodoLists(updatedLists);
          }
        }}
      />
    );
  };

  return (
    <div className="container">
      {renderTodoList()}
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
    </div>
  );
}

export default App;
