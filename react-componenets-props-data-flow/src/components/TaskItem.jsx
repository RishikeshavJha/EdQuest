export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={task.completed ? 'task completed' : 'task'}>
      <button
        className="check"
        aria-label={task.completed ? `Mark ${task.title} active` : `Complete ${task.title}`}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? '✓' : ''}
      </button>

      <span className="task-title">{task.title}</span>

      <button className="delete" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </article>
  );
}