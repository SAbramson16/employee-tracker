

class Database {
    constructor(database) {
        this.database = database;
    }
   displayDepartments() {
    const sql = `SELECT * FROM department`;
    this.database.query(sql, (err, rows) => {
        if (err) {
          console.log("error: ", err);
           return;
        }
       console.table(rows);
    }); 
   } 
   
   displayRoles() {
    const sql = `SELECT * FROM role`;
    this.database.query(sql, (err, rows) => {
        if (err) {
          console.log("error: ", err);
           return;
        }
        console.table(rows);
    }); 
   } 
   
   displayEmployees() {
    const sql = `SELECT 
    employee.id AS ID, employee.first_name AS First_Name, 
    employee.last_name AS Last_Name, role.title AS Job_Title, 
    department.name AS Department, role.salary AS Salary,
    CONCAT(manager.first_name, " ", manager.last_name) AS Manager
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;`;
    this.database.query(sql, (err, rows) => {
        if (err) {
          console.log("error: ", err);
           return;
        }
        console.table(rows);
    }); 
   }
   
   addDepartment(departmentName) {
        const sql = `INSERT INTO department (name) VALUE ("${departmentName}")`;
        this.database.query(sql, (err, rows) => {
            if (err) {
            console.log("error: ", err);
            return;
            }
            console.log("Department added.");
        });
 
    }
};

module.exports = Database;