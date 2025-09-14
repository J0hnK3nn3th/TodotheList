import React, { useState, useEffect } from 'react';
import './EditTodo.css';

const EditTodo = ({ todo, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        dueDate: formatDateForInput(todo.dueDate)
      });
    }
  }, [todo]);

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
      onUpdate(todo.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: parseDateFromInput(formData.dueDate)
      });
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      title: todo.title,
      description: todo.description,
      dueDate: formatDateForInput(todo.dueDate)
    });
    onClose();
  };

  return (
    <div className="edit-todo-modal">
      <div className="edit-todo-header">
        <h5 className="modal-title">
          <i className="bi bi-pencil-square"></i>
          Edit Task
        </h5>
        <button 
          type="button" 
          className="btn-close" 
          onClick={handleCancel}
          aria-label="Close"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="edit-todo-form card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title" className="form-label">
              <i className="bi bi-card-text"></i>
              Task Title *
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter task title..."
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-description" className="form-label">
              <i className="bi bi-file-text"></i>
              Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="Enter task description (optional)..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-dueDate" className="form-label">
              <i className="bi bi-calendar-event"></i>
              Due Date
            </label>
            <input
              type="date"
              id="edit-dueDate"
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
              onClick={handleCancel}
            >
              <i className="bi bi-x-circle me-1"></i>
              Cancel
            </button>
            <button type="submit" className="submit-button btn btn-primary">
              <i className="bi bi-check-circle me-1"></i>
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
