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
    inquirer.prompt([
        {
            name: "addChoice",
            type: "list",
            message: "What would you like to add?",
            choices: ["Add department", "Add role", "Add employee"]
        }]).then(({ addChoice }) => {
            switch (addChoice) {
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    console.log("Enough people work here already!");
                    break;
                default:
                    mainMenu();
                    break;
            }
        })
    // connection.query("SELECT first_name, last_name, title, salary FROM employee INNER JOIN role USING (id)", (err, results) =>{ console.table(results) 
    // setTimeout(mainMenu, 2000)
    // })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            name: "name",
            type: "text",
            message: "What is the new department's name?",
        }]).then(({ name }) => {
            connection.query("INSERT INTO department SET ?", {
                name: name
            }, (err, results) => {
                if (err) throw err
                console.log("******************");
                console.log("New Department Added!");
                console.log("******************");
                setTimeout(mainMenu, 5000)
            })
        })
}
const addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "text",
            message: "What is the new title?",
        },
    {
        name: "salary",
        type: "number",
        message: "What is the salary for this title?",
    }]).then(({ title, salary }) => {
            connection.query("INSERT INTO role SET ?", {
                title: title,
                salary: salary
            }, (err, results) => {
                if (err) throw err
                console.log("******************");
                console.log("New Role Added!");
                console.log("******************");
                setTimeout(mainMenu, 5000)
            })
        })
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