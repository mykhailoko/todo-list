import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import TodoListPage from './pages/TodoListPage/TodoListPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import TodoListWeekPage from './pages/TodoListWeekPage/TodoListWeekPage';
import TrackerPage from './pages/TrackerPage/TrackerPage';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  const [currentPage, setCurrentPage] = useState("list");
  
  const renderPage = () => {
    switch (currentPage) {
      case "list":
        return <TodoListPage />;
      case "week-list":
        return <TodoListWeekPage />;
      case "tracker":
        return <TrackerPage />;
      case "settings":
        return <SettingsPage theme={theme} setTheme={setTheme} />;
      default:
        return <TodoListPage />;
    }
  };

  return (
    <div 
      className="App"
      style={{
        background: theme === "dark" 
          ? "linear-gradient(135deg, #153677, #4e085f)" 
          : "linear-gradient(135deg, #e0f7fa, #ffb3b3)"
      }}
    >
      {renderPage()}
      <Navbar theme={theme} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
}

export default App;
