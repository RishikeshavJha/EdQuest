import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAddTask(trimmedTitle);
    setTitle('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-input">Add a new task</label>
      <div className="input-row">
        <input
          id="task-input"
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="e.g. Study React props"
          maxLength={80}
        />
        <button className="primary" type="submit">Add Task</button>
      </div>
    </form>
  );
}