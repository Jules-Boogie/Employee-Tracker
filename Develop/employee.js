
// get required packages
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table')

// configure the connection to database

var connection = mysql.createConnection({

    // need host, port, user,password, and database
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
    //populateTables()
    

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
                "Manage Employees",
                "Quit Program"
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

            else if (answer.first === "Manage Employees") {
                manageEmployees()

            } else {
                process.exit();

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

                    //can also use 
                    console.log(Table);
                    firstSearch()
                })
            } else {
                var query1 = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name AS department, employee_role.salary FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department on employee_role.department_id = department.id "
                connection.query(query1, function (err, res) {
                    if (err) throw err;
                    const Table = cTable.getTable(res)
                    console.log(Table);
                    firstSearch()
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
        console.log(`department ${answers.depName} is created!`)
        firstSearch()
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
                viewAllTable()
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
            var query = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id"
            connection.query(query, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    options.push(res[i].first_name);// populate the names of the employees
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

    //add roles
    //delete role
    //update salary in role

    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What would you like to do to roles?",
            choices: ["Add Roles", "Update Salary of a Role ", "Delete Roles"]
        }

    ])
        .then(function (answers) {
            switch (answers.role) {
                //CREATE
                case "Add Roles":
                    addRole();
                    break;

                //UPDATE    
                case "Update Salary of a Role":
                    // populate the table
                    //then give it as choices to the user to execute the update department
                    populateTables(updateRole);


                    break;

                //DELETE    
                case "Delete Roles":
                    //populate the table
                    //then give it as choices to the user to execute the update department
                    populateTables(deleteRole);


                    // 5. Call the populate nominees function here, and pass it remove as an argument. This will give us an array of options to give to the user when they want to choose who to update;
                    break;

            }


        })



}


function addRole() {

    inquirer.prompt([{
        name: "title",
        message: "\nEnter the title of new role:\n"
    },
    {
        name: "salary",
        message: "\nEnter the salary of new role:\n"
    },
    {
        name: "departmentID",
        message: "\nEnter the department ID of new role:\n"
    }

]).then(function (answers) {
        var query = "INSERT INTO employee_role SET ?"
        connection.query(query,
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.departmentID
            }
        )
        console.log(`New Role ${answers.title} is created!`)
        firstSearch()
    })

}


function updateRole(list){
// what would you like to update
// update employee title and salary using the first name of the user.
//works just need to get a function to show the table after it makes the update
inquirer.prompt([
    {
        type: "list",
        message: "Select Employee to update their role?",
        name: "updRole",
        choices: list

    },
    {
        type: "input",
        message: "Enter the new title",
        name: "updTitle"
    },
    {
        type: "input",
        message: "Enter the new salary",
        name: "updSalary"
    }

])
    .then(function (answers) {
        var query = "UPDATE employee_role LEFT JOIN employee ON employee.role_id = employee_role.id SET ? WHERE (employee.first_name = ?)"
        
        connection.query(query, [{
           
            title: answers.updTitle,
            salary: answers.updSalary

        },answers.updRole
        ]), function (err, res) {
            console.log("Here is the Updated Department Table:");
            viewAllTable();
        }

    })



}

function deleteRole(list){
    // get a choice of all
    inquirer.prompt([
        {
            type: "list",
            message: "Select Employee to delete their role?",
            name: "delRole",
            choices: list
    
        }
    ]).then(function(answer){
        var query = "DELETE FROM employee_role LEFT JOIN employee ON employee.role_id = employee_role.id WHERE (employee.first_name = ?)"

        connection.query(query, [answer.delRole], function(err,res){
            if(err) throw err;
            console.log(`The employee, ${answer.delRole}'s role has been removed`);
        })
    })



}





function manageEmployees(){

//add employee
//delete employee
//update employee role - will need to join employee and employee role table on employee.role_id and employee_role.id
//select firstname, lastname, title, and then update title

inquirer.prompt([
    {
        type: "list",
        name: "employee",
        message: "What would you like to do with the employee table?",
        choices: ["Add to Employee", "Update Employee Title and Salary", "Delete Employee"]
    }

])
    .then(function (answers) {
        switch (answers.employee) {
            //CREATE
            case "Add to Employee":
                addEmployee();
                break;

            //UPDATE    
            case "Update Employee Title and Salary":
                
                populateTables(updateRole); //reuse function to update employee role info


                break;

            //DELETE    
            case "Delete Employee":
                //populate the table
                //then give it as choices to the user to execute the delete
                populateTables(deleteEmployee);


               
                break;

        }


    })




 }

function addEmployee(){
    inquirer.prompt([{
        name: "firstname",
        message: "\nEnter the first name of new employee:\n"
    },
    {
        name: "lastname",
        message: "\nEnter the last name of new employee:\n"
    },
    {
        name: "roleID",
        message: "\nEnter the role ID of new employee:\n"
    },
    {
        name: "managerID",
        message: "\nEnter the manager ID of new employee:\n"
    }

]).then(function (answers) {
        var query = "INSERT INTO employee SET ?"
        connection.query(query,
            {
                first_name: answers.firstname,
                last_name: answers.lastname,
                role_id: answers.roleID,
                manager_id: answers.managerID
            }
        )
        console.log(`New Employee ${answers.firstname} ${answers.lastname} has been onboarded!`)
        firstSearch()
    })
}


function deleteEmployee(list){

// populate all the employees in the table
// offer them as choices here so the user knows which 
// luckily you can use the populate function, just add list to this function. 
inquirer.prompt([
{
    type:"list",
    message:"Please select a user to remove by unique identifier",
    name:"delEmployee",
    choices:list


}
]).then(function(answers){
    var query = "DELETE FROM employee WHERE ? "
    connection.query(query, [answers.delEmployee], function(err,res){
        if(err) throw err;
        console.log("The Employee with the id:" + answers.delEmployee " has been deleted!")
    })
})


}