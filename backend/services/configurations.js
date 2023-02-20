const db = require('./db');
const helper = require('../helper');

async function getConfigurationPerCode(codeString) {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM configs
      WHERE codigo = "${codeString}"`
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

async function getConfigurationPerGroup(group) {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM configs
      WHERE grupo = "${group}"`
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

async function getUniversidades(group) {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM universidades`
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

async function getEspecialidades(group) {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM especialidades`
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

module.exports = {
    getConfigurationPerCode,
    getConfigurationPerGroup,
    getUniversidades,
    getEspecialidades
}
