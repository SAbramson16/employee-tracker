const mysql = require('mysql2');
const CLI = require('./js/cli.js');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'pass',
        database: 'employees_db'
    }
);

const cli = new CLI(db);

cli.run();