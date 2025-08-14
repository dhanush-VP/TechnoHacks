const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let users = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.json({ message: 'User added', user });
});

app.put('/users/:index', (req, res) => {
  const { index } = req.params;
  users[index] = req.body;
  res.json({ message: 'User updated', user: users[index] });
});

app.delete('/users/:index', (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
