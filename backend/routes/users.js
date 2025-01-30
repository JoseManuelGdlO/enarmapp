const express = require('express');
const router = express.Router();
const usersServices = require('../services/users');
const { verifyToken } = require('../libs/headers');
var http = require('http2').constants;

router.get('/', verifyToken, async function (req, res, next) {
    try {
        let code = http.HTTP_STATUS_OK;
        let vouchers = await usersServices.getAll();
        if (vouchers.length === 0) {
            code = http.HTTP_STATUS_NOT_FOUND;
        }
        return res.status(code).json({
            vouchers
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
            nombres: body.nombres,
            apellidos: body.apellidos,
            idTipoUsuario: body.idTipoUsuario,
            idSuscripcion: body.idSuscripcion,
            cumpleanos: body.cumpleanos,
            estatus: body.estatus
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