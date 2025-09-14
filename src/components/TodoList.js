import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, allTodos, filter, onFilterChange, onToggle, onDelete, onUpdate, onOpenModal, onOpenEditModal }) => {
  const completedCount = allTodos.filter(todo => todo.completed).length;
  const totalCount = allTodos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="todo-list">
      <div className="row g-4">
        {/* Left Side - Stats Cards */}
        <div className="col-xl-3 col-lg-4 col-md-12">
          <div className="stats-container">
            <div className="row text-center g-3">
              <div className="col-12 mb-3">
                <div className="stats-card card h-100">
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="text-dark mb-2">{totalCount}</h5>
                    <small>Total Tasks</small>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="stats-card card h-100">
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="text-dark mb-2">{pendingCount}</h5>
                    <small>Pending</small>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="stats-card card h-100">
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="text-dark mb-2">{completedCount}</h5>
                    <small>Completed</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Tasks */}
        <div className="col-xl-9 col-lg-8 col-md-12">
          <div className="unified-task-card card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-list-task me-2"></i>
                  Your Tasks
                </h5>
                <div className="d-flex align-items-center gap-3">
                  <div className="filter-container">
                    <select 
                      className="form-select filter-select" 
                      value={filter} 
                      onChange={(e) => onFilterChange(e.target.value)}
                    >
                      <option value="all">All Tasks</option>
                      <option value="unfinished">Unfinished Tasks</option>
                      <option value="finished">Finished Tasks</option>
                    </select>
                  </div>
                  <button 
                    className="btn btn-primary add-task-btn"
                    onClick={onOpenModal}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Task
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card-body p-0">
              <div className="task-items-container">
                {todos.length === 0 ? (
                  <div className="empty-state">
                    <i className="bi bi-clipboard-x"></i>
                    <h4>
                      {filter === 'all' && allTodos.length === 0 ? 'No tasks yet' :
                       filter === 'unfinished' ? 'No unfinished tasks' :
                       filter === 'finished' ? 'No finished tasks' : 'No tasks found'}
                    </h4>
                    <p>
                      {filter === 'all' && allTodos.length === 0 ? 'Add your first task to get started!' :
                       filter === 'unfinished' ? 'All tasks are completed!' :
                       filter === 'finished' ? 'Complete some tasks to see them here!' : 'Try a different filter.'}
                    </p>
                  </div>
                ) : (
                  todos.map(todo => (
                    <div key={todo.id} className="task-item-wrapper">
                      <TodoItem
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onOpenEditModal={onOpenEditModal}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
