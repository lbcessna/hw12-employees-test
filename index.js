const mysql = require("mysql");
const inquirer = require("inquirer");

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
    if(err) throw err;
    loadEmployees();
});

function loadEmployees(){
    inquirer.prompt([
        {
            name: "choice",
            type:"list",
            message:"What would you like to do?",
            choices: ["View Employees", "Quit"]
        }
    ]).then(answers =>{
        if(answers.choice==="View Employees"){
            viewAllEmployees();
        }else {
            console.log("bu-bye");
            connection.end();
        }
    })
}

function viewAllEmployees(){
    console.log("Look at all these employees!");
}