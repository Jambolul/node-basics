import express from 'express';
import {
  deleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from '../controllers/user-controller.mjs';
import {body} from 'express-validator';

const userRouter = express.Router();

/**
 * @api {get} /users Get All Users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiSuccess {Object[]} users List of user objects.
 * @apiSuccess {Number} users.id Id of the user.
 * @apiSuccess {String} users.username Username of the user.
 * @apiSuccess {String} users.email Email of the user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": 1,
 *        "username": "john_doe",
 *        "email": "john@example.com"
 *      },
 *      // ... other users
 *    ]
 *
 * @apiError InvalidToken Authentication token was invalid.
 * @apiError InsufficientPermissions Admin user level token is required.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "insufficient permissions"
 *     }
 */
userRouter.route('/').get(getUsers);

/**
 * @api {post} /users Create a New User
 * @apiVersion 1.0.0
 * @apiName PostUser
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiParam {String} email Email of the user.
 * @apiParam {String} username Username of the user (alphanumeric, 3 to 20 characters).
 * @apiParam {String} password Password of the user (at least 8 characters).
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "email": "newuser@example.com",
 *      "username": "newuser123",
 *      "password": "newuserpassword"
 *    }
 *
 * @apiSuccess {Object} user Created user object.
 * @apiSuccess {Number} user.id Id of the user.
 * @apiSuccess {String} user.username Username of the user.
 * @apiSuccess {String} user.email Email of the user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "id": 2,
 *      "username": "newuser123",
 *      "email": "newuser@example.com"
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 * @apiError InsufficientPermissions Admin user level token is required.
 * @apiError ValidationError Request body does not meet validation criteria.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Validation error: username must be alphanumeric and between 3 and 20 characters"
 *     }
 */
userRouter
  .route('/')
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    postUser
  );

/**
 * @api {get} /users/:id Get User by ID
 * @apiVersion 1.0.0
 * @apiName GetUserById
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiSuccess {Object} user User object.
 * @apiSuccess {Number} user.id Id of the user.
 * @apiSuccess {String} user.username Username of the user.
 * @apiSuccess {String} user.email Email of the user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "username": "john_doe",
 *      "email": "john@example.com"
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 * @apiError InsufficientPermissions Admin user level token is required.
 * @apiError UserNotFound The requested user does not exist.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "user not found"
 *     }
 */
userRouter.route('/:id').get(getUserById);

/**
 * @api {put} /users/:id Update User by ID
 * @apiVersion 1.0.0
 * @apiName PutUser
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiParam {String} email Updated email of the user.
 * @apiParam {String} username Updated username of the user.
 * @apiParam {String} password Updated password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "email": "updateduser@example.com",
 *      "username": "updateduser123",
 *      "password": "updateduserpassword"
 *    }
 *
 * @apiSuccess {Object} user Updated user object.
 * @apiSuccess {Number} user.id Id of the user.
 * @apiSuccess {String} user.username Updated username of the user.
 * @apiSuccess {String} user.email Updated email of the user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "username": "updateduser123",
 *      "email": "updateduser@example.com"
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 * @apiError InsufficientPermissions Admin user level token is required.
 * @apiError UserNotFound The requested user does not exist.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "user not found"
 *     }
 */
userRouter
  .route('/:id')
  .put(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    putUser
  );

/**
 * @api {delete} /users/:id Delete User by ID
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "user deleted successfully"
 *    }
 *
 * @apiError InvalidToken Authentication token was invalid.
 * @apiError InsufficientPermissions Admin user level token is required.
 * @apiError UserNotFound The requested user does not exist.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "user not found"
 *     }
 */
userRouter.route('/:id').delete(deleteUser);

export default userRouter;
