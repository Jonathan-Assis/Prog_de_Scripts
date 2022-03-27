const Sequelize = require("sequelize");

const database = new Sequelize({
	dialect: "sqlite",
	storage: "banco.db",
});

module.exports = database;
