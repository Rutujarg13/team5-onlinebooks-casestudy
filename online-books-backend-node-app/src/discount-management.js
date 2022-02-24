const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "onlinebooks",
  password: "root",
  port: 5432,
});

router.get("/", (req, res) => {
  pool.query("SELECT * FROM product_discounts", (error, result) => {
    if (error) {
      return res.status(500).send("Internal Error on Server");
    } else {
      return res.status(200).send(result.rows);
    }
  });
});

router.post("/add/", (req, res) => {
  const { book_id, discount } = req.body;
  pool.query(
    "INSERT INTO product_discounts (book_id, discount) VALUES ($1, $2)",
    [book_id, discount],
    (error, result) => {
      if (error) {
        res.status(500).send("Internal Error on Server");
      } else {
        res.status(201).send(`Discount added `);
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "DELETE FROM product_discounts WHERE book_id=$1",
    [id],
    (error, result) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      } else {
        return res
          .status(200)
          .send(`Discount for book with id ${id} has been deleted`);
      }
    }
  );
});

module.exports = router;
