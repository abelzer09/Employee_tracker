const inquirer = require('inquirer');
require('dotenv').config();

const { allDepts } = require('./queryFunctions')

const opt = ["ALL_DEPT", "ALL_ROLES"];


function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "userview",
            message: "What you want to see?",
            choices: opt
        }
    ])
        .then((ans) => {
            console.log(ans);
            switch (ans.userview) {
                case opt[0]:
                    allDepts();
                    break;

                default:
                    break;
            }
        })
}

startApp();


