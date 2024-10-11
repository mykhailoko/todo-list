import React, { useState, useEffect } from 'react';
import './Tracker.css';

export const Tracker = ({ theme }) => {
  const months = [
    { name: 'Январь', days: 31 },
    { name: 'Февраль', days: 28 },
    { name: 'Март', days: 31 },
    { name: 'Апрель', days: 30 },
    { name: 'Май', days: 31 },
    { name: 'Июнь', days: 30 },
    { name: 'Июль', days: 31 },
    { name: 'Август', days: 31 },
    { name: 'Сентябрь', days: 30 },
    { name: 'Октябрь', days: 31 },
    { name: 'Ноябрь', days: 30 },
    { name: 'Декабрь', days: 31 }
  ];

  const savedMonthIndex = localStorage.getItem('selectedMonthIndex');
  const initialMonthIndex = savedMonthIndex ? parseInt(savedMonthIndex, 10) : new Date().getMonth();

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(initialMonthIndex);

  const [tasksByMonth, setTasksByMonth] = useState(() => {
    const savedTasks = localStorage.getItem('tasksByMonth');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return months.reduce((acc, _, index) => {
        acc[index] = [
          { name: '', checkboxes: Array(months[index].days).fill(false), id: Date.now() + index }
        ];
        return acc;
      }, {});
    }
  });

  useEffect(() => {
    localStorage.setItem('tasksByMonth', JSON.stringify(tasksByMonth));
  }, [tasksByMonth]);

  useEffect(() => {
    localStorage.setItem('selectedMonthIndex', selectedMonthIndex);
  }, [selectedMonthIndex]);

  const handleMonthChange = (monthIndex) => {
    setSelectedMonthIndex(monthIndex);
  };

  const addTask = () => {
    const updatedTasks = [...tasksByMonth[selectedMonthIndex], { name: '', checkboxes: Array(months[selectedMonthIndex].days).fill(false), id: Date.now() }];
    updateTasksForMonth(selectedMonthIndex, updatedTasks);
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...tasksByMonth[selectedMonthIndex]];
    updatedTasks[index].name = value;
    updateTasksForMonth(selectedMonthIndex, updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasksByMonth[selectedMonthIndex].filter((task) => task.id !== id);
    updateTasksForMonth(selectedMonthIndex, updatedTasks);
  };

  const handleCheckboxChange = (taskIndex, dayIndex) => {
    const updatedTasks = [...tasksByMonth[selectedMonthIndex]];
    updatedTasks[taskIndex].checkboxes[dayIndex] = !updatedTasks[taskIndex].checkboxes[dayIndex];
    updateTasksForMonth(selectedMonthIndex, updatedTasks);
  };

  const updateTasksForMonth = (monthIndex, updatedTasks) => {
    const updatedTasksByMonth = { ...tasksByMonth, [monthIndex]: updatedTasks };
    setTasksByMonth(updatedTasksByMonth);
  };

  useEffect(() => {
    if (tasksByMonth[selectedMonthIndex].length === 0) {
      addTask();
    }
  }, [selectedMonthIndex]);

  const daysInMonth = months[selectedMonthIndex].days;

  return (
    <div className='tracker'>
      <h1 
        className="title-tracker"
        style={{
          color: theme === "dark" 
            ? "white"
            : "#202124"
        }}
      >Habit Tracker</h1>
      <div className="tracker-table-container">
        <table 
          className="tracker-table"
          style={{
            boxShadow: theme === "dark" 
              ? "0px 0px 10px 0px rgba(0, 0, 0, 0)"  
              : "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th 
                id='habit-zero'
                style={{
                  border: theme === "dark" 
                    ? "1px solid #ddd"
                    : "1px solid #222"
                }}
              >
                <select value={months[selectedMonthIndex].name} onChange={(e) => {
                  const monthIndex = months.findIndex(month => month.name === e.target.value);
                  handleMonthChange(monthIndex);
                }}>
                  {months.map((month, index) => (
                    <option key={index} value={month.name}>{month.name}</option>
                  ))}
                </select>
              </th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i + 1} style={{
                  border: theme === "dark" 
                    ? "1px solid #ddd"
                    : "1px solid #222"
                }}>
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasksByMonth[selectedMonthIndex].map((task, taskIndex) => (
              <tr key={task.id}>
                <td 
                  id='habit'
                  style={{
                    borderLeft: theme === "dark" 
                      ? "1px solid #ddd"
                      : "1px solid #222",
                    borderBottom: theme === "dark" 
                      ? "1px solid #ddd"
                      : "1px solid #222",
                  }}
                >
                  <input
                    type="text"
                    placeholder={`Task ${taskIndex + 1}`}
                    value={task.name}
                    onChange={(e) => handleTaskChange(taskIndex, e.target.value)}
                  />
                  <button 
                    onClick={() => removeTask(task.id)} 
                    className="remove-task-button"
                    style={{
                      background: theme === "dark" 
                        ? '#ffbb33'  
                        : '#3366ff'
                    }}
                  >-</button>
                </td>
                {Array.from({ length: daysInMonth }, (_, dayIndex) => (
                  <td key={dayIndex} id='checkbox' style={{
                    border: theme === "dark" 
                      ? "1px solid #ddd"
                      : "1px solid #222"
                  }}>
                    <input 
                      type="checkbox" 
                      checked={task.checkboxes[dayIndex]} 
                      onChange={() => handleCheckboxChange(taskIndex, dayIndex)} 
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button 
        onClick={addTask} 
        className="add-task-button"
        style={{
          background: theme === "dark" 
            ? '#ffbb33'  
            : '#3366ff'
        }}
      >
        <i 
          className="fa-solid fa-plus" 
          style={{ color: 'white', fontSize: '20px' }}
        ></i>
      </button>
    </div>
  );
};
