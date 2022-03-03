const express = require("express");
const db = require("../db/connection");
const jwt = require("jsonwebtoken");

const router = express.Router();

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
      let user = {
        userId: data.rows[0].user_id,
        name: data.rows[0].first_name + " " + data.rows[0].last_name,
        admin: data.rows[0].is_admin,
      };
      // jwt.sign();
      result["status"] = "success";
      result["data"] = jwt.sign(user, "mammaMia");
    } else {
      result["status"] = "error";
      result["error"] = error;
    }
    res.json(result);
  });
});

module.exports = router;
