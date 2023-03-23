const express = require('express');
const router = express.Router();
const enarmStudents = require('../services/enarmStudents');
const headers = require('../libs/headers');
const fs = require("fs");

const upload = require('../libs/storage');


router.get('/', async function(req, res, next) {
 
  try {
    res.json(await enarmStudents.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.put('/upload-profile', async function(req, res, next) {
  try {
    let body = req.body;
    res.json(await enarmStudents.updateProfile(body));
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

module.exports = router;