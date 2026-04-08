import React, { useState } from 'react';
import { Trash2, Edit2, Check, X, Circle, CheckCircle2 } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleUpdate = () => {
    if (editTitle.trim()) {
      onEdit(task._id, editTitle);
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div 
      className="glass-panel" 
      style={{ 
        padding: '16px 20px', 
        marginBottom: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        opacity: task.completed ? 0.7 : 1,
        borderLeft: task.completed ? '4px solid var(--success)' : '4px solid var(--primary-color)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        <button 
          onClick={() => onToggle(task._id, !task.completed)}
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            display: 'flex',
            color: task.completed ? 'var(--success)' : 'var(--text-secondary)',
            transition: 'color 0.2s ease'
          }}
        >
          {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>

        {isEditing ? (
          <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'center' }}>
            <input 
              type="text" 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
              style={{ padding: '8px 12px', flex: 1 }}
              autoFocus
            />
            <button onClick={handleUpdate} className="btn btn-secondary" style={{ padding: '8px', color: 'var(--success)' }}>
              <Check size={18} />
            </button>
            <button onClick={cancelEdit} className="btn btn-secondary" style={{ padding: '8px', color: 'var(--danger)' }}>
              <X size={18} />
            </button>
          </div>
        ) : (
          <span style={{ 
            fontSize: '1.1rem', 
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
            flex: 1,
            wordBreak: 'break-word'
          }}>
            {task.title}
          </span>
        )}
      </div>

      {!isEditing && (
        <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
          <button 
            onClick={() => setIsEditing(true)} 
            className="btn btn-secondary"
            style={{ padding: '8px', color: '#a855f7' }}
            title="Edit Task"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(task._id)} 
            className="btn btn-danger-outline"
            style={{ padding: '8px' }}
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
