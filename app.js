const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express()
const port = process.env.PORT || 8081
const router = express.Router();
const routes = require('./routes/veiculo')


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
app.use('/', routes)



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


app.post('/create', (req, res, next) => {
    knex('rest')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)

});









