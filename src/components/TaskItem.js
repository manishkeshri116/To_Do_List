import React, { useState } from 'react';
import '../App.css';

const TaskItem = ({ task, onUpdate, onDelete, onToggle }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`task-item ${expanded ? 'expanded' : 'collapsed'}`}>
      <div onClick={() => setExpanded(!expanded)}>
        <h3>{task.title}</h3>
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
        </button>
        <button className="delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
      {expanded && (
        <div>
          <p>{task.description}</p>
          <small>Last Updated: {new Date(task.timestamp).toLocaleString()}</small>
          <button onClick={() => onUpdate(task)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
