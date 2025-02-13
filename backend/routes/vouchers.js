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
    return res.status(code).json({
        data: vouchers,
    });
  } catch (err) {
    console.error(`Error while getting voucher info `, err.message);
    next(err);
  }
});

router.get('/one', verifyToken, async function(req, res, next) {
  try {
    const data = {
      name: req.query.name,
      code: req.query.code
    }
    let code = http.HTTP_STATUS_OK;
    let voucher = await voucherService.getOne(data);
    if (voucher === null) {
        code = http.HTTP_STATUS_NOT_FOUND;
    }
    return res.status(code).json({
        data: voucher,
    });
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
    let voucher = await voucherService.create(data);

    let code = http.HTTP_STATUS_CREATED;
    if (voucher === null) {
        code = http.HTTP_STATUS_BAD_REQUEST;
    }

    return res.status(code).json({
        data: voucher,
    });
  } catch (err) {
    console.error(`Error while creating voucher`, err.message);
    next(err);
  }
});

router.put('/:id', verifyToken, async function(req, res, next) {
  try {
    let data = {
      id: req.params.id,
      discount: req.body.discount,
      type: req.body.type,
      usage_limit: req.body.usage_limit,
      expiration_date: req.body.expiration_date
    }
    let voucher = await voucherService.update(data);

    let code = http.HTTP_STATUS_NO_CONTENT;
    if (voucher) {
      code = http.HTTP_STATUS_BAD_REQUEST;
    }
    return res.status(code).json();
  } catch (err) {
    console.error(`Error while updating voucher`, err.message);
    next(err);
  }
});

router.delete('/:id', verifyToken, async function(req, res, next) {
  try {
    if (await voucherService.remove(req.params.id)) {
      return res.status(http.HTTP_STATUS_NO_CONTENT).json();
    }
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json();
  } catch (err) {
    console.error(`Error while deleting voucher`, err.message);
    next(err);
  }
});

module.exports = router;