INSERT INTO department(dept_name) 
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO employee_role(title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 130000, 2),
        ('Account Manager', 120000, 3),
        ('Accountant', 100000, 3),
        ('Legal Partner', 275000, 4),
        ('Lawyer', 190000, 4),
        ('Paralegal', 75000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Roberts', 1, null),
       ('Chuck', 'Charles' 2, 1),
       ('Dick', 'Richards', 3, null),
       ('Sally', "Fields", 4, 3),
       ('Brandy', 'Carlile', 5, null),
       ('Timothy' 'Olyphant', 6, 5),
       ('Elihu', 'Smails', 7, null),
       ('Daniel', 'Kaffee', 8, 7),
       ('Deck', 'Shifflet', 9, 7);