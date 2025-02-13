const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const userModel = require("../storage/models/user.model.js");
const userStatus = require("../storage/models/user_status.model.js");

async function getAll() {
  const users = await userModel.findAll()
  return users;
}

async function updateProfile(body) {
  let updated = await userModel.update({
    nombres: body.nombres,
    apellidos: body.apellidos,
    idTipoUsuario: body.idTipoUsuario,
    idSuscripcion: body.idSuscripcion,
    cumpleanos: parseInt(body.cumpleanos)
  }, {
    where: {
      id: id
    }
  });

  if (body.estatus) {
    userStatus.upsert({
      user_id: body.id,
      status: body.estatus
    });
  }


  return updated == 0 ? false : true;
}

module.exports = {
  getAll,
  updateProfile
}