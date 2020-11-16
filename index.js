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
                    addEmployee();
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
    connection.query("SELECT * FROM department", (err, results) => {
        if (err) throw err
        inquirer.prompt([
            {
                name: "title",
                type: "text",
                message: "Please enter the new title?",
            },
            {
                type: "rawlist",
                name: "name",
                message: "Please select their department?",
                choices: function () {
                    const choicesArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choicesArray.push(results[i].name)
                    }
                    return choicesArray
                }
            },
            {
                name: "salary",
                type: "number",
                message: "What is the salary for this title?"
            }]).then(({ title, salary }) => {
                const [foundDept] = results.filter(name => name.name)
                connection.query("INSERT INTO role SET ?", {
                    department_id: foundDept.id,
                    title: title,
                    salary: salary,
                }, (err, results) => {
                    if (err) throw err
                    console.log("******************");
                    console.log("New Role Added!");
                    console.log("******************");
                    setTimeout(mainMenu, 5000)
                })
            })

    })
};
const addEmployee = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err
        inquirer.prompt([
            {
                name: "first_name",
                type: "text",
                message: "Please enter their first name?",
            },
            {
                name: "last_name",
                type: "text",
                message: "And their last name?"
            },
            {
                name: "title",
                type: "rawlist",
                message: "Please select the employee's title?",
                choices: function () {
                    const choicesArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choicesArray.push(results[i].title)
                    }
                    return choicesArray
                }
            },
            {
                type: "rawlist",
                name: "manager",
                message: "Please select their manager:",
                choices: function(){
                    const choicesArray = [];
                    for(let i=0; i<results.length; i++){
                        choicesArray.push(results[i].employee)
                    }
                    return choicesArray
                }

            },
        ]).then(({ title, salary }) => {
            const [foundTitle] = results.filter(title => title.title)
            connection.query("INSERT INTO employee SET ?", {
                department_id: foundDept.id,
                title: title,
                salary: salary,
            }, (err, results) => {
                if (err) throw err
                console.log("******************");
                console.log("New Employee Added!");
                console.log("******************");
                setTimeout(mainMenu, 5000)
            })
        })

    })
};
const viewDeptRoleEmpData = () => {
    connection.query("SELECT first_name, last_name, title, salary FROM employee INNER JOIN role USING (id)", (err, results) => console.table(results))
    inquirer.prompt([
        {
            name: "viewChoice",
            type: "list",
            message: "What list would you like to view?",
            choices: ["View department", "View roles", "View employees"]
        }]).then(({ addChoice }) => {
            switch (addChoice) {
                case "View department":
                    viewDepartment();
                    break;
                case "View roles":
                    viewRole();
                    break;
                case "View employee":
                    addEmployee();
                    break;
                default:
                    mainMenu();
                    break;
            }
        })
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