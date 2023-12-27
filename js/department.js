class Department {
    constructor(database, run) {
        this.database = database;
        this.run = run;
    }

   displayDepartments() {
        const sql = `SELECT * FROM department`;
        this.database.query(sql, (err, rows) => {
            if (err) {
            console.log("error: ", err);
            return;
            }
        console.table(rows);
        this.run();
    }); 
   } 
}

module.exports = Department;