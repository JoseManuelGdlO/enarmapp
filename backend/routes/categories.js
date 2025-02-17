const express = require('express');
const router = express.Router();
const categoryService = require('../services/categories');
const { verifyToken, verifyAccount } = require('../libs/headers');
var http = require('http2').constants;

router.get('/', verifyToken, verifyAccount, async function(req, res, next) {
  try {
    let code = http.HTTP_STATUS_OK;
        let categories = await categoryService.getAll();
        if (categories.length === 0) {
            code = http.HTTP_STATUS_NOT_FOUND;
        }
        return res.status(code).json({
            data: categories,
        });
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

router.post('/', verifyToken, verifyAccount, async function(req, res, next) {
    try {
        const categories = req.body;
        for (let category of categories) {
            await categoryService.create(category)
        }
        return res.status(http.HTTP_STATUS_CREATED).json();
    } catch (err) {
        console.error(`Error while getting categories `, err.message);
        next(err);
    }
});

router.post('/:id/subcategories', verifyToken, verifyAccount, async function(req, res, next) {
    try {
        let subcategory = await categoryService.addSubcategory({category_id: req.params.id, name: req.body.name});
        return res.status(http.HTTP_STATUS_CREATED).json(subcategory);
    } catch (err) {
        console.error(`Error while getting categories `, err.message);
        next(err);
    }
});

router.put('/subcategories/:id', verifyToken, verifyAccount, async function(req, res, next) {
    try {
        let subcategory = await categoryService.editSubcategory({id: req.params.id, name: req.body.name});
        return res.status(http.HTTP_STATUS_NO_CONTENT).json(subcategory);
    } catch (err) {
        console.error(`Error while getting categories `, err.message);
        next(err);
    }
});

module.exports = router;