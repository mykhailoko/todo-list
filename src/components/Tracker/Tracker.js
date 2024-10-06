import React, { useState, useEffect } from 'react';
import './Tracker.css';

export const Tracker = () => {
  const months = [
    { name: 'Январь', days: 31 },
    { name: 'Февраль', days: 28 }, // Не учитывается високосный год
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

  // Загрузка выбранного месяца из localStorage
  const savedMonthIndex = localStorage.getItem('selectedMonthIndex');
  const initialMonthIndex = savedMonthIndex ? parseInt(savedMonthIndex, 10) : new Date().getMonth();

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(initialMonthIndex);

  // Структура задач по месяцам
  const [tasksByMonth, setTasksByMonth] = useState(() => {
    const savedTasks = localStorage.getItem('tasksByMonth');
    return savedTasks ? JSON.parse(savedTasks) : months.reduce((acc, _, index) => {
      acc[index] = []; // Пустой массив задач для каждого месяца
      return acc;
    }, {});
  });

  useEffect(() => {
    localStorage.setItem('tasksByMonth', JSON.stringify(tasksByMonth));
  }, [tasksByMonth]);

  // Сохранение выбранного месяца
  useEffect(() => {
    localStorage.setItem('selectedMonthIndex', selectedMonthIndex);
  }, [selectedMonthIndex]);

  const handleMonthChange = (monthIndex) => {
    setSelectedMonthIndex(monthIndex);
  };

  // Добавление новой задачи
  const addTask = () => {
    const updatedTasks = [...tasksByMonth[selectedMonthIndex], { name: '', checkboxes: Array(months[selectedMonthIndex].days).fill(false), id: Date.now() }];
    updateTasksForMonth(selectedMonthIndex, updatedTasks);
  };

  // Обновление задачи
  const handleTaskChange = (index, value) => {
    const updatedTasks = [...tasksByMonth[selectedMonthIndex]];
    updatedTasks[index].name = value;
    updateTasksForMonth(selectedMonthIndex, updatedTasks);
  };

  // Удаление задачи
  const removeTask = (id) => {
    const updatedTasks = tasksByMonth[selectedMonthIndex].filter((task) => task.id !== id);
    updateTasksForMonth(selectedMonthIndex, updatedTasks);
  };

  // Обновление состояния чекбоксов
  const handleCheckboxChange = (taskIndex, dayIndex) => {
    const updatedTasks = [...tasksByMonth[selectedMonthIndex]];
    updatedTasks[taskIndex].checkboxes[dayIndex] = !updatedTasks[taskIndex].checkboxes[dayIndex];
    updateTasksForMonth(selectedMonthIndex, updatedTasks);
  };

  // Функция для обновления задач в конкретном месяце
  const updateTasksForMonth = (monthIndex, updatedTasks) => {
    const updatedTasksByMonth = { ...tasksByMonth, [monthIndex]: updatedTasks };
    setTasksByMonth(updatedTasksByMonth);
  };

  // Количество дней в выбранном месяце
  const daysInMonth = months[selectedMonthIndex].days;

  return (
    <div className='tracker'>
      <h1 className="title-tracker">Habit Tracker</h1>
      <div className="tracker-table-container">
        <table className="tracker-table">
          <thead>
            <tr>
              <th id='habit-zero'>
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
                <th key={i + 1}>{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasksByMonth[selectedMonthIndex].map((task, taskIndex) => (
              <tr key={task.id}>
                <td id='habit'>
                  <input
                    type="text"
                    placeholder={`Task ${taskIndex + 1}`}
                    value={task.name}
                    onChange={(e) => handleTaskChange(taskIndex, e.target.value)}
                  />
                  <button onClick={() => removeTask(task.id)} className="remove-task-button">-</button>
                </td>
                {Array.from({ length: daysInMonth }, (_, dayIndex) => (
                  <td key={dayIndex} id='checkbox'>
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
      <button onClick={addTask} className="add-task-button">
        <i className="fa-solid fa-plus" style={{ color: 'white', fontSize: '20px' }}></i>
      </button>
    </div>
  );
};
