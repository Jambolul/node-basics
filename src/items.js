// mock items data
const items = [
  { id: 5, name: "porkkana" },
  { id: 6, name: "omena" },
  { id: 19, name: "appelsiini" },
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemsById = (req, res) => {
  // TODO: if item with id exists send it, otherwise sen 404
  console.log("getItemsById", req.params.id);
  const item = items.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "Item not found." });
  }
};

const postItem = (req, res) => {
  console.log("new item posted", req.body);
  // TODO: check last weeks example for creating the id
  if (req.body.name) {
    items.push({ id: 0, name: req.body.name });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

// TODO: add deleteItem(), putItem() and routing for those in index.js
const deleteItem = (res, id) => {
  const item = items.find((element) => element.id == id);
  if (item) {
    items.splice(items.indexOf(item), 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end('{"message": "Item deleted."}');
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Item not found."}');
  }
};

const putItem = (req, res) => {
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);
      body = JSON.parse(body);

      if (!body.name) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(`{"message": "Missing data."}`);
        return;
      }
      const item = items.find((element) => element.id == body.id);

      if (item) {
        item.name = body.name;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end('{"message": "Item updated."}');
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end('{"message": "Item not found."}');
      }
    });
};

export { getItems, getItemsById, postItem, deleteItem, putItem };
