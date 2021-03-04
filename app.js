const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8081

var path = require('path');
const { dirname } = require('path')

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'db'
    }
});

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set(express.static(__dirname + "/public"))

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/views"))

app.listen(port, () => {
    console.log(` http://localhost:${port}`)
})


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

app.get('/show/:idVeiculo', (req, res, next) => {

    const { idVeiculo } = req.params;
    knex('veiculo')
        .where('idVeiculo', idVeiculo)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        }, next)

});

app.put('/update/:id', (req, res, next) => {

    const { id } = req.params;

    knex('rest')
        .where('id', id)
        .update(req.body)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados atualizados');
        }, next)

});

app.delete('/delete/:id', (req, res, next) => {

    const { id } = req.params;

    knex('rest')
        .where('id', id)
        .delete()
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados excluidos');
        }, next)

})