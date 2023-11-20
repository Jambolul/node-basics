import { promisePool } from "../utils/database.mjs";

const fetchAllMedia = async () => {
  try {
    const result = await promisePool.query("SELECT * FROM mediaItems");
    const [rows] = result; // first item in result array is the data rows
    //console.log(result);
    //console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchMediaById = async (id) => {
  try {
    // TODO: replace * with specific column names needed in this case
    const sql = `SELECT * FROM MediaItems JOIN Users
                 ON MediaItems.user_id = Users.user_id WHERE media_id=?`;
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
 * Add new media item to database
 *
 * @param {object} media - object containing all information about the new media item
 * @returns {object} - object containing id of the inserted media item in db
 */
const addMedia = async (media) => {
  const { user_id, filename, size, mimetype, title, description } = media;
  const sql = `INSERT INTO mediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const result = await promisePool.query(sql, params);
    console.log("result", result);
    return { media_id: result[0].insertId };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const updateMediaById = async (id, updatedMedia) => {
  const { filename, title, description } = updatedMedia;
  const sql = `UPDATE mediaItems SET filename=?, title=?, description=? WHERE media_id=?`;
  const params = [filename, title, description, id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "Media item updated." }
      : { error: "Not Found" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const deleteMediaById = async (id) => {
  const sql = `DELETE FROM mediaItems WHERE media_id=?`;
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "Media item deleted." }
      : { error: "Not Found" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export {
  fetchAllMedia,
  fetchMediaById,
  addMedia,
  updateMediaById,
  deleteMediaById,
};
