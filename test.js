require('dotenv').config();
const inquirer = require('inquirer');

const db = require('./db/queryFunctions')
// console.log(db.viewAllDepts().then(data=>data));
const menuQuestion = [
    {
        type: "list",
        name: 'menu',
        message: "What would you like to do?",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    }
];

function start(){

    inquirer.prompt(menuQuestion).then(answers=>{
        console.log(answers)
    swtichStatement(answers)
    })
}

start();

function allDepts(){
     db.viewAllDepts()
     .then(data=>console.log(data[0]))
    // menu()
}

// console.log(allEmployee());

function swtichStatement(answers){
    switch (answers.menu){
        case 'View All Employees':
            allDepts();
            break
        // case 'Add Employee':
        //     addEmp()
        //     break
        // case 'Update Employee Role':
        //     updateEmp()
        //     break
        // case 'View All Roles':
        //     allRoles()
        //     break
        // case 'Add Role':
        //     addRoles()
        //     break
        // case 'View All Departments':
        //     allDepts()
        //     break
        // case 'Add Department':
        //     addDept()
        //     break
        // case 'Quit':
        //     quit()
        //     break
    }
    start();
}