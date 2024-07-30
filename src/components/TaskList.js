import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import '../App.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetch('/tasks.json')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleSave = (newTask) => {
    if (editTask) {
      setTasks(tasks.map(task => 
        task.id === editTask.id ? { ...task, ...newTask, timestamp: new Date().toISOString() } : task
      ));
      setEditTask(null);
    } else {
      const newTaskWithId = { ...newTask, id: Date.now(), completed: false, timestamp: new Date().toISOString() };
      setTasks([...tasks, newTaskWithId]);
    }
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TaskForm onSave={handleSave} task={editTask} />
      <ul className="task-list">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={(taskToEdit) => setEditTask(taskToEdit)}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
