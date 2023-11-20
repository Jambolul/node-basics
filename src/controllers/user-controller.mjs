import {
  addUser,
  deleteUserById,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
} from "../models/user-model.mjs";

const getUsers = async (req, res) => {
  const users = await fetchAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  console.log(req.params);
  const result = await fetchUserById(req.params.id);
  // "error handling" for different scenarios
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "Not Found", user_id: req.params.id });
  }
};

const postUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (username && password && email) {
    // TODO: add error handling when database error occurs
    const newUser = { username, password, email };
    const result = await addUser(newUser);
    res.status(201);
    res.json({ message: "New user added.", ...result });
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  if (id && username && password && email) {
    // TODO: add error handling when database error occurs
    const updatedUser = { username, password, email };
    const result = await updateUserById(id, updatedUser);

    if (result) {
      if (result.error) {
        res.status(500).json(result);
      }
      res.json(result);
    } else {
      res.status(404).json({ error: "Not Found", user_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (id) {
    // TODO: add error handling when database error occurs
    const result = await deleteUserById(id);

    if (result) {
      if (result.error) {
        res.status(500);
      }
      res.json(result);
    } else {
      res.status(404);
      res.json({ error: "Not Found", user_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
