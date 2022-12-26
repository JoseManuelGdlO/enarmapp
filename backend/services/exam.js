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

/**
 * 
 * @param id
 * @returns 
 */
async function getExamsListPerUser(id) {

    const offset = helper.getOffset(undefined, config.listPerPage);
    const rows = await db.query(
      `SELECT * 
      FROM examen WHERE idUsuario = ${id} LIMIT ${offset},${config.listPerPage}`
    );
    
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }

}

/**
 * 
 * @param id
 * @returns 
 */
async function getExamdetail(id) {

    let rows = await db.query(
      `SELECT     E.id, E.numeroPreguntas
        , C.idPregunta, C.idRespuesta
        FROM        examen E
        INNER JOIN  preguntas_examen C
        ON      C.idExamen = E.id
        WHERE E.id = ${id}`
    );
    
    const exam = helper.emptyOrRows(rows);
    if(!exam){
        return {
            response: null, 
            code: 404
        }
    }

    let questionResponse = []

    for(let question of exam ) {
        console.log('quesiton', question);
        rows = await db.query(
            `SELECT * 
            FROM pregunta WHERE id = ${question.idPregunta}`
        );
        
        rows[0].idRespuesta = question.idRespuesta

        const answers = await db.query(
            `SELECT * 
            FROM respuesta WHERE idPregunta = ${question.idPregunta}`
        );

        rows[0].respuestas = answers;

        questionResponse.push(rows[0])
    }

    questionResponse = helper.emptyOrRows(questionResponse);
    if(!questionResponse){
        return {
            response: null,            
            code: 404
        }
    }
      
    return {
      response: { id: exam.id, questionResponse},
      code: 200
    }

}

module.exports = {
    addExamType,
    getExamsListPerUser,
    getExamdetail,
    createExam
}