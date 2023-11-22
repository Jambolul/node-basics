import { promisePool } from "../utils/database.mjs";

/**
 * Fetch user from database based on user name/password pair
 *
 * @param {object} userCreds - Contains {username, password} properties
 * @returns user object
 */
const login = async (userCreds) => {
  try {
    const sql = `SELECT user_id, username, email, user_level_id
                 FROM Users WHERE username = ? AND password = ?`;
    const params = [userCreds.username, userCreds.password];
    const result = await promisePool.query(sql, params);
    const [rows] = result; // first item in result array is the data rows
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { login };
