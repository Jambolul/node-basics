import express from "express";
import multer from "multer";
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
} from "../controllers/media-controller.mjs";
import { logger } from "../middlewares/middlewares.mjs";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// router specific middleware
//mediaRouter.use(logger);

mediaRouter.route("/").get(getMedia).post(upload.single("file"), postMedia);
mediaRouter.route("/:id").get(getMediaById).put(putMedia).delete(deleteMedia);

export default mediaRouter;
