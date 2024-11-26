import React, { useState, useEffect } from 'react';

    const App = () => {
      const [todos, setTodos] = useState([]);
      const [input, setInput] = useState('');
      const [deadline, setDeadline] = useState('');
      const [darkMode, setDarkMode] = useState(false);
      const [time, setTime] = useState(new Date());
      const [showPopup, setShowPopup] = useState(false);

      useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
          setTodos(savedTodos);
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      useEffect(() => {
        if (darkMode) {
          document.body.classList.add('dark-mode');
          document.getElementById('root').classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
          document.getElementById('root').classList.remove('dark-mode');
        }
      }, [darkMode]);

      useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
          clearInterval(timerID);
        };
      });

      const tick = () => {
        setTime(new Date());
      };

      const addTodo = () => {
        if (input.trim()) {
          setTodos([...todos, { text: input, deadline: deadline || '', completed: false }]);
          setInput('');
          setDeadline('');
          setShowPopup(false);
        }
      };

      const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      };

      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };

      const handleAddButtonClick = () => {
        setShowPopup(true);
      };

      const handleCancel = () => {
        setInput('');
        setDeadline('');
        setShowPopup(false);
      };

      return (
        <div>
          <div className="navbar">
            <h1>To-Do List</h1>
            <button onClick={toggleDarkMode}>
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
          </div>
          <div className={`clock ${darkMode ? 'dark-mode' : ''}`}>
            {time.toLocaleTimeString()}
          </div>
          <div className={`todo-list ${darkMode ? 'dark-mode' : ''}`}>
            {todos.map((todo, index) => (
              <div key={index} className={`todo-item ${darkMode ? 'dark-mode' : ''}`}>
                <div>
                  <strong>{todo.text}</strong>
                  {todo.deadline && (
                    <span> - Deadline: {new Date(todo.deadline).toLocaleString()}</span>
                  )}
                </div>
                <button onClick={() => deleteTodo(index)}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          {showPopup && (
            <div className={`popup ${darkMode ? 'dark-mode' : ''}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task"
              />
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <button onClick={addTodo}>Add Todo</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          )}
          <button className="add-button" onClick={handleAddButtonClick}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      );
    };

    export default App;
