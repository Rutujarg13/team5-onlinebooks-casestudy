const productManagementRoute = require("./routes/product-management");
const discountManagementRoute = require("./routes/discount-management");
const authenticationRoute = require("./routes/auth");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productRoute = require("./routes/product");
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("within cors configuration middleware");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, OPTIONS"
  );
  next();
});

// middleware - use()

app.use("/api/products", productRoute);

app.listen(3000, () => {
  console.log("server started...");
});
