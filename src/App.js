import { useState, useEffect } from "react";
import { Menu } from "./components/Menu";
import { Settings } from "./components/Settings";
import TodoList from "./components/TodoList";
import TodoListWeek from "./components/TodoListWeek";
import { WeekDay } from "./components/WeekDay";

function App() {
  const [todoLists, setTodoLists] = useState(() => {
    const storedLists = localStorage.getItem("todoLists");
    return storedLists ? JSON.parse(storedLists) : [
      { name: "List 1", todos: [] },
      { name: "List 2", todos: [] },
    ];
  });

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  
  const [currentView, setCurrentView] = useState("");
  const [currentViewPage, setCurrentViewPage] = useState(() => {
    const storedView = localStorage.getItem("currentViewPage");
    return storedView || todoLists[0]?.name;
  });
  
  const [checkStyle, setCheckStyle] = useState(() => {
    const savedStyle = localStorage.getItem("checkStyle");
    return savedStyle ? savedStyle : "usual";
  });

  useEffect(() => {
    localStorage.setItem("checkStyle", checkStyle);
  }, [checkStyle]);

  useEffect(() => {
    const storedView = localStorage.getItem("currentViewPage");
    if (storedView) {
      setCurrentView(storedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    localStorage.setItem("currentView", currentView);
    localStorage.setItem("currentViewPage", currentViewPage);
  }, [todoLists, currentView, currentViewPage]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  return (
    <div className="container">
      <Menu
        isVisible={isMenuVisible}
        toggleMenu={toggleMenu}
        setCurrentView={setCurrentView}
        setCurrentViewPage={setCurrentViewPage}
        currentView={currentView}
        currentViewPage={currentViewPage}
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
          currentViewPage={currentViewPage} 
          checkStyle={checkStyle} 
          setCheckStyle={setCheckStyle}
        />
      )}
    </div>
  );
}

export default App;
