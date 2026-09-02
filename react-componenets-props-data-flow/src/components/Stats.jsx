export default function Stats({ tasks }) {
  const completed = tasks.filter(task => task.completed).length;
  const remaining = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <section className="stats-grid" aria-label="Task statistics">
      <div className="stat">
        <span>Total</span>
        <strong>{tasks.length}</strong>
      </div>
      <div className="stat">
        <span>Remaining</span>
        <strong>{remaining}</strong>
      </div>
      <div className="stat">
        <span>Completed</span>
        <strong>{completed}</strong>
      </div>
      <div className="stat progress-stat">
        <span>Progress</span>
        <strong>{progress}%</strong>
      </div>
    </section>
  );
}