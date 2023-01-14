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

            
            const [caseClinic, ] = await connection.execute(
                `INSERT INTO caso_clinico ( idSubcategoria, nombre, descripcion, imagen, isEspanol)
                VALUES (${clinic.idSubcategoria},"${clinic.nombre}","${clinic.descipcion}","${clinic.imagen}",${clinic.isEspanol});`
            );

            for (let question of clinic.preguntas) {
                const [rows, ] = await connection.execute(
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

async function getCategories() {
    const rows = await db.query(
        `SELECT categoria.categoria, categoria.id, subcategoria.fkid_categoria, subcategoria.id, subcategoria.Nombre FROM categoria RIGHT JOIN subcategoria ON categoria.id = subcategoria.fkid_categoria;`
    );

    const data = helper.emptyOrRows(rows);

    const response = arrayUtils.GroupArrBy(rows, 'fkid_categoria', 'categoria')
    console.log(response);
    return {
        response
    }
}

module.exports = {
    AddQuesiton,
    CreateCateogry,
    getCategories
}