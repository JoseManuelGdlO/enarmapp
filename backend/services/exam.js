const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const ARR_UTILS = require('../libs/utils-arr')

/** 
 *  @class Response
 *  @type {Object}
 *  @property {int} code status code
 *  @property {int} [id] id of row
 */

/**
 * This create a new exam and all dependencies on database
 * @param {Object} body - is the body of the request.
 * @param {int} body.idTipo - is the type of exame (catalog)
 * @param {int} body.idUsuario - user whom save the row
 * @param {int} body.dificultad - exam's dificulty
 * @param {int} body.numero_preguntas - exam's questions number
 * @param {bool} body.idioma - exam is in spanish
 * @param {bool} body.modo_examen - exam mode
 * @param {bool} body.simular_enarm - is sumulated
 * @param {Array} body.subcategories - exam sub categories
 * @param {Array} body.question_filters - filter by correct, incorrect and all questions
 * @return { Response } Respose of process
 */
async function createExam(body) {

    const connection = await db.connection();
    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

    await connection.beginTransaction();
    try {

        console.log('body', body);
        let idExams = []

        if (body.question_filters && body.question_filters.length > 0) {
            const examsUser = await db.query(
                `SELECT id FROM examen WHERE idUsuario = ${body.idUsuario};`
            );

            idExams = ARR_UTILS.CovertArrayString(examsUser, 'id')

            const answeredQuestions = body.question_filters.filter(x => x === 'No contestadas').length > 0 ? false : true
            const answeredCorrects = body.question_filters.filter(x => x === 'Correctas').length > 0 ? true : false
            const answeredIcorrects = body.question_filters.filter(x => x === 'Incorrectas').length > 0 ? true : false

            let queryFilters = `SELECT * FROM preguntas_examen WHERE idExamen IN (${idExams.toString()})`

            const questionsExams = await db.query(
                queryFilters
            );

            console.log('questionsExams', questionsExams);


            filters = []

            if (answeredCorrects) {
                for (const answer of questionsExams) {
                    if (answer.idRespuesta) {
                        const correct = await db.query(`SELECT id FROM respuesta WHERE idPregunta = ${answer.idPregunta} AND isCorrecta = 1`);
                        if (correct.length !== 0) {
                            filters.push(answer.idPregunta)
                        }

                    }
                }
            }

            if (answeredIcorrects) {
                for (const answer of questionsExams) {
                    if (answer.idRespuesta) {
                        const correct = await db.query(`SELECT id FROM respuesta WHERE idPregunta = ${answer.idPregunta} AND isCorrecta = 0`);
                        if (correct.length !== 0) {
                            filters.push(answer.idPregunta)
                        }

                    }
                }
            }

            if (!answeredQuestions) {
                for (const answer of questionsExams) {
                    if (!answer.idRespuesta) {
                        filters.push(answer.idPregunta)
                    }
                }
            }

            console.log('filters', filters);

            idExams = filters.filter((value, index, self) => {
                return self.indexOf(value) === index;
            })

            console.log('uniqFilters', idExams);

        }

        const nameSubcategories = ARR_UTILS.CovertArrayStringComma(body.subcategories)

        let idsSubcategories = await db.query(
            `SELECT id FROM subcategoria WHERE Nombre IN (${nameSubcategories});`
        );

        idsSubcategories = ARR_UTILS.CovertArrayString(idsSubcategories, 'id')

        console.log('idsSubcategories', idsSubcategories);

        let query = `SELECT PE.id FROM caso_clinico C
            LEFT JOIN pregunta PE
            ON PE.idCasoclinico = C.id
            WHERE C.idSubcategoria IN (${idsSubcategories.toString()})
            AND C.isEspanol = ${body.idioma}`


        let getAnswers = await db.query(
            query
        );

        console.log('getAnswers', getAnswers);

        getAnswers = ARR_UTILS.CovertArrayString(getAnswers, 'id')

        const uniqAnswers = getAnswers.filter((value, index, self) => {
            return self.indexOf(value) === index;
        })

        console.log('getAnswers', getAnswers);
        console.log('uniqAnswers', uniqAnswers);

        const getCompleteAswers = await db.query(
            `Select id from pregunta where id IN (${uniqAnswers.toString()} ${idExams.length !== 0 ? + ', ' + idExams.toString() : ''}) ORDER BY RAND() LIMIT ${body.numero_preguntas};`
        );


        console.log('getCompleteAswers', getCompleteAswers);

        const uniqCompleteAnswers = getCompleteAswers.filter((value, index, self) => {
            return self.indexOf(value) === index;
        })

        console.log('uniqCompleteAnswers', uniqCompleteAnswers);

        if (getCompleteAswers.length === 0) {
            return { code: 404 }
        }
        console.log('pass');

        const exam = await db.query(
            `INSERT INTO examen (idTipo, idUsuario, dificultad, numeroPreguntas, isEspanol, creationDate, study_mode, simulation)
            VALUES (${body.idTipo}, ${body.idUsuario}, ${body.idUsuario}, ${getCompleteAswers.length}, ${body.idioma}, "${new Date().toISOString().split('T')[0]}", ${body.modo_examen}, ${body.simular_enarm});`
        );

        console.log('exam', exam);

        for (let pregunta of uniqCompleteAnswers) {
            await db.query(
                `INSERT INTO preguntas_examen (idExamen, idPregunta, idRespuesta)
                VALUES (${exam.insertId}, ${pregunta.id}, null);`);
        }

        await connection.commit();


        return { code: 201, id: exam.insertId }
    } catch (error) {
        console.error(error);
        connection.rollback();
        console.info('Rollback successful');
        return { code: 405 }
    }


}

/**
 * 
 * @param {idExamen, idPregunta, idRespuesta}
 * @returns 
 */
async function saveAnswer(body) {

    try {
        const result = await db.query(
            `UPDATE preguntas_examen
                 SET idRespuesta = ${body.idRespuesta}
                 WHERE idExamen=${body.idExamen} AND idPregunta=${body.idPregunta}`
        );

        console.log('result', result);
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
            if (answer.idRespuesta) {
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

    let rowDeatil = await db.query(
        `SELECT *
        FROM examen 
        WHERE id = ${id}`
    );

    const examDetail = helper.emptyOrRows(rowDeatil);
    if (!examDetail) {
        return {
            response: null,
            code: 404
        }
    }

    let rows = await db.query(
        `SELECT     E.id, E.numeroPreguntas
        , C.idPregunta, C.idRespuesta
        FROM        examen E
        INNER JOIN  preguntas_examen C
        ON      C.idExamen = E.id
        WHERE E.id = ${id}`
    );

    const exam = helper.emptyOrRows(rows);
    if (!exam) {
        return {
            response: null,
            code: 404
        }
    }


    let questionResponse = []

    for (let question of exam) {
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

        const caseClinic = await db.query(
            `SELECT * 
            FROM caso_clinico WHERE id = ${rows[0].idCasoclinico}`
        );

        rows[0].casoClinico = caseClinic[0];

        questionResponse.push(rows[0])
    }

    questionResponse = helper.emptyOrRows(questionResponse);
    if (!questionResponse) {
        return {
            response: null,
            code: 404
        }
    }

    return {
        response: { id: exam.id, questionResponse, exam: examDetail[0] },
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
    createExam,
    saveAnswer
}