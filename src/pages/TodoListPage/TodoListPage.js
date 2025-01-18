import React, { useState, useEffect } from 'react';
import './TodoListPage.css';
import TodoList from '../../components/TodoList/TodoList';
import { useTranslation  } from 'react-i18next';

function TodoListPage() {
  const [t] = useTranslation("global");
  const [showMenu, setShowMenu] = useState(false);
  const [listValue, setListValue] = useState("");
  const [editList, setEditList] = useState({ index: null, value: ""});

  const [theme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });
  
  const [selectedList, setSelectedList] = useState(() => {
    const storedSelectedList = localStorage.getItem('selectedList');
    return storedSelectedList ? JSON.parse(storedSelectedList) : "Todo List 1";
  });

  const [listList, setListList] = useState(() => {
    const storedListList = localStorage.getItem('listList');
    return storedListList ? JSON.parse(storedListList) : [{listName: "Todo List 1", todos: []}];
  });

  useEffect(() => {
    localStorage.setItem('listList', JSON.stringify(listList));
  }, [listList]);

  useEffect(() => {
    localStorage.setItem('selectedList', JSON.stringify(selectedList));
  }, [selectedList]);

  const handleAddList = () => {
    if (listValue.trim()) {
      const newList = { listName: listValue, todos: [] };
      setListList([...listList, newList]);
      setSelectedList(newList.listName);
      setListValue("");
    }
  };

  const handleDeleteList = (index) => {
    if (listList.length > 1) {
      const updatedListList = [...listList];
      const deletedListName = updatedListList[index].listName;
      updatedListList.splice(index, 1);

      setListList(updatedListList);

      if (selectedList === deletedListName) {
        setSelectedList(updatedListList[0].listName);
      }
    }
  };

  const handleEditList = () => {
    const updatedListList = listList.map((list, i) => 
      i === editList.index ? { ...list, listName: editList.value } : list
    );
    setListList(updatedListList);
    setSelectedList(editList.value);
    setEditList({ index: null, value: "" })
  };

  const handleEditInputChangeList = (e) => {
    setEditList({ ...editList, value: e.target.value })
  };

  const handleSelectList = (listName) => {
    setSelectedList(listName);
    setShowMenu(false);
  }

  const handleUpdateTodos = (updatedTodos) => {
    const updatedListList = listList.map((list) =>
        list.listName === selectedList ? { ...list, todos: updatedTodos } : list
      )
    setListList(updatedListList);
  };

  const isAllTasksCompleted = (todos) => {
    return todos.length > 0 && todos.every((todo) => todo.checked);
  };
  
  return (
    <div className='todo-list-container'>
      {showMenu && (
        <div className='menu'>
          <ul>
            {listList.map((list, index) => {
              const allTasksCompleted = isAllTasksCompleted(list.todos);
              return (
                <li key={index} className='menu-item'>
                  {editList.index === index ? (
                    <input 
                      className='edit-input'
                      value={editList.value}
                      onChange={handleEditInputChangeList}
                      onBlur={handleEditList}
                      autoFocus
                    />
                  ) : (
                  <p 
                    onClick={() => handleSelectList(list.listName)}
                    style={{ textDecoration: allTasksCompleted ? "line-through" : "none" }}
                  >{list.listName}</p>
                )}
                  <div className='actions-container'>
                    <button onClick={() => setEditList({ index, value: list.listName })}>
                      <i className='fa-solid fa-pencil'></i>
                    </button>
                    <button onClick={() => handleDeleteList(index)}>
                      <i className='fa-regular fa-trash-can'></i>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className='input-container'> 
            <input 
              value={listValue}
              onChange={(e) => setListValue(e.target.value)}
              placeholder={t("input.placeholder")}
            />
            <button 
              onClick={handleAddList}
              style={{ background: theme === "dark" ? '#ffbb33' : '#3366ff' }}
            >{t("input.button")}</button>
          </div>
        </div>
      )}

      <button 
        className='menu-button'
        onClick={() => setShowMenu(!showMenu)}
        style={{ color: theme === "dark" ? '#ffbb33' : '#3366ff' }}
      >
        <i className={showMenu ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
      </button>

      <TodoList 
        selectedList={selectedList}
        todos={listList.find((list) => list.listName === selectedList)?.todos || []}
        onUpdateTodos={handleUpdateTodos}
      />
    </div>
  )
}

export default TodoListPage