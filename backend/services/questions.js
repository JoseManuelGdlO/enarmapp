const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const arrayUtils = require('../libs/utils-arr')
const AWS = require('aws-sdk');

const s3 = new AWS.S3({ accessKeyId: 'AKIA6HPBFGT5Q54KAMI7', secretAccessKey: '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' });

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
            if(clinic.imagen) {
                const imageBuffer = Buffer.from(clinic.imagen.data.split(',')[1], 'base64');
                const params = {
                    Bucket: 'enrm-dev-images',
                    Key: clinic.nombre.split(' ').join('-').trim().slice(31) + '_' + new Date().getTime().toString() + '.' + clinic.imagen.mimetype.split('/')[1],
                    Body: imageBuffer,
                    ACL: 'public-read',
                    ContentType: clinic.imagen.mimetype,
                    ContentLength: clinic.imagen.size
                };
                const response = await s3.upload(params).promise();
                clinic.imagen = response.Location
            }

            const [caseClinic,] = await connection.execute(
                `INSERT INTO caso_clinico ( idSubcategoria, nombre, descripcion, imagen, isEspanol)
                VALUES (${clinic.idSubcategoria},"${clinic.nombre}","${clinic.descipcion}","${clinic.imagen}",${clinic.isEspanol});`
            );

            for (let question of clinic.preguntas) {


                if (question.imagen) {
                    const imageBuffer = Buffer.from(question.imagen.data.split(',')[1], 'base64');
                    const params = {
                        Bucket: 'enrm-dev-images',
                        Key: question.pregunta.split(' ').join('-').trim().slice(31) + '_' + new Date().getTime().toString() + '.' + question.imagen.mimetype.split('/')[1],
                        Body: imageBuffer,
                        ACL: 'public-read',
                        ContentType: question.imagen.mimetype,
                        ContentLength: question.imagen.size
                    };
                    const response = await s3.upload(params).promise();
                    question.imagen = response.Location
                }

                const [rows,] = await connection.execute(
                    `INSERT INTO pregunta (idCasoclinico, orden, pregunta, imagen, subrayadoInicio, subrayadoFin, resumen, bibliografia)
                VALUES (${caseClinic.insertId},"${question.orden}","${question.pregunta}","${question.imagen}",${question.subrayadoInicio},${question.subrayadoFin},"${question.resumen}","${question.bibliografia}");`
                );

                for (let pregunta of question.answers) {

                    if(pregunta.imagen) {
                        const params = {
                            Bucket: 'enrm-dev-images',
                            Key: pregunta.imagen.name.split(' ').join('-').trim().slice(31) + '_' + new Date().getTime().toString() + '.' + pregunta.imagen.mimetype.split('/')[1],
                            Body: pregunta.imagen.data,
                            ACL: 'public-read',
                            ContentType: pregunta.imagen.mimetype,
                            ContentLength: pregunta.imagen.size
                        };
                        const response = await s3.upload(params).promise();
                        pregunta.imagen = response.Location
                    }

                    await connection.execute(
                        `INSERT INTO respuesta ( idPregunta, respuesta, isCorrecta, retroalimentacion, imagen)
                    VALUES (${rows.insertId},"${pregunta.respuesta}",${pregunta.isCorrecta},"${pregunta.retroalimentacion}", "${response.Location}");`
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
        `SELECT c.id, c.descripcion as clinic_description, c.idSubcategoria as clinic_subcategory, c.imagen as clinic_image, c.isEspanol as clinic_isEspanol, c.nombre as clinic_name FROM caso_clinico c `
    );
    // const rows = await db.query(
    //     `SELECT p.id, p.active, p.bibliografia, p.idCasoclinico, p.imagen, p.orden, p.pregunta, p.resumen, p.subrayadoInicio, p.subrayadoFin, c.descripcion as clinic_description, c.idSubcategoria as clinic_subcategory, c.imagen as clinic_image, c.isEspanol as clinic_isEspanol, c.nombre as clinic_name FROM pregunta p LEFT JOIN caso_clinico c ON c.id = p.idCasoclinico;`
    // );

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

async function getQuestion(id) {
    const clinicCase = await db.query(
        `SELECT * FROM caso_clinico WHERE id = ${id}`
    );

    const clinicCaseData = helper.emptyOrRows(clinicCase)[0];

    const question = await db.query(
        `SELECT * FROM pregunta WHERE idCasoclinico = ${id}`
    );

    const questionData = helper.emptyOrRows(question);

    for (let item of questionData) {
        const responses = await db.query(
            `SELECT * FROM respuesta WHERE idPregunta = ${item.id}`
        );
        item.answers = responses
    }
    clinicCaseData.questions = questionData

    return {
        clinicCaseData
    }
}

module.exports = {
    AddQuesiton,
    CreateCateogry,
    getCategories,
    addSubCategory,
    getQuestions,
    editSubCategory,
    getQuestion
}