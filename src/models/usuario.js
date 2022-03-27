const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const database = require("../database");

const Usuario = database.define(
	"usuario",
	{
		idusuario: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		mail: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				msg: "O e-mail já existe no cadastro",
			},
			validate: {
				notNull:{
					msg: "Forneça um e-mail"
				},
				isEmail: {
					msg: "Forneça um e-mail válido",
				},
			},
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull:{
					msg: "Forneça a senha"
				},
				len: function (senha, next) {
					console.log("senha", senha);
					if (senha.length < 6)
						return next("A senha deve ter pelo menos 6 caracteres");
					return next();
				}
			},
		},
	},
	{
		hooks: {
			// chamado antes de efetuar o insert
			beforeCreate: (usuario) => {
				usuario.senha = bcrypt.hashSync(
					usuario.senha,
					bcrypt.genSaltSync(10)
				);
			},
			beforeUpdate: (usuario) => {
				// beforeUpdate é chamado sempre ao atualizar
				// então é preciso saber se é para atualizar a senha
				if (usuario.senha)
					usuario.senha = bcrypt.hashSync(
						usuario.senha,
						bcrypt.genSaltSync(10)
					);
			},
		},
	}
);

// adiciona o método camparePasswor no modelo usuário
Usuario.prototype.comparePassword = (senha, hash) => {
	return bcrypt.compareSync(senha, hash);
};

module.exports = Usuario;
