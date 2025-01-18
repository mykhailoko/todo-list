import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import TodoListPage from './pages/TodoListPage/TodoListPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import TodoListWeekPage from './pages/TodoListWeekPage/TodoListWeekPage';
import TrackerPage from './pages/TrackerPage/TrackerPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [theme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || "/todo-list"}>
      <div 
        className="App"
        style={{
          background: theme === "dark" 
            ? "linear-gradient(135deg, #153677, #4e085f)" 
            : "linear-gradient(135deg, #e0f7fa, #ffb3b3)"
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path='/list' element={<TodoListPage />} />
          <Route path='/week-list' element={<TodoListWeekPage />} />
          <Route path='/tracker' element={<TrackerPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Routes>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
