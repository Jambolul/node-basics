import {promisePool} from '../utils/database.mjs';

const fetchAllMedia = async () => {
  try {
    const result = await promisePool.query('SELECT * FROM MediaItems');
    const [rows] = result; // first item in result array is the data rows
    //console.log(result);
    //console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const fetchMediaById = async (id) => {
  try {
    // TODO: replace * with specific column names needed in this case
    const sql = `SELECT media_id, filename, filesize, media_type, title, description, MediaItems.created_at, Users.user_id, username
                 FROM MediaItems JOIN Users ON MediaItems.user_id = Users.user_id
                 WHERE media_id=?`;
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/**
 * Add new media item to database
 *
 * @param {object} media - object containing all information about the new media item
 * @returns {object} - object containing id of the inserted media item in db
 */
const addMedia = async (media) => {
  const {user_id, filename, size, mimetype, title, description} = media;
  const sql = `INSERT INTO MediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const result = await promisePool.query(sql, params);
    console.log('result', result);
    return {media_id: result[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {fetchAllMedia, fetchMediaById, addMedia};
