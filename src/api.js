var express = require("express");
var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const router = express.Router();

//rota raíz
app.use('/', router.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>")
}))

//rota sobre
app.use("/sobre", router.get("/sobre", (req, res, next) =>{
    res.status(200).send({
        "nome": "API - CHAT",
        "versão": "0.1.0",
        "autor": "Nícolas Pastório"
    })
}));

//rota listar salas
app.use("/salas", router.get("/salas", (req, res, next) => {
    const salaController = require("./controllers/salaController");
    let resp = salaController.get();
    res.status(200).send(resp);
}));

module.exports = app;