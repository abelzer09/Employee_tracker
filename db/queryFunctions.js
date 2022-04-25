const connection = require('./connection')

class Queries {
    constructor(connection) {
        this.connection = connection;
    }

    viewAllDepts() {
    return this.connection.promise().query('SELECT * FROM department');

}
    addEmployee(data){
        return this.connection.promise().query('INSERT INTO employee SET ?', data)
    }

    viewEmployee() {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.dept_name AS department, employee_role.salary, CONCAT (managerId.first_name, '', managerId.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = employee_role.id LEFT JOIN department on employee_role.department_id = department.id LEFT JOIN employee manager on managerId.role_id = employee.manager_id;");
    }

    viewAllRoles() {
        return this.connection.promise().query("SELECT employee_role.id, employee_role.title, department.dept_name AS department, employee_role.salary, FROM employee_role LEFT JOIN department on employee_role.department_id = department.id;");
    }
    
    addRole(data){
        return this.connection.promise().query('INSERT INTO employee_role SET ?',data)
    }


}

module.exports = new Queries(connection)