const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const arrayUtils = require('../libs/utils-arr')

/**
 * 
 * @param [{ idSubcategoria, nombre, descripcion, imagen, isEspanol, preguntas:[{idSubcategoria, pregunta, imagen, idioma, subrayadoInicio, subrayadoFin, resumen, bibliografia, preguntas [{respuesta, isCorrecta, retroalimentacion, imagen}]}]}] 
 */
async function AddQuesiton(body) {

    const connection = await db.connection();
    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

    await connection.beginTransaction();
    try {

        for (let clinic of body) {


            const [caseClinic,] = await connection.execute(
                `INSERT INTO caso_clinico ( idSubcategoria, nombre, descripcion, imagen, isEspanol)
                VALUES (${clinic.idSubcategoria},"${clinic.nombre}","${clinic.descipcion}","${clinic.imagen}",${clinic.isEspanol});`
            );

            for (let question of clinic.preguntas) {
                const [rows,] = await connection.execute(
                    `INSERT INTO pregunta (idCasoclinico, orden, pregunta, imagen, subrayadoInicio, subrayadoFin, resumen, bibliografia)
                VALUES (${caseClinic.insertId},"${question.orden}","${question.pregunta}","${question.imagen}",${question.subrayadoInicio},${question.subrayadoFin},"${question.resumen}","${question.bibliografia}");`
                );

                for (let pregunta of question.preguntas) {
                    await connection.execute(
                        `INSERT INTO respuesta ( idPregunta, respuesta, isCorrecta, retroalimentacion)
                    VALUES (${rows.insertId},"${pregunta.respuesta}",${pregunta.isCorrecta},"${pregunta.retroalimentacion}");`
                    );
                }

            }

        }
        await connection.commit()
        return 201

    } catch (error) {
        console.error(error);
        connection.rollback();
        console.info('Rollback successful');
        return 405
    }

}

/**
 * 
 * @param [{category: string, subcategories: [{string}]}] body 
 * @returns 
 */
async function CreateCateogry(body) {

    try {
        for (let element of body) {
            const rows = await db.query(
                `INSERT INTO categoria (categoria)
                VALUES ("${element.category}");`
            );

            const data = helper.emptyOrRows(rows);
            console.log(data, 'data');

            if (element.subcategories) {
                for (let item of element.subcategories) {
                    await db.query(
                        `INSERT INTO subcategoria (fkid_categoria, Nombre)
                        VALUES (${data.insertId}, "${item}");`
                    );
                }

            }
        }
        return 201
    } catch (error) {
        return 401
    }


}


/**
 * 
 * @param [{category: string, subcategories: [{string}]}] body 
 * @returns 
 */
async function addSubCategory(body) {

    try {

        await db.query(
            `INSERT INTO subcategoria (fkid_categoria, Nombre)
                        VALUES (${body.fk_id}, "${body.name}");`
        );

        return 201
    } catch (error) {
        return 401
    }


}

/**
 * 
 * @param [{category: string, subcategories: [{string}]}] body 
 * @returns 
 */
async function editSubCategory(body) {

    try {

        await db.query(
            `UPDATE subcategoria SET Nombre = '${body.name}' WHERE id = ${body.id};`
        );

        return 201
    } catch (error) {
        return 401
    }


}

async function getCategories() {
    const rows = await db.query(
        `SELECT categoria.categoria, categoria.id, subcategoria.fkid_categoria, subcategoria.id, subcategoria.Nombre FROM categoria LEFT JOIN subcategoria ON subcategoria.fkid_categoria = categoria.id;`
    );

    const data = helper.emptyOrRows(rows);

    const response = arrayUtils.GroupArrBy(rows, 'fkid_categoria', 'categoria')
    return {
        response
    }
}

async function getQuestions() {
    const rows = await db.query(
        `SELECT p.id, p.active, p.bibliografia, p.idCasoclinico, p.imagen, p.orden, p.pregunta, p.resumen, p.subrayadoInicio, p.subrayadoFin, c.descripcion as clinic_description, c.idSubcategoria as clinic_subcategory, c.imagen as clinic_image, c.isEspanol as clinic_isEspanol, c.nombre as clinic_name FROM pregunta p LEFT JOIN caso_clinico c ON c.id = p.idCasoclinico;`
    );

    // for (let item of rows) {
    //     const responses = await db.query(
    //         `SELECT * FROM respuesta WHERE idPregunta = ${item.id}`
    //     );
    //     item.respuestas = responses

    //     const caso_clinico = await db.query(
    //         `SELECT * FROM caso_clinico WHERE id = ${item.idCasoclinico}`
    //     );
    //     item.caso_clinico = caso_clinico[0]
    // }

    return {
        rows
    }
}

module.exports = {
    AddQuesiton,
    CreateCateogry,
    getCategories,
    addSubCategory,
    getQuestions,
    editSubCategory
}