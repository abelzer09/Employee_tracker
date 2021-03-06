require('dotenv').config();
const inquirer = require('inquirer');
const cTable = require('console.table');
const logo = require("asciiart-logo");
const db = require('./db/queryFunctions');
const { viewAllRoles } = require('./db/queryFunctions');
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
        name: 'roleSal',
        message: 'Enter salary for role',
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
    }
];
const menuQuestion = [
    {
        type: "list",
        name: 'menu',
        message: "What would you like to do?",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    }
];

function swtichStatement(answers) {
        switch (answers.menu){
            case 'View All Employees':
                allEmployee()
                break
            case 'Add Employee':
                addEmp()
                break
            case 'Update Employee Role':
                updateEmp()
                break
            case 'View All Roles':
                allRoles()
                break
            case 'Add Role':
                addRoles()
                break
            case 'View All Departments':
                allDepts()
                break
            case 'Add Department':
                addDept()
                break
            case 'Quit':
                quit()
                break
        }
        // init();
};

function allEmployee(){
   db.viewEmployee()
   .then(data =>{
    console.log()
    console.table(data[0])
   });
   init(0);
   
}


function addEmp(){
    inquirer.prompt(empQuestion).then((answers) => {
        const firstN = answers.firstName
        const lastN =  answers.lastName
        
        db.viewAllRoles().then(([rows]) => {
            let roles = rows
            const roleChoices = roles.map(({id, title}) => ({
                name: title,
                value: id
            }))
            inquirer.prompt({
                type: 'list',
                name: 'roleId',
                message: "Enter employee's Role",
                choices: roleChoices,
            }).then((ans) => {
                const rolesId = ans.roleId
                db.viewEmployeeMan().then(([rows]) => {
                    let employees = rows
                    const managerChoices = employees.map(({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id,
                    }))
                    inquirer.prompt({
                        type: 'list',
                        name: 'ManagerId',
                        message: "Choose Manager",
                        choices: managerChoices,
                    }).then((response) => {
                        const employee = {
                            manager_id:response.ManagerId,
                            role_id: rolesId,
                            first_name: firstN,
                            last_name: lastN
                        }
                        db.addEmployee(employee)
                        .then(res => {
                            res = console.log('Employee added.')
                            init();
                        })
                    })
                })
            })
        })

    })
}


function updateEmp(){
    db.viewEmployees().then(([rows]) => {
    let employee = rows;
    const employeeChoices = employee.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id,
    }));

    inquirer.prompt({
        type: 'list',
        name : 'updateEmp',
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
    }).then((answer) => {
        const employE = answer.updateEmp
        db.viewAllRoles().then(([row]) => {
            let roles = row
            const roleChoices = roles.map(({id, title}) => ({
                name: title,
                value: id,
            }))
            inquirer.prompt({
                type: 'list',
                name: 'roleId',
                message: "Enter employee's Role",
                choices: roleChoices,
            })
            .then ((response) => {
                console.log(response);
                const upDate = [
                   response.roleId, employE
                ]
                db.updateEmpR(upDate)
                .then(res => {
                  res = console.log("Role updated");
                    init();
                })
            })})
    })
    })
   
}
function allRoles() {
    db.viewAllRoles()
    .then(data=> {
        console.log();
        console.table(data[0])});
    init();
}
function addRoles(){
    inquirer.prompt(roleQuestion).then((answers) => {
        const roleN = answers.roleName
        const roleS = answers.roleSal

        db.viewAllDepts().then(([rows]) => {
            let dept = rows
            const deptChoices = dept.map(({id, dept_name}) => ({
                name: dept_name,
                value: id
            }))
            inquirer.prompt({
                type: 'list',
                name: 'roleDept',
                message: "Which department does role belong to?",
                choices: deptChoices,
            }).then((response) => {
                const role = {
                    title: roleN,
                    salary: roleS,
                    department_id: response.roleDept
                }
                db.addRole(role)
                .then(res => {
                    res = console.log('New role added.');
                    init();
                })
            }) 
        })
    })
}
function allDepts(){
    db.viewAllDepts()
    .then(data=>{
        console.log(),
        console.table(data[0])})
    init();
}
function addDept(){
    inquirer.prompt(deptQuestion).then((ans) =>{
        const dept = ans.department
        const department = {
            dept_name: dept,
        }
        db.addDepartment(department)
        .then(res => {
            res = console.log('New Departement added')
            init();
        })
    })
}
function quit(){
    process.exit();
};

function init(){
    inquirer.prompt(menuQuestion).then(answers=>{
    swtichStatement(answers)
    })
};

// init();

function start(){
    const welcome = logo({ name: "Employee Tracker" }).render();

console.log(welcome);
    init();
}

start();