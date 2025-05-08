import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:3000/api/tasks', formData);
      setMessage(res.data.message || 'Task created successfully!');
      setFormData({ title: '', description: '' });
    } catch (err) {
      console.error(err);
      setMessage('Error creating task');
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <br />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <br />
        <button type="submit">Add Task</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default TaskForm;
