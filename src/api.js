var express = require("express");
var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const router = express.Router();
const salaController = require("./controllers/salaController");

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
app.use("/salas", router.get("/salas", async (req, res, next) => {
    if(await token.checkToken(req.headers.token, req.header.iduser, req.header.nick)){
        let resp = await salaController.get();
        res.status(200).send(resp); 
    }else{
        res.status(400).send({ msg: "Usuário não autorizado!"});
    }  
}));

//rota para entrar no chat
app.use("/entrar", router.post("/entrar", async (req, res, next) => {
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);    
}));

//rota para entrar na sala
app.use("/sala/entrar", router.put("/sala/entrar", async(req, res) => {
    if(!token.checkToken(req.headers.token, req.header.iduser, req.headers.sick)){
        return false;
        let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
        res.status(200).send(resp);
    }
}));

//rota para enviar mensagens
app.use("/sala/mensagem", router.post("/sala/mensagem", async (req, res) => {
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)){
        return false;
    }
    let resp = await salaController.enviarMensagem(req.headers.nick, req.bocy.msg, req.body.idSala);
    res.status(200).send(resp);
}));

//rota para listar mensagens
app.use("/sala/mensagens/", router.get("/sala/mensagens/", async(req, res) => {
    if(!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)){
        return false;
    }
    let resp = await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
}));

module.exports = app;