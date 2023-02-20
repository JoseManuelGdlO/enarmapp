const express = require('express');
const router = express.Router();
const authService = require('../services/auth');
const jwt = require('jsonwebtoken');


router.post('/login', async function (req, res, next) {
    try {
        const response = await authService.login(req.body)
        if (response.code === 200) {
            jwt.sign( response, 'secretkey', (err, token) => {
                res.status(response.code).json({ data: response.data, token });
            })
        } else {
            res.status(response.code).json(response);
        }
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

router.post('/register', async function (req, res, next) {
    try {
        let body = req.body;
        res.status(201).json(await authService.register(body));
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

module.exports = router;