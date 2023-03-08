DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT NOT NUll AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)  NOT NULL
);