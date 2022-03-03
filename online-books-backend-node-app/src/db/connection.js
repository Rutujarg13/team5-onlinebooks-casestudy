// database connection configuartion  code
const Pool = require("pg").Pool;

console.log("db");

// database connection
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "online_books",
  password: "root",
  port: 5432,
});
module.exports = db;