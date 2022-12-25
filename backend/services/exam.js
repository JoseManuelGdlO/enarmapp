const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/**
 * 
 * @param { idTipo, idUsuario, dificultad, numeroPreguntas, isEspañol, preguntas: [int] } 
 * @returns 
 */
async function createExam(body) {

    try {
        const rows = await db.query(
            `INSERT INTO examen (idTipo, idUsuario, dificultad, numeroPreguntas, isEspanol)
    VALUES (${body.idTipo}, ${body.idUsuario}, ${body.dificultad}, ${body.numeroPreguntas}, ${body.isEspañol});`
        );

        for (let pregunta of body.preguntas) {
            await db.query(
                `INSERT INTO preguntas_examen (idExamen, idPregunta, idRespuesta)
        VALUES (${rows.insertId}, ${pregunta}, null);`);
        }
        return 201
    } catch (error) {
        console.error(error);
        return 405
    }


}

/**
 * 
 * @param [string]
 * @returns 
 */
async function addExamType(body) {

    try {
        for (let type of body) {
            await db.query(
                `INSERT INTO tipo_examen (tipo)
                VALUES ("${type}");`
            );

        }
        return 201
    } catch (error) {
        console.error(error);
        return 405
    }



}

module.exports = {
    addExamType,
    createExam
}