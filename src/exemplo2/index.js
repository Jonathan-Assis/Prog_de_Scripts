const{mes,dia}=require("./c");
const router=require("express").Router();
router.get("/mes",(req,res)=>res.send(mes));

module.exports=router;