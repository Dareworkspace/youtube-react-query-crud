import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
const app = express();

let taskList = [
  { id: nanoid(), title: 'walk the dog', isDone: false },
  { id: nanoid(), title: 'wash dishes', isDone: false },
  { id: nanoid(), title: 'drink coffee', isDone: true },
  { id: nanoid(), title: 'take a nap', isDone: false },
];

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/api/tasks', (req, res) => {
  res.json({ taskList });
});

app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: nanoid(), title, isDone: false };
  taskList = [...taskList, newTask];
  res.json({ task: newTask });
});

app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  taskList = taskList.map((task) => {
    if (task.id === id) {
      return { ...task, isDone };
    }
    return task;
  });

  res.json({ msg: 'task updated' });
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  taskList = taskList.filter((task) => task.id !== id);

  res.json({ msg: 'task removed' });
});

const port = process.env.PORT || 5000;

const startApp = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startApp();
