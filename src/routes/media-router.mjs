import express from 'express';
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
} from '../controllers/media-controller.mjs';
import {logger} from '../middlewares/middlewares.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body} from 'express-validator';
import upload from '../middlewares/upload.mjs';

const mediaRouter = express.Router();

// router specific middleware
//mediaRouter.use(logger);

// TODO: check and add authentication where needed
mediaRouter
  .route('/')
  .get(getMedia)
  .post(
    authenticateToken,
    upload.single('file'),
    // TODO: add missing validation rules
    body('title').trim().isLength({min: 3}),
    body('description'),
    postMedia
  );

mediaRouter.route('/:id').get(getMediaById).put(putMedia).delete(deleteMedia);

export default mediaRouter;
