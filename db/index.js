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

  // Function that will view all data from all the departments
  function viewAllDepartments() {
    db.query("SELECT * FROM department", function (err, results) {
      if (err) throw err;
      console.table(results);
    });
  }

  // Function that will view all data from all the roles
  function viewAllRoles() {
    db.query("SELECT * FROM roles", function (err, results) {
      if (err) throw err;
      console.table(results);
    });
  }

  // Function that will view all data from all the employees
  function viewAllEmployees() {
    db.query("SELECT * FROM employees", function (err, results) {
      if (err) throw err;
      console.table(results);
    });
  }