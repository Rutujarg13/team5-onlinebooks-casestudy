const express = require("express");
const app = express();
const productManagement = require("./product-management");
const body_parser = require("body-parser");
app.use(body_parser.json());

app.get("/", (req, res) => {
  res.write("Welcome to express");
});

app.get("/admin/products", productManagement.getProducts);
app.post("/admin/products", productManagement.addBook);

app.get("/admin/discounts", productManagement.getDiscounts);

app.listen(3000, () => {
  console.log("Web server started...");
});
