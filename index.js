const inquirer = require('inquirer');
require('dotenv').config();

const { allDepts } = require('./queryFunctions')
const empList = [];
const opt = ["ALL_DEPT", "ALL_ROLES"];
const deptQuestion = [
    {
        type: 'input',
        name: 'department',
        message: 'Enter name of department.',
    },
];
const roleQuestion = [
    {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of role',
    },
    {
        type: 'input',
        name: 'roleName',
        message: 'Enter salary for role',
    },
    {
        type: 'input',
        name: 'roleDept',
        message: 'Enter the department role belongs to.'
    },
];
const empQuestion = [
    {
        type: 'input',
        name: 'firstName',
        message: "Enter employee's first name.",
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter employee's last name.",
    },
    {
        type: 'input',
        name: 'empRole',
        message: "Enter the employee's role.",
    },
    {
        type: 'input',
        name: 'EmpManager',
        message: "Enter Employee's Manager."
    },
];
const updateQuestion = [
    {
        type: 'list',
        name: 'updateEmp',
        message: "Select Employee who's role you want to update.",
        choices: empList,
    }
];
const menuQuestion = [
    {
        type: "list",
        name: 'menu',
        message: "What would you like to do?",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quite'],
    },
]

function startApp() {
    inquirer.prompt().then((answers) => {
        switch (answers.)
    }

startApp();


