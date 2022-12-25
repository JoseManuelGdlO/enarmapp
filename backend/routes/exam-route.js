const express = require('express');
const router = express.Router();
const exam = require('../services/exam');

router.post('/add-type', async function(req, res, next) {
  try {

    const body = req.body;
    const response = await exam.addExamType(body)
    console.log('res', response);
    res.status(response).json();
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.post('/add-exam', async function(req, res, next) {
    try {
  
      const body = req.body;
      const response = await exam.createExam(body)
      console.log('res', response);
      res.status(response).json();
    } catch (err) {
      console.error(`Error while getting enarm students info `, err.message);
      next(err);
    }
  });

module.exports = router;