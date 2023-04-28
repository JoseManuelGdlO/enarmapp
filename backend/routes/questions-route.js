const express = require('express');
const router = express.Router();
const questions = require('../services/questions');

router.post('/add-category', async function(req, res, next) {
  try {

    const body = req.body;
    const response = await questions.CreateCateogry(body)
    res.status(response).json();
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.post('/add-subcategory', async function (req, res, next) {
  try {

    const body = req.body;
    const response = await questions.addSubCategory(body)
    console.log('res', response);
    res.status(response).json();
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.put('/edit-subcategory', async function (req, res, next) {
  try {

    const body = req.body;
    const response = await questions.editSubCategory(body)
    console.log('res', response);
    res.status(response).json();
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/categories', async function(req, res, next) {
  try {
    res.json(await questions.getCategories());
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/all', async function (req, res, next) {
  try {
    res.json(await questions.getQuestions());
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.post('/add-question', async function(req, res, next) {
  try {
    const body = req.body;
    const response = await questions.AddQuesiton(body)
    console.log('res', response);
    res.status(response).json();
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

module.exports = router;