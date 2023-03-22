const inquirer = require("inquirer");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;

// Creating connection to MySQL database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "password",
      database: "employees_db",
    }
  );