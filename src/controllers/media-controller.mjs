import {
  addMedia,
  deleteMediaById,
  fetchAllMedia,
  fetchMediaById,
  updateMediaById,
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
  const { title, description, user_id } = req.body;
  const { filename, mimetype, size } = req.file;
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
  const { id } = req.params;
  const { filename, title, description } = req.body;

  if (id && title && filename) {
    // TODO: add error handling when database error occurs
    const updatedMedia = { filename, title, description };
    const result = await updateMediaById(id, updatedMedia);

    if (result) {
      if (result.error) {
        res.status(500).json(result);
      }
      res.json(result);
    } else {
      res.status(404).json({ error: "Not Found", media_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

const deleteMedia = async (req, res) => {
  const { id } = req.params;

  if (id) {
    // TODO: add error handling when database error occurs
    const result = await deleteMediaById(id);

    if (result) {
      if (result.error) {
        res.status(500);
      }
      res.json(result);
    } else {
      res.status(404);
      res.json({ error: "Not Found", media_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

export { getMedia, getMediaById, postMedia, putMedia, deleteMedia };
