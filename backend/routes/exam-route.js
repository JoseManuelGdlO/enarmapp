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

router.put('/save-answer', async function (req, res, next) {
  try {

    const body = req.body;
    const response = await exam.saveAnswer(body)
    console.log('res', response);
    res.status(response).json();
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

  router.get('/exam-user-list', async function(req, res, next) {
    try {
      console.log('req', req.query);
      const id = Number(req.query.user);
      const response = await exam.getExamsListPerUser(id)
      res.status(200).json(response);
    } catch (err) {
      console.error(`Error while getting enarm students info `, err.message);
      next(err);
    }
  });
  router.get('/exam-detail', async function(req, res, next) {
    try {
      console.log('req', req.query);
      const id = Number(req.query.exam);
      const response = await exam.getExamdetail(id)
      res.status(response.code).json(response.response);
    } catch (err) {
      console.error(`Error while getting enarm students info `, err.message);
      next(err);
    }
  });

module.exports = router;