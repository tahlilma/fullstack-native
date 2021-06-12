import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Todo from '../models/todos.js';

dotenv.config();
const db = process.env.DB_URI;

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(app.listen(PORT, () => console.log('APP STARTED')))
  .catch(console.error);

// Home Route
app.get('/', (_, res) => {
  res.send({ apiStatus: 'Alive', acceptingReqs: true });
});

// Get Todos Route
app.get('/get-todos', (_, res) => {
  Todo.find().then(todos => res.send(todos)).catch(err => res.send(err));
});

// Add Todos Route
app.post('/add-todo', (req, res) => {
  const { body } = req;
  const todo = new Todo(body);
  todo.save()
    .then(result => {
      res.send({ success: true, saved: result });
    })
    .catch(err => {
      res.send(err);
    })
});

// Delete Todos Route
app.delete('/delete-todo/:id', (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then(result => res.send({ success: true, deleted: result }))
    .catch(err => res.send(err));
});
