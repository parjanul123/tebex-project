require("dotenv").config(); // Load environment variables
const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "test",
  ssl:  false 
};

let connection;

async function connectToDatabase() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(dbConfig);
      console.log("Connected to MySQL database.");

      // Create the users table if it doesn't exist
      const createUsersTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
          );
        `;
      await connection.execute(createUsersTableQuery);
      console.log("Users table is ready.");

      // Create the cart table if it doesn't exist
      const createCartTableQuery = `
          CREATE TABLE IF NOT EXISTS cart (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            quantity INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          );
        `;
      await connection.execute(createCartTableQuery);
      console.log("Cart table is ready.");
    } catch (error) {
      console.error("Error connecting to MySQL database:", error);
      throw error; // Throw the error to handle it properly in the caller function
    }
  }
  return connection;
}

module.exports = { connectToDatabase };
