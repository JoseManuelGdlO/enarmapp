const express = require('express');
const router = express.Router();
const authService = require('../services/auth');
const jwt = require('jsonwebtoken');

const redisClient = require('../libs/redis');


router.post('/login', async function (req, res, next) {
    try {
        const response = await authService.login(req.body)
        if (response.code === 200) {
            console.log('response', response);
            
            const token = await redisClient.get(response.data.data.email);

            if (token) {
                return res.status(401).json({ message: 'Sesión inválida, otra sesión detectada' });
            }

            jwt.sign( {data: response}, 'secretkey', async (err, token) => {
                await redisClient.set(response.data.data.email, token, 'EX', 3600);
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

router.post('/login-id', async function (req, res, next) {
    try {
        const response = await authService.loginForId(req.body)
        if (response.code === 200) {
                console.log('response', response);
            jwt.sign( response, 'secretkey', async (err, token) => {
                await redisClient.set(response.data.data.email, token, 'EX', 3600);
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

router.post('/change-account-status', async function (req, res, next) {
    try {
        let body = req.body;
        res.status(201).json(await authService.changeAccountStatus(body));
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

router.post('/logout', async function (req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        const decoded = jwt.verify(req.token, 'secretkey');
        console.log('decoded', decoded, decoded.data.data.data.email);
        
        const id = decoded.data.data.data.email;
        
        // Elimina la clave en Redis
        const resultado = await redisClient.del(id);
        
        if (resultado) {
            res.status(200).json({ message: 'Logout exitoso' });
        } else {
            res.status(404).json({ message: 'Sesión no encontrada' });
        }
    } catch (err) {
        console.error(`Error en logout:`, err.message);
        res.status(500).json({ message: 'Error interno del servidor' });
        next(err);
    }
});

router.put('/reset-password', async function (req, res, next) {
    try {
        console.log('req', req.body);
        const id = parseInt(req.body.id);
        res.status(201).json(await authService.resetPassword(id));
    } catch (err) {
        console.error(`Error while getting enarm students info `, err.message);
        next(err);
    }
});

module.exports = router;