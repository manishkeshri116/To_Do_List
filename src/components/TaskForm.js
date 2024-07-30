import React, { useState } from 'react';

const TaskForm = ({ onSave, task }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
