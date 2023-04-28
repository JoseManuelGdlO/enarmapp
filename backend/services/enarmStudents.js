const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT usuario.*, account_estatus.estatus FROM usuario LEFT JOIN account_estatus ON usuario.id = account_estatus.idUsuario`
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function updateProfile(body) {
  const rows = await db.query(
    `UPDATE usuario SET 
      nombres = '${body.nombres}',
      apellidos = '${body.apellidos}',
      idTipoUsuario = '${body.idTipoUsuario}',
      idSuscripcion= '${body.idSuscripcion}',
      cumpleanos = '${parseInt(body.cumpleanos)}'
    WHERE id = ${body.id}`
  );

  if (body.estatus) {
    const exist = await db.query(
      `select * from account_estatus WHERE idUsuario = ${body.id};`
    );

    const flagExist = helper.emptyOrRows(exist).length !== 0;

    if (flagExist) {
      await db.query(
        `UPDATE account_estatus SET estatus = ${parseInt(body.estatus)} WHERE idUsuario = ${body.id};`
      );
    } else {
      await db.query(
        `INSERT INTO account_estatus (idUsuario, estatus) VALUES (${body.id}, ${parseInt(body.estatus)});`
      );
    }

  }

  const data = helper.emptyOrRows(rows);

  return data
}

module.exports = {
  getMultiple,
  updateProfile
}