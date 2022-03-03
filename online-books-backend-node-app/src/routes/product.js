const express = require("express");
const db = require("../db/connection");
const router = express.Router();

console.log("product route");

router.use(express.json());



// endpoint - http://localhost:3000/api/products - GET--->to display all books
router.get("", (req, res) => {

  const connection = db;

  connection.query(
    "SELECT * from books order by book_id ",
    (error, result) => {
      
      if (error) {
        return res.status(500).send("Internal Error on Server");
        
      } else {

        return res.status(200).send(result.rows);
      }

    }
  );
});

// endpoint - http://localhost:3000/api/products/category - GET--->to display all category of books
router.get("/category", (req, res) => {

  const connection = db;

  connection.query(
    "SELECT * from book_categories ",
    (error, result) => {
      
      if (error) {
        return res.status(500).send("Internal Error on Server");
        
      } else {

        return res.status(200).send(result.rows);
      }

    }
  );
});


// endpoint - http://localhost:3000/api/products/price/desc
router.get("/price/desc", (req, res) => {

    const connection = db;
  
    //min=req.body.price;
    //max=req.body.price;
   
    connection.query(
      `SELECT title,price,description,cover from books order by price DESC`,
      (error, result) => {
        
        if (error) {
          return res.status(500).send("Internal Error on Server");
          
        } else {
  
          return res.status(200).send(result.rows);
        }
  
      
      }
    );
  });


  // endpoint - http://localhost:3000/api/products/price/asc
router.get("/price/asc", (req, res) => {

  const connection = db;

  //min=req.body.price;
  //max=req.body.price;
 
  connection.query(
    `SELECT title,price,description,cover from books order by price ASC`,
    (error, result) => {
      
      if (error) {
        return res.status(500).send("Internal Error on Server");
        
      } else {

        return res.status(200).send(result.rows);
      }

    
    }
  );
});


  // To get details of books based on discount -- Best Offer.endpoint - http://localhost:3000/api/products/discount
  router.get("/discount", (req, res) => {

    const connection = db;
  
    connection.query(
      "select title,price,description,discount from books join product_discounts on(books.book_id=product_discounts.book_id)",
      (error, data) => {
        const result = {};
        if (error) {
          throw error;
        } else {
          result["data"] = data.rows;
        }
  
        res.send(result);
      }
    );
  });

// To get books based on ratings. -- Top rating books.endpoint - http://localhost:3000/api/products/rating/desc
router.get("/rating/desc", (req, res) => {

    const connection = db;
  
    connection.query(
      "select title,price,description,rating,cover,rating from books join reviews on(books.book_id=reviews.book_id) order by rating desc",
      (error, result) => {
      
        if (error) {
          return res.status(500).send("Internal Error on Server");
          
        } else {
  
          return res.status(200).send(result.rows);
        }
  
      
      }
    );
  });


  //////http://localhost:3000/api/products/book-detail

  router.get("/book-detail/:book_id", (req, res) => {
    const {book_id} = req.params;
    const connection = db;
  
    connection.query(
      `select * from Details_view where book_id= ${book_id};`,
      (error, result) => {
      
        if (error) {
          return res.status(500).send("Internal Error on Server");
          
        } else {
  
          return res.status(200).send(result.rows);
        }
  
      
      }
    );
  });



//   // To get books based on ratings. -- Top rating books.endpoint - http://localhost:3000/api/products/rating/asc
// router.get("/rating/asc", (req, res) => {

//   const connection = db;

//   connection.query(
//     "select title,price,description,rating,cover,rating from books join reviews on(books.book_id=reviews.book_id) order by rating ASC",
//     (error, result) => {
    
//       if (error) {
//         return res.status(500).send("Internal Error on Server");
        
//       } else {

//         return res.status(200).send(result.rows);
//       }

    
//     }
//   );
// });

/*// Search by title:
router.get("/search", (req, res) => {

    const connection = db;
  
    title = req.body.title;
  
    connection.query(
  
      `SELECT * from books where title LIKE '%${title}%'`,
  
      (error, data) => {
  
        const result = {};
  
        if (error) {
  
          throw error;
  
        } else {
  
          result["data"] = data.rows;
  
        }
  
        res.send(result);
  
      }
  
    );
  
  });*/


// search by title,author  http://localhost:3000/api/products/search/title-author
router.post("/search/title-author", (req, res) => {

    const connection = db;
  
    //title = req.body.title;
    // full_name = req.body.full_name;
    const {title,full_name} = req.body;
    
    connection.query(
  
      `select title,author.author_name from books
      join books_authors on (books.book_id=books_authors.book_id)
      join author on(books_authors.author_id=author.author_id) where title LIKE '%${title}%' or author.author_name LIKE '%${full_name}%'`,
  
      (error, data) => {
  
        const result = {};
  
        if (error) {
  
          throw error;
  
        } else {
  
          result["data"] = data.rows;
  
        }
  
        res.json(result);
  
      }
  
    );
  
  });


// filter by category  endpoint: http://localhost:3000/api/products/category/1
router.get("/category/:category_id", (req, res) => {

    const connection = db;
  
    //c_name = req.body.category_name;
      c_id=req.params.category_id

  
    connection.query(
  
      //`select title,category_name from books 
      //join book_categories on(books.category_id=book_categories.category_id) where category_name='${c_name}';`,

      `select book_id,title,category_name,cover,description,price from books 
      join book_categories on(books.category_id=book_categories.category_id) where books.category_id='${c_id}'`,
  
      (error, result) => {
      
        if (error) {
          return res.status(500).send("Internal Error on Server");
          
        } else {
  
          return res.status(200).send(result.rows);
        }
  
      
      }
    );
  
  });




module.exports = router;
