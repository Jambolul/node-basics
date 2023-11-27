import express from "express";
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
} from "../controllers/media-controller.mjs";
import {
  errorHandler,
  logger,
  notFoundHandler,
} from "../middlewares/middlewares.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { body } from "express-validator";
import upload from "../middlewares/upload.mjs";

const mediaRouter = express.Router();

// router specific middleware
//mediaRouter.use(logger);

// TODO: check and add authentication where needed
mediaRouter
  .route("/")
  .get(getMedia)
  .post(
    authenticateToken,
    upload.single("file"),
    // TODO: add missing validation rules
    body("title").trim().isLength({ min: 3 }),
    body("description").trim().isLength({ max: 25 }),
    postMedia
  );

mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(
    body("title").trim().isLength({ min: 3 }),
    body("description").trim().isLength({ max: 25 }),
    putMedia
  )
  .delete(deleteMedia);

export default mediaRouter;
