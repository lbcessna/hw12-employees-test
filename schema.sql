DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INTEGER AUTO_INCREMENT NOT NULL,
    department_id INTEGER NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name) values ("Executive");
INSERT INTO department (name) values ("Engineering");
INSERT INTO department (name) values ("Legal");
INSERT INTO department (name) values ("Operations");
INSERT INTO department (name) values ("Support");

INSERT INTO role (department_id, title, salary) values (1, "CEO", 10000000);
INSERT INTO role (department_id, title, salary) values (1, "COO", 9000000);
INSERT INTO role (department_id, title, salary) values (1, "VP", 8000000);
INSERT INTO role (department_id, title, salary) values (2, "Senior Software Developer", 500000);
INSERT INTO role (department_id, title, salary) values (2, "Software Developer", 125000);
INSERT INTO role (department_id, title, salary) values (3, "Lawyer", 250000);
INSERT INTO role (department_id, title, salary) values (4, "Technical Project Manager", 100000);
INSERT INTO role (department_id, title, salary) values (5, "Support Engineer", 50000);

INSERT INTO employee (role_id, manager_id, first_name, last_name) values (1, null, "Larry", "Cessna");
INSERT INTO employee (role_id, manager_id, first_name, last_name) values (2, 1, "James", "Hetfield");
INSERT INTO employee (role_id, manager_id, first_name, last_name) values (3, 2, "Kirk", "Hammett");
INSERT INTO employee (role_id, manager_id, first_name, last_name) values (4, 3, "James", "Newstead");
INSERT INTO employee (role_id, manager_id, first_name, last_name) values (5, 4, "Dave", "Mustaine");
INSERT INTO employee (role_id, manager_id, first_name, last_name) values (6, 5, "Dimebag", "Darrell");
INSERT INTO employee (role_id, manager_id, first_name, last_name) values (7, 6, "Bob", "Rock");
INSERT INTO employee (role_id, manager_id, first_name, last_name) values (8, 7, "Lars", "Ulrich");