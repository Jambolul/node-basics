import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getItems, getItemsById, postItem } from "./items.js";
import {
  getMediaItems,
  getMediaItemsById,
  postMediaItem,
  modifyMediaItem,
  deleteMediaItem,
} from "./media.js";
import {
  getAllUsers,
  getUserById,
  postUser,
  modifyUser,
  deleteUser,
} from "./user.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");
app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));
app.use("/media", express.static(path.join(__dirname, "../media")));

// middleware that logs all requests and debugging
app.use((req, res, next) => {
  console.log("time", Date.now(), req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  const values = { title: "Dummy REST API docs", message: "TODO: docs" };
  res.render("home", values);
});

// dummy example
app.get("/kukkuu", (request, response) => {
  const myResponse = { message: "no moro" };
  //  response.json(myResponse);
  response.sendStatus(200);
});

// other dummy pug example
app.get("/:message", (req, res) => {
  const values = { title: "Dummy REST API docs", message: req.params.message };
  res.render("home", values);
});

// exmaple generic items api

// get all items
app.get("/api/items", getItems);
// get item by id
app.get("/api/items/:id", getItemsById);
// modify
app.put("/api/items");
// add new item
app.post("/api/items", postItem);
// remove existing item
app.delete("/api/items");

// media functions

// get all media items
app.get("/api/media", getMediaItems);
// get media item by id
app.get("/api/media/:id", getMediaItemsById);
// post media item
app.post("/api/media/:id", postMediaItem);
// modify media item
app.put("/api/media/:id", modifyMediaItem);
// delete media item
app.delete("/api/media/:id", deleteMediaItem);

// user functions

// get all users
app.get("/api/user", getAllUsers);
// get user by id
app.get("/api/user/:id", getUserById);
// post user
app.post("/api/user", postUser);
// modify user
app.put("/api/user/:id", modifyUser);
// delete user
app.delete("/api/user/:id", deleteUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
