const users = [
  {
    user_id: 260,
    username: "VCHar",
    password: "********",
    email: "vchar@example.com",
    user_level_id: 1,
    created_at: "2020-09-12T06:56:41.000Z",
  },
  {
    user_id: 305,
    username: "Donatello",
    password: "********",
    email: "dona@example.com",
    user_level_id: 1,
    created_at: "2021-12-11T06:00:41.000Z",
  },
  {
    user_id: 3609,
    username: "Anon5468",
    password: "********",
    email: "x58df@example.com",
    user_level_id: 3,
    created_at: "2023-04-02T05:56:41.000Z",
  },
];

const getAllUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  console.log("getUserById", req.params.id);
  const item = users.find((element) => element.user_id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "404 Media not found!" });
  }
};

const postUser = (req, res) => {
  console.log("New user posted", req.body);

  if (req.body.username && req.body.password && req.body.email) {
    const newId = users[users.length - 1].user_id + 1;

    users.push({
      user_id: newId,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const modifyUser = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);

  if (user) {
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    res.json(user);
  } else {
    res.status(404).json({ message: "Item not found." });
  }
};

const deleteUser = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);
  if (user) {
    users.splice(users.indexOf(user), 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "User not found." });
  }
};

export { getAllUsers, getUserById, postUser, modifyUser, deleteUser };
