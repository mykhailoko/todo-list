import { useState, useEffect } from "react";
import { WeekDay } from "../WeekDay/WeekDay";
import './TodoListWeek.css';
import ChillCat from "../../assets/chillcat.png";
import { useTranslation  } from 'react-i18next';

export default function TodoListWeek({ checkStyle, setCheckStyle, theme }) {
  const [addedTodosCountWeek, setAddedTodosCountWeek] = useState(0); 
  const [completedTodosCountWeek, setCompletedTodosCountWeek] = useState(0);
  const [completedTodosSet, setCompletedTodosSet] = useState(new Set());
  const [showReminderWeek, setShowReminderWeek] = useState(false);
  const [t] = useTranslation("global");
  const weekDays = t("weekday.daytitle", { returnObjects: true });

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
      <h1 
        className="title-week-main"
        style={{
          color: theme === "dark" 
            ? "white"
            : "#202124"
        }}
      >Weekly To-Do List</h1>

      {showReminderWeek && (
        <div className="week-reminder-container">
          <div className="week-reminder-main">
            <p className="week-reminder">{t("chill.reminder")}</p>
            <img src={ChillCat} alt="cute-cat" />
            <button 
              onClick={handleResetReminder}
              style={{
                background: theme === "dark" 
                  ? '#ffbb33'  
                  : '#3366ff'
              }}
            >OK</button>
          </div>
        </div>
      )}

      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle={weekDays[0]}
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
        theme={theme}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle={weekDays[1]}
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
        theme={theme}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle={weekDays[2]}
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
        theme={theme}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle={weekDays[3]}
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
        theme={theme}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle={weekDays[4]}
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
        theme={theme}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle={weekDays[5]}
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
        theme={theme}
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle={weekDays[6]}
        addedTodosCountWeek={addedTodosCountWeek}
        setAddedTodosCountWeek={setAddedTodosCountWeek}
        completedTodosCountWeek={completedTodosCountWeek}
        setCompletedTodosCountWeek={setCompletedTodosCountWeek}
        completedTodosSet={completedTodosSet}
        setCompletedTodosSet={setCompletedTodosSet}
        theme={theme}
      />
    </div>
  );
}
