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

// routes for /api/users/
userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    postUser
  );

// routes for /api/users/:id
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
