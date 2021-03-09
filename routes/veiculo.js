const express  = require('express');
const router = express.Router();

router.delete('/:idVeiculo', (req, res) => {
    const { idVeiculo } = req.params;
    knex('veiculo')
        .where('idVeiculo', idVeiculo)
        .delete(req.body)
        .then((data) => {
            if (!data) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados excluidos');
            res.redirect('/veiculo');
        })

})

module.exports = router;