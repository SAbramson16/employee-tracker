const const inquirer = require('inquirer');


let firstOptions = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']

const questions = [
    {
        type: 'list',
        name: 'options1',
        message: 'What would you like to do?',
        choices: firstOptions
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Please enter a colour for the text.',
    },
    {
        type: 'list',
        name: 'shapes',
        message: 'Please select square, triangle or circle',
        choices: shapeChoices
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Please enter a colour for the shape.'
    },
]
