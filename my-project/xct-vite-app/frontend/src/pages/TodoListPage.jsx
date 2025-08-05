import { useEffect, useState } from 'react';
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  searchTodos,
} from '../services/api';
import TodoItem from '../components/TodoItem';
import FileUpload from '../components/FileUpload';
import TagFilter from '../components/TagFilter';

export default function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', tags: '' });
  const [selectedTag, setSelectedTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const loadTodos = async () => {
    const res = await fetchTodos();
    setTodos(res.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async () => {
    const todo = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()),
    };
    await addTodo(todo);
    loadTodos();
    setForm({ title: '', description: '', tags: '' });
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleSearch = async () => {
    if (!searchTerm) return loadTodos();
    const res = await searchTodos(searchTerm);
    setTodos(res.data);
  };

  const filteredTodos = selectedTag
    ? todos.filter((t) => t.tags.includes(selectedTag))
    : todos;

  const allTags = [...new Set(todos.flatMap((t) => t.tags))];

  return (
    <div style={{ padding: '20px' }}>
      <h2>待办清单</h2>

      <div>
        <input
          placeholder="标题"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="描述"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="标签（用逗号分隔）"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <button onClick={handleAdd}>添加事项</button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <input
          placeholder="搜索事项"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>搜索</button>
      </div>

      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        onChange={setSelectedTag}
      />

      <div>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={() => {}}
          />
        ))}
      </div>

      <FileUpload />
    </div>
  );
}
