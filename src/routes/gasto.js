const router = require("express").Router();
const {GastoController} = require("../controllers");
const { create, update, listAll, remove } = new GastoController();

router.post("/create", create);
router.put("/update", update);
router.get("/list", listAll);
router.delete("/remove", remove);

router.use( (_, res) => {
	res.status(400).json({error:"Operação desconhecida com o gasto"});
});

module.exports = router;
