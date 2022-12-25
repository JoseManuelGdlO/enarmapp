const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/**
 * 
 * @param [{idSubcategoria, pregunta, imagen, idioma, subrayadoInicio, subrayadoFin, resumen, bibliografia, preguntas [{respuesta, isCorrecta, retroalimentacion, imagen}]}] 
 */
async function AddQuesiton(body) {

    try {
        for (let question of body) {
            const rows = await db.query(
                `INSERT INTO pregunta ( idSubcategoria, pregunta, imagen, idioma, subrayadoInicio, subrayadoFin, resumen, bibliografia)
                VALUES (${question.idSubcategoria},"${question.pregunta}","${question.imagen}","${question.idioma}",${question.subrayadoInicio},${question.subrayadoFin},"${question.resumen}","${question.bibliografia}");`
            );

            for (let pregunta of question.preguntas) {
                await db.query(
                    `INSERT INTO respuesta ( idPregunta, respuesta, isCorrecta, retroalimentacion)
                    VALUES (${rows.insertId},"${pregunta.respuesta}",${pregunta.isCorrecta},"${pregunta.retroalimentacion}");`
                );
            }

        }

        return 201

    } catch (error) {
        console.error(error);
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

module.exports = {
    AddQuesiton,
    CreateCateogry
}