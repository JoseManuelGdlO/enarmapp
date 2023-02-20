const db = require('./db');
const helper = require('../helper');
const encrypt = require('../libs/encrypt');

async function register(body) {
    // body.password = await encrypt.encryptPassword(body.password);
    console.log(body);
    const rows = await db.query(
        `INSERT INTO usuario (nombres, apellidos, email, password, ruta_fotografia, idTipoUsuario, idUniversidad, idFechaEnarm, idEspecialidad, cumpleanos, sexo)
    VALUES ("${body.nombres}", "${body.apellidos}", "${body.email}", "${body.password}", "${body.ruta_fotografia}", "${body.idTipoUsuario}", "${body.idUniversidad}", "${body.idFechaEnarm}", "${body.idEspecialidad}", "${body.cumpleanos}", "${body.sexo}");`
    );
    const data = helper.emptyOrRows(rows);

    await db.query(
        `INSERT INTO account_estatus (idUsuario, estatus)
    VALUES (${data.insertId}, 0);`
    );

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
    if (data.length === 0) {
        code = 404;
        return {
            data,
            code
        }
    }

    const samePass = data[0].password == body.password;
    if (!samePass) {
        data = [];
        code = 403;
        return {
            data,
            code
        }
    }
    console.log(data);

    const account = await db.query(
        `SELECT * FROM account_estatus
      WHERE idUsuario = "${data[0].id}"`
    );
    data = { data: data[0], account: account[0] }


    return {
        data,
        code
    }
}

module.exports = {
    register,
    login
}