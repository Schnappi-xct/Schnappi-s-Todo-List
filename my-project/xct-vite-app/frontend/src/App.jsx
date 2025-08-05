import React, { useState } from 'react';
import './App.css';

const LABELS = ['工作', '生活', '学习', '其他'];

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // ✅ 添加搜索关键词状态

  const handleAddOrUpdate = () => {
    if (!newTodo.trim()) return;

    const todoItem = {
      text: newTodo.trim(),
      tags: selectedTags,
    };

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = todoItem;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, todoItem]);
    }

    setNewTodo('');
    setSelectedTags([]);
  };

  const handleEdit = (index) => {
    setNewTodo(todos[index].text);
    setSelectedTags(todos[index].tags);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 500 * 1024 * 1024) {
      alert('文件大于 500MB');
    } else {
      setSelectedFile(file);
    }
  };

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFilterTagChange = (tag) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter(t => t !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  };

  // ✅ 同时按标签和关键词过滤
  const filteredTodos = todos.filter(todo => {
    const matchesTags = filterTags.length === 0 || todo.tags.some(tag => filterTags.includes(tag));
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTags && matchesSearch;
  });

  return (
    <div className="App">
      <h1>简易待办清单</h1>

      {/* 输入待办事项 */}
      <input
        type="text"
        placeholder="请输入待办事项"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      {/* 添加标签 */}
      <div>
        {LABELS.map((label) => (
          <label key={label} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedTags.includes(label)}
              onChange={() => handleTagChange(label)}
            />
            {label}
          </label>
        ))}
      </div>

      <button onClick={handleAddOrUpdate}>
        {editIndex !== null ? '更新事项' : '添加事项'}
      </button>

      <hr />

      {/* ✅ 搜索关键词 */}
      <h2>搜索事项</h2>
      <input
        type="text"
        placeholder="请输入搜索关键词"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '5px', width: '100%', marginBottom: '10px' }}
      />

      {/* 标签筛选 */}
      <h2>标签筛选</h2>
      <div>
        {LABELS.map((label) => (
          <label key={label} style={{ marginRight: '10px', color: filterTags.includes(label) ? 'blue' : 'black' }}>
            <input
              type="checkbox"
              checked={filterTags.includes(label)}
              onChange={() => handleFilterTagChange(label)}
            />
            {label}
          </label>
        ))}
      </div>

      <hr />

      <h2>待办列表</h2>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            <span>{todo.text}</span> -
            <span style={{ marginLeft: '5px', color: 'gray' }}>
              {todo.tags.join(', ')}
            </span>
            <button onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>
              编辑
            </button>
            <button onClick={() => handleDelete(index)} style={{ marginLeft: '5px' }}>
              删除
            </button>
          </li>
        ))}
        {filteredTodos.length === 0 && <p style={{ color: 'gray' }}>无匹配事项</p>}
      </ul>

      <hr />

      <h2>上传文件</h2>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <p>已选择文件: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
      )}
    </div>
  );
}

export default App;
