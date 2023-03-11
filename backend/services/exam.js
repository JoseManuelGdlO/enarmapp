const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const ARR_UTILS = require('../libs/utils-arr')

/**
 * 
 * @param { idTipo, idUsuario, dificultad, numeroPreguntas, isEspañol, sucategories: [int] } 
 * @returns 
 */
async function createExam(body) {

    try {
        
        const examsUser = await db.query(
            `SELECT id FROM examen WHERE idUsuario = ${body.idUsuario};`
        );

        const idExams = ARR_UTILS.CovertArrayString(examsUser, 'id')

        let getAnswers = await db.query(
            `SELECT P.id FROM pregunta P
            LEFT JOIN preguntas_examen PE
            ON PE.idPregunta = P.id
            WHERE P.idSubcategoria IN (${body.subcategories.toString()})
            AND PE.idExamen IN (${idExams.toString()});`
        );

        getAnswers = ARR_UTILS.CovertArrayString(getAnswers, 'id')

        const uniqAnswers = getAnswers.filter((value, index, self) => {
            return self.indexOf(value) === index;
          })

        const getCompleteAswers = await db.query(
            `Select id from pregunta where id NOT IN (${uniqAnswers.toString()}) AND isEspanol = ${body.isEspanol} ORDER BY RAND() LIMIT ${body.numeroPreguntas};`
        );
        
        console.log('complete', getCompleteAswers);

        if(getCompleteAswers.length === 0) {
            return 404
        }

        const exam = await db.query(
            `INSERT INTO examen (idTipo, idUsuario, dificultad, numeroPreguntas)
            VALUES (${body.idTipo}, ${body.idUsuario}, ${body.dificultad}, ${body.numeroPreguntas});`
        );

        for (let pregunta of getCompleteAswers) {
            await db.query(
                `INSERT INTO preguntas_examen (idExamen, idPregunta, idRespuesta)
        VALUES (${exam.insertId}, ${pregunta.id}, null);`);
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
    
    for (const exam of rows) {

        const answers = await db.query(
            `SELECT * 
                FROM preguntas_examen WHERE idExamen = ${exam.id}`
        );
        let responses = 0
        for (const answer of answers) {
            if(answer.idRespuesta) {
                responses++
            }
        }

        exam.respondidas = responses

    }

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

// SELECT P.* FROM pregunta P
// LEFT JOIN preguntas_examen PE
// ON PE.idPregunta = P.id
// WHERE P.idSubcategoria IN (1,2,3,4,5)
// AND PE.

module.exports = {
    addExamType,
    getExamsListPerUser,
    getExamdetail,
    createExam
}