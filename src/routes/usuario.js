const router = require("express").Router();
const {UsuarioController} = require("../controllers");
const { create, updatemail, updatesenha } = new UsuarioController();

router.post("/create", create);
router.put("/update/mail", updatemail);
router.put("/update/senha", updatesenha);

router.use( (_, res) => {
	res.status(400).json({error:"Operação desconhecida com o usuário"});
});

module.exports = router;
