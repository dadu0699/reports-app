const mysqlPool = require('../config/database');

const execute = async (query, params) => {
  const promisePool = mysqlPool.promise();
  const [rows] = await promisePool.query(query, params);
  return rows;
};

const create = async (params) => {
  const { userID, courseID, server, detail } = params;
  const report = [userID, courseID, server, detail];

  const query = `
    INSERT INTO Report(user, course, server, currentDate, detail)
    VALUES(?, ?, ?, CURRENT_DATE(), ?)
  `;

  return await execute(query, report);
};

const read = async (params) => {
  let report = [];
  let query = `
    SELECT reportID, identification, User.name AS user,
      Course.name AS course, server,
      DATE_FORMAT(currentDate, "%b %d, %Y") AS currentDate, detail
    FROM Report
    INNER JOIN User ON (User.userID = Report.user)
    INNER JOIN Course ON (Course.courseID = Report.course)
  `;

  if (params) {
    report = [`%${params}%`];
    query += `
      WHERE identification LIKE ?
    `;
  }

  query += ' ORDER BY currentDate DESC, reportID DESC';

  return await execute(query, report);
};

const update = async (params) => {
  const { reportID, userID, courseID, detail } = params;
  const report = [userID, courseID, detail, reportID];

  const query = `
    UPDATE Report SET user = ?, course = ?, detail = ?
    WHERE reportID = ?
  `;

  return await execute(query, report);
};

const remove = async (params) => {
  const report = [params.reportID];

  const query = 'DELETE FROM Report WHERE reportID = ?';

  return await execute(query, report);
};

module.exports = { create, read, update, remove };
