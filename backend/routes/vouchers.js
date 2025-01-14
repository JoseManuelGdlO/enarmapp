const express = require('express');
const router = express.Router();
const voucherService = require('../services/vouchers');
const { verifyToken } = require('../libs/headers');
var http = require('http2').constants;

router.get('/', verifyToken, async function(req, res, next) {
  try {
    let code = http.HTTP_STATUS_OK;
    let vouchers = await voucherService.getAll();
    if (vouchers.length === 0) {
        code = http.HTTP_STATUS_NOT_FOUND;
    }
    res.status(code).json({
        vouchers
    });
  } catch (err) {
    console.error(`Error while getting voucher info `, err.message);
    next(err);
  }
});

router.get('/one', verifyToken, async function(req, res, next) {
  try {
    res.json(await voucherService.getOne(req.query.name, req.query.code));
  } catch (err) {
    console.error(`Error while getting voucher info `, err.message);
    next(err);
  }
});

router.post('/', verifyToken, async function(req, res, next) {
  try {
    let data = {
        name: req.body.name,
        code: req.body.code,
        discount: req.body.discount,
        type: req.body.type,
        usage_limit: req.body.usage_limit,
        expiration_date: req.body.expiration_date
    }
    res.json(await voucherService.create(data));
  } catch (err) {
    console.error(`Error while creating voucher`, err.message);
    next(err);
  }
});

router.put('/', verifyToken, async function(req, res, next) {
  try {
    res.json(await voucherService.update(req.body));
  } catch (err) {
    console.error(`Error while updating voucher`, err.message);
    next(err);
  }
});

module.exports = router;