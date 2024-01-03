INSERT INTO department (name)
VALUES ("Sales"),
       ("Finance"),
       ("Legal"),
       ("Purchasing"),
       ("Administrative");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 100000, 1),
       ("Sales Associate", 80000, 1),
       ("Accountant", 75000, 2),
       ("Lead Lawyer", 120000, 3),
       ("Purchasing VP", 150000, 4),
       ("Purchasing Associate", 85000, 4),
       ("CEO", 110000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gunther", "Perk", 1, null), 
       ("Rachel", "Green", 2, 1),
       ("Joey", "Tribiani", 7, null),
       ("Ross", "Geller", 4, null), 
       ("Phoebe", "Buffet", 5, null), 
       ("Monica", "Heckler", 3, 5),
       ("Chandler", "Bing", 6, 5);
       




        