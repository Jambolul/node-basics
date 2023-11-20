import express from "express";
import {
  deleteUser,
  getUsers,
  getUserById,
  postUser,
  putUser,
} from "../controllers/user-controller.mjs";
import { logger } from "../middlewares/middlewares.mjs";

const userRouter = express.Router();

// router specific middleware
// userRouter.use(logger);

userRouter.route("/").get(getUsers).post(postUser);

userRouter.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
