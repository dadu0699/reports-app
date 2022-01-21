const reportModel = require('../models/report.model');
const userController = require('../controllers/user.controller');
const courseController = require('../controllers/course.controller');

const server = process.env.SERVER;

const create = async (req, res) => {
  const { identification, user, course, detail } = req.body;

  const userID = await userController.search({ identification, name: user });
  const courseID = await courseController.search({ name: course });

  const response = await reportModel.create({
    userID,
    courseID,
    server,
    detail,
  });

  res.status(200).send({
    code: 200,
    response: { ...response, attendedBy: server },
  });
};

const read = async (req, res) => {
  const { identification } = req.query;
  const response = await reportModel.read(identification);

  res.status(200).send({
    code: 200,
    attendedBy: server,
    response: response,
  });
};

const update = async (req, res) => {
  const { reportID } = req.query;
  const { identification, user, course, detail } = req.body;

  const userID = await userController.search({ identification, name: user });
  const courseID = await courseController.search({ name: course });

  const response = await reportModel.update({
    reportID,
    userID,
    courseID,
    detail,
  });

  res.status(200).send({
    code: 200,
    response: { ...response, attendedBy: server },
  });
};

const remove = async (req, res) => {
  const { reportID } = req.query;

  const response = await reportModel.remove({
    reportID,
  });

  res.status(200).send({
    code: 200,
    response: { ...response, attendedBy: server },
  });
};

module.exports = { create, read, update, remove };
