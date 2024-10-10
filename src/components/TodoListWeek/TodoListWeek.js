import { useState, useEffect } from "react";
import { WeekDay } from "../WeekDay/WeekDay";
import './TodoListWeek.css';
import ChillCat from "../../assets/chillcat.png";

export default function TodoListWeek({ checkStyle, setCheckStyle }) {
  const [addedTodosCountWeek, setAddedTodosCountWeek] = useState(0); 
  const [completedTodosCountWeek, setCompletedTodosCountWeek] = useState(0);
  const [completedTodosSet, setCompletedTodosSet] = useState(new Set());
  const [showReminderWeek, setShowReminderWeek] = useState(false);

  useEffect(() => {
    if (addedTodosCountWeek === 5 || completedTodosSet.size === 5) {
      setShowReminderWeek(true);
    }
  }, [addedTodosCountWeek, completedTodosSet]);

  const handleResetReminder = () => {
    setShowReminderWeek(false);
    setAddedTodosCountWeek(0);
    setCompletedTodosSet(new Set());
  };

  return (
    <div>
      <h1 className="title-week-main">Weekly To-Do List</h1>

      {showReminderWeek && (
        <div className="week-reminder-container">
          <div className="week-reminder-main">
            <p className="week-reminder">Не забудьте отдохнуть!</p>
            <img src={ChillCat} alt="cute-cat" />
            <button onClick={handleResetReminder}>OK</button>
          </div>
        </div>
      )}

      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Понедельник"
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Вторник"
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Среда"
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Четверг"
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Пятница"
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Суббота"
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Воскресенье"
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
      />
    </div>
  );
}
