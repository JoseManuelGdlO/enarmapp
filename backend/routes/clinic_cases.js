const express = require('express');
const router = express.Router();
const clinicCaseService = require('../services/clinic_cases');
const { verifyToken, verifyAccount } = require('../libs/headers');
var http = require('http2').constants;

router.get('/', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    const clinicCases = await clinicCaseService.get();
    let code = http.HTTP_STATUS_OK;
    if (clinicCases.length === 0) {
      code = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(code).json(clinicCases);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.get('/:id/questions', verifyToken, verifyAccount, async function (req, res, next) {
  try {
    const id = req.params.id;
    const clinicCaseQuestions = await clinicCaseService.questionsByClinicCase(id);
    let code = http.HTTP_STATUS_OK;
    if (clinicCaseQuestions === null) {
      code = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(code).json(clinicCaseQuestions);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.post('/', verifyToken, verifyAccount, async function(req, res, next) {
  try {
    const body = req.body;
    console.log(body);
    for (let clinic_case of body) {
      await clinicCaseService.createFull(clinic_case)
    }
    res.status(http.HTTP_STATUS_NO_CONTENT).json();
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

module.exports = router;