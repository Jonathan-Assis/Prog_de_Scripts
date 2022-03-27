const express = require("express");
const router = require("./routes");
const app = express();
require("dotenv").config();

//para suportar parâmetros passados como JSON
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Rodando na porta ${PORT}...`);
});

app.use("/", router);
