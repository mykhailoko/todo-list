import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import TodoListPage from './pages/TodoListPage/TodoListPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import TodoListWeekPage from './pages/TodoListWeekPage/TodoListWeekPage';
import TrackerPage from './pages/TrackerPage/TrackerPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });
  

  return (
    <Router>
      <div 
        className="App"
        style={{
          background: theme === "dark" 
            ? "linear-gradient(135deg, #153677, #4e085f)" 
            : "linear-gradient(135deg, #e0f7fa, #ffb3b3)"
        }}
      >
        <Routes>
          <Route path='/todo-list/' element={<TodoListPage />} />
          <Route path='/todo-list/week-list' element={<TodoListWeekPage />} />
          <Route path='/todo-list/tracker' element={<TrackerPage />} />
          <Route path='/todo-list/settings' element={<SettingsPage theme={theme} setTheme={setTheme} />} />
        </Routes>
        <Navbar theme={theme} />
      </div>
    </Router>
  );
}

export default App;
