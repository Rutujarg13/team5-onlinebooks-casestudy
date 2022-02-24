const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const Pool = require("pg").Pool;
const db = require("./db/connection");

router.get("/", (req, res) => {
  const connection = db;
  connection.query("SELECT * FROM books", (error, result) => {
    if (error) {
      return res.status(500).send("Internal Error on Server");
    } else {
      return res.status(200).send(result.rows);
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  const connection = db;
  const id = parseInt(req.params.id);
  connection.query(
    "WITH a AS (DELETE FROM books_authors WHERE book_id = $1) DELETE FROM books WHERE book_id=$1",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
      } else {
        return res.status(200).send(`Book with id ${id} has been deleted`);
      }
    }
  );
});

//add product
router.post("/add/", (req, res) => {
  const {
    title,
    publisher_id,
    price,
    quantity,
    description,
    category_id,
    cover,
    first_name,
    last_name,
  } = req.body;
  let authorId;
  const connection = db;
  connection.query(
    "SELECT author_id FROM authors WHERE (first_name=$1 AND last_name=$2)",
    [first_name, last_name],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Internal Error on Server");
      } else {
        if (result.rows.length > 0) {
          authorId = result.rows[0].author_id;
          insertBook(
            title,
            publisher_id,
            price,
            quantity,
            description,
            category_id,
            cover,
            authorId,
            res
          );
        } else {
          connection.query(
            "INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING author_id",
            [first_name, last_name],
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(500).send("Internal Error on Server");
              } else {
                authorId = result.rows[0].author_id;
                insertBook(
                  title,
                  publisher_id,
                  price,
                  quantity,
                  description,
                  category_id,
                  cover,
                  authorId,
                  res
                );
              }
            }
          );
        }
      }
    }
  );
});

function insertBook(
  title,
  publisher_id,
  price,
  quantity,
  description,
  category_id,
  cover,
  authorId,
  res
) {
  var bookId;
  const connection = db;
  connection.query(
    "INSERT INTO books (title, publisher_id, price, quantity, description, category_id, cover) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING book_id",
    [title, publisher_id, price, quantity, description, category_id, cover],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Error on Server");
      } else {
        bookId = result.rows[0].book_id;
        result = insertBookAuthor(authorId, bookId, res);
      }
    }
  );
}

function insertBookAuthor(authorId, bookId, res) {
  const connection = db;
  connection.query(
    "INSERT INTO books_authors (author_id, book_id) VALUES ($1, $2)",
    [authorId, bookId],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Error on Server");
      } else {
        res.status(201).send(`Book added `);
      }
    }
  );
}

// Check that the row exists
// pool.query(
//   "SELECT EXISTS(SELECT * FROM books WHERE book_id=1)",
//   (error, result) => {
//     if (error) {
//       res.send("errror");
//     } else {
//       res.send(result.rows[0].exists);
//     }
//   }
// );

// TRUNCATE authors RESTART IDENTITY CASCADE;
// TRUNCATE books_authors RESTART IDENTITY CASCADE;
// TRUNCATE books RESTART IDENTITY CASCADE;

module.exports = router;
