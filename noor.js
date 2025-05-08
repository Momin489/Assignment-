const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];
let idCounter = 1;

app.post('/addTask', (req, res) => {
  const { taskName } = req.body;

  if (!taskName) {
    return res.status(400).json({ message: 'taskName is required' });
  }

  const task = { id: idCounter++, taskName };
  tasks.push(task);
  res.status(201).json({ message: 'Task added successfully', task });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.delete('/task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});
app.get('/test', (req, res) => {
  res.send('Test route is working');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
