const express = require('express');
const router = express.Router();
const usersServices = require('../services/users');
const { verifyToken } = require('../libs/headers');
var http = require('http2').constants;

router.get('/', verifyToken, async function (req, res, next) {
    try {
        let code = http.HTTP_STATUS_OK;
        let users = await usersServices.getAll();
        if (users.length === 0) {
            code = http.HTTP_STATUS_NOT_FOUND;
        }
        return res.status(code).json({
            users: users
        });
    } catch (err) {
        console.error(`Error while getting voucher info `, err.message);
        next(err);
    }
});

router.put('/:id', verifyToken, async function (req, res, next) {
    try {
        
        let body = req.body;
        let data = {
            id: req.params.id,
            name: body.name,
            last_name: body.last_name,
            user_type_id: body.user_type_id,
            subscription_id: body.subscription_id,
            birthdate: body.birthdate,
            status: body.status
        }
        console.log(data);
        let user = await usersServices.updateProfile(data);

        let code = http.HTTP_STATUS_CONFLICT;
        if (user) {
            code = http.HTTP_STATUS_OK;
        }
        return res.status(code).json();
    } catch (err) {
        console.error(`Error while updating user`, err.message);
        next(err);
    }
});

module.exports = router;