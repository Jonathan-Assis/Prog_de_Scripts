const { GastoModel } = require("../models");

class GastoController {
	async create(req, res) {
		let { idusuario, descricao, valor } = req.body;

		return await GastoModel.create({idusuario,descricao,valor})
			.then(async (gasto) => {
				const { idusuario, descricao, valor } = gasto.get();
				return res.json({ idusuario, descricao, valor });
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

	async update(req, res) {
		let {idgasto, descricao, valor } = req.body;
		idgasto = (idgasto || "").toString();

		return await GastoModel.findOne({
			where: { idgasto },
		})
			.then(async (gasto) => {
				if (gasto) {
					await gasto.update({ descricao, valor });
					return res.status(200).json({descricao:gasto.descricao,valor:gasto.valor});
				}
				return res.status(400).json({ error: "Gasto não identificado" });
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

	async remove(req, res) {
		let { idgasto } = req.body;
		idgasto = (idgasto || "").toString();

		return await GastoModel.findOne({ where: { idgasto } })
			.then(async (gasto) => {
				if (gasto !== null) {
					await gasto.destroy();
					return res.status(200).json({ idgasto });
				} else {
					return res.status(400).json({ error: "Gasto não localizado" });
				}
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

	async listAll(req, res) {
		let { idusuario } = req.body;
		idusuario = (idusuario || "").toString();

		let { limit, offset } = req.body;
		return await GastoModel.findAll({
			where: { idusuario },
			attributes: ["idgasto", "descricao", "valor", "createdAt"],
			order: [["idgasto", "DESC"]],
			offset,
			limit,
		})
			.then((gastos) => {
				return res.status(200).json({gastos});
			})
			.catch((e) => {
				return res.status(400).json({ error: e.message });
			});
	}
}

module.exports = GastoController;
