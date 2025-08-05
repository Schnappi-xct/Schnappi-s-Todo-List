import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    if (editingIndex !== null) {
      const updated = [...todos];
      updated[editingIndex] = newTodo;
      setTodos(updated);
      setEditingIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo('');
  };

  const handleEdit = (index) => {
    setNewTodo(todos[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="请输入待办事项"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAdd}>{editingIndex !== null ? '更新' : '添加'}</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}{' '}
            <button onClick={() => handleEdit(index)}>编辑</button>
            <button onClick={() => handleDelete(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
