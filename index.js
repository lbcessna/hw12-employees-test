const mysql = require("mysql");
const inquirer = require("inquirer");
const { getTable } = require("console.table");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // your port if not 3306
    port: 3306,
    // your username
    user: "root",

    //Your password
    password: "password",
    database: "employees_db"
});

connection.connect(err => {
    if (err) throw err;
    mainMenu();
});

const addDeptRoleEmpData = () => {
    console.log("You selected the addDeptRoleEmpData function");
}
const viewDeptRoleEmpData = () => {
    connection.query("SELECT first_name, last_name, title, salary FROM employee INNER JOIN role USING (id)", (err, results) => console.table(results))
}

const updateRoles = () => {
    console.log("You selected the updateRoles function");
}
const mainMenu = () => {
    inquirer.prompt([
        {
            name: "menuChoice",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add departments, roles, employees", "View departments, roles, employees", "Update employee roles", "Quit"]
        }]).then(({ menuChoice }) => {
            switch (menuChoice) {
                case "Add departments, roles, employees":
                    addDeptRoleEmpData()
                    break;
                case "View departments, roles, employees":
                    viewDeptRoleEmpData();
                    break;
                case "Update employee roles":
                    updateRoles();
                    break
                case "Quit":
                    console.log("Bu-bye");
                    connection.end()
                    break;
                default:
                    mainMenu();
                    break;
            }
        })
}

function viewAllEmployees() {
    console.log("Look at all these employees!");
}