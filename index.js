// Import required modules
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory task storage
let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Clean the house', completed: true }
];

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API! Use /tasks for CRUD operations.');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a single task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: completed || false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
});

// Not found route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
