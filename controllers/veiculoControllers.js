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
controller.update = (req, res, next) => {
    const { idVeiculo } = req.params;
    knex('veiculo').update({placa: req.body.placa}).where('idVeiculo', idVeiculo)
    .then( function (result) {
        //res.json({ success: true, message: 'ok' });     
            res.redirect('/veiculo');
        }, next)

};

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


module.exports = controller;