import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import useLocalStorage from './hooks/useLocalStorage';
import { STORAGE_KEYS } from './utils/constants';

function App() {
  const [todos, setTodos] = useLocalStorage(STORAGE_KEYS.TODOS, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'unfinished', 'finished'

  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now(),
      title: todoData.title,
      description: todoData.description,
      dueDate: todoData.dueDate,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
  };

  const updateTodo = (id, updatedData) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedData } : todo
    ));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const getFilteredTodos = () => {
    let filteredTodos;
    switch (filter) {
      case 'unfinished':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case 'finished':
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = todos;
    }
    
    // Sort by due date from earliest to latest (future)
    return filteredTodos.sort((a, b) => {
      // Handle tasks without due dates - put them at the end
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      
      // Sort by date (earliest first)
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <header className="text-center py-4">
          <h1 className="display-4 text-primary">
            <i className="bi bi-check2-square me-2"></i>
            My Todo The List
          </h1>
          <p className="lead text-muted">Manage your tasks efficiently</p>
        </header>
        
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <TodoList 
              todos={getFilteredTodos()} 
              allTodos={todos}
              filter={filter}
              onFilterChange={setFilter}
              onToggle={toggleTodo} 
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onOpenModal={openModal}
              onOpenEditModal={openEditModal}
            />
          </div>
        </div>

        {/* Add Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <AddTodo onAdd={addTodo} onClose={closeModal} />
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && editingTodo && (
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <EditTodo 
                todo={editingTodo} 
                onUpdate={updateTodo} 
                onClose={closeEditModal} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
