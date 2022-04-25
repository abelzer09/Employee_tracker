const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME
    },
    console.log(`Connected to the database.`)
);

// connection.connect(function (err) {
//     if (err) throw err;
// });

module.exports = connection;