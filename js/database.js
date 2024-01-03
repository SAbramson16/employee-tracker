class Database {
    constructor(database) {
        this.database = database;
    }
    
    //query for selecting all data from department table
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
   
    //selects data from employee table, and joins with items from role and department tables, returns a table of all the desired information
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

    // selects only id, first name and last name from employee table
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

    //selects id, first name and last name from employee table where the manager id is set to "null", (if manager id is "null", then that employee is a manager.)
    getManagerNames() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL`;
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
   
    //inserts user inputed department name into department table
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

    //inserts user inputed role and salary into role table
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

    //inserts new employee information into employee table
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

    //allows user to update employee information
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

    //allows user to update an employees manager
    updateEmpMgr(managerID, employeeID) {
        return new Promise ((resolve, reject) => {
            const sql = `UPDATE employee SET manager_id = "${managerID}" WHERE id = ${employeeID} `;
            this.database.query(sql, (err, rows) => {
                if (err) {
                console.log("error: ", err);
                reject(err);
                }
                else {
                    console.log("--Employee's manager successfully updated!--");
                    resolve();
                }
            });
        })
    }
};

module.exports = Database;