const express = require("express");
const router = express.Router();
const body_parser = require("body-parser");
const Pool = require("pg").Pool;
const db = require("./db/connection");

//GET ALL BOOKS
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

//DELETE BOOK
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

//add book
router.post("/add/", (req, res) => {
  const {
    title,
    publisher_id,
    price,
    quantity,
    description,
    category_id,
    cover,
    authors,
  } = req.body;
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
        result = insertBookAuthor(authors, bookId, res);
      }
    }
  );
});

//Edit book
router.put("/edit/", (req, res) => {
  const {
    book_id,
    title,
    publisher_id,
    price,
    quantity,
    description,
    category_id,
    cover,
  } = req.body;
  const connection = db;
  connection.query(
    "UPDATE books SET title=$2, publisher_id=$3, price=$4, quantity=$5, description=$6, category_id=$7, cover=$8 WHERE book_id=$1",
    [
      book_id,
      title,
      publisher_id,
      price,
      quantity,
      description,
      category_id,
      cover,
    ],
    (error, result) => {
      if (error) {
        res.status(500).send("Internal Error on Server");
      } else {
        res
          .status(201)
          .send(`Details for book with id ${book_id} has been updated `);
      }
    }
  );
});

//on book creation save book's autor in the books_authors table
function insertBookAuthor(authors, bookId, res) {
  const connection = db;
  statement = "INSERT INTO books_authors (author_id, book_id) VALUES ";
  authors.forEach((author) => {
    statement += `(${author}, ${bookId}), `;
  });
  statement = statement.slice(0, -2);
  connection.query(statement, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Internal Error on Server");
    } else {
      res.status(201).send(`Book added `);
    }
  });
}

//Add publisher
router.post("/add/publisher", (req, res) => {
  const { publisher_name } = req.body;
  const connection = db;
  connection.query(
    "INSERT INTO publishers (publisher_name) VALUES ($1) RETURNING publisher_id",
    [publisher_name],
    (error, result) => {
      if (error) {
        res.status(500).send("Internal Error on Server");
      } else {
        let publisherId = result.rows[0].publisher_id;
        res.status(201).json(publisherId);
      }
    }
  );
});

//Get publishers
router.get("/publishers", (req, res) => {
  const connection = db;
  connection.query("SELECT * FROM publishers", (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal Error on Server");
    } else {
      return res.status(200).send(result.rows);
    }
  });
});

//Add category
router.post("/add/category", (req, res) => {
  const { category_name } = req.body;
  const connection = db;
  connection.query(
    "INSERT INTO book_categories (category_name) VALUES ($1) RETURNING category_id",
    [category_name],
    (error, result) => {
      if (error) {
        res.status(500).send("Internal Error on Server");
      } else {
        res.status(201).json(result.rows[0].category_id);
      }
    }
  );
});

//get categories
router.get("/categories", (req, res) => {
  const connection = db;
  connection.query("SELECT * FROM book_categories", (error, result) => {
    if (error) {
      return res.status(500).send("Internal Error on Server");
    } else {
      return res.status(200).send(result.rows);
    }
  });
});

////Add author
router.post("/add/author", (req, res) => {
  const { first_name, last_name } = req.body;
  const connection = db;
  connection.query(
    "INSERT INTO authors (first_name, last_name) VALUES ($1,$2) RETURNING author_id",
    [first_name, last_name],
    (error, result) => {
      if (error) {
        res.status(500).send("Internal Error on Server");
      } else {
        res.status(201).json(result.rows[0].author_id);
      }
    }
  );
});

//Get authors
router.get("/authors", (req, res) => {
  const connection = db;
  connection.query("SELECT * FROM authors", (error, result) => {
    if (error) {
      return res.status(500).send("Internal Error on Server");
    } else {
      return res.status(200).send(result.rows);
    }
  });
});

// Get authors of the book
router.get("/bookauthors/:id", (req, res) => {
  const connection = db;
  const bookId = parseInt(req.params.id);
  connection.query(
    "SELECT * FROM books_authors JOIN authors on books_authors.author_id = authors.author_id WHERE book_id=$1;",
    [bookId],
    (error, result) => {
      if (error) {
        return res.status(500).send("Internal Error on Server");
      } else {
        return res.status(200).json(result.rows);
      }
    }
  );
});

//Delete book's author
router.delete("/deletebookauthor/", (req, res) => {
  const { book_id, author_id } = req.body;
  const connection = db;
  connection.query(
    "DELETE FROM books_authors WHERE book_id = $1 AND author_id=$2",
    [book_id, author_id],
    (error, result) => {
      if (error) {
        return res.status(500).send("Internal Server Error");
      } else {
        return res
          .status(200)
          .send(
            `The author with id ${author_id} has been deleted for the book with id ${book_id} `
          );
      }
    }
  );
});

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
