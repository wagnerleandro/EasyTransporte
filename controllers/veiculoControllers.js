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

//#region  Criar Veiculos

controller.create = (req, res) => {
    knex('veiculo')
        .insert(req.body)
        .then((data) => {
            if (!data) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.redirect('/veiculo');
        })
}

//#endregion


//#region  Listar Veiculos
controller.list = (req, res, next) => {
    const { idVeiculo } = req.params;
    knex('veiculo')
        .where('idVeiculo', idVeiculo)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.render('listarveiculo', {
                page_title: 'Listar Veiculo',
                data: dados
            });
            res.send(dados);
        }, next)
};
//#endregion


//#region  Editar Veiculo
controller.edit = (req, res, next) => {
    const { idVeiculo } = req.params;
    knex('veiculo')
        .where('idVeiculo', idVeiculo)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.render('editarveiculo', {
                page_title: 'Editar Veiculo',
                data: dados
            });
            res.send(dados);
        }, next)
};
//#endregion


//#region  Atualizar Veiculo
controller.update = (req, res, next) => {
    const { idVeiculo } = req.params;
    const veiculo = req.body;
    knex('veiculo').select(veiculo).where('idVeiculo', idVeiculo)
        .then((dados) => {
            if (dados) {
                res.json({ success: true, message: 'ok' })
            } else {
                return res.json({ success: false, message: 'erro' });
            }

        }, next)
};
//#endregion


//#region  Deletar Veiculo
controller.delete = (req, res) => {
    const { idVeiculo } = req.params;
    knex('veiculo')
        .where('idVeiculo', idVeiculo)
        .delete(req.body)
        .then((data) => {
            if (!data) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.redirect('/veiculo');
        })
};
//#endregion


module.exports = controller;