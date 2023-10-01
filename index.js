const express = require("express");
const server = express();
const productRouter = require("./routes/product");

// const morgan = require("morgan");

//Build-in middleware (body parser JSON) for when body request is undefined
server.use(express.json());
// server.use(express.urlencoded());
server.use(express.static("public"));
server.use("/api", productRouter);

server.listen(8000, () => {
  console.log("server started at 8000");
});
