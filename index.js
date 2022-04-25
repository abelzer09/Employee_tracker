const inquirer = require('inquirer');
require('dotenv').config();

const db = require('./db/queryFunctions')
const empList = [];
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
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    },
];

function menu() {
    inquirer.prompt(menuQuestion).then((answers) => {
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
    });
};

function allEmployee(){}
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
                db.viewEmployees().then(([rows]) => {
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
                        db.addEmployee(employee);
                        menu();
                    })
                })
            })
        })

    })
}
function updateEmp(){

}
function allRoles() {}
function addRoles(){
    inquirer.prompt(roleQuestion).then((answers) => {
        const roleN = answers.roleName
        const roleS = answers.roleSal

        db.viewAllDepts().then(([rows]) => {
            let dept = rows
            const deptChoices = dept.map(({id, title}) => ({
                name: title,
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
                db.addRole(role);
                menu()
            }) 
        })
    })
}
function allDepts(){
    db.viewAllDepts()
    menu()
}
function addDept(){}
function quit(){}

function init(){
    menu();
};

init();


