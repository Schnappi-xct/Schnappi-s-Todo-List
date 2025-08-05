import React, { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    onAdd(newTodo);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="请输入待办事项"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">添加</button>
    </form>
  );
}

export default AddTodoForm;
