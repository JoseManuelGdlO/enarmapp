// const db = require('./db');
const helper = require('../helper');
const encrypt = require('../libs/encrypt');
const userModel = require("../storage/models/user.model.js");
const statusUserModel = require("../storage/models/user_status.model.js");

async function register({name, last_name, email, password, picture, user_type_id, university_id, enarm_date_id, career_id, birthdate, gender, social_media_id}) {
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

async function login({email, password}) {
    const user = await userModel.findOne({where: {email: email}});
    if (!user) {
        return {
            data: {
                user: null,
                account: null,
            },
            error: 'USER'
        }
    }
    const samePass = user.password == password;
    if (!samePass) {
        return {
            data: {
                user: null,
                account: null,
            },
            error: 'PASSWORD'
        }
    }
    const account = await userStatusModel.findOne({where: {user_id: user.id}});
    return {
        data: {
            user: user,
            account: account,
        }
    }
}

async function loginForId({email, social_media_id}) {
    const user = await userModel.findOne({where: {email: email}});
    if (!user) {
        return {
            data: {
                user: null,
                account: null,
            },
            error: 'USER'
        }
    }

    if (user.social_media_id === null || user.social_media_id === '') {
        await userModel.update({social_media_id: social_media_id}, {where: {id: user.id}});
    }

    const account = await userStatusModel.findOne({where: {user_id: user.id}});

    return {
        data: {
            user: user,
            account: account,
        }
    }
}

async function changeAccountStatus({user_id, status}) {
    const userStatus = await userStatusModel.update({name: status}, {where: {user_id: user_id}});
    return userStatus == 0 ? false : true;
}

async function resetPassword(id) {
    randomstring = Math.random().toString(36).slice(-12);
    const user = await userModel.update({password: randomstring}, {where: {id: id}});
    
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