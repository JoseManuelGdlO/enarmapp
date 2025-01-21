const voucherModel = require("../storage/models/voucher.model.js");
const helper = require('../helper');

async function getAll() {
    const vouchers = await voucherModel.findAll()
    return vouchers;
}

async function getOne(name, code) {
    let statusCode = 200;
    let where = [];
    let whereValues = [];
    if (name !== undefined) {
        where.push(`nombre = ?`);
        whereValues.push(name);
    }
    if (code !== undefined) {
        where.push(`codigo = ?`);
        whereValues.push(code);
    }

    let query = `SELECT * FROM cupones`;
    if (where.length !== 0) {
        query += ` WHERE ${where.join(' AND ')}`;
    }
    console.log(query);
    const rows = await db.query(query, whereValues);

    let data = helper.emptyOrRows(rows);
    if (data.length === 0) {
        statusCode = 404;
        return {
            data,
            statusCode
        }
    }

    return {
        data,
        statusCode
    }
}

async function create({name, code, discount, type, usage_limit, expiration_date}) {
    let statusCode = 201;
    console.log(name, code, discount, type, usage_limit, expiration_date);

    const result = await db.query(
        `INSERT INTO cupones (nombre, codigo, descuento, tipo, limite_usos, fecha_expiracion)
        VALUES (?, ?, ?, ?, ?, ?)`, [name, code, discount, type, usage_limit, expiration_date]
    );

    let message = 'Voucher created successfully';

    if (!result.affectedRows) {
        message = 'Error in creating voucher';
        return {
            message,
            statusCode: 400
        }
    }

    return {
        message,
        statusCode
    }
}

async function update(descuento, tipo, limite_usos, fecha_expiracion) {
    let code = 200;

    const rows = await db.query(
        `UPDATE cupones SET descuento = ?, tipo = ?, limite_usos = ?, fecha_expiracion = ?`, [descuento, tipo, limite_usos, fecha_expiracion]
    );

    let data = helper.emptyOrRows(rows);
    if (data.length === 0) {
        code = 404;
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

async function remove(id) {
    let code = 200;

    const rows = await db.query(
        `DELETE FROM cupones WHERE id = ?`, [id]
    );

    let data = helper.emptyOrRows(rows);
    if (data.length === 0) {
        code = 404;
        return {
            code
        }
    }

    return {
        code
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
}