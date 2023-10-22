// db.js

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'mohd1913',
    database: 'sqlInjection',
    waitForConnections: true,
    connectionLimit: 10, // Adjust the connection limit as needed
    queueLimit: 0,
    multipleStatements: true // if the multiple statement is allowed
});

// Export the pool for use in other parts of your application
module.exports = pool;
