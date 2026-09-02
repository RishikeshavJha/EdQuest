# TaskFlow – React Components, Props & Data Flow

A functional React web application created for the assignment requirement to demonstrate React components, props, and data flow.

## Features
- Reusable React components
- Props passed from parent to child components
- One-way data flow
- `useState` for application state
- Add, complete, and delete tasks
- Filter tasks by all/active/completed
- Task statistics and progress
- Responsive design
- Clean component-based structure

## Component structure
- `App.jsx` – owns task state and passes data/callbacks through props
- `Header.jsx` – reusable header component
- `TaskForm.jsx` – receives `onAddTask` prop
- `TaskList.jsx` – receives tasks and callbacks, then passes them to children
- `TaskItem.jsx` – receives a task and action callbacks
- `Stats.jsx` – receives tasks and calculates summary information

## Data flow
The `App` component is the single source of truth for tasks. It passes task data and event handlers down through props. Child components call the supplied callback functions when the user interacts with the application. This demonstrates React's one-way data flow.

## Run locally
```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build
```bash
npm run build
```
