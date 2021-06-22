const express  = require('express');
const router = express.Router();

const veiculoController = require('../controllers/veiculoControllers');

router.get('/veiculo/listar/:idVeiculo', veiculoController.list);
router.get('/veiculo/editar/:idVeiculo', veiculoController.edit);
router.put('/editar/:idVeiculo', veiculoController.update);
router.get('/excluir/:idVeiculo', veiculoController.delete);
router.post('/veiculo/adicionar', veiculoController.create);

module.exports = router;