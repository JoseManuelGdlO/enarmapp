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

async function getConfiguration() {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM configs`
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

async function updateConfiguration(body) {
    let code = 200;
    let rows

    if (body.id) {
        rows = await db.query(
            `UPDATE configs SET descripcion = '${body.descripcion}', codigo = '${body.codigo}', grupo = '${body.grupo}', tipo = '${body.tipo}', valor = '${body.valor}' WHERE id = ${body.id}`
        );
    } else {
        rows = await db.query(
            `INSERT INTO configs (codigo, grupo, tipo, valor, descripcion) VALUES ('${body.codigo}', '${body.grupo}', '${body.tipo}', '${body.valor}', '${body.descripcion}')`
        );
    }

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

async function getFrases(group) {
    let code = 200;

    const rows = await db.query(
        'SELECT * FROM frases'
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

async function getStudnetTypes(type) {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM tipo_usuario`
    );

    let data = helper.emptyOrRows(rows);
    if (data.length === 0) {
        code = 404;
        return {
            data,
            code
        }
    }

    if (type === 'signup') {
        const index = data.findIndex(x => x.id === 5);
        data.splice(index, 1);
    }
    return {
        data,
        code
    }
}

async function getEnarmDate(group) {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM fecha_enarm`
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

async function getSubscripciones() {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM suscripcion`
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

async function updateSubscriptions(body) {
    let code = 200;
    let rows

    if (body.id) {
        rows = await db.query(
            `UPDATE suscripcion SET tipo = '${body.tipo}', costo = '${body.costo}', descripcion = '${body.descripcion}', duracionMes = '${body.duracionMes}' WHERE id = ${body.id}`
        );
    } else {
        rows = await db.query(
            `INSERT INTO suscripcion (tipo, costo, descripcion, duracionMes) VALUES ('${body.tipo}', '${body.costo}', '${body.descripcion}', '${body.duracionMes}')`
        );
    }

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

async function getLaboratories() {
    let code = 200;

    const rows = await db.query(
        `SELECT * FROM laboratory_category`
    );

    for (const row of rows) {
        const rows2 = await db.query(`SELECT * FROM laboratory_values WHERE fk_category = ${row.id}`)
        row.subcategories = rows2
    }

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

async function addLaboratory(body) {
    let code = 200;
    let rows

    if (body.id) {
        rows = await db.query(
            `UPDATE laboratory_category SET name = '${body.name}' WHERE id = ${body.id}`
        );
    } else {
        rows = await db.query(
            `INSERT INTO laboratory_category (name) VALUES ('${body.name}')`
        );
    }

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

async function removeLaboratory(id) {
    let code = 200;
    let rows

    rows = await db.query(
        `DELETE FROM laboratory_values WHERE fk_category = ${id}`
    );

    rows = await db.query(
        `DELETE FROM laboratory_category WHERE id = ${id}`
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

async function addLaboratorySubcategory(body) {
    let code = 200;
    let rows

    if (body.id) {
        rows = await db.query(
            `UPDATE laboratory_values SET name = '${body.name}', ejemplo = '${body.ejemplo}', valor = '${body.valor}' WHERE id = ${body.id}`
        );
    } else {
        rows = await db.query(
            `INSERT INTO laboratory_values (fk_category, name, ejemplo, valor) VALUES (${body.fk_category}, '${body.name}', '${body.ejemplo}', '${body.valor}')`
        );
    }

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

async function removeLaboratorySubcategory(id) {
    let code = 200;
    let rows
    console.log('id', id);

    rows = await db.query(
        `DELETE FROM laboratory_values WHERE id = ${id}`
    )

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
    getConfigurationPerCode,
    getLaboratories,
    getConfigurationPerGroup,
    getUniversidades,
    getConfiguration,
    updateConfiguration,
    getFrases,
    getEspecialidades,
    getStudnetTypes,
    updateSubscriptions,
    getEnarmDate,
    getSubscripciones,
    removeLaboratory,
    addLaboratory,
    addLaboratorySubcategory,
    removeLaboratorySubcategory
}
