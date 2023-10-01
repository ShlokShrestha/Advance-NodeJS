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

//Req.params
server.get("/product/:id", (req, res) => {
  console.log(req.params);
  res.json({ type: "GET" });
});

//API - Endpoint - Route

//Products
//API ROOT , BASEURL http://localhost:8000 different baseurl eg google.com/api/v2
//Read API GET /products
server.get("/products", (req, res) => {
  res.json(products);
});
//Read API for single product GET /products/:id
server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const singleProduct = products.find((p) => p.id === id);
  res.json(singleProduct);
});

//Create API Post /products
server.post("/products", (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.json(req.body);
});

//Update API for single product PUT /products/:id
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex,1,{...req.body, id:id})
  res.status(201).json();
});
//Update API for single product PATCH /products/:id
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const oldproduct = products[productIndex];
  products.splice(productIndex,1,{...oldproduct, ...req.body})
  res.status(201).json();
});



//Delete API for single product Delete /products/:id
server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const oldproduct = products[productIndex];
  products.splice(productIndex,1)
  res.status(201).json(oldproduct);
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
