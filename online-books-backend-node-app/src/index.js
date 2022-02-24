const express = require("express");
const app = express();
const productManagementRoute = require("./product-management");
const discountManagementRoute = require("./discount-management");

const body_parser = require("body-parser");
app.use(body_parser.json());

app.use("/api/admin/products/", productManagementRoute);
app.use("/api/admin/discounts/", discountManagementRoute);

app.listen(3000, () => {
  console.log("Web server started...");
});
