require('dotenv').config();
const mysql = require('mysql');

const conn = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DB
});

module.exports = conn;
