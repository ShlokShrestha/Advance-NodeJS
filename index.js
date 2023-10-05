const express = require("express");
const server = express();
const productRouter = require("./routes/product");
// const morgan = require("morgan");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("DataBase Connected");
}


//environement-variable
require("dotenv").config();
//Build-in middleware (body parser JSON) for when body request is undefined
server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static(process.env.PUBLIC_DIR));
server.use("/api", productRouter);

server.listen(process.env.PORT, () => {
  console.log("server started at 8000");
});
