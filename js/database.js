class Database {
    constructor(database) {
        this.database = database;
    }
   displayDepartments() {
    const sql = `SELECT * FROM department`;
    this.database.query(sql, (err, rows) => {
        if (err) {
          console.log("error");
          console.log(err);
           return;
        }
        console.log("ID ", "Name ");
        rows.forEach((row) => {
            // console.log(row.id); 
            // console.log(row.name); 
            
            console.log(row.id, row.name);
        })
    }); 
   } 
}

module.exports = Database;