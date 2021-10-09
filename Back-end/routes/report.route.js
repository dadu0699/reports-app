const express = require('express');
const router = express.Router();

const { create, read, update, remove } = require('../controllers/report.controller');

router.route('/')
  .post(create)
  .get(read)
  .put(update)
  .delete(remove);

module.exports = router;
