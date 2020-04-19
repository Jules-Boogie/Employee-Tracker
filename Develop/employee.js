
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

connection.connect(function(err){


    if (err) throw err;
    console.log("connection established")
    // initial function 
    firstSearch();

})



// Add departments, roles, employees

// View departments, roles, employees

// Update employee roles

// Delete departments, roles, and employees


function firstSearch(){

    inquirer.prompt([
        { 
            type:"list",
            message:"What would you like to do?",
            name:"first",
            choices:[
                "View a Table",
                "Manage Department",
                "Manage Roles",
                "Manage Employees"
            ]
        }

    ])
    .then(function(answer){
        if(answer.first === "View a Table"){
            viewTable()

        }
        else if(answer.first === "Manage Department"){
            manageDepartment()
        }

        else if(answer.first === "Manage Roles"){
            manageRoles()

        }

        else {
            manageEmployees()

        }

    })



}

function viewTable(){

    inquirer.prompt([
        {
            type:"list",
            message:"what type of table do you want to view",
            name:"table",
            choices:[
                "department",
                "employee_role",
                "employee",
               
            ]
        }

    ])
    .then(function(answers){
        var query = `SELECT * FROM ${table} `
        connection.query(query, function(err,res){
           const Table =  cTable.getTable(res)
           console.log(Table);
        })


    })



}








function manageDepartment(){
    inquirer.prompt([
        {
            type: "list",
            name: "department",
            message: "What would you like to do",
            choices: ["Add Departments","Update Departments", "Delete a Department"]
        }

    ])
    .then(function(answers){
        switch (answers.department) {
            //CREATE
            case "Add Departments":
                addDepartment();
                break;

            //UPDATE    
            case "Update Departments":
                // populate the table
                //then give it as choices to the user to execute the update department 


                // 4. Call the populate nominees function here, and pass it updateRating as an argument. This will give us an array of options to give to the user when they want to choose who to update;
                break;

            //DELETE    
            case "Delete a Department":
                //populate the table
                //then give it as choices to the user to execute the update department 


                // 5. Call the populate nominees function here, and pass it remove as an argument. This will give us an array of options to give to the user when they want to choose who to update;
                break;

        }


    })

}






















// function manageRoles(){



    
// }


// function manageEmployees(){


    
// }