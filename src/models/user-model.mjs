import { promisePool } from "../utils/database.mjs";

const fetchAllUsers = async () => {
  try {
    const result = await promisePool.query("SELECT * FROM Users");
    const [rows] = result; // first item in result array is the data rows
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchUserById = async (id) => {
  try {
    const sql = "SELECT * FROM Users WHERE user_id=?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log("rows", rows);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * Add new user to the database
 *
 * @param {object} user - object containing all information about the new user
 * @returns {object} - object containing id of the inserted user in the db
 */
const addUser = async (user) => {
  const { username, password, email } = user;
  const sql = "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)";
  const params = [username, password, email];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { user_id: result[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const updateUserById = async (id, updatedUser) => {
  const { username, password, email } = updatedUser;
  const sql =
    "UPDATE Users SET username=?, password=?, email=? WHERE user_id=?";
  const params = [username, password, email, id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "User updated." }
      : { error: "Not Found" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const deleteUserById = async (id) => {
  const sql = "DELETE FROM Users WHERE user_id=?";
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "User deleted." }
      : { error: "Not Found" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export {
  fetchAllUsers,
  fetchUserById,
  addUser,
  updateUserById,
  deleteUserById,
};
