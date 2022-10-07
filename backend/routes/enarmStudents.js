const express = require('express');
const router = express.Router();
const enarmStudents = require('../services/enarmStudents');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await enarmStudents.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

module.exports = router;