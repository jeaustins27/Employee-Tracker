const employeeTracker = require("./db/index");

function init() {
    employeeTracker.menu();
}

// Initialize the app
init();