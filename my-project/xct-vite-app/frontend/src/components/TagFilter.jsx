export default function TagFilter({ tags, selectedTag, onChange }) {
  return (
    <div>
      <label>筛选标签: </label>
      <select value={selectedTag} onChange={(e) => onChange(e.target.value)}>
        <option value="">全部</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>
    </div>
  );
}
