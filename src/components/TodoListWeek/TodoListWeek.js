import { WeekDay } from "../WeekDay/WeekDay";
import './TodoListWeek.css'

export default function TodoListWeek({ checkStyle, setCheckStyle  }) {

  return (
    <div>
      <h1 className="title-week-main">Weekly To-Do List</h1>
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Понедельник"
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Вторник"
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Среда"
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Четверг"
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Пятница"
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Суббота"
      />
      <WeekDay 
        checkStyle={checkStyle} 
        setCheckStyle={setCheckStyle}
        dayTitle="Воскресенье"
      />
    </div>
  );
}
