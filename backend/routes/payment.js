const express = require('express');
const router = express.Router();
const poaymentService = require('../services/payment');
const { verifyToken, verifyAccount } = require('../libs/headers');
var http = require('http2').constants;
const jwt = require('jsonwebtoken');

router.post('/pay', verifyToken, verifyAccount, async function(req, res, next) {
    const { subscription, token, coupon } = req.body;
    
    const decoded = jwt.verify(req.token, 'secretkey');
    let code = http.HTTP_STATUS_OK;

    try {
        const payment = await poaymentService.pay(subscription, token, coupon, decoded.user.id);
        if (!payment.pay) {
            code = http.HTTP_STATUS_NOT_FOUND;
        }
        return res.status(code).json({ code, response: payment.message});
    } catch (error) {
        res.status(500).send({ code, response: error.message });
    }
});

module.exports = router;