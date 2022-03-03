const express = require("express");
const bodyParser = require("body-parser");
// import route in app.js

const productRoute = require("./routes/product");


// creating Web server
const app = express();

// for every incoming request, bodyParser will parse data from bytes into JSON object &
// vice-versa for every reponse JSON into bytes. Works with POST and PUT/PATCH
app.use(express.json());

// custom middleware
/*app.use((req, res, next) => {
  console.log("Incoming Request Middleware" + req.body);
  next();
}); */

// middleaware - to enable cors at server-side
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

// middleware - use()

app.use("/api/products", productRoute);

app.listen(3000, () => {
  console.log("server started...");
});
