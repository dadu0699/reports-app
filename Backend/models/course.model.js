const mysqlPool = require('../config/database');

const execute = async (query, params) => {
  const promisePool = mysqlPool.promise();
  const [rows] = await promisePool.query(query, params);
  return rows;
};

const create = async (params) => {
  const course = [params.name];

  const query = `
    INSERT INTO Course(name)
    VALUES(?)
  `;

  return await execute(query, course);
};

const read = async (params) => {
  const course = [params.name];

  const query = `
    SELECT courseID
    FROM Course
    WHERE name = ?
  `;

  return await execute(query, course);
};

module.exports = { create, read };
