const fs = require("fs");
// const index = fs.readFileSync("index.html", "utf-8");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const products = data.products;
const model = require("../model/product");
const Product = model.Product;

//Create product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating Product" });
  }

  // products.push(req.body);
};

exports.getAllProducts = async (req, res) => {
  try {
    const doc = await Product.find();
    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error not found Product" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const singleProduct = await Product.findById(id).exec();
    res.json(singleProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error no found request Product" });
  }
};

exports.replaceProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productReplace = await Product.findOneAndReplace(
      { _id: id },
      req.body,
      { new: true }
    ).exec();
    res.status(201).json(productReplace);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error Product" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    ).exec();
    res.status(201).json(updateProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error Product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete({ _id: id }).exec();
    res.status(201).json(deleteProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error Product" });
  }
};

// module.exports = {
//   getAllProducts,
//   getProduct,
//   createProduct,
//   replaceProduct,
//   updateProduct,
//   deleteProduct,
// };
