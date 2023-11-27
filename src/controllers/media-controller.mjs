import { validationResult } from "express-validator";
import {
  addMedia,
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

const postMedia = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log("validation errors", errors.array());
    const error = new Error("invalid input fields");
    error.status = 400;
    return next(error);
  }
  const { title, description } = req.body;
  const { filename, mimetype, size } = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  const newMedia = { title, description, user_id, filename, mimetype, size };
  const result = await addMedia(newMedia);
  // error handling when database error occurs
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201);
  res.json({ message: "New media item added.", ...result });
};

const putMedia = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Validation errors", errors.array());
    const error = new Error("Invalid input fields");
    error.status = 400;
    return next(error);
  }

  const { id } = req.params; // Assuming the ID is part of the route parameters
  const { title, description, filename } = req.body;

  const updatedMedia = { title, description, filename };

  const result = await updateMediaById(id, updatedMedia); // Pass the ID to the updateMediaById function

  if (result.error) {
    return next(new Error(result.error));
  }

  res.status(200);
  res.json({ message: "Media item updated.", ...result });
};

const deleteMedia = (req, res) => {
  // placeholder
  res.sendStatus(200);
};

export { getMedia, getMediaById, postMedia, putMedia, deleteMedia };
