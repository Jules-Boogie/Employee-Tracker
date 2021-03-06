# Employee Tracker App
Welcome to the Employee Tracker Repository!
## Summary 
This is a commandline application that lets a user view or manage/interact with different tables in a database. The app uses Express js, console.table, inquirer prompt, and the SQL workbench. 

## Employee Tracker App Video

[MP4 of the App](https://github.com/Jules-Boogie/Employee-Tracker/blob/master/Assets/bandicam%202020-04-22%2000-47-19-488.mp4)



## Employee Tracker App Photos

![App Photo](https://github.com/Jules-Boogie/Employee-Tracker/blob/master/Assets/Capture.PNG)


![App Photo](https://github.com/Jules-Boogie/Employee-Tracker/blob/master/Assets/Capture1.PNG)


# Technologies Used
| Technologies | Description  |
|---------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------:|
| [Nodejs](https://nodejs.org/en/docs/)                                     |             Node.js is designed to build scalable network applications.                 |
| [Inquirer](https://www.npmjs.com/package/inquirer/v/0.2.3)                |           Inquirer.js   provides the user interface and the inquiry session flow           |
| [MYSQL](https://www.mysql.com/)                              |           Open source relational database management system.              |


## Code Snippet
The code below shows the first function that is executed once the connection between express and sql has been established. This function is called inside the connection.connect function. Once the user connects to the sql database, he or she is prompted to choose if they want to view a table or manage the various tables in the database. Based on the selection of the user, subsequent functions are then executed. There is also a prompt to end the program which gives the user an easy way to end the process. 
```
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
```


## Clone Repository
 - Clone this repo to your local machine using ```git clone git@github.com:Jules-Boogie/employee-tracker-1.git ``` with terminal in the directory of your choice. 



## Installation Procedures
```
$ npm init -y 
$ npm install express
$ npm install inquirer
$ npm install cli-table
$ npm install console.table
$npm install mysql

```


## Author Links

**Author:**
Juliet George

**Contact:**
[LinkedIn](https://www.linkedin.com/in/juliet-george-864950b8/)
