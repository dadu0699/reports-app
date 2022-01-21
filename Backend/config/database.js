const mysql = require('mysql2');

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST } = process.env;

const params = {
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  multipleStatements: true,
};

module.exports = mysql.createPool(params);
