const express = require('express');
const router = express.Router();
const configurations = require('../services/configurations');

router.get('/configuration', async function(req, res, next) {
  try {

    const code = req.query.code
    const response = await configurations.getConfigurationPerCode(code)
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/configuration-group', async function(req, res, next) {
    try {
  
      const group = req.query.group
      const response = await configurations.getConfigurationPerGroup(group)
      res.status(response.code).json(response.data);
    } catch (err) {
      console.error(`Error while getting enarm students info `, err.message);
      next(err);
    }
  });

module.exports = router;