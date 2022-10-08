const express = require('express');
const router = express.Router();
const enarmStudents = require('../services/enarmStudents');
const headers = require('../libs/headers');
const fs = require("fs");

const upload = require('../libs/storage');


router.get('/', headers.verifyToken, async function(req, res, next) {

 
  try {
    res.json(await enarmStudents.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

router.post('/upload-profile', upload.single('image'), async function(req, res, next) {
  try {

    const {image} = req.body;
    const imagenCoverted = fs.writeFileSync("new-path.jpg", image);
    
    //upload.single(imagenCoverted);
  } catch (err) {
    console.error(`Error while getting enarm students info `, err.message);
    next(err);
  }
});

module.exports = router;