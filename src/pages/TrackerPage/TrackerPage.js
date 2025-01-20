import React, { useState, useEffect } from 'react';
import './TrackerPage.css';
import { useTranslation  } from 'react-i18next';

function TrackerPage() {
  const [t] = useTranslation("global");

  const [theme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  const months = [
    { name: t("months.name.0"), days: 31 },
    { name: t("months.name.1"), days: 28 },
    { name: t("months.name.2"), days: 31 },
    { name: t("months.name.3"), days: 30 },
    { name: t("months.name.4"), days: 31 },
    { name: t("months.name.5"), days: 30 },
    { name: t("months.name.6"), days: 31 },
    { name: t("months.name.7"), days: 31 },
    { name: t("months.name.8"), days: 30 },
    { name: t("months.name.9"), days: 31 },
    { name: t("months.name.10"), days: 30 },
    { name: t("months.name.11"), days: 31 }
  ]

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const storedSelectedMonth = localStorage.getItem('selectedMonth');
    return storedSelectedMonth ? JSON.parse(storedSelectedMonth) : months[0]}
  );

  const [monthTasks, setMonthTasks] = useState(() => {
    const storedMonthTasks = localStorage.getItem('monthTasks');
    if (storedMonthTasks) {
      return JSON.parse(storedMonthTasks);
    } 

    const initialTasks = {};
    months.forEach((month) => {
      initialTasks[month.name] = [{ name: "", checkboxes: Array(month.days).fill(false) }];
    });
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('selectedMonth', JSON.stringify(selectedMonth));
  }, [selectedMonth]);

  useEffect(() => {
    localStorage.setItem('monthTasks', JSON.stringify(monthTasks));
  }, [monthTasks]);

  const handleMonthSelect = (e) => {
    const selected = months.find((month) => month.name === e.target.value);
    setSelectedMonth(selected);
  }

  const handleTaskChange = (index, value) => {
    const updatedTasks = monthTasks[selectedMonth.name].map((task, taskIndex) =>
      taskIndex === index ? { ...task, name: value } : task
    );
    setMonthTasks({ ...monthTasks, [selectedMonth.name]: updatedTasks} );
  }

  const handleAddTask = () => {
    setMonthTasks({...monthTasks, 
      [selectedMonth.name]: [...monthTasks[selectedMonth.name], { name: "", checkboxes: Array(selectedMonth.days).fill(false)}]
    });
  }

  const handleRemoveTask = (index) => {
    const updatedMonthTasks = [...monthTasks[selectedMonth.name]];
    updatedMonthTasks.splice(index, 1);
    setMonthTasks({...monthTasks, [selectedMonth.name]: updatedMonthTasks});
  }

  const handleCheckboxChange = (taskIndex, dayIndex) => {
    const updatedTasks = monthTasks[selectedMonth.name].map((task, index) =>
      index === taskIndex ? { ...task, 
        checkboxes: task.checkboxes.map((checkbox, i) =>
          i === dayIndex ? !checkbox : checkbox
        ),
      } : task
    );
    setMonthTasks({ ...monthTasks, [selectedMonth.name]: updatedTasks} );
  }

  return (
    <div className='tracker'>
      <h1 
        className='title'
        style={{ color: theme === "dark" ? "white" : "#202124" }}
      >{t("tracker.title")}</h1>
      <div className='tracker-table-container'>
        <table 
          className='tracker-table'
          style={{
            boxShadow: theme === "dark" 
              ? "0px 0px 10px 0px rgba(0, 0, 0, 0)"  
              : "0px 0px 10px 0px rgba(0, 0, 0, 0.3)"
          }}
        >
          <thead>
            <tr>
              <th 
                id='months'
                style={{ border: theme === "dark" ? "1px solid #ddd" : "1px solid #222" }}
              >
                <select value={selectedMonth.name} onChange={handleMonthSelect}>
                  {months.map((month, index) => (
                    <option key={index} value={month.name}>{month.name}</option>
                  ))}
                </select>
              </th>
              {Array.from({ length: selectedMonth.days }).map((_, index) => (
                <th 
                  key={index}
                  style={{ border: theme === "dark" ? "1px solid #ddd" : "1px solid #222" }}
                >{index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthTasks[selectedMonth.name]?.map((task, taskIndex) => (
              <tr key={taskIndex}>
                <td 
                  id='task'
                  style={{
                    borderLeft: theme === "dark" ? "1px solid #ddd" : "1px solid #222",
                    borderBottom: theme === "dark" ? "1px solid #ddd" : "1px solid #222",
                  }}
                >
                  <input 
                    type='text'
                    placeholder={`Task ${taskIndex + 1}`}
                    value={task.name}
                    onChange={(e) => handleTaskChange(taskIndex, e.target.value)}
                  />
                  <button
                    className='remove-task-button'
                    onClick={() => handleRemoveTask(taskIndex)}
                    style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
                  >-</button>
                </td>
                {Array.from({ length: selectedMonth.days }).map((_, dayIndex) => (
                  <td 
                    key={dayIndex} 
                    id='checkbox'
                    style={{ border: theme === "dark" ? "1px solid #ddd" : "1px solid #222" }}
                  >
                    <input 
                      type='checkbox'
                      checked={task.checkboxes[dayIndex]}
                      onChange={() => {handleCheckboxChange(taskIndex, dayIndex)}}
                    />
                  </td>
                ))} 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button 
        onClick={handleAddTask} 
        className='add-task-button'
        style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
      >
        <i className='fa-solid fa-plus'></i>
      </button>
    </div>
  )
}

export default TrackerPage