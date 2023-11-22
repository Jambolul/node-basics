import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from "../controllers/user-controller.mjs";

const userRouter = express.Router();

// routes for /api/users/
userRouter.route("/").get(getUsers).post(postUser);

// routes for /api/users/:id
userRouter.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
