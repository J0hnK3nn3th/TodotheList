import React, { useState } from 'react';
import './AddTodo.css';

const AddTodo = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    // Format as YYYY-MM-DD for date input
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const parseDateFromInput = (dateString) => {
    if (!dateString) return '';
    
    // Handle YYYY-MM-DD format from date input
    const date = new Date(dateString + 'T00:00:00');
    if (!isNaN(date.getTime())) {
      return date.toISOString().slice(0, 16);
    }
    
    return dateString; // Return original if no match
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd({
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: parseDateFromInput(formData.dueDate)
      });
      setFormData({
        title: '',
        description: '',
        dueDate: ''
      });
    }
  };

  return (
    <div className="add-todo-modal">
      <div className="add-todo-header">
        <h5 className="modal-title">
          <i className="bi bi-plus-circle"></i>
          Add Task
        </h5>
        <button 
          type="button" 
          className="btn-close" 
          onClick={onClose}
          aria-label="Close"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="add-todo-form card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              <i className="bi bi-card-text"></i>
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter task title..."
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              <i className="bi bi-file-text"></i>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Enter task description (optional)..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate" className="form-label">
              <i className="bi bi-calendar-event"></i>
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary me-2"
              onClick={onClose}
            >
              <i className="bi bi-x-circle me-1"></i>
              Cancel
            </button>
            <button type="submit" className="submit-button btn btn-primary">
              <i className="bi bi-plus-circle me-1"></i>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
