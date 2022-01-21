const express = require('express');
const router = express.Router();

const server = process.env.SERVER;

router.route('/').get((_req, res) => {
  res.status(200).json({
    code: 200,
    response: `API running smoothly on ${server} server`,
  });
});

module.exports = router;
