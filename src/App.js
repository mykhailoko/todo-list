import { useState, useEffect } from "react";
import { Menu } from "./components/Menu";
import { Settings } from "./components/Settings";
import TodoListToday from "./components/TodoListToday";
import TodoListWeek from "./components/TodoListWeek";
import TodoListFuture from "./components/TodoListFuture";

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentView, setCurrentView] = useState("today");
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [checkStyle, setCheckStyle] = useState(() => {
    const savedStyle = localStorage.getItem("checkStyle");
    return savedStyle ? savedStyle : "usual";
  });

  useEffect(() => {
    localStorage.setItem("checkStyle", checkStyle);
  }, [checkStyle]);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const toggleSettings = () => {
    setIsSettingsVisible((prev) => !prev);
  };

  const renderTodoList = () => {
    switch (currentView) {
      case "week":
        return <TodoListWeek checkStyle={checkStyle} setCheckStyle={setCheckStyle} />;
      case "future":
        return <TodoListFuture checkStyle={checkStyle} setCheckStyle={setCheckStyle} />;
      default:
        return <TodoListToday checkStyle={checkStyle} setCheckStyle={setCheckStyle} />;
    }
  };

  return (
    <div className="container">
      {renderTodoList()}
      <Menu
        isVisible={isMenuVisible}
        toggleMenu={toggleMenu}
        setCurrentView={setCurrentView}
        currentView={currentView}
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
