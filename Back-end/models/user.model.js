const mysqlPool = require('../config/database');

const execute = async (query, params) => {
  const promisePool = mysqlPool.promise();
  const [rows] = await promisePool.query(query, params);
  return rows;
};

const create = async (params) => {
  const { identification, name } = params;
  const user = [identification, name];

  const query = `
    INSERT INTO User(identification, name)
    VALUES(?, ?)
  `;

  return await execute(query, user);
};

const read = async (params) => {
  const { identification, name } = params;
  const user = [identification, name];

  const query = `
    SELECT userID
    FROM User
    WHERE identification = ? AND name = ?
  `;

  return await execute(query, user);
};

module.exports = { create, read };
