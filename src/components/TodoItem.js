import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, onOpenEditModal }) => {

  const handleEdit = () => {
    onOpenEditModal(todo);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const isOverdue = () => {
    if (!todo.dueDate) return false;
    return new Date(todo.dueDate) < new Date() && !todo.completed;
  };

  return (
    <div className={`todo-item-card card ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="card-body">
        <div className="d-flex align-items-start">
          <div className="form-check me-3 mt-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="form-check-input"
              id={`todo-${todo.id}`}
            />
            <label className="form-check-label" htmlFor={`todo-${todo.id}`}></label>
          </div>
          
          <div className="todo-content">
            <div className="todo-title-row">
              <h6 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                {todo.title}
              </h6>
              
              <div className="todo-title-meta">
                <div className={`todo-date ${isOverdue() ? 'overdue' : ''}`}>
                  <i className="bi bi-calendar-event"></i>
                  <span>
                    {formatDate(todo.dueDate)}
                  </span>
                </div>
                
                <div className="todo-actions">
                  <button
                    onClick={handleEdit}
                    className="btn btn-outline-primary"
                    title="Edit task"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="btn btn-outline-danger"
                    title="Delete task"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            
            {todo.description && (
              <p className={`todo-description ${todo.completed ? 'completed' : ''}`}>
                {todo.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
