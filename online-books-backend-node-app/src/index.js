const express = require("express");
const app = express();
const productManagementRoute = require("./routes/product-management");
const discountManagementRoute = require("./routes/discount-management");
const authenticationRoute = require("./routes/auth");

const body_parser = require("body-parser");
app.use(body_parser.json());

app.use((req, res, next) => {
  console.log("within cors configuration middleware");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.use("/api/admin/products/", productManagementRoute);
app.use("/api/admin/discounts/", discountManagementRoute);
app.use("/api/auth/", authenticationRoute);

app.listen(3000, () => {
  console.log("Web server started...");
});
