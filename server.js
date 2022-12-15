const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
    {id:3, name: 'Lewis', position: 'Manager'},
    {id:5, name: 'Tom',  position: 'Developer'},
    {id:7, name: 'Evan', position: 'Assistant'}
];

app.post('/user', function (req, res) {
  users.push(req.body);
  res.json(req.body);
});

app.put("/user/:id", function (req, res) {
  const idOfUser = parseInt(req.body.id);
  const userIdx = users.findIndex((user) => user.id === idOfUser);

  if (userIdx !== -1) {
    const oldUser = users[userIdx];
    users[userIdx] = { ...oldUser, ...req.body };
    res.json(users[userIdx]);
  } else {
    res.status(404).json();
  }
});

app.delete('/user/:id', function (req, res) {
    const idOfUser = parseInt(req.params.id);
    users = users.filter((user) => user.id !== idOfUser);
    res.json(users);
  });

app.get('/user', function (req, res) {
 res.json(users);
});

app.listen(3000, () =>
  console.log('App listening at port 3000')
);