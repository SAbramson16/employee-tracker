const inquirer = require('inquirer');
const Database = require('./database.js');

let actions = [
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a department', 
    'Add a role', 
    'Add an employee', 
    'Update an employee role'
]

const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: actions
    }
];

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
                case actions[0]:
                    this.db.displayDepartments();
                    break;
            }
        }) 
    }
}

module.exports = CLI;