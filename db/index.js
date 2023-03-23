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

// Function that will add a new department
function addDepartment() {
  const newDepartment = () => {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the name of the department!");
              return false;
            }
          },
        },
      ])
      .then((answers) => {
        console.log(answers);
        db.query(
          "INSERT INTO department SET ?",
          { dept_name: answers.name },
          function (err, res) {
            if (err) throw err;
            console.clear();
            console.log(res.affectedRows + " department inserted!\n");
          }
        );
      })
      .then(() => {
        console.log("Department added!");
        menu();
      })
      .catch((err) => console.log(err));
  };
  newDepartment();
}

// Function that will add a new role
function addRole() {
  console.log("Adding a role");
  db.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    // assign the results to a variable that can be used in the inquirer prompt
    const departments = res;

    const roleQuestions = () => {
      return inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "department_id",
            message: `What is the name of the department?`,
            choices: departments.map((department) => ({
              name: department.dept_name,
              value: department.id,
            })),
          },
        ])
        .then((answers) => {
          console.log(answers);
          db.query(
            "INSERT INTO roles SET ?",
            {
              title: answers.title,
              salary: answers.salary,
              dept_id: answers.department_id,
            },
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " role inserted!\n");
            }
          );
        })
        .then(() => {
          console.log("New role has ben added!");
          menu();
        })
        .catch((err) => console.log(err));
    };
    roleQuestions();
  });
}