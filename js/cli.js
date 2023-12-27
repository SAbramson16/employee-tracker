const inquirer = require('inquirer');
const Database = require('./database.js');
const table = require('console.table');

let actions = [
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a department', 
    'Add a role', 
    'Add an employee', 
    'Update an employee role'
]

let viewDepartments = 'View all departments';
let viewRoles = 'View all roles'; 
let viewEmployees = 'View all employees'; 
let addDepartment = 'Add a department'; 
let addRole = 'Add a role'; 
let addEmployee = 'Add an employee'; 
let updateEmployeeRole = 'Update an employee role';


const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: actions
    },
];

const addDep =[
    {
        type: 'input',
        name: 'addDepartment',
        message: 'Please enter a department to add.',
    },
]

class CLI {
    constructor(db) {
        this.db = new Database(db);
    }
    run() {
        return inquirer.prompt(questions)
        .then ((answer) => {
            // console.log(answer);

            switch(answer.options) {
                //View all departments
                case viewDepartments:
                    this.db.displayDepartments();
                    break;
                case viewRoles:
                    this.db.displayRoles();
                    break;
                case viewEmployees:
                    this.db.displayEmployees();
                    break;
                case addDepartment: 
                    let addDepPrompt = inquirer.prompt(addDep)
                    .then((answer) => {     
                        this.db.addDepartment(answer.addDepartment);        
                    });
                    break;
                case addRole:
                    this.db.addRole();
                    break;
                case addEmployee:
                    this.db.addEmployee();
                    break;
                case updateEmployeeRole:
                    this.db.updateRole();
                    break;
            }
        }) 
    }
}

module.exports = CLI;