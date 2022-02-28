const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const Pool = require("pg").Pool;
const db = require("../db/connection");

router.get("/", (req, res) => {
  const connection = db;
  connection.query(
    "SELECT * FROM product_discounts JOIN books on product_discounts.book_id=books.book_id JOIN publishers on books.publisher_id = publishers.publisher_id JOIN book_categories ON books.category_id = book_categories.category_id",
    (error, result) => {
      if (error) {
        return res.status(500).send("Internal Error on Server");
      } else {
        return res.status(200).json(result.rows);
      }
    }
  );
});

router.post("/add/", (req, res) => {
  const { book_id, discount } = req.body;
  const connection = db;
  connection.query(
    `INSERT INTO product_discounts (book_id, discount) VALUES (${book_id}, ${discount})`,
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Error on Server");
      } else {
        res.status(201).json("Discount added");
      }
    }
  );
});

router.put("/edit/", (req, res) => {
  const { book_id, discount } = req.body;
  const connection = db;
  connection.query(
    "UPDATE product_discounts SET discount=$2 WHERE book_id=$1",
    [book_id, discount],
    (error, result) => {
      if (error) {
        res.status(500).send("Internal Error on Server");
      } else {
        res
          .status(201)
          .json(`Discount for book with id ${book_id} has been updated `);
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const connection = db;
  connection.query(
    "DELETE FROM product_discounts WHERE book_id=$1",
    [id],
    (error, result) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      } else {
        return res
          .status(200)
          .json(`Discount for book with id ${id} has been deleted`);
      }
    }
  );
});

module.exports = router;
