class Database {
    constructor(database) {
        this.database = database;
    }
    
   displayDepartments() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM department`;
            this.database.query(sql, (err, rows) => {
                if (err) {
                console.log("error: ", err);
                reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
   } 

   displayRoles() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM role`;
        this.database.query(sql, (err, rows) => {
            if (err) {
            console.log("error: ", err);
            reject(err);
            }
            else {
                resolve(rows);
            }
        }); 
    });
   } 

   getRoleTitles() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, title FROM role`;
            this.database.query(sql, (err, rows) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            }); 
        });
    } 
   
   displayEmployees() {
    return new Promise((resolve, reject) => {
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
           reject(err);
        } 
        else {
            resolve(rows);
           }
        })
    });
    }; 

    getEmployeeNames() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, first_name, last_name FROM employee`;
            this.database.query(sql, (err, rows) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            }); 
        });
    }
   
   addDepartment(departmentName) {
    return new Promise ((resolve, reject) => {
        const sql = `INSERT INTO department (name) VALUE ("${departmentName}")`;
        this.database.query(sql, (err, rows) => {
            if (err) {
            console.log("error: ", err);
            reject(err);
            }
            else {
                console.log("--Department successfully added!--");
                resolve();
            }
        });
    })
    };

    addRole(roleName, roleSalary, roleDep) {
        return new Promise ((resolve, reject) => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUE ("${roleName}", "${roleSalary}", "${roleDep}")`;
            this.database.query(sql, (err, rows) => {
                if (err) {
                console.log("error: ", err);
                reject(err);
                }
                else {
                    console.log("--Role successfully added!--");
                    resolve();
                }
            });
        })
    }

    addEmployee(firstName, lastName, newRole, managerId) {
        return new Promise ((resolve, reject) => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${firstName}", "${lastName}", "${newRole}", ` + (managerId == "NULL" ? `NULL` : `"` + managerId + `"`) + `)`;
            this.database.query(sql, (err, rows) => {
                if (err) {
                console.log("error: ", err);
                reject(err);
                }
                else {
                    console.log("--Employee successfully added!--");
                    resolve();
                }
            });
        })
    }

    updateRole(roleID, employeeID) {
        return new Promise ((resolve, reject) => {
            const sql = `UPDATE employee SET role_id = "${roleID}" WHERE id = ${employeeID} `;
            this.database.query(sql, (err, rows) => {
                if (err) {
                console.log("error: ", err);
                reject(err);
                }
                else {
                    console.log("--Employee successfully updated!--");
                    resolve();
                }
            });
        })
    }
};

module.exports = Database;