DROP DATABASE if exists employee_db ;

CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department(
id INT NOT NULL auto_increment,
name VARCHAR(30),
PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ("Engineering"),
("IT"),
("People");


CREATE TABLE employee_role(
id INT NOT NULL auto_increment ,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT,
PRIMARY KEY(id)
);

INSERT INTO employee_role(title, salary, department_id)
VALUES ("Engineer", 1500.00, 1),
("Network", 1000.00, 2),
("Assistant", 500.00, 3);

CREATE TABLE employee(
id INT NOT NULL auto_increment,
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