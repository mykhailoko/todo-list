import React, { useState } from 'react';
import './TodoListWeekPage.css';
import Weekday from '../../components/Weekday/Weekday';
import { useTranslation  } from 'react-i18next';

function TodoListWeekPage() {
  const [t] = useTranslation("global");
  const weekDays = t("weekday.daytitle", { returnObjects: true });

  const [theme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  return (
    <div className='week-list'>
        <h1 
          className='title'
          style={{ color: theme === "dark" ? "white" : "#202124" }}
        >{t("weekly.title")}</h1>
        <Weekday dayTitle={weekDays[0]} dayIndex={0}/>
        <Weekday dayTitle={weekDays[1]} dayIndex={1}/>
        <Weekday dayTitle={weekDays[2]} dayIndex={2}/>
        <Weekday dayTitle={weekDays[3]} dayIndex={3}/>
        <Weekday dayTitle={weekDays[4]} dayIndex={4}/>
        <Weekday dayTitle={weekDays[5]} dayIndex={5}/>
        <Weekday dayTitle={weekDays[6]} dayIndex={6}/>
    </div>
  )
}

export default TodoListWeekPage