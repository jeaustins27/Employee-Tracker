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

// Function that will add a new employee
function addEmployee() {
  console.log("Adding an employee");
  db.query("SELECT * FROM roles;", function (err, res) {
    if (err) throw err;
    const roles = res;

    db.query("SELECT * FROM employee;", function (err, res) {
      if (err) throw err;
      const managers = res;

      const newEmployee = () => {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "first_name",
              message: "What is the employee's first name?",
            },
            {
              type: "input",
              name: "last_name",
              message: "What is the employee's last name?",
            },
            {
              type: "list",
              name: "role_id",
              message: "What is the employee's role?",
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
            {
              type: "list",
              name: "manager_id",
              message: "Who is the employee's manager?",
              choices: managers.map((manager) => ({
                name: manager.first_name + " " + manager.last_name,
                value: manager.id,
              })),
            },
          ])
          .then((answers) => {
            console.log(answers);
            db.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id,
              },
              function (err, res) {
                if (err) throw err;
                console.clear();
                console.log(res.affectedRows + " employee inserted!\n");
              }
            );
          })
          .then(() => {
            console.log("New employee has been added!");
            menu();
          })
          .catch((err) => console.log(err));
      };

      newEmployee();
    });
  });
}

// Function that will update the role of an employee
function updateEmployeeRole() {
  console.log("Updating an employee's role");
  db.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    const employees = res;
    db.query("SELECT * FROM roles;", function (err, res) {
      if (err) throw err;
      const roles = res;

      const updateEmployeeQuestions = () => {
        return inquirer
          .prompt([
            {
              type: "list",
              name: "employee_id",
              message: "What is the employee's name?",
              choices: employees.map((employee) => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
              })),
            },
            {
              type: "list",
              name: "role_id",
              message: "What is the employee's new role?",
              choices: roles.map((role) => ({
                name: role.title,
                value: role.id,
              })),
            },
          ])
          .then((answers) => {
            console.log(answers);
            db.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [answers.role_id, answers.employee_id],
              function (err, res) {
                if (err) throw err;
                console.clear();
                console.log(res.affectedRows + " employee updated!\n");
              }
            );
          })
          .then(() => {
            console.log("Employee's role has been updated!");
            menu();
          })
          .catch((err) => console.log(err));
      };
      updateEmployeeQuestions();
    });
  });
}

// Function that will update the manager of an employee
function updateEmployeeManager() {
  console.log("Updating an employee's manager");
  db.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    const employees = res;
    db.query("SELECT * FROM employee;", function (err, res) {
      if (err) throw err;
      const managers = res;

      const updateEmpManagerQ = () => {
        return inquirer
          .prompt([
            {
              type: "list",
              name: "employee_id",
              message: "What is the name of the employee?",
              choices: employees.map((employee) => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
              })),
            },
            {
              type: "list",
              name: "manager_id",
              message: "What is the name of the employee's manager?",
              choices: managers.map((manager) => ({
                name: manager.first_name + " " + manager.last_name,
                value: manager.id,
              })),
            },
          ])
          .then((answers) => {
            console.log(answers);
            db.query(
              "UPDATE employee SET manager_id = ? WHERE id = ?",
              [answers.manager_id, answers.employee_id],
              function (err, res) {
                if (err) throw err;
                console.clear();
                console.log(res.affectedRows + " employee updated!\n");
              }
            );
          })
          .then(() => {
            console.log("Employee's manager has been updated!");
            menu();
          })
          .catch((err) => console.log(err));
      };
      updateEmpManagerQ();
    });
  });
}

// Function that will view all employees by manager
function viewEmployeesByManager() {
  console.log("Viewing employees by manager");
  db.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    const managers = res;

    const employeeByManager = () => {
      return inquirer
        .prompt([
          {
            type: "list",
            name: "manager_name",
            message: "What is the manager's name?",
            choices: managers.map((manager) => ({
              name: manager.first_name + " " + manager.last_name,
              value: [manager.first_name, manager.last_name],
            })),
          },
        ])
        .then((answers) => {
          console.log(answers);
          db.query(
            `SELECT 
        employee.id,
        employee.first_name,
        employee.last_name,
        roles.title,
        department.dept_name,
        roles.salary,
        employee.manager_id,
        CONCAT(m.first_name, m.last_name) as manager
    
    FROM employee
    LEFT JOIN roles
        ON employee.role_id = roles.id
    LEFT JOIN department
        ON roles.dept_id = department.id
    LEFT JOIN employee as e
        ON employee.id = e.manager_id
    LEFT JOIN employee as m
        ON employee.manager_id = m.id
    WHERE m.first_name = ? AND m.last_name = ?`,
            [answers.manager_name[0], answers.manager_name[1]],
            function (err, res) {
              if (err) throw err;
              console.clear();
              console.table(res);
            }
          );
        })
        .then(() => {
          menu();
        })
        .catch((err) => console.log(err));
    };
    employeeByManager();
  });
}