const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "mysql",
    user: "root",
    password: "dltmdwns0721",
    database: "myapp",
});

exports.pool = pool;
