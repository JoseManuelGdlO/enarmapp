const { where } = require('sequelize');
const categoryModel = require('../storage/models/category.model');
const subcategoryModel = require('../storage/models/subcategory.model');

async function getAll() {
    const rows = await categoryModel.findAll({include: 'subcategories'})
    
    return rows
}

async function create({name, subcategories}) {
    const category = await categoryModel.create({
        name: name,
        subcategories: subcategories
    }, {include: subcategoryModel});

    return category
}

async function addSubcategory({category_id, name}) {
    const subcategory = await subcategoryModel.create({
        name: name,
        category_id: category_id
    });

    return subcategory
}

async function editSubcategory({id, name}) {
    const updated = await subcategoryModel.update({
        name: name,
    }, {
        where: {
            id: id
        }
    });
    return updated == 0 ? false : true;
}

module.exports = {
    getAll,
    create,
    addSubcategory,
    editSubcategory,
}