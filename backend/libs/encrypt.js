const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

async function encryptPassword(data) {
    const encryptData = await bcrypt.hash(data, BCRYPT_SALT_ROUNDS);
    return encryptData;
}

async function encryptCompare(data, data2) {
    const compare = await bcrypt.compare(data, data2);
    return compare;
}


module.exports = {
    encryptPassword,
    encryptCompare
}