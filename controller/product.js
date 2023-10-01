const fs = require("fs");
// const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProduct = (req, res) => {
  const id = +req.params.id;
  const singleProduct = products.find((p) => p.id === id);
  res.json(singleProduct);
};

const createProduct = (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.json(req.body);
};

const replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};
const updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const oldproduct = products[productIndex];
  products.splice(productIndex, 1, { ...oldproduct, ...req.body });
  res.status(201).json();
};

const deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const oldproduct = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json(oldproduct);
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
};
