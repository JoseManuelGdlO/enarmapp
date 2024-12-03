const express = require('express');
const router = express.Router();
const poaymentService = require('../services/payment');
const { verifyToken } = require('../libs/headers');

router.put('/create-session', verifyToken, async function(req, res, next) {
    const { amount, currency } = req.body;

    try {
        const session = await poaymentService.createSession(amount, currency);
        res.status(200).send(session);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;