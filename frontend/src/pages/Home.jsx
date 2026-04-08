import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskItem from '../components/TaskItem';
import { api } from '../api';
import { Plus, ListTodo, AlertCircle } from 'lucide-react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { token } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const data = await api.tasks.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const data = await api.tasks.create(newTaskTitle);
      
      setTasks([data, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const data = await api.tasks.update(id, { completed });
      
      setTasks(tasks.map(task => task._id === id ? data : task));
    } catch (err) {
      setError(err.message);
    }
  };

  const editTask = async (id, title) => {
    try {
      const data = await api.tasks.update(id, { title });
      
      setTasks(tasks.map(task => task._id === id ? data : task));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.tasks.delete(id);
      
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="text-gradient">Your Tasks</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your daily goals and objectives</p>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '16px', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Add Task Form */}
      <form onSubmit={addTask} style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ padding: '16px 20px', fontSize: '1.1rem', borderRadius: '12px' }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 24px', borderRadius: '12px' }}>
          <Plus size={24} />
        </button>
      </form>

      {/* Filters and Stats */}
      {tasks.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setFilter('all')} 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 16px', borderRadius: '30px', fontSize: '0.9rem' }}
            >
              All ({stats.total})
            </button>
            <button 
              onClick={() => setFilter('active')} 
              className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 16px', borderRadius: '30px', fontSize: '0.9rem' }}
            >
              Active ({stats.active})
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 16px', borderRadius: '30px', fontSize: '0.9rem' }}
            >
              Completed ({stats.completed})
            </button>
          </div>
          
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {stats.completed} of {stats.total} tasks completed
          </div>
        </div>
      )}

      {/* Task List */}
      <div style={{ minHeight: '300px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }} className="glass-panel">
            <ListTodo size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No tasks yet</h3>
            <p>Add a task above to get started!</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            No {filter} tasks found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filteredTasks.map(task => (
              <TaskItem 
                key={task._id} 
                task={task} 
                onToggle={toggleTask} 
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
