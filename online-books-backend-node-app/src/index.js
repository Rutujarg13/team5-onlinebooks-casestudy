const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.write("Welcome to express");
});

app.listen(3000, () => {
  console.log("Web server started...");
});
