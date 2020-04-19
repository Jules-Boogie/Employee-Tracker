DROP DATABASE employee_db if exists;

CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department(
id INT NOT NULL,
name VARCHAR(30),
PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ("Engineering"),
("IT"),
("People");



CREATE TABLE employee_role(
id INT NOT NULL,
title VARCHAR(30),
salary DECIMAL(5,2),
department_id INT,
PRIMARY KEY(id)
);

INSERT INTO employee_role(title, salary, department_id)
VALUES ("Engineer", 15000.00, 1),
("Network", 10000.00, 2),
("Assistant", 5000.00, 3),



CREATE TABLE employee(
id INT NOT NULL ,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
PRIMARY KEY(id)
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Juliet", "George", 1, 2), 
("Morin", "James", 2, 3),
("James", "Bean", 3, 4)





SELECT * FROM employee;






select * from employee_role;
SELECT * FROM department;