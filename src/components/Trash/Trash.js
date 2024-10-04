import React from 'react';
import "./Trash.css"

export const Trash = ({ deletedTodos, onDeleteTodo  }) => {
  return (
    <div>
      <h1 className='title-trash'>Trash</h1>
      <ul className="main-trash">
        {deletedTodos.length === 0 ? (
          <p>No deleted tasks</p>
        ) : (
          deletedTodos.map((todo, index) => (
            <li key={index} className="todoItem-trash">
                <p>{todo.text}</p>
                <button onClick={() => onDeleteTodo(index)}>
                  <i className="fa-regular fa-trash-can" style={{ color: 'white'}}></i>
                </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
