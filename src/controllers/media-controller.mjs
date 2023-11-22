import {
  addMedia,
  fetchAllMedia,
  fetchMediaById,
  updateMediaById,
  deleteMediaById,
} from "../models/media-model.mjs";

const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

const getMediaById = async (req, res) => {
  console.log(req.params);
  const result = await fetchMediaById(req.params.id);
  // "error handling" for different scenarios
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "Not Found", media_id: req.params.id });
  }
};

const postMedia = async (req, res) => {
  //console.log('uploaded file', req.file);
  //console.log('uploaded form data', req.body);
  const { title, description } = req.body;
  const { filename, mimetype, size } = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  if (filename && title && user_id) {
    // TODO: add error handling when database error occurs
    const newMedia = { title, description, user_id, filename, mimetype, size };
    const result = await addMedia(newMedia);
    res.status(201);
    res.json({ message: "New media item added.", ...result });
  } else {
    res.sendStatus(400);
  }
};

const putMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const updateData = req.body;

    const result = await updateMediaById(mediaId, updateData);

    if (result.message) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error updating media:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const result = await deleteMediaById(mediaId);
    if (result.message) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getMedia, getMediaById, postMedia, putMedia, deleteMedia };
