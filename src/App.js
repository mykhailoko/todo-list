import { useState } from "react";
import { Menu } from "./components/Menu";
import TodoListToday from "./components/TodoListToday";
import TodoListWeek from "./components/TodoListWeek";
import TodoListFuture from "./components/TodoListFuture";

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [currentView, setCurrentView] = useState("today");

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const renderTodoList = () => {
    switch (currentView) {
      case "week":
        return <TodoListWeek />;
      case "future":
        return <TodoListFuture />;
      default:
        return <TodoListToday />;
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
    </div>
  );
}

export default App;
