use employees;

INSERT INTO department
    (dept_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles
(title, salary, dept_id) 
VALUES
    ('Sales Manager', 150000, 1),
    ('Salesperson', 95000, 1),
    ('Senior Engineer', 200000, 2),
    ('Junior Engineer', 130000, 2),
    ('Accounting Manager', 180000, 3),
    ('Accountant', 145000, 3),
    ('Head of Legal', 300000, 4),
    ('Lawyer', 245000, 4);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id) 
VALUES
    ('Jeaustin', 'Sanabria', 1, NULL),
    ('Aaron', 'Ramsdale', 2, 1),
    ('Erling', 'Haaland', 3, NULL),
    ('Gabriel', 'Jesus', 4, 3),
    ('Cristiano', 'Ronaldo', 5, NULL),
    ('Lionel', 'Messi', 6, 5),
    ('Bukayo', 'Saka', 7, NULL),
    ('Gabriel', 'Martinelli', 8, 7);