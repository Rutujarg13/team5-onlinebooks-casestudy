const express = require("express");
const db = require("../db/connection");

const router = express.Router();

// endpoint - http://localhost:3000/api/v1/auth
router.get("", (req, res) => {
  res.send("Welcome to GEt method from router");
});

// user login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const connection = db;
  const statement = `select * from users where email='${email}' and password = '${password}'`;

  connection.query(statement, (error, data) => {
    const result = {};
    if (data.rows.length != 0) {
      result["status"] = "success";
      result["data"] = data.rows;
    } else {
      result["status"] = "error";
      result["error"] = error;
    }
    res.send(result);
  });
});

//admin login route
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  const connection = db;
  const statement = `select * from users where email='${email}' and password = '${password}'`;
  connection.query(statement, (error, data) => {
    const result = {};
    console.log(data);
    if (data.rows.length != 0 && data.rows[0].is_admin === true) {
      result["status"] = "success";
      result["data"] = data.rows[0].user_id;
    } else {
      result["status"] = "error";
      result["error"] = error;
    }
    res.send(result);
  });
});

module.exports = router;
