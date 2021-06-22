const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express()
const port = process.env.PORT || 8081
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRECT = '10203050'
const bcrypt = require('bcrypt');
const crypto = require('crypto');

var path = require('path');
const { dirname } = require('path')

app.use(cors({
    origin: 'http://localhost:8081/'
}));

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'db'
    }
});
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json();
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set(express.static(__dirname + "/public"))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/views"))
app.use(express.json())
const routesVeiculo = require('./routes/veiculo')
const routesMotorista = require('./routes/motorista')
const routesUsuario = require('./routes/usuario')
const routesCliente = require('./routes/cliente')
app.use('/', routesVeiculo)
app.use('/', routesMotorista)
app.use('/', routesUsuario)
app.use('/', routesCliente)



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


app.listen(port, () => {
    console.log(` http://localhost:${port}`)
})


app.get('/', (req, res) => {
    res.render('veiculo', {
        page_title: 'Veiculos',
    })
});






app.get('/forgot-password', (req, res) => {
    res.render('forgot-password', {
        page_title: 'Veiculos',
    })
});



app.get('/register', (req, res) => {
   
    res.render('register', {
        page_title: 'Veiculos',
    })
});

app.get('/cliente/adicionarcliente', (req, res) => {
    res.render('adicionarcliente', {
        page_title: 'Adicionar Cliente',
    })
});


app.get('/veiculo/adicionarveiculo', (req, res) => {
    res.render('adicionarveiculo', {
        page_title: 'Adicionar Veiculo',
    })
});

app.get('/login', (req, res) => {
   
    res.render('login', {
        page_title: 'Login',
    })
});


app.post('/veiculo/editar/:idVeiculo', async function (req, res) {
    const dados = await knex.select().from('veiculo');
    res.render('editarveiculo', {
        page_title : 'Editar Veiculo',
        data: dados
    });
});



// rotas REST
app.get('/veiculo', async function (req, res) {
    const dados = await knex.select('idVeiculo', 'placa', 'kmAtual', 'status').from('veiculo');
    res.render('veiculo', {
        page_title: 'Veiculos',
        data: dados
    }); //
});

app.get('/motorista/adicionarmotorista', (req, res) => {
    res.render('adicionarmotorista', {
        page_title: 'Adicionar Motorista',
    })
});




app.post('/create', (req, res, next) => {
    knex('rest')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)

});




app.get('/motorista', async function (req, res) {
    const dados = await knex.select('idCadastro', 'cpf', 'rg','nome', 'status').from('motorista');
    res.render('motorista', {
        page_title: 'Motorista',
        data: dados
    }); //
});






