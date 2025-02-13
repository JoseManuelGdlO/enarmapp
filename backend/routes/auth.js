const express = require('express');
const router = express.Router();
const authService = require('../services/auth');
const jwt = require('jsonwebtoken');
var http = require('http2').constants;


router.post('/login', async function (req, res, next) {
    try {
        let user = await authService.login({email: req.body.email, password: req.body.password});
        if (user.error === "USER") {
            return res.status(http.HTTP_STATUS_NOT_FOUND).json({
                user: null,
                account: null
            });
        } else if (user.error === "PASSWORD") {
            return res.status(http.HTTP_STATUS_FORBIDDEN).json({
                user: null,
                account: null
            });
        }
        jwt.sign( user.data, 'secretkey', (err, token) => {
            res.status(http.HTTP_STATUS_OK).json({ user: user.data.user, account: user.data.account, token });
        })
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

router.post('/login-id', async function (req, res, next) {
    try {
        const user = await authService.loginForId({email: req.body.email, social_media_id: req.body.social_media_id});
        if (user.error === "USER") {
            return res.status(http.HTTP_STATUS_NOT_FOUND).json({
                user: null,
                account: null
            });
        }
        jwt.sign( user.data, 'secretkey', (err, token) => {
            res.status(http.HTTP_STATUS_OK).json({ user: user.data.user, account: user.data.account, token });
        })
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

router.post('/register', async function (req, res, next) {
    try {
        let data = {
            name: req.body.name, 
            last_name: req.body.last_name, 
            email: req.body.email, 
            password: req.body.password, 
            picture: req.body.picture, 
            user_type_id: req.body.user_type_id, 
            university_id: req.body.university_id, 
            enarm_date_id: req.body.enarm_date_id,
            career_id: req.body.career_id,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            social_media_id: req.body.social_media_id
        };
        const user = await authService.register(data);

        res.status(http.HTTP_STATUS_CREATED).json({data: user});
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

router.put('/change-account-status', async function (req, res, next) {
    try {
        const data = {
            user_id: req.body.user_id,
            status: req.body.status
        }
        const userStatus = await authService.changeAccountStatus(data);
        // TODO: send error when not changed?
        if (userStatus) {
            return res.status(http.HTTP_STATUS_CREATED).json();
        }
        return res.status(http.HTTP_STATUS_BAD_REQUEST).json();
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

router.put('/reset_password', async function (req, res, next) {
    try {
        const id = req.body.id;
        const resetPass = await authService.resetPassword(id)
        return res.status(http.HTTP_STATUS_CREATED).json(resetPass);
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

module.exports = router;