const mysql = require('mysql2');

const dataBase = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        // password: process.env.MYSQL_PASSWORD,
        // database: process.env.MYSQL_DB_NAME
    },
    console.log(`Connected to the database.`)
);

dataBase.connect(function (err) {
    if (err) throw err;
});

module.exports = dataBase;