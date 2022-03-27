const { UsuarioModel } = require("../models");

class UsuarioController {
	async create(req, res) {
		let { mail, senha } = req.body;
		senha = (senha || "").toString().trim();

		return await UsuarioModel.create({ mail, senha })
			.then(async (r) => {
				const { idusuario, mail } = r.get();
				return res.status(200).json({ idusuario, mail });
			})
			.catch((err) => {
				// pega os erros de validação emitidos pelo modelo do Sequelize
				if( err.errors.length > 0 ){
					return res.status(400).json({ error: err.errors[0].message });
				}
				else{
					return res.status(400).json({ error: err.message });
				}
			  });
	}

	async updatemail(req, res) {
		let { idusuario, mail } = req.body;

		return await UsuarioModel.findOne({ where: { idusuario } })
			.then(async (usuario) => {
				if (usuario) {
					await usuario.update({ mail });
					return res.json({mail});
				}
				return res.status(400).json({ error: "Usuário não identificado" });
			})
			.catch((err) => {
				if( err.errors.length > 0 ){
					return res.status(400).json({ error: err.errors[0].message });
				}
				else{
					return res.status(400).json({ error: err.message });
				}
			  });
	}

	async updatesenha(req, res) {
		let { idusuario, senha } = req.body;
		senha = (senha || "").toString().trim();
		if( senha.length < 6 ){
			return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" });
		}

		return await UsuarioModel.findOne({ where: { idusuario } })
			.then(async (usuario) => {
				if (usuario) {
					await usuario.update({ senha });
					return res.json({idusuario});
				}
				return res.status(400).json({ error: "Usuário não identificado" });
			})
			.catch((err) => {
				if( err.errors.length > 0 ){
					return res.status(400).json({ error: err.errors[0].message });
				}
				else{
					return res.status(400).json({ error: err.message });
				}
			  });
	}
}

module.exports = UsuarioController;
