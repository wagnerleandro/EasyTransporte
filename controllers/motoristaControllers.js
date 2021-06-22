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

//#region  Criar Motorista

controller.create = async (req, res) => {
    knex('motorista')
        .insert(req.body)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send(dados);
        })
  }

//#endregion


//#region  Listar Motorista
controller.list = (req, res, next) => {
    const { idCadastro } = req.params;
    knex('motorista')
        .where('idCadastro', idCadastro)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.render('listarmotorista', {
                page_title: 'Listar Motorista',
                data: dados
            });
            res.send(dados);
        }, next)
};
//#endregion

//#region  Select Motorista
controller.edit = (req, res, next) => {
    const { idCadastro } = req.params;
    knex('motorista')
        .where('idCadastro', idCadastro)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.render('editarmotorista', {
                page_title: 'Editar Motorista',
                data: dados
            });
            res.send(dados);
        }, next)
};
//#endregion


//#region  Atualizar Motorista
controller.update = (req, res, next) => {
    const { idCadastro } = req.params;
    const motorista = req.body;
    knex('motorista').update(motorista).where('idCadastro', idCadastro)
        .then((dados) => {
            if (dados) {
                res.json({ success: true, message: 'ok' })
            } else {
                return res.json({ success: false, message: 'erro' });
            }

        }, next)
};
//#endregion


//#region  Deletar Motorista
controller.delete = (req, res) => {
    const { idCadastro } = req.params;
    knex('motorista')
        .where('idCadastro', idCadastro)
        .delete(req.body)
        .then((data) => {
            if (!data) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.redirect('/motorista');
        })
};
//#endregion

module.exports = controller;