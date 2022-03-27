const { DataTypes } = require("sequelize");
const database = require("../database");

const Gasto = database.define(
	"gasto",
	{
		idgasto: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		descricao: {
			type: DataTypes.STRING,
			allowNull: false,
			notEmpty:{
				msg: "Forneça a descrição do gasto"
			},
			validate: {
				notNull:{
					msg: "Forneça a descrição do gasto"
				},
				len:{
					args:[1,50],
					msg:"Forneça uma descrição contendo de 1 a 50 letras"
				}
			}
		},
		valor: {
			type: DataTypes.FLOAT,
			allowNull: false,
			notEmpty: {
				msg: "Forneça o valor do gasto"
			},
			validate: {
				notNull:{
					msg: "Forneça o valor gasto"
				},
				isFloat:{
					msg: "Forneça um valor válido"
				}
			},
		},
	}
);
module.exports = Gasto;
