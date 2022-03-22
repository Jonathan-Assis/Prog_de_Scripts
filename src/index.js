/*const express = require("express")
const app = express ();
const PORT = 3100;
app.listen (PORT, () => console.log(`Rodando ${PORT}`) );
app.get("/",(req, res)=>{
    res.send("oi")
})

app.get("/cadastro/:nome/:idade", (req, res)=>{
    const{nome,idade} = req.params;
    res.send(nome + idade)
})*/
const express = require("express")
const app = express();
const um = require("./exemplo1");
const dois = require("./exemplo2");

require ("dotenv").config();
app.listen(process.env.PORT);
app.use("/um",um);
app.use("/dois",dois);

/*const PORT = process.env.PORT;
app.listen (PORT, () => console.log(`Rodando ${PORT}`) );

app.use("/sp",um);
app.use((_,res)=>{res.send("ERRO")});
*/