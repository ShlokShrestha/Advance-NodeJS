const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const express = require("express");
const morgan = require("morgan");
const server = express();

//Build-in middleware (body parser JSON) for when body request is undefined
server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static("public"));

server.use(morgan("default"));
// server.use((req, res, next) => {
//   console.log(req.method, req.ip, req.hostname);
//   next();
// });

const auth = (req, res, next) => {
  // console.log(req.query);
  if (req.body.password == "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

//API - Endpoint - Route
server.get("/", (req, res) => {
  res.json({ type: "GET" });
});
server.post("/", auth, (req, res) => {
  res.json({ type: "POST" });
});
server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});
server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

server.get("/demo", (req, res) => {
  // res.sendStatus(202).send(error);
  //res.json(products);
  // res.send("hello world");
  // res.sendFile("C:\Users\asush\Desktop\nodejs trainig\NodeJS\index.html");
});

server.listen(8000, () => {
  console.log("server started at 8000");
});
