SELECT 
employee.id AS ID, employee.first_name AS First_Name, 
employee.last_name AS Last_Name, role.title AS Job_Title, 
department.name AS Department, role.salary AS Salary,
CONCAT(manager.first_name, " ", manager.last_name) AS Manager
 
FROM employee 
JOIN role ON employee.role_id = role.id 
JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

