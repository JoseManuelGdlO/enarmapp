const db = require('./db');
const helper = require('../helper');
const encrypt = require('../libs/encrypt');

async function register(body) {
    body.password = await encrypt.encryptPassword(body.password);
    const rows = await db.query(
        `INSERT INTO usuario (idsuscripcion, nombres, apellidos, email, password, ruta_fotografia)
    VALUES (${body.idsuscripcion}, "${body.nombres}", "${body.apellidos}", "${body.email}", "${body.password}", "${body.ruta_fotografia}");`
    );

    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function login(body) {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM usuario
      WHERE email = "${body.email}"`
    );

    let data = helper.emptyOrRows(rows);
    console.log('data', data[0].password, 'body', body);
    if (data.length === 0) {
        code = 404;
        return {
            data,
            code
        }
    }

    const samePass = await encrypt.encryptCompare(data[0].password, body.password);
    if (!samePass) {
        data = [];
        code = 403;
        return {
            data,
            code
        }
    }

    return {
        data,
        code
    }
}

module.exports = {
    register,
    login
}