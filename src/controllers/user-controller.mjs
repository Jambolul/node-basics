import { validationResult } from "express-validator";
import { addUser, updateUserById } from "../models/user-model.mjs";

const postUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    const error = new Error("Invalid input fields");
    error.status = 400;
    return next(error);
  }

  const result = await addUser(req.body);

  if (result.error) {
    console.error("Error adding user:", result.error);
    res.status(500).json({ error: result.error });
  } else {
    res.status(201).json(result);
  }
};

const putUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Validation errors", errors.array());
    const error = new Error("Invalid input fields");
    error.status = 400;
    return next(error);
  }

  const { id } = req.params;
  const { username, email, password } = req.body;
  const updatedUser = { username, email, password };

  const result = await updateUserById(id, updatedUser);

  if (result.error) {
    console.error("Error updating user:", result.error);
    res.status(500).json({ error: result.error });
  } else {
    res.status(200).json(result);
  }
};

// Following functions are just stubs at the moment

const getUsers = (req, res) => {
  res.json({ users: "get" });
};

const getUserById = (req, res) => {
  res.json({ message: "getUserById" });
};

const deleteUser = (req, res) => {
  res.json({ message: "deleteUser" });
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
