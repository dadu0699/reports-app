const express = require('express');
const router = express.Router();

const server = process.env.SERVER;

router.route('/').get((_req, res) => {
  res.status(200).send({
    status: `API running smoothly on ${server} server`,
  });
});

module.exports = router;
