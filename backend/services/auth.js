// const db = require('./db');
const helper = require('../helper');
const encrypt = require('../libs/encrypt');
const userModel = require("../storage/models/user.model.js");
const statusUserModel = require("../storage/models/user_status.model.js");

async function register(body) {
    // body.password = await encrypt.encryptPassword(body.password);
    let user = await userModel.create({
        subscription_id: 1,
        name: body.nombres,
        last_name: body.apellidos,
        email: body.email,
        password: body.password,
        picture: body.ruta_fotografia,
        user_type_id: body.idTipoUsuario,
        university_id: body.idUniversidad,
        enarm_date_id: body.idFechaEnarm,
        career_id: body.idEspecialidad,
        birthdate: body.cumpleanos,
        gender: body.sexo,
        social_media_id: body.id_social_media? body.id_social_media : 0,
      });
    console.log(user);

    await statusUserModel.create({
        user_id: user.id,
        name: 0
    });

    return user;
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

    if (user[0].id_social_media.length === 0) {
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
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function resetPassword(id) {

    randomstring = Math.random().toString(36).slice(-12);

    await db.query(
        `UPDATE usuario
        set password = '${randomstring}' WHERE id = ${id}`
    );

    return {
        randomstring
    }
}

module.exports = {
    register,
    login,
    loginForId,
    resetPassword,
    changeAccountStatus
}