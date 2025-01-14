const dotenv = require('dotenv').config();

console.log(
	'process.env: ',
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	process.env.DB_DATABASE,
	process.env.DB_HOST,
	process.env.DB_PORT,
);

module.exports = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: 'mysql',
	pool: {
		max: 500,
		idle: 10000,
	},
};
