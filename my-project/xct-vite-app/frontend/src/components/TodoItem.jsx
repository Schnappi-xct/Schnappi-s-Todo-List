export default function TodoItem({ todo, onDelete, onUpdate }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
      <div>
        <strong>{todo.title}</strong> - {todo.description}
      </div>
      <div>
        标签：{todo.tags.join(', ')}
      </div>
      <button onClick={() => onDelete(todo.id)}>删除</button>
      <button onClick={() => onUpdate(todo)}>编辑</button>
    </div>
  );
}
