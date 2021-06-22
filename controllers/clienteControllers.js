const controller = {};
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'db'
    }
});

//#region  Criar Cliente





  controller.create = async (req, res) => {
  knex.transaction(function (t) {
    return knex("cliente")
      .transacting(t)
      .insert({nome: req.body.nome})
      .then(function (response) {
        return knex('endereco')
          .transacting(t)
          .insert({bairro: req.body.bairro})
      })
      .then(t.commit)
      .catch(t.rollback)
  })
  .then((dados) => {
    if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
    res.send(dados);
  })
}



module.exports = controller;