const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const Pool = require("pg").Pool;
const db = require("../db/connection");

router.get("/", (req, res) => {
  updateStatus(req, res).then(getDiscounts(req, res));
});

router.post("/add/", (req, res) => {
  const { book_id, discount, start_stamp, end_stamp, is_active } = req.body;
  const connection = db;
  connection.query(
    `INSERT INTO product_discounts (book_id, discount, start_stamp, end_stamp, is_active) VALUES (${book_id}, ${discount},  TO_TIMESTAMP('${start_stamp}', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('${end_stamp}', 'YYYY-MM-DD HH24:MI'), ${is_active})`,
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

function getDiscounts(req, res) {
  return new Promise((resolve, reject) => {
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
}

function updateStatus(req, res) {
  return new Promise((resolve, reject) => {
    const connection = db;
    connection.query(
      `WITH active AS (UPDATE product_discounts SET is_active=true WHERE start_stamp < CURRENT_TIMESTAMP AND CURRENT_TIMESTAMP< end_stamp )
      UPDATE product_discounts SET is_active=false WHERE start_stamp > CURRENT_TIMESTAMP OR CURRENT_TIMESTAMP > end_stamp`,
      (error, result) => {
        if (error) {
          return res.status(500).send("Internal Error on Server");
        }
      }
    );
  });
}

module.exports = router;
