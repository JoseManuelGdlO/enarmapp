const express = require('express');
const router = express.Router();
const configurations = require('../services/configurations');

router.get('/configuration', async function (req, res, next) {
  try {

    const code = req.query.code
    const response = await configurations.getConfigurationPerCode(code)
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/configuration-group', async function (req, res, next) {
  try {

    const group = req.query.group
    const response = await configurations.getConfigurationPerGroup(group)
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/universidades', async function (req, res, next) {
  try {
    const response = await configurations.getUniversidades()
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/especialidades', async function (req, res, next) {
  try {
    const response = await configurations.getEspecialidades()
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/student-type', async function (req, res, next) {
  try {
    const response = await configurations.getStudnetTypes()
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/enarm-date', async function (req, res, next) {
  try {
    const response = await configurations.getEnarmDate()
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});
router.get('/frases', async function (req, res, next) {
  try {
    const response = await configurations.getFrases()
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error('Error while getting phrases /others/frases', err.message);
    next(err);
  }
});

router.get('/especialidades', async function (req, res, next) {
  try {
    const response = await configurations.getEspecialidades()
    res.status(response.code).json(response.data);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});


module.exports = router;