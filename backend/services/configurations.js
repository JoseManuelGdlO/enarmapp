// const db = require('./db');
const helper = require('../helper');
const { Op } = require('sequelize');

const careerModel = require("../storage/models/career.model.js");
const universityModel = require("../storage/models/university.model.js");
const userTypesModel = require("../storage/models/user_type.model.js");
const enarmDateModel = require("../storage/models/enarm_date.model.js");
const userStatusModel = require("../storage/models/user_status.model.js");

const configurationModel = require("../storage/models/config.model.js"); 
const phrasesModel = require("../storage/models/phrase.model.js");
const subscriptionsModel = require("../storage/models/subscription.model.js");
const laboratoryCategoryModel = require("../storage/models/laboratory_category.model.js");
const laboratoryValuesModel = require("../storage/models/laboratory_value.model.js");

async function getConfigurationPerCode(codeString) {
    const config = await configurationModel.findOne({
        where: {
            code: codeString
        }
    })

    return config;
}

async function getConfigurationPerGroup(group) {
    const config = await configurationModel.findAll({
        where: {
            group: group
        }
    })
    return config;
}

async function getConfiguration() {
    const config = await configurationModel.findAll()
    return config;
}

async function changeStatusUser(status, userId) {
    const userStatus = await userStatusModel.update({
        name: status
    }, {
        where: {
            user_id: userId
        }
    })

    return userStatus;
}

async function updateConfiguration(body) {
    let response= null

    if (body.id) {
       response = await configurationModel.update({
            codigo: body.codigo,
            grupo: body.grupo,
            tipo: body.tipo,
            valor: body.valor,
            descripcion: body.descripcion
        }, {
            where: {
                id: body.id
            }
        })
    } else {
        repsonse = await configurationModel.create({
            codigo: body.codigo,
            grupo: body.grupo,
            tipo: body.tipo,
            valor: body.valor,
            descripcion: body.descripcion
        })
    }

    return response;
}

async function getUniversidades(group) {
    const university = await universityModel.findAll()
    return university;
}

async function getFrases() {
    const phrases = await phrasesModel.findAll()
    return phrases;
}

async function getEspecialidades() {
    const careers = await careerModel.findAll()
    return careers;
}

async function getStudnetTypes(type) {
    let code = 200;
    let userTypes = null
    
    if (type === 'signup') {
        const where = { where : {
            name: { [Op.ne]: 'Administrador' }
        }}
        userTypes = await userTypesModel.findAll(where)
    }
    userTypes = await userTypesModel.findAll()
    return userTypes;
}

async function getEnarmDate() {
    const enamrsDates = await enarmDateModel.findAll()
    return enamrsDates;
}

async function getSubscripciones() {
    const subscriptions = await subscriptionsModel.findAll()
    return subscriptions;
}

async function updateSubscriptions(body) {
    const subscription = null

    if (body.id) {
        subscription = await subscriptionsModel.update({
            tipo: body.tipo,
            costo: body.costo,
            descripcion: body.descripcion,
            duracionMes: body.duracionMes
        }, {
            where: {
                id: body.id
            }
        })
    } else {
        subscription = await subscriptionsModel.create({
            tipo: body.tipo,
            costo: body.costo,
            descripcion: body.descripcion,
            duracionMes: body.duracionMes
        })
    }
    return subscription;
}

async function getLaboratories() {
    const laboratoryCategory = await laboratoryCategoryModel.findAll()
    return laboratoryCategory;
}

async function addLaboratory(body) {
    let laboratoryCategory = null

    if (body.id) {
        laboratoryCategory = await laboratoryCategoryModel.update({
            name: body.name
        }, {
            where: {
                id: body.id
            }
        })
    } else {
        laboratoryCategory = await laboratoryCategoryModel.create({
            name: body.name
        })
    }

    return laboratoryCategory;
}

async function removeLaboratory(id) {

    const laboratoryCategory = await laboratoryCategoryModel.destroy({
        where: {
            id: id
        }
    })

    await laboratoryValuesModel.destroy({
        where: {
            fk_category: id
        }
    })

    return laboratoryCategory;
}

async function addLaboratorySubcategory(body) {
    let laboratoryValues = null

    if (body.id) {
        laboratoryValues = await laboratoryValuesModel.update({
            name: body.name,
            ejemplo: body.ejemplo,
            valor: body.valor
        }, {
            where: {
                id: body.id
            }
        })
    } else {
        laboratoryValues = await laboratoryValuesModel.create({
            fk_category: body.fk_category,
            name: body.name,
            ejemplo: body.ejemplo,
            valor: body.valor
        })
    }

    return laboratoryValues;
}

async function removeLaboratorySubcategory(id) {
    const laboratoryValues = await laboratoryValuesModel.destroy({
        where: {
            id: id
        }
    })

    return laboratoryValues;

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
    changeStatusUser,
    removeLaboratorySubcategory
}
