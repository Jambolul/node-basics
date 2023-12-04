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

/**
 * @api {get} /media Get All Media
 * @apiVersion 1.0.0
 * @apiName GetMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object[]} media List of media items.
 * @apiSuccess {Number} media.id Id of the media item.
 * @apiSuccess {String} media.title Title of the media item.
 * @apiSuccess {String} media.description Description of the media item.
 * @apiSuccess {String} media.url URL of the media file.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": 1,
 *        "title": "Sample Media",
 *        "description": "A sample media item.",
 *        "url": "/uploads/sample-media.jpg"
 *      },
 *      // ... other media items
 *    ]
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "invalid token"
 *     }
 */
mediaRouter.route('/').get(authenticateToken, getMedia);

/**
 * @api {post} /media Create a New Media Item
 * @apiVersion 1.0.0
 * @apiName PostMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} title Title of the media item.
 * @apiParam {String} description Description of the media item.
 * @apiParam {File} file Media file to be uploaded.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "title": "New Media",
 *      "description": "A new media item.",
 *      "file": "file data..."
 *    }
 *
 * @apiSuccess {Object} media Created media item.
 * @apiSuccess {Number} media.id Id of the media item.
 * @apiSuccess {String} media.title Title of the media item.
 * @apiSuccess {String} media.description Description of the media item.
 * @apiSuccess {String} media.url URL of the media file.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "id": 2,
 *      "title": "New Media",
 *      "description": "A new media item.",
 *      "url": "/uploads/new-media.jpg"
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "invalid token"
 *     }
 */
mediaRouter
  .route('/')
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({min: 3}),
    body('description'),
    postMedia
  );

/**
 * @api {get} /media/:id Get Media Item by ID
 * @apiVersion 1.0.0
 * @apiName GetMediaById
 * @apiGroup Media
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} media Media item.
 * @apiSuccess {Number} media.id Id of the media item.
 * @apiSuccess {String} media.title Title of the media item.
 * @apiSuccess {String} media.description Description of the media item.
 * @apiSuccess {String} media.url URL of the media file.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Sample Media",
 *      "description": "A sample media item.",
 *      "url": "/uploads/sample-media.jpg"
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 * @apiError MediaNotFound The requested media item does not exist.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "media not found"
 *     }
 */
mediaRouter.route('/:id').get(authenticateToken, getMediaById);

/**
 * @api {put} /media/:id Update Media Item by ID
 * @apiVersion 1.0.0
 * @apiName PutMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiParam {String} title Updated title of the media item.
 * @apiParam {String} description Updated description of the media item.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "title": "Updated Media",
 *      "description": "An updated media item."
 *    }
 *
 * @apiSuccess {Object} media Updated media item.
 * @apiSuccess {Number} media.id Id of the media item.
 * @apiSuccess {String} media.title Updated title of the media item.
 * @apiSuccess {String} media.description Updated description of the media item.
 * @apiSuccess {String} media.url URL of the media file.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Updated Media",
 *      "description": "An updated media item.",
 *      "url": "/uploads/updated-media.jpg"
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 * @apiError MediaNotFound The requested media item does not exist.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "media not found"
 *     }
 */
mediaRouter.route('/:id').put(authenticateToken, putMedia);

/**
 * @api {delete} /media/:id Delete Media Item by ID
 * @apiVersion 1.0.0
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "media deleted successfully"
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 * @apiError MediaNotFound The requested media item does not exist.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "media not found"
 *     }
 */
mediaRouter.route('/:id').delete(authenticateToken, deleteMedia);

export default mediaRouter;
