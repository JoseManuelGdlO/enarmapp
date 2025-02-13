const { Sequelize } = require('sequelize');

console.log('hola' ,process.env.DB_DATABASE)

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: parseInt((process.env.DB_PORT || 3306).toString(), 10),
        pool: {
            max: 5,
            min: 0,
            // idle: 5000,
        },
    },
);

module.exports = sequelize;