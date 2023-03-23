const db = require('./db');
const helper = require('../helper');
const encrypt = require('../libs/encrypt');

async function register(body) {
    // body.password = await encrypt.encryptPassword(body.password);
    console.log(body);
    const rows = await db.query(
        `INSERT INTO usuario (nombres, apellidos, email, password, ruta_fotografia, idTipoUsuario, idUniversidad, idFechaEnarm, idEspecialidad, cumpleanos, sexo, id_social_media)
    VALUES ("${body.nombres}", "${body.apellidos}", "${body.email}", "${body.password}", "${body.ruta_fotografia}", "${body.idTipoUsuario}", "${body.idUniversidad}", "${body.idFechaEnarm}", "${body.idEspecialidad}", "${body.cumpleanos}", "${body.sexo}", "${body.id_social_media}");`
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

async function loginForId(body) {
    let code = 200;
    const finds = await db.query(
        `SELECT * FROM usuario
      WHERE email = "${body.email}"`
    );

    let user = helper.emptyOrRows(finds);
    if (user.length === 0) {
        code = 404;
        return {
            user,
            code
        }
    }

    if(user[0].id_social_media.length === 0) {
        await db.query(
            `UPDATE usuario
          set id_social_media = ${body.id} WHERE id = "${user[0].id}"`
        );
    }


    const account = await db.query(
        `SELECT * FROM account_estatus
      WHERE idUsuario = "${user[0].id}"`
    );
    data = { data: user[0], account: account[0] }


    return {
        data,
        code
    }
}

async function changeAccountStatus(body) {
    console.log(body);
    const rows = await db.query(
        `UPDATE account_estatus
        set estatus = ${body.status} WHERE idUsuario = ${body.id}`
    );
    const data = helper.emptyOrRows(rows);;

    return {
        data
    }
}

module.exports = {
    register,
    login,
    loginForId,
    changeAccountStatus
}