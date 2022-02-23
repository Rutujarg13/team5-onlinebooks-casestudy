const body_parser = require("body-parser");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "onlinebooks",
  password: "root",
  port: 5432,
});

function getProducts(req, res) {
  pool.query("SELECT * FROM books", (error, result) => {
    if (error) {
      return res.status(500).send("Internal Error on Server");
    } else {
      return res.status(200).send(result.rows);
    }
  });
}

//add product
function addBook(req, res) {
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
  pool.query(
    "SELECT author_id FROM authors WHERE (first_name=$1 AND last_name=$2)",
    [first_name, last_name],
    (error, result) => {
      if (error) {
        return error;
      } else {
        if (result.rows.length > 0) {
          authorId = result.rows[0].author_id;
        } else {
          pool.query(
            "INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING author_id",
            [first_name, last_name],
            (error, result) => {
              if (error) {
                return error;
              } else {
                authorId = result.rows[0].author_id;
              }
            }
          );
        }
        var bookId;
        pool.query(
          "INSERT INTO books (title, publisher_id, price, quantity, description, category_id, cover) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING book_id",
          [
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
              return res.status(500).send("Internal Error on Server");
            } else {
              bookId = result.rows[0].book_id;
              result = insertBookAuthor(bookId, authorId);
              if (result != "error") {
                res.status(201).send(`Book added `);
              } else {
                res.status(500).send("Internal Error on Server");
              }
            }
          }
        );
      }
    }
  );
}

function getDiscounts(req, res) {
  res.send("This is discounts function");
}

function insertBookAuthor(bookId, authorId) {
  pool.query(
    "INSERT INTO books_authors (author_id, book_id) VALUES ($1, $2)",
    [bookId, authorId],
    (error, result) => {
      if (error) {
        return "error";
      } else {
        return;
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

module.exports = { getProducts, getDiscounts, addBook };