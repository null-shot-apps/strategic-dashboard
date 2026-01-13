'use client';

import { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState<Array<{ id: number; text: string }>>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim() }]);
      setInputValue('');
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '40px',
        width: '100%',
        maxWidth: '500px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '30px',
          textAlign: 'center',
          color: '#333'
        }}>
          Todo List
        </h1>

        <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a new task..."
              style={{
                flex: 1,
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                backgroundColor: '#4CAF50',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
              Add
            </button>
          </div>
        </form>

        {todos.length === 0 ? (
          <p style={{
            textAlign: 'center',
            color: '#999',
            fontSize: '14px',
            marginTop: '40px'
          }}>
            No tasks yet. Add one above!
          </p>
        ) : (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  marginBottom: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '6px',
                  border: '1px solid #e0e0e0'
                }}
              >
                <span style={{
                  fontSize: '16px',
                  color: '#333',
                  flex: 1
                }}>
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    color: '#f44336',
                    backgroundColor: 'transparent',
                    border: '1px solid #f44336',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f44336';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#f44336';
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

