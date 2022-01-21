const { create, read } = require('../models/user.model');

const search = async (data) => {
  const users = await read(data);

  if (users.length > 0) return users[0]['userID'];

  const user = await create(data);
  return user['insertId'];
};

module.exports = { search };
