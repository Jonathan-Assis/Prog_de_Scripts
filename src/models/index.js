const UsuarioModel = require("./usuario");
const GastoModel = require("./gasto");
const database = require("../database");

UsuarioModel.hasMany(GastoModel, {
	foreignKey: {
		name: "idusuario",
		allowNull: false,
		validate: {
			notNull:{
				msg: "Forneça a identificação do usuário"
			},
			foreignkey: async (idusuario, next) => {
				const usuario = await UsuarioModel.findOne({ where: { idusuario } });
				if (usuario === null) {
					return next(`Usuário ${idusuario} não identificado`);
				}
				return next();
			}
		}
	},
	sourceKey: "idusuario",
	onDelete: "cascade",
	onUpdate: "cascade",
	hooks: true, //usado para forçar o cascade no onDelete
});
GastoModel.belongsTo(UsuarioModel, {
	foreignKey: "idusuario",
	targetKey: "idusuario",
});

//cria as tabelas no SGBD se elas não existirem
database.sync();

module.exports = {
	UsuarioModel,
	GastoModel,
};
