import users from "../mock-data/users.json" assert { type: "json" };

const getUsers = (req, res) => {
  res.json(users);
};

// Following functions are just stubs at the moment
const getUserById = (req, res) => {
  res.json({ message: "getUserById" });
};

const postUser = (req, res) => {
  res.json({ message: "postUser" });
};

const putUser = (req, res) => {
  res.json({ message: "putUser" });
};

const deleteUser = (req, res) => {
  res.json({ message: "deleteUser" });
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
