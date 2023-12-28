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
];



class CLI {
    constructor(db) {
        this.db = new Database(db);
    }

    rolePrompt(rows) {
        const addJobRole =[
            {
                type: 'input',
                name: 'addRoleName',
                message: 'Please enter a job role.',
            },
            {
                type: 'input',
                name: 'addRoleSalary',
                message: 'Please enter a salary for added role',
            },
            {
                type: 'list',
                name: 'depOptions',
                message: 'Please select a department for the added role.',
                choices: rows,
            }
        ];            

        return inquirer.prompt(addJobRole)
            .then((answers) => {
                console.log(answers);
                let dept = rows.find(row => row.name === answers.depOptions)
                this.db.addRole(answers.addRoleName, answers.addRoleSalary, dept.id)
                .then(() => {
                    this.run();
                }); 
            });
    }

    employeePrompt(roles, empNames) {
        roles.forEach(role => {
            Object.assign(role, { name: role.title });
            delete role.title;
        });
        empNames.forEach(emp => {
            Object.assign(emp, { name: emp.first_name + " " + emp.last_name });
            delete emp.first_name;
            delete emp.last_name;
        });
        empNames.push({
           name: "NULL" 
        });

        const addNewEmployee = [
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter employees first name.',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter employees last name.',
            },
            {
                type: 'list',
                name: 'roleOptions',
                message: 'Please select a job role for new Employee.',
                choices: roles
            },
            {
                type: 'list',
                name: 'managerOptions',
                message: 'Please select a manager for new Employee (or NULL).',
                choices: empNames
            },
        ];
        return inquirer.prompt(addNewEmployee)
            .then((answers) => {
                console.log(answers);
                let role = roles.find(row => row.name === answers.roleOptions);
                if (answers.managerOptions === "NULL") {
                    this.db.addEmployee(answers.firstName, answers.lastName, role.id, "NULL")
                    .then(() => {
                        this.run();
                    });    
                } else {
                    let manager = empNames.find(row => row.name === answers.managerOptions);
                    this.db.addEmployee(answers.firstName, answers.lastName, role.id, manager.id)
                    .then(() => {
                        this.run();
                    }); 
                }
                
            });
    }

    updatePrompt(roles, empNames) {
        roles.forEach(role => {
            Object.assign(role, { name: role.title });
            delete role.title;
        });
        empNames.forEach(emp => {
            Object.assign(emp, { name: emp.first_name + " " + emp.last_name });
            delete emp.first_name;
            delete emp.last_name;
        });
        empNames.push({
           name: "NULL" 
        });

        const update = [
            {
                type: 'list',
                name: 'employeeList',
                message: 'Please select an employee to update.',
                choices: empNames
            },
            {
                type: 'list',
                name: 'roleList',
                message: 'What role would you like to assign to this employee?',
                choices: roles
            },
        ];
        
        return inquirer.prompt(update)
        .then ((answer) => {
            let role = roles.find(row => row.name === answer.roleList);
            let employee = empNames.find(row => row.name === answer.employeeList);
            console.log(answer);
            this.db.updateRole(role.id, employee.id)
            .then(() => {
                this.run();
            })
            .catch((err) => {
                console.error(err);
                this.run();
            });
        });
    }

    run() {
        
        return inquirer.prompt(questions)
        .then ((answer) => {
            // console.log(answer);

            switch(answer.options) {
                //View all departments
                case viewDepartments:
                    this.db.displayDepartments()
                    .then((rows) => {
                        console.table(rows);
                        this.run();
                    }); 
                    break;
                case viewRoles:
                    this.db.displayRoles()
                    .then((rows) => {
                        console.table(rows);
                        this.run();
                    });
                    break;
                case viewEmployees:
                    this.db.displayEmployees()
                    .then((rows) => {
                        console.table(rows);
                        this.run();
                    });
                    break;
                case addDepartment: 
                    inquirer.prompt(addDep)
                    .then((answer) => {     
                        this.db.addDepartment(answer.addDepartment)
                        .then(() => {
                            this.run();
                        });       
                    });
                    break;
                case addRole:
                    this.db.displayDepartments()
                    .then((rows) => {
                        this.rolePrompt(rows);
                    }); 
                    break;
                case addEmployee:
                    this.db.getRoleTitles().then((roles) => {
                        this.db.getEmployeeNames().then((names) => {
                            this.employeePrompt(roles, names);
                        })
                        
                    });
                    break;
                case updateEmployeeRole:
                    this.db.getEmployeeNames().then((employeeNames) => {
                        this.db.getRoleTitles().then((roles) => {
                            this.updatePrompt(roles, employeeNames);
                        })
                    });
                    break;
            }
        }) 
    }
}

module.exports = CLI;