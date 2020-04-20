
// get required packages
const inquirer = require("inquirer");
const mysql = require("mysql");
var Table = require('cli-table');
const cTable = require('console.table')

// configure the connection to database

var connection = mysql.createConnection({

    // need host, port, username,password, and database
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Jule1995!",
    database: "employee_db"

})


// establish connection to database

connection.connect(function (err) {


    if (err) throw err;
    console.log("connection established")
    // initial function 
    //firstSearch();
    populateTables()

})



// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles

// Delete departments, roles, and employees


function firstSearch() {

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "first",
            choices: [
                "View a Table",
                "Manage Department",
                "Manage Roles",
                "Manage Employees"
            ]
        }

    ])
        .then(function (answer) {
            if (answer.first === "View a Table") {
                viewAllTable()

            }
            else if (answer.first === "Manage Department") {
                manageDepartment()
            }

            else if (answer.first === "Manage Roles") {
                manageRoles()

            }

            else {
                manageEmployees()

            }

        })



}

function viewAllTable() {

    inquirer.prompt([
        {
            type: "list",
            message: "What type of table do you want to view?",
            name: "table",
            choices: [
                "department",
                "employee_role",
                "employee",
                "All Employee Info"

            ]
        }

    ])
        .then(function (answers) {
            if (answers.table === "department" || answers.table === "employee_role" || answers.table === "employee") {
                var query = `SELECT * FROM ${answers.table}`
                connection.query(query, function (err, res) {
                    const Table = cTable.getTable(res)
                    console.log(Table);
                })
            } else {
                var query1 = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name AS department, employee_role.salary FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department on employee_role.department_id = department.id "
                connection.query(query1, function (err, res) {
                    if (err) throw err;
                    const Table = cTable.getTable(res)
                    console.log(Table);
                })
            }


        })




}



//department stuff


function manageDepartment() {
    inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "What would you like to do",
            choices: ["Add Departments", "Update Departments", "Delete a Department"]
        }

    ])
        .then(function (answers) {
            switch (answers.department) {
                //CREATE
                case "Add Departments":
                    addDepartment();
                    break;

                //UPDATE    
                case "Update Departments":
                    // populate the table
                    //then give it as choices to the user to execute the update department
                    populateTables(updateDepartment);



                    break;

                //DELETE    
                case "Delete a Department":
                    //populate the table
                    //then give it as choices to the user to execute the update department
                    populateTables(deleteDepartment);


                    // 5. Call the populate nominees function here, and pass it remove as an argument. This will give us an array of options to give to the user when they want to choose who to update;
                    break;

            }


        })

}



// add

function addDepartment() {
    inquirer.prompt([{
        name: "depName",
        message: "\nEnter the name of the department:\n"
    }]).then(function (answers) {
        var query = "INSERT INTO department SET ?"
        connection.query(query,
            {
                name: answers.depName
            }
        )
    })
}


// update
function updateDepartment(list) {
    inquirer.prompt([
        {
            type: "list",
            message: "Select Department to update by ID ?",
            name: "update",
            choices: list

        },
        {
            type: "input",
            message: "Enter the new department name",
            name: "department"
        }

    ])
        .then(function (answers) {
            var query = "UPDATE department SET ? WHERE ?"
            connection.query(query, [{
                name: answers.department
            },
            {
                id: answers.update
            }


            ]), function (err, res) {
                console.log("Here is the Updated Department Table:");
                viewAllTable();
            }

        })

}



//delete
function deleteDepartment(list) {

    inquirer.prompt([{
        name: "delete",
        type: "list",
        choices: options,
        message: "Which Department do you want to remove"
    }]).then(function (answer) {
        var query = "DELETE FROM department WHERE ?"
        connection.query(query, {
            id: answers.delete
        }),
            function (err, res) {
                console.log("Here is the updated department:")
                review()
            }

    })

}
//populate table for choices
function populateTables(crud) {

    inquirer.prompt([
        {
            type: "list",
            message: "What type of table do you want to populate?",
            name: "populate",
            choices: [
                "department",
                "employee_role",
                "employee"
            ]
        }

    ]).then(function (answers) {

        if (answers.populate === "department") {
            options = [];
            var query = "SELECT * FROM department"
            connection.query(query, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    options.push(res[i].id);
                }
                console.log(options)
                crud(options)



            })
        }
        else if (answers.populate === "employee_role") {
            options = [];
            var query = "SELECT * FROM employee_role"
            connection.query(query, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    options.push(res[i].department_id);//update employee role
                }
                console.log(options)
                crud(options)



            })
        } else {
            options = [];
            var query = "SELECT * FROM employee"
            connection.query(query, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    options.push(res[i].role_id); //update employee
                }
                console.log(options)
                crud(options)
            })
        }

    })
}




function manageRoles() {




}


// function manageEmployees(){



// }