import { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Stats from './components/Stats';

const initialTasks = [
  { id: 1, title: 'Learn React components', completed: true },
  { id: 2, title: 'Practice props and data flow', completed: false },
  { id: 3, title: 'Build a functional application', completed: false }
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    setTasks(current => [newTask, ...current]);
  }

  function toggleTask(id) {
    setTasks(current =>
      current.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(current => current.filter(task => task.id !== id));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app-shell">
      <Header />
      <main className="container">
        <section className="hero">
          <p className="eyebrow">React Assignment</p>
          <h1>TaskFlow</h1>
          <p>Manage tasks using reusable components, props, state, and one-way data flow.</p>
        </section>

        <Stats tasks={tasks} />

        <section className="card">
          <TaskForm onAddTask={addTask} />

          <div className="toolbar">
            <div className="filter-group" role="group" aria-label="Task filters">
              {['all', 'active', 'completed'].map(option => (
                <button
                  key={option}
                  className={filter === option ? 'filter active' : 'filter'}
                  onClick={() => setFilter(option)}
                >
                  {option[0].toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
            <span className="task-count">{filteredTasks.length} shown</span>
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>
      </main>
      <footer>Built with React • Components • Props • Data Flow</footer>
    </div>
  );
}