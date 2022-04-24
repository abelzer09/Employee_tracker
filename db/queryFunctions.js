const { query } = require('./connection');
const db = require('./connection')

class Queries {
    allDepts() {
    return this.db.promise().query('SELECT * FROM department');

}
    addEmployee(data){
        return this.db.promise().query('INSERT INTO employee SET ?', data)
    }

    viewEmployee() {
        return this.db.promise().query("SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.dept_name AS department, employee_role.salary, CONCAT (managerId.first_name, '', managerId.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = employee_role.id LEFT JOIN department on employee_role.department_id = department.id LEFT JOIN employee manager on managerId.role_id = employee.manager_id;");
    }



}

module.exports = new Queries(db)