const voucherModel = require("../storage/models/voucher.model.js");

async function getAll() {
    const vouchers = await voucherModel.findAll()
    return vouchers;
}

async function getOne({name, code}) {
    let where = {};
    // #region Filter create section
    if (name !== undefined) {
      where.name = name;
    }
    if (code !== undefined) {
      where.code = code;
    }
    // #endregion
    const vouchers = await voucherModel.findOne({where: where});
    return vouchers;
}

async function create({name, code, discount, type, usage_limit, expiration_date}) {
    let voucher = await voucherModel.create({
      name: name,
      code: code,
      discount: discount,
      type: type,
      usage_limit: usage_limit,
      expiration_date: expiration_date
    });
    return voucher
}

async function update({id, discount, type, usage_limit, expiration_date}) {
    let updated = await voucherModel.update({
      discount: discount,
      type: type,
      usage_limit: usage_limit,
      expiration_date: expiration_date
    }, {
      where: {
        id: id
      }
    });
    return updated == 0 ? false : true;
}

async function remove(id) {
    let deleted = await voucherModel.destroy({
      where: {
        id: id
      }
    });
    return deleted == 0 ? false : true;
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
}